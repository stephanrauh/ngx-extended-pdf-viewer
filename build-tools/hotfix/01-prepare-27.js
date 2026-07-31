#!/usr/bin/env node
// build-tools/hotfix/01-prepare-27.js
//
// Step 1 of the CVE-2026-16633 backport to the 27 line: create the maintenance branches and
// cherry-pick the two fix commits onto the fork.
//
//   node build-tools/hotfix/01-prepare-27.js stable
//   node build-tools/hotfix/01-prepare-27.js bleeding-edge
//
// One channel per run, because a cherry-pick conflict leaves the fork's working tree mid-operation
// and two half-finished branches at once would be a mess. Run stable, resolve, then bleeding-edge.
//
// What it does NOT do: push, tag, build, publish, or touch main. It creates branches and commits
// cherry-picks. Everything is local and reversible - the "how to undo" lines are printed at the end.
//
// On a conflict it stops immediately and leaves the conflict in the working tree for you to
// resolve by hand (the fix was written against pdf.js 6.2, the 27 line is on 5.6, so conflicts in
// these two files are expected rather than alarming). Re-run the same command after
// "git cherry-pick --continue" to pick up where it left off - already-applied commits are skipped.

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const LIB_DIR = path.join(__dirname, '..', '..');
const FORK_DIR = path.join(LIB_DIR, '..', 'mypdf.js');
const PROVENANCE = path.join(LIB_DIR, 'projects', 'ngx-extended-pdf-viewer', 'pdfjs-provenance.json');

const LIB_TAG = '27.0.0';
const LIB_BRANCH = '27.0.x';

// The base commits 00-inspect-27.js resolved, with the engine version each one must produce. The
// version is re-verified below: if it does not match, the commit is not what shipped as 27.0.0 and
// the script refuses to build a maintenance branch on the wrong foundation.
const CHANNELS = {
  stable: { commit: '57349b528914a81a6c285182e960bb950f17320f', engine: '5.6.1113', branch: 'ngx-27.0.x' },
  'bleeding-edge': { commit: '32a32f523bcdaa9674e34640774467dbf857d345', engine: '5.6.1112', branch: 'ngx-27.0.x-bleeding-edge' },
};

const channelName = process.argv[2];
const channel = CHANNELS[channelName];
if (!channel) {
  console.error('Usage: node build-tools/hotfix/01-prepare-27.js <stable|bleeding-edge>');
  process.exit(2);
}

function git(cwd, args, { quiet = false } = {}) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  if (result.status !== 0 && !quiet) {
    return null;
  }
  return result.status === 0 ? (result.stdout || '').trim() : null;
}

const say = (text) => console.log(text);
const fatal = (text) => {
  console.error(`\n✗ ${text}\n`);
  process.exit(1);
};

// ---------------------------------------------------------------- guards
// Every one of these exists because getting it wrong would cost real work to undo.

say(`\nBackporting CVE-2026-16633 to the 27 line - channel: ${channelName}\n`);

if (!fs.existsSync(FORK_DIR)) {
  fatal(`the fork is not at ${FORK_DIR}`);
}

// A dirty fork would get swept into the cherry-pick commits, or block the checkout outright.
const dirty = git(FORK_DIR, ['status', '--porcelain']);
if (dirty) {
  fatal(`the fork's working tree is not clean. Commit or stash first:\n${dirty}`);
}

// Refuse to start a second cherry-pick on top of an unfinished one.
if (fs.existsSync(path.join(FORK_DIR, '.git', 'CHERRY_PICK_HEAD'))) {
  fatal('a cherry-pick is already in progress in the fork. Finish it ("git cherry-pick --continue") or abort it first.');
}

// The branch the fork was on when we started, printed at the end so getting back is one command.
// On a re-run we are already sitting on a hotfix branch, and offering *that* as the way back would
// be nonsense - so fall back to naming the fork's usual working branches instead.
const HOTFIX_BRANCHES = Object.values(CHANNELS).map((c) => c.branch);
const currentBranch = git(FORK_DIR, ['rev-parse', '--abbrev-ref', 'HEAD']);
const returnBranch = HOTFIX_BRANCHES.includes(currentBranch) ? null : currentBranch;
say(returnBranch ? `fork is currently on "${returnBranch}" - restore it when you are done (see the end of this run)` : `fork is currently on "${currentBranch}" (a hotfix branch) - remember to return to bleeding-edge or 6.1 when you are done`);
const backTo = returnBranch || 'bleeding-edge';

// Verify the base commit really is the engine that shipped as 27.0.0, the same way
// find-fork-commit.js does: versionPrefix + commits since baseVersion, both read from that commit.
const config = git(FORK_DIR, ['show', `${channel.commit}:pdfjs.config`]);
if (!config) {
  fatal(`commit ${channel.commit} is not in the fork, or has no pdfjs.config`);
}
const parsed = JSON.parse(config);
const count = git(FORK_DIR, ['rev-list', '--count', `${parsed.baseVersion}..${channel.commit}`]);
const engineAtBase = parsed.versionPrefix + count;
if (engineAtBase !== channel.engine) {
  fatal(`commit ${channel.commit} produces engine ${engineAtBase}, but 27.0.0 shipped ${channel.engine}. Wrong base commit - stop and re-run 00-inspect-27.js.`);
}
say(`base commit      ${channel.commit.slice(0, 12)} verified as engine ${engineAtBase}`);

// The two commits to cherry-pick, read from main's provenance rather than hardcoded here, so this
// stays correct if that record is ever corrected.
const provenance = JSON.parse(fs.readFileSync(PROVENANCE, 'utf8'));
const fix = (provenance.channels?.stable?.securityFixes || []).find((f) => f.cve === 'CVE-2026-16633');
if (!fix) {
  fatal('main\'s pdfjs-provenance.json has no CVE-2026-16633 entry - nothing to backport');
}

// ---------------------------------------------------------------- library branch

// Independent of the fork work and harmless to repeat, so it runs on both invocations.
if (git(LIB_DIR, ['rev-parse', '--verify', '--quiet', `refs/heads/${LIB_BRANCH}`], { quiet: true })) {
  say(`library branch   ${LIB_BRANCH} already exists - left alone`);
} else {
  // A plain branch, not a checkout: main stays checked out, the working tree is never touched, so
  // uncommitted or untracked files here are harmless and deliberately not guarded against.
  if (git(LIB_DIR, ['branch', LIB_BRANCH, LIB_TAG]) === null) {
    fatal(`could not create ${LIB_BRANCH} from tag ${LIB_TAG}`);
  }
  say(`library branch   created ${LIB_BRANCH} from tag ${LIB_TAG} (main stays checked out)`);
}

// ---------------------------------------------------------------- fork branch

const exists = git(FORK_DIR, ['rev-parse', '--verify', '--quiet', `refs/heads/${channel.branch}`], { quiet: true });
if (exists) {
  say(`fork branch      ${channel.branch} already exists - checking it out and continuing`);
  if (git(FORK_DIR, ['checkout', channel.branch]) === null) {
    fatal(`could not check out ${channel.branch}`);
  }
} else {
  if (git(FORK_DIR, ['checkout', '-b', channel.branch, channel.commit]) === null) {
    fatal(`could not create ${channel.branch} from ${channel.commit}`);
  }
  say(`fork branch      created ${channel.branch} from ${channel.commit.slice(0, 12)}`);
}

// ---------------------------------------------------------------- cherry-picks

say('');
for (const c of fix.upstreamCommits) {
  const subject = git(FORK_DIR, ['show', '-s', '--format=%s', c.inFork]) || c.inFork;

  // Idempotence: a re-run after a manual conflict resolution must not apply the same commit twice.
  // A cherry-pick creates a *new* commit, so --is-ancestor would never find the original and the
  // fix would be applied again on every re-run. The reliable test is the "cherry picked from
  // commit ..." trailer that -x writes below - plus --is-ancestor for the case where the branch
  // genuinely contains the original commit (the bleeding-edge base is on the modern line).
  const picked = git(FORK_DIR, ['log', `${channel.commit}..HEAD`, '--grep', `cherry picked from commit ${c.inFork}`, '--format=%H']);
  const already = !!picked || spawnSync('git', ['merge-base', '--is-ancestor', c.inFork, 'HEAD'], { cwd: FORK_DIR, stdio: 'ignore' }).status === 0;
  if (already) {
    say(`  skipped   ${c.inFork.slice(0, 12)}  ${subject}   (already on this branch)`);
    continue;
  }

  // -x records "cherry picked from commit ..." in the message, which is what makes the backport
  // auditable later - and what pdfjs-provenance.json for the 27 line will cite in step 3.
  const result = spawnSync('git', ['cherry-pick', '-x', c.inFork], { cwd: FORK_DIR, encoding: 'utf8' });
  if (result.status !== 0) {
    const conflicted = git(FORK_DIR, ['diff', '--name-only', '--diff-filter=U']) || '(none reported)';
    console.error(`\n  CONFLICT while applying ${c.inFork.slice(0, 12)} (${subject})`);
    console.error(`\n  Conflicted files:\n${conflicted.split('\n').map((f) => `      ${f}`).join('\n')}`);
    console.error(`
  This is expected: the fix was written against pdf.js 6.2 and this branch is on 5.6.

  Resolve the conflict, then:
      cd ${FORK_DIR}
      git add <files> && git cherry-pick --continue
      node build-tools/hotfix/01-prepare-27.js ${channelName}     (picks up the remaining commits)

  Or back out entirely:
      cd ${FORK_DIR} && git cherry-pick --abort && git checkout ${backTo}
`);
    process.exit(1);
  }
  say(`  applied   ${c.inFork.slice(0, 12)}  ${subject}`);
}

// ---------------------------------------------------------------- report

say(`\n${'='.repeat(78)}\nBoth fix commits are on ${channel.branch}. What changed:\n${'='.repeat(78)}`);
say(git(FORK_DIR, ['diff', '--stat', `${channel.commit}..HEAD`]) || '(no diff)');
say('');
say(git(FORK_DIR, ['log', '--oneline', `${channel.commit}..HEAD`]) || '');

say(`
Nothing has been pushed, built or published.

Next:
  - review the diff:   cd ${FORK_DIR} && git diff ${channel.commit}..HEAD
  - other channel:     node build-tools/hotfix/01-prepare-27.js ${channelName === 'stable' ? 'bleeding-edge' : 'stable'}
  - back to your branch when done:  cd ${FORK_DIR} && git checkout ${backTo}

To undo this run completely:
  cd ${FORK_DIR} && git checkout ${backTo} && git branch -D ${channel.branch}
  cd ${LIB_DIR} && git branch -D ${LIB_BRANCH}
`);
