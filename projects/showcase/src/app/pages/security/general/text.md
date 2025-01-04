Let's face it: humans are fallible. I'm no exception. So there's no way to guarantee this library is free of security holes. If you find one, please report it to me. I'll fix it as soon as possible.

That said, security is a top-priority issue for me. I'm using Dependabot, Snyk, and Mend Bolt to keep the dependencies up-to-date and to notify me about security issues. The result is a flood of false positives, but at least I know the issues and can decide whether they are relevant.

ngx-extended-pdf-viewer uses a fork of pdf.js, which is the core of this project. pdf.js is a very mature library, it's the PDF viewer of Firefox, and many other projects use it. Generally speaking, the quality of pdf.js is remarkable. But of course, even pdf.js is maintained by fallible humans, and it's been subject to security issues in the past.

I suppose by now you know why ngx-extended-pdf-viewer doesn't ship with any warranty, so I recommend checking public vulnerability reports for pdf.js and ngx-extended-pdf-viewer every once in a while. For example, www.cvedetails.com or [Snyk (pdf.js)](https://security.snyk.io/package/npm/pdfjs-dist), [Snyk (ngx-extended-pdf-viewer)](https://security.snyk.io/package/npm/ngx-extended-pdf-viewer), or [Wordfence](https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/pdfjs-viewer-shortcode/) are good starting points.

[Sonarcloud](https://sonarcloud.io/summary/new_code?id=stephanrauh_ngx-extended-pdf-viewer) monitors ngx-extended-pdf-viewer. The idea is that I check the results and heed them. As things go, I often forget to do so. Feel free to nudge me if I'm lazy again!

With very few exceptions, I never maintain old versions of ngx-extended-pdf-viewer. Every improvement goes into the main branch and nowhere else. So if you're using an old version, you're missing out on bug fixes and security improvements. I've aware that this is inconvenient or even annoying. It's what happens when you're maintaining a project alone in your spare time. I'd love to offer stuff like long-term support, and that's where you come into play. Can I talk you into contributing to this project?

Wrapping it up, I'm trying to address security as best as possible, but this library ships without warranties. You're using it at your own risk. Please update the latest version as soon as possible, and report security issues to me. And consider supporting me. That protects you from me getting ill and abandoning this project involuntarily. Thank you!

## SBOM
At the moment, the SBOM is stored here: https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/sbom.json. I'll package it with the library soon.

## Known vulnerabilities
Please update to the latest version! At miminum, that should be version 20.0.2, but it's better to opt for the latest version because it contains the latest bugfixes.

Until 20.0.1 the PDF viewer was affected by [CVE-2024-4367](https://github.com/advisories/GHSA-wgrm-67xf-hhpq). Version 20.0.2 fixes this.
