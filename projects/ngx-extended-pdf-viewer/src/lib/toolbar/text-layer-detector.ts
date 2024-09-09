import { PDFDocumentProxy, PDFPageProxy } from '../options/pdf-viewer-application';

export async function detectTextLayer(pdf: PDFDocumentProxy): Promise<boolean> {
  let textLayerFound = false;

  const pagePromises: Array<Promise<boolean>> = [];
  for (let i = 1; i <= pdf.numPages && i <= 20; i++) {
    pagePromises.push(checkPage(pdf.getPage(i)));
  }

  textLayerFound = await promiseAllWithShortCircuit(pagePromises);
  return textLayerFound;
}

async function checkPage(pagePromise: Promise<PDFPageProxy>): Promise<boolean> {
  const page = await pagePromise;
  const textContent = await page.getTextContent();
  return textContent.items.length > 0;
}

async function promiseAllWithShortCircuit(promises): Promise<boolean> {
  let resolved = false;

  return new Promise((resolve, reject) => {
    promises.forEach(async (promise, index) => {
      try {
        const result = await promise;
        if (result === true && !resolved) {
          resolved = true; // Ensure it only resolves once
          resolve(true); // Short-circuit if a promise resolves to true
        }

        // If all promises are resolved and none are true, return false
        if (index === promises.length - 1 && !resolved) {
          resolve(false);
        }
      } catch (err) {
        reject(err); // Reject if any promise throws an error
      }
    });
  });
}
