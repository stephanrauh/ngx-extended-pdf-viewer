/**
 * This class manages the interaction of extracting the text content of the page
 * and passing it back to the external service.
 */
export class PdfTextExtractor {
    constructor(externalServices: any);
    /**
     * The PDF viewer is required to get the page text.
     *
     * @param {PDFViewer | null}
     */
    setViewer(pdfViewer: any): void;
    /**
     * Builds up all of the text from a PDF.
     *
     * @param {number} requestId
     */
    extractTextContent(requestId: number): Promise<void>;
    #private;
}
