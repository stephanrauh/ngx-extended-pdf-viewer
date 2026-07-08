# To-do for the next major version

Items deferred to a major version bump because the fix is a **breaking change**
(it changes a default path/behavior that some existing setups may depend on).

## Asset paths

- **`cMapUrl` / `standardFontDataUrl`: drop the `'/..'` sibling-folder step.**
  Both derived options currently compute a URL *outside* the assets folder —
  `<base>/cmaps/` and `<base>/standard_fonts/` — via the
  `assetsUrl(pdfDefaultOptions.assetsFolder, '/..')` postfix in
  `projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts`
  (`cMapUrl` ~L108, `standardFontDataUrl` ~L146). But the CMap and standard-font
  files actually ship *inside* the assets folder (`assets/cmaps/`,
  `assets/standard_fonts/`). On the live showcase the computed URLs 404 (they
  fall back to `index.html`), while `assets/cmaps/…` and `assets/standard_fonts/…`
  exist and serve correctly.

  This is a **pre-existing** bug — it predates #3209 (that PR only wrapped these
  lines in `resolveAssetUrlAgainstBaseHref`); the `'/..'` goes back to
  #1478 / #2969. It has stayed silent because CMaps are only fetched for some
  CJK PDFs and `standard_fonts` only when a document lacks embedded fonts.

  **Fix:** remove the `'/..'` so they resolve to `${assetsUrl(assetsFolder)}/cmaps/`
  and `${assetsUrl(assetsFolder)}/standard_fonts/`, mirroring `workerSrc`,
  `wasmUrl`, and `sandboxBundleSrc` (the latter fixed in #3232). Also tighten the
  specs in `pdf-default-options.spec.ts` — the current
  `should return correct cMapUrl` / `standardFontDataUrl` tests only assert
  `.toContain('cmaps/')` / `.toContain('standard_fonts/')`, which is too loose to
  catch a missing `assets/` prefix (this is exactly why #3232 slipped through).

  **Why breaking:** anyone whose deployment currently places `cmaps/` /
  `standard_fonts/` as a *sibling* of the assets folder (matching today's
  behavior) would need to move them under the assets folder, or set the options
  explicitly. Discovered during the #3232 investigation.
