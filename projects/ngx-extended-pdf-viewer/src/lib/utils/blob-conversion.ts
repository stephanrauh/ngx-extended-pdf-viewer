/**
 * Converts a Blob to a Uint8Array.
 *
 * First tries the modern `blob.arrayBuffer()` API. If that is not available
 * (older browsers), falls back to using FileReader.
 *
 * @param blob - The Blob to convert
 * @returns A Promise resolving to the Uint8Array representation of the Blob
 */
export async function convertBlobToUint8Array(blob: Blob): Promise<Uint8Array> {
  // first try the algorithm for modern browsers and node.js
  if (blob.arrayBuffer) {
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  // then try the old-fashioned way
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      } else {
        reject(new Error('Error converting Blob to Uint8Array'));
      }
    };
    reader.onerror = () => {
      reject(new Error('FileReader error'));
    };
    reader.readAsArrayBuffer(blob);
  });
}
