# Vendored CycloneDX schemas

Third-party files. **Not our copyright** — see the attribution below before changing anything here.

`build-tools/validate-sbom.js` uses these to prove that the generated `sbom.json` really is valid
CycloneDX. They are vendored rather than installed so that validation needs no registry access and
no extra supply-chain surface: this repo runs a shai-hulud scan on every install, and an SBOM
validator that pulls a package from npm at release time would be a poor trade.

## Attribution

|           |                                                                      |
| --------- | -------------------------------------------------------------------- |
| Origin    | <https://github.com/CycloneDX/specification>, `schema/`              |
| Commit    | `fac1ff6ed49c1d4801912cf7d7ce5dabbd773290` (2026-07-08)              |
| License   | Apache License 2.0 — full text in `LICENSE` next to this file        |
| Copyright | OWASP Foundation / the CycloneDX community, <https://cyclonedx.org/> |
| Modified? | **No.** All three files are byte-for-byte identical to upstream.     |

| File                   | sha256                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| `bom-1.6.schema.json`  | `18f57f7482593bad9f21b4feed09084640cbeff419d62ad5090c5ceccca5b37d` |
| `spdx.schema.json`     | `ea6e844ee6fba1e93473d94834d0ee0996970533497935f932f73d488ffdf4a3` |
| `jsf-0.82.schema.json` | `8bae002c25e723db7ee1f26afde680ae1a2b1a8f6b4b4b0fd65dc3becb090aae` |

`bom-1.6.schema.json` and `jsf-0.82.schema.json` also state the Apache-2.0 license in their own
`$comment` field. `jsf-0.82.schema.json` credits Anders Rundgren (OpenKeyStore) as the author of
the JSON Signature Format it describes; `bom-1.6.schema.json` only `$ref`s it, for the `signature`
definition, which we don't use — but ajv has to resolve the reference to compile the schema.

Keeping them unmodified is deliberate: Apache-2.0 §4(b) would otherwise require us to carry
prominent notices describing our changes. Do not edit these files. If a fix is needed, take it
upstream, then re-vendor.

## Refreshing them

Download the three files from the commit you want, drop them in unchanged, and update the commit
and hashes above:

```bash
for f in bom-1.6.schema.json spdx.schema.json jsf-0.82.schema.json; do
  curl -sSL -H "Accept: application/vnd.github.raw" \
    "https://api.github.com/repos/CycloneDX/specification/contents/schema/$f?ref=<commit>" \
    -o "build-tools/schema/$f"
done
shasum -a 256 build-tools/schema/*.schema.json
npm run test:sbom
```

Only bump to a newer _spec_ version together with a deliberate change of `specVersion` in
`generate-sbom.js`.

Note that `@cyclonedx/cyclonedx-library` ships its own `*.SNAPSHOT.schema.json` variants. Those
are **modified** (the cross-references are rewritten to the SNAPSHOT filenames), so don't copy
from there — take the originals from the specification repo, as above.
