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
- **`vex.json`** — a CycloneDX VEX document. When a pdf.js advisory is fixed in the bundled
  engine before the upstream release carrying that fix, the version number alone would still make
  your scanner report it. The VEX says otherwise, machine-readably, with a
  `resolved_with_pedigree` statement pointing at the matching `pedigree.patches` entry in the
  SBOM. Dependency-Track and Trivy consume it directly.

Both files are also attached to every [GitHub release](https://github.com/stephanrauh/ngx-extended-pdf-viewer/releases).
The human-readable summary is in `NOTICE`.

A caveat worth stating plainly: the version in the SBOM identifies the upstream release the fork
is derived from. It is the right answer for vulnerability matching, but it does not promise the
bundled files are identical to that release. If a pdf.js advisory looks like it affects you,
please open a ticket — I would rather answer a false alarm than have you sit on a real one.

## Where this project stands on the EU Cyber Resilience Act

The Cyber Resilience Act — Regulation (EU) 2024/2847 — applies in stages: vulnerability and
incident reporting from **11 September 2026**, everything else (essential requirements, SBOM in
the technical documentation, CE marking) from **11 December 2027**.

**ngx-extended-pdf-viewer is outside the scope of the CRA**, on two independent grounds:

- It is not placed on the market *in the course of a commercial activity*. There is no paid
  version, no enterprise tier and no advertising, and nothing about the software or its security
  updates is gated behind payment. The Commission's guidance on free and open-source
  software is explicit that publishing under an open source licence, by itself, does not create
  CRA obligations.
- It is maintained by an individual. An *open-source software steward* under Article 3(14) must be
  a legal person, so that category — the one written for foundations such as Eclipse, OpenSSL or
  the PSF — does not apply here either.

**What that means if you ship this library in a commercial product.** You are the manufacturer in
the CRA's sense, for your product including the components you integrate. That obligation is
yours, not this project's, and it cannot be delegated upstream. What this project does provide, so
you can discharge it:

- a machine-readable **SBOM**, **VEX** and pdf.js provenance in every published package and on
  every GitHub release (see the section above) — including the bundled PDF engine your scanner
  cannot otherwise see;
- a documented **vulnerability disclosure channel** and a public advisory history (see the
  sections above and the repository's Security Advisories);
- a stated **support period policy**: security fixes go into the latest version. There is no
  backporting to older major versions, so plan your upgrade cadence accordingly.

Please treat the response times in "Reporting a Vulnerability" as what they are — a best effort by
one person, not a contractual SLA. If your compliance process needs guaranteed response times, that
is a gap you have to close on your side.

This section describes the project's factual situation and is not legal advice. If the project's
funding model ever changes in a way that affects the analysis above, this section will be updated.

## Known vulnerabilities

Please update to the latest version! At miminum, that should be version 20.0.2, but it's better to opt for the latest version because it contains the latest bugfixes.

- Until 20.0.1 the PDF viewer was affected by [CVE-2024-4367](https://github.com/advisories/GHSA-wgrm-67xf-hhpq). Version 20.0.2 fixes this.
- [CVE-2026-16633](https://github.com/mozilla/pdf.js/security/advisories/GHSA-hq66-cqwq-w95j) (pdf.js, high, published 2026-07-28): a malicious PDF could execute JavaScript in the context of the hosting page. It affects pdf.js from 5.6.83 onwards, so every ngx-extended-pdf-viewer release bundling such an engine is affected — which includes the 28.x line and the 29.0.0 release candidates. The fix from pdf.js 6.2.108 has been cherry-picked into both bundled engines; see `vex.json` in the package.

  Two notes on exposure. The sandbox half of the issue needs `enableScripting`, which pdf.js enables by default but this library does **not** — so a default configuration was less exposed than upstream's. The other half concerns XFA rich text and is reachable whenever `enableXfa` is true, which **is** the default here. Do not assume the default configuration was safe; please update.

  This library's own advisory for the issue, with the exact affected and patched version ranges, is [GHSA-w9hm-4m3m-fxmm](https://github.com/stephanrauh/ngx-extended-pdf-viewer/security/advisories/GHSA-w9hm-4m3m-fxmm). Patched in **28.1.1** on the 28.x line and in **29.0.0-rc.3** on the 29.0.0 release candidates.
