# Security Policy

## Supported Versions

Only the latest version gets security updates and bug fixes!

## Reporting a Vulnerability

If you detect a vulnerability, either

- open a bug ticket
- or drop an email to security at beyondjava dot de (replacing "at" and "dot" by the corresponding special characters).

In most cases, I will react within a day. However, this is a non-commercial project run by an individual, so there might be a delay because I'm offroad, ill, or something like that. Also note that "react" doesn't necessarily mean "solve". Security flaws can be convoluted, so all I can do is to aim at a fast reaction speed, but I can't promise it.

## Known vulnerabilities

Please update to the latest version! At miminum, that should be version 20.0.2, but it's better to opt for the latest version because it contains the latest bugfixes.

- Until 20.0.1 the PDF viewer was affected by [CVE-2024-4367](https://github.com/advisories/GHSA-wgrm-67xf-hhpq). Version 20.0.2 fixes this.
- [CVE-2026-16633](https://github.com/mozilla/pdf.js/security/advisories/GHSA-hq66-cqwq-w95j) (pdf.js, high, published 2026-07-28): a malicious PDF could execute JavaScript in the context of the hosting page. It affects every 27.x release, because they all bundle a pdf.js from the 5.6 line. **Version 27.0.1 fixes it** in both the stable and the bleeding-edge bundle, by cherry-picking the fix from pdf.js 6.2.108.

  Two notes on exposure. The sandbox half of the issue needs `enableScripting`, which pdf.js enables by default but this library does **not** — so a default configuration was less exposed than upstream's. The other half concerns XFA rich text and is reachable whenever `enableXfa` is true, which **is** the default here. Do not assume the default configuration was safe; please update.

  This library's own advisory, with the exact affected and patched version ranges, is [GHSA-w9hm-4m3m-fxmm](https://github.com/stephanrauh/ngx-extended-pdf-viewer/security/advisories/GHSA-w9hm-4m3m-fxmm).

  The 27 line is otherwise no longer maintained — this patch is a one-off exception, not a change to the support policy stated above.
