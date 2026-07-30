# Security Policy

## Supported Versions

Only the latest version gets security updates and bug fixes!

## Reporting a Vulnerability

If you detect a vulnerability, either

- open a bug ticket
- or drop an email to security at beyondjava dot de (replacing "at" and "dot" by the corresponding special characters).

In most cases, I will react within a day. However, this is a non-commercial project run by an individual, so there might be a delay because I'm offroad, ill, or something like that. Also note that "react" doesn't necessarily mean "solve". Security flaws can be convoluted, so all I can do is to aim at a fast reaction speed, but I can't promise it.

## Which pdf.js is inside? (SBOM)

ngx-extended-pdf-viewer bundles a **fork** of Mozilla's pdf.js rather than depending on the
`pdfjs-dist` npm package, because the viewer needs modifications that upstream doesn't carry.
That means your dependency scanner cannot see the PDF engine in `package.json` — and until
version 29.0.0 it had no way to learn about it at all.

Every published package now contains two files that close that gap:

- **`sbom.json`** — a CycloneDX 1.6 SBOM. It declares the bundled engine with a `purl`
  (`pkg:npm/pdfjs-dist@<upstream version>`) and a CPE, so Dependency-Track, Mend, Trivy and
  similar tools can match pdf.js advisories against it. A CycloneDX `pedigree` block records
  that the bundled code is a patched fork of that upstream release rather than a byte-identical
  copy of it.
- **`pdfjs-provenance.json`** — the same information in plain form: for each bundle
  (`assets/` = stable, `bleeding-edge/`), the upstream pdf.js release and commit it is derived
  from, plus the fork branch and commit it was built from.

Both files are also attached to every [GitHub release](https://github.com/stephanrauh/ngx-extended-pdf-viewer/releases).
The human-readable summary is in `NOTICE`.

A caveat worth stating plainly: the version in the SBOM identifies the upstream release the fork
is derived from. It is the right answer for vulnerability matching, but it does not promise the
bundled files are identical to that release. If a pdf.js advisory looks like it affects you,
please open a ticket — I would rather answer a false alarm than have you sit on a real one.

## Known vulnerabilities

Please update to the latest version! At miminum, that should be version 20.0.2, but it's better to opt for the latest version because it contains the latest bugfixes.

- Until 20.0.1 the PDF viewer was affected by [CVE-2024-4367](https://github.com/advisories/GHSA-wgrm-67xf-hhpq). Version 20.0.2 fixes this.
