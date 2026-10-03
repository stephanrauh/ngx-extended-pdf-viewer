// #3258 modified by ngx-extended-pdf-viewer
/**
 * Digital signature verification.
 *
 * pdf.js 6.2 added a "signature properties" panel, but it only renders when the
 * viewer can hand it a verifier - and the browser build of pdf.js deliberately
 * ships none (`web/genericcom.js` returns `null`). Firefox wires its panel to NSS,
 * which a web page has no equivalent of: the hard part is not parsing the PKCS#7
 * blob but deciding which root certificates to trust.
 *
 * So the decision is yours to make. Pass an implementation to
 * `[signatureVerifier]` and the panel appears for signed documents; leave it unset
 * and the viewer behaves as before - the button stays hidden.
 *
 * The library does not interpret the result, it forwards it to pdf.js. Reporting
 * `verified` is a claim your application makes, not one this library checks.
 */
// #3258 end of modification by ngx-extended-pdf-viewer

/** Outcome of verifying one signature, as rendered by the panel. */
export type PdfSignatureStatus =
  /** Signature is cryptographically valid and its certificate is trusted. */
  | 'verified'
  /** Verification could not be completed (unsupported SubFilter, bridge error, ...). */
  | 'unknown'
  /** The signature itself does not match the signed bytes. */
  | 'invalid'
  /** Cryptographically fine, but the certificate chain is not trusted. */
  | 'untrusted'
  /** The signing certificate has expired. */
  | 'expired'
  /** The signing certificate was revoked. */
  | 'revoked';

/** The signing certificate, as far as the panel displays it. */
export interface PdfSignatureCertificate {
  /** Common name of the subject, shown as the signer. */
  subjectCN?: string;
  /** Common name of the issuer, shown when the certificate is not trusted. */
  issuerCN?: string;
  /** Issuer chain; the panel lists it under the signature. */
  chain?: Array<unknown>;
  [key: string]: unknown;
}

/** What pdf.js hands to `verify()` for a single signature. */
export interface PdfSignatureToVerify {
  id: string;
  /** The detached PKCS#7/CMS blob taken from the PDF. */
  pkcs7?: Uint8Array;
  /** The bytes the signature covers. */
  data?: Uint8Array;
  signatureType?: string | null;
  subFilter?: string;
  /** False when the signature covers only part of the file. */
  coversWholeDocument?: boolean;
  modificationsAfterSignature?: unknown;
  [key: string]: unknown;
}

/** What `verify()` must return. */
export interface PdfSignatureVerificationResult {
  status: PdfSignatureStatus;
  /** Machine-readable reason, shown for `untrusted` (e.g. "SUBFILTER_NOT_SUPPORTED"). */
  errorCode?: string | null;
  /** Human-readable detail, shown for `invalid`, `untrusted` and `expired`. */
  message?: string | null;
  certificate: PdfSignatureCertificate | null;
  /** True when the file changed after this signature was applied. */
  documentModifiedAfterSigning?: boolean;
  modificationsAfterSignature?: unknown;
}

/** Implement this and pass it to `[signatureVerifier]`. */
export interface PdfSignatureVerifier {
  verify(signature: PdfSignatureToVerify): Promise<PdfSignatureVerificationResult>;
  /** Optional: called when the user clicks the certificate; show your own dialog. */
  viewCertificate?(certificate: PdfSignatureCertificate): void;
}
