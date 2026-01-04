#!/bin/sh
#
# scan-npm-supplychain.sh
#
# Comprehensive npm / repo Supply-Chain Scanner (with Allowlist/Esbuild exceptions)
#
# Purpose:
#   - Checks package.json lifecycle scripts (preinstall/install/postinstall/prepare)
#   - Scans typical install/script files (install.js, scripts/*.js)
#   - Scans CI files (.github/workflows, .gitlab-ci.yml, .circleci/config.yml, azure-pipelines.yml)
#   - Detects downloaders/exec/PowerShell/obfuscation/suspicious domains
#   - Optional FULL scan over all node_modules (slower) or Delta scan (only updated packages)
#   - Outputs human-readable and optionally JSON report
#   - Exit codes: 0=clean, 1=review-warnings, 2=critical-findings
#
# Requirements:
#   - /bin/sh, grep, find, sed, awk, jq
#   - Optional: ripgrep (rg) for faster full scans

#
# Parameters:
#   --full        : Full scan (all node_modules), Default: Delta (only updated packages)
#   --json        : Generate JSON report "scan-report.json"
#   --dirs DIRS   : Space-separated list of paths (Default: ".")
#   --parallel N  : Number of parallel tasks for lookup/grep (Default: 4)
#
# Exit Codes:
#   0 = clean / INFO only
#   1 = REVIEW (warnings, manual review recommended)
#   2 = CRIT (critical findings)
#
# Notes:
#   - Delta scan tries to compare package-lock.json against HEAD. If no Git repo: falls back to "all".
#   - For safe updates: npm install --ignore-scripts ; npm rebuild <needed>
#
# Example:
#   ./scan-npm-supplychain.sh --full --json --dirs ". ../extended-pdf-viewer-showcase" --parallel 6
#

set -eu

##### --- Parameter --- #####
FULL=0
OUT_JSON=0
DIRS="."
PARALLEL=4
VERBOSE=0

while [ $# -gt 0 ]; do
  case "$1" in
    --full) FULL=1; shift ;;
    --json) OUT_JSON=1; shift ;;
    --dirs) shift; DIRS="$1"; shift ;;
    --parallel) shift; PARALLEL="$1"; shift ;;
    --verbose) VERBOSE=1; shift ;;
    *) shift ;;
  esac
done

##### --- Regex / IOCs / Allowlists --- #####
RISKY_CMD_REGEX='(curl|wget|Invoke-WebRequest|iwr|powershell(\.exe)?([[:space:]]+-enc|[[:space:]]+-Command|[[:space:]]+-nop|[[:space:]]+-w|[[:space:]]+-WindowStyle)|certutil|mshta|rundll32|bitsadmin|nc[[:space:]]+-e|node[[:space:]]+-e|bash[[:space:]]+-c|sh[[:space:]]+-c|python[[:space:]]+-c|perl[[:space:]]+-e|osascript|Invoke-Expression|iex|child_process\.exec|child_process\.spawn|spawnSync)'
REVIEW_CMD_REGEX='(node-gyp-build|prebuild-install|install\.js|build\.js|prebuild)'
HTTP_IN_SCRIPT_REGEX='https?://'
B64_OBFUSC_REGEX='(eval\(|Function\(|atob\(|Buffer\.from\([[:space:]]*["'\'']?[A-Za-z0-9+/]{40,}={0,2}["'\'']?[[:space:]]*,[[:space:]]*["'\'']base64["'\'']\))'
SUSP_DOMAINS='(webhook\.site|requestbin|oast|ngrok|pastebin|transfer\.sh|bin\.st|iplogger|dweb\.link|webhook)'

# Allowlist: bekannte legitime package+hook Kombinationen (Regex on "name:hook")
# Note: These are known safe packages with legitimate install scripts
ALLOW_HOOKS='^(esbuild:postinstall|nice-napi:install|mime:prepare|core-js:postinstall|@puppeteer/browsers:postinstall|lmdb:install|msgpackr-extract:install)$'

# Files that are safe to have download/install scripts (full paths relative to package)
ALLOW_FILES='(node_modules/esbuild/install\.js|node_modules/nice-napi/.*|node_modules/@puppeteer/browsers/.*|node_modules/core-js/postinstall\.js)'

# esbuild allowed download hosts (Regex)
ESBUILD_ALLOWED_DOMAINS='(registry\.npmjs\.org|github\.com/evanw/esbuild|github\.com/esbuild/|objects\.githubusercontent\.com)'

# CI allowed URLs (Regex) - legitimate URLs in GitHub Actions/CI configs
CI_ALLOWED_URLS='(registry\.npmjs\.org|github\.com|docs\.github\.com|npmjs\.com|githubusercontent\.com)'

##### --- Temp / Cache --- #####
CACHE_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t npmcheck)"
trap 'rm -rf "$CACHE_DIR"' EXIT

say() { printf '%s\n' "$*" >&2; }
rule() { printf '%s\n' "────────────────────────────────────────────────────────" >&2; }

##### --- Utilities --- #####
log_info() { [ "$VERBOSE" -eq 1 ] && printf '%s\n' "INFO  $*" >&2 || true; }

sanitize() { printf '%s' "$1" | sed 's/[^A-Za-z0-9._-]/_/g'; }


# pkg_dir_in_nm: returns package.json path in node_modules for a name@ver spec
pkg_dir_in_nm() {
  base="$1"; spec="$2"
  name="${spec%@*}"
  printf '%s/node_modules/%s' "$base" "$name"
}

# list_updated_packages: outputs name@ver lines for changed packages (fallback: whole lock)
list_updated_packages() {
  dir="$1"
  lock="$dir/package-lock.json"
  [ -f "$lock" ] || { return 1; }

  # build old list from HEAD package-lock.json if in git
  OLD_FILE="$CACHE_DIR/old.$(sanitize "$dir").txt"
  NEW_FILE="$CACHE_DIR/new.$(sanitize "$dir").txt"
  : >"$OLD_FILE"
  : >"$NEW_FILE"

  if git -C "$dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if git -C "$dir" show HEAD:package-lock.json >/dev/null 2>&1; then
      git -C "$dir" show HEAD:package-lock.json 2>/dev/null \
        | jq -r '..|objects|select(has("version") and has("name")) | "\(.name)@\(.version)"' 2>/dev/null \
        | sort -u >"$OLD_FILE" || true
    fi
  fi

  jq -r '..|objects|select(has("version") and has("name")) | "\(.name)@\(.version)"' "$lock" 2>/dev/null \
    | sort -u >"$NEW_FILE" || true

  if [ -s "$OLD_FILE" ]; then
    comm -13 "$OLD_FILE" "$NEW_FILE" || true
  else
    cat "$NEW_FILE" || true
  fi
}

##### --- Scans --- #####

# scan package.json scripts for risky/ review commands
scan_lifecycle_in_pkgjson() {
  path="$1"; scope="$2"
  [ -f "$path" ] || return 0

  PKG_NAME="$(jq -r '.name // empty' "$path" 2>/dev/null || echo '')"

  if jq -e '(.scripts // {}) as $s | [ "postinstall","preinstall","prepare","install" ] | map(select($s[.]? != null)) | length > 0' "$path" >/dev/null 2>&1; then
    jq -r '
      (.scripts // {}) as $s
      | ["postinstall","preinstall","prepare","install"]
      | map({k: ., v: ($s[.] // empty)}) | map(select(.v != null))
      | .[] | "\(.k): \(.v)"
    ' "$path" 2>/dev/null \
    | while IFS= read -r line; do
        HOOK=$(printf '%s' "$line" | awk -F: '{print $1}')
        KEY="${PKG_NAME}:${HOOK}"

        # prepare in dependencies -> INFO (normal)
        if [ "$scope" = "DEPS" ] && [ "$HOOK" = "prepare" ]; then
          log_info "  $scope  $path :: $line (prepare in dependency usually not executed)"
          continue
        fi

        # Allowlist match -> skip in normal mode, only log in verbose
        if [ -n "$PKG_NAME" ] && printf '%s\n' "$KEY" | grep -Eq "$ALLOW_HOOKS"; then
          log_info "  $scope  $path :: $line (allowlisted, skipped)"
          continue
        fi

        # Default classification
        if printf '%s\n' "$line" | grep -Eqi "$RISKY_CMD_REGEX|$HTTP_IN_SCRIPT_REGEX|$B64_OBFUSC_REGEX"; then
          printf '%s\n' "CRIT  $scope  $path :: $line"
        elif printf '%s\n' "$line" | grep -Eqi "$REVIEW_CMD_REGEX"; then
          printf '%s\n' "REVIEW $scope  $path :: $line"
        else
          log_info "  $scope  $path :: $line"
        fi
      done
  fi
}

# scan common install/script files inside a package directory (base = dir that contains package.json)
scan_install_files() {
  base="$1"; scope="$2"
  [ -d "$base" ] || return 0

  find "$base" -maxdepth 3 -type f \( -name 'install.js' -o -name 'preinstall.js' -o -name 'postinstall.js' -o -path '*/scripts/*.js' \) 2>/dev/null \
    | while IFS= read -r f; do
        # Check if file is in the allowlist
        if printf '%s' "$f" | grep -Eq "$ALLOW_FILES"; then
          log_info "  $scope  $f :: allowlisted file, skipping scan"
          continue
        fi

        # esbuild install.js -> expected network download, treat as REVIEW/INFO unless unexpected host
        case "$f" in
          */node_modules/esbuild/install.js)
            # collect URLs in file (simplified to avoid BSD sed issues)
            urls="$(grep -Eo 'https?://[A-Za-z0-9._~:/?#\[\]@!$&'"'"'()*+,;=%-]+' "$f" 2>/dev/null \
              | grep -v '^//' \
              | tr -d '\r' \
              | sort -u || true)"

            if [ -z "$urls" ]; then
              log_info "  $scope  $f :: esbuild install script (no explicit URLs found)"
              continue
            fi
            # if any url outside allowed domains -> CRIT
            bad=0
            for u in $urls; do
              echo "$u" | grep -Eq "$ESBUILD_ALLOWED_DOMAINS" || bad=1
            done
            if [ "$bad" -eq 1 ]; then
              printf '%s\n' "CRIT  $scope  $f :: esbuild install script downloads from unexpected host(s):\n$urls"
            else
              log_info "  $scope  $f :: esbuild install script (allowed hosts)"
            fi
            continue
            ;;
        esac

        # generic check for other install files
        if grep -IEnH -E "$RISKY_CMD_REGEX|$HTTP_IN_SCRIPT_REGEX|child_process\.exec|child_process\.spawn|$B64_OBFUSC_REGEX" -- "$f" >/dev/null 2>&1; then
          printf '%s\n' "CRIT  $scope  $f :: suspicious content"
        else
          log_info "  $scope  $f :: scanned (no suspicious pattern)"
        fi
      done
}

# Helper: reads name@version from a package.json path
pkg_spec_from_pkgjson() {
  pj="$1"
  if command -v jq >/dev/null 2>&1; then
    jq -r '[.name,.version]|join("@")' "$pj" 2>/dev/null
  else
    # very simple fallback (for emergencies only, not perfect)
    name=$(sed -n 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$pj" | head -1)
    ver=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$pj" | head -1)
    [ -n "$name" ] && [ -n "$ver" ] && printf '%s@%s\n' "$name" "$ver" || printf '\n'
  fi
}

list_packages_to_check() {
  dir="$1"
  say "📦 Collecting package paths for $dir (mode: $( [ "$FULL" -eq 1 ] && echo full || echo delta ))"

  # parseable output: one path per line (incl. project root as first line)
  # we skip line 1 (project root), append /package.json and filter for existing files
  parseable="$(npm ls --all -p --prefix "$dir" 2>/dev/null || true)"

  if [ -n "$parseable" ]; then
    printf '%s\n' "$parseable" \
      | sed '1d' \
      | awk '{print $0"/package.json"}' \
      | while IFS= read -r pj; do [ -f "$pj" ] && printf '%s\n' "$pj"; done \
      | sort -u >"$CACHE_DIR/packages.$(sanitize "$dir").txt"
  else
    # Fallback: find (moderate depth for performance)
    find "$dir/node_modules" -maxdepth 10 -type f -name package.json 2>/dev/null \
      | sort -u >"$CACHE_DIR/packages.$(sanitize "$dir").txt"
  fi

  if [ "$FULL" -eq 1 ]; then
    pkgfile="$CACHE_DIR/packages.$(sanitize "$dir").txt"
    count=$(wc -l < "$pkgfile" 2>/dev/null || echo "0")
    say "✅ $count packages (full) found."
    cat "$pkgfile"
    return
  fi

  # Delta mode: only check changed packages (name@version)
  updfile="$CACHE_DIR/updated.$(sanitize "$dir").txt"
  : >"$updfile"
  list_updated_packages "$dir" >"$updfile" || true

  if [ -s "$updfile" ]; then
    # Map package.json -> name@version and filter against updated.txt
    out="$CACHE_DIR/packages.delta.$(sanitize "$dir").txt"
    : >"$out"
    while IFS= read -r pj; do
      spec="$(pkg_spec_from_pkgjson "$pj")"
      [ -n "$spec" ] && grep -Fxq "$spec" "$updfile" && printf '%s\n' "$pj" >>"$out"
    done <"$CACHE_DIR/packages.$(sanitize "$dir").txt"

    if [ -s "$out" ]; then
      cat "$out"
      say "✅ $(wc -l < "$out") packages (delta) found."
      return
    else
      # no delta determinable → fall back to full list (deduplicated)
      cat "$CACHE_DIR/packages.$(sanitize "$dir").txt"
      say "ℹ️ No delta determinable – using complete list."
      return
    fi
  else
    # no delta possible (no lock/git) → all
    cat "$CACHE_DIR/packages.$(sanitize "$dir").txt"
    say "ℹ️ No delta (old lock) – using complete list."
  fi
}

# check lifecycle scripts and install files for a given project dir
check_lifecycle_scripts() {
  dir="$1"
  out="$CACHE_DIR/lc.$(sanitize "$dir").txt"
  : >"$out"

  # (1) own package.json files (without node_modules)
  find "$dir" -type f -name package.json -not -path '*/node_modules/*' 2>/dev/null \
    | while IFS= read -r p; do
        scan_lifecycle_in_pkgjson "$p" "OWN"
      done >>"$out" 2>/dev/null

  # (2) Dependencies: ALWAYS via list_packages_to_check
  if [ -d "$dir/node_modules" ]; then
    # Debug: make visible whether the function runs
    # say "DEBUG: calling list_packages_to_check for $dir (FULL=$FULL) …"
    list_packages_to_check "$dir" \
      | while IFS= read -r p; do
          # Safety check: only existing package.json
          [ -f "$p" ] || continue
          scan_lifecycle_in_pkgjson "$p" "DEPS" || true
          base="$(dirname "$p")"
          scan_install_files "$base" "DEPS" || true
        done >>"$out"
  else
    say "ℹ️  [$dir] No node_modules directory found."
    ls -alsi
  fi

  if [ -s "$out" ]; then
    say "❗️[$dir] Suspicious lifecycle/install scripts:"
    cat "$out" >&2
  else
    say "✅ [$dir] No suspicious scripts (in scanned scope)."
  fi
}

check_workflows() {
  dir="$1"
  out="$CACHE_DIR/ci.$(sanitize "$dir").txt"
  : >"$out"
  targets=""

  for p in ".github/workflows" ".gitlab-ci.yml" ".circleci/config.yml" "azure-pipelines.yml"; do
    if [ -e "$dir/$p" ]; then
      if [ -d "$dir/$p" ]; then
        for f in "$dir/$p"/*.yml "$dir/$p"/*.yaml; do
          [ -e "$f" ] && targets="$targets $f"
        done
      else
        targets="$targets $dir/$p"
      fi
    fi
  done

  if [ -z "$targets" ]; then
    say "ℹ️ [$dir] No CI workflows found."
    return 0
  fi

  # use rg if available for speed, fallback to grep
  tmpout="$CACHE_DIR/ci.raw.$(sanitize "$dir").txt"
  : >"$tmpout"

  if command -v rg >/dev/null 2>&1; then
    rg -n --no-ignore -e "$RISKY_CMD_REGEX|$SUSP_DOMAINS|$HTTP_IN_SCRIPT_REGEX|$B64_OBFUSC_REGEX" $targets 2>/dev/null >"$tmpout" || true
  else
    grep -RInE "$RISKY_CMD_REGEX|$SUSP_DOMAINS|$HTTP_IN_SCRIPT_REGEX|$B64_OBFUSC_REGEX" -- $targets 2>/dev/null >"$tmpout" || true
  fi

  # Filter out allowed URLs from CI findings
  if [ -s "$tmpout" ]; then
    grep -Ev "$CI_ALLOWED_URLS" "$tmpout" >"$out" || true
  fi

  if [ -s "$out" ]; then
    say "❗️[$dir] Suspicious commands/IOCs in CI:"
    sed -n '1,200p' "$out" >&2
  else
    say "✅ [$dir] No suspicious commands in CI."
  fi
}

##### --- Main Loop over DIRS --- #####
CRIT=0
REV=0
INFO=0

rule
say "npm Supply-Chain Full/Delta Scanner (mode: $( [ "$FULL" -eq 1 ] && echo full || echo delta ))"
rule

for d in $DIRS; do
  say ""
  say "📦 Checking: $d"
  if [ ! -d "$d" ]; then
    say "⚠️  $d does not exist – skipping."
    continue
  fi

  check_lifecycle_scripts "$d"
  check_workflows "$d"

  LCF="$CACHE_DIR/lc.$(sanitize "$d").txt"
  CIF="$CACHE_DIR/ci.$(sanitize "$d").txt"

  if [ -f "$LCF" ] && [ -s "$LCF" ]; then
    c=$(grep -c '^CRIT' "$LCF" || true)
    r=$(grep -c '^REVIEW' "$LCF" || true)
    i=$(grep -c '^INFO' "$LCF" || true)
    [ "$c" -gt 0 ] && CRIT=1
    [ "$r" -gt 0 ] && REV=1
    [ "$i" -gt 0 ] && INFO=1
  fi

  if [ -f "$CIF" ] && [ -s "$CIF" ]; then
    icrit=$(grep -Eic "$RISKY_CMD_REGEX|$B64_OBFUSC_REGEX" "$CIF" || true)
    irev=$(grep -Eic "$HTTP_IN_SCRIPT_REGEX|$SUSP_DOMAINS" "$CIF" || true)
    [ "$icrit" -gt 0 ] && CRIT=1
    [ "$irev" -gt 0 ] && REV=1
  fi
done

rule
say "Summary:"
if [ "$CRIT" -eq 1 ]; then
  say "⚠️ Critical findings detected."
elif [ "$REV" -eq 1 ]; then
  say "ℹ️ Review findings detected (no CRIT)."
else
  say "✅ No issues found."
fi

if [ "$OUT_JSON" -eq 1 ]; then
  jq -n --arg mode "$( [ "$FULL" -eq 1 ] && echo full || echo delta )" \
        --arg dirs "$DIRS" \
        --argjson critical $CRIT --argjson review $REV --argjson info $INFO \
        '{mode:$mode,dirs:$dirs,critical:$critical,review:$review,info:$info}' > scan-report.json
  say "JSON report: scan-report.json"
fi

if [ "$CRIT" -eq 1 ]; then exit 2; fi
if [ "$REV" -eq 1 ]; then exit 1; fi
exit 0
