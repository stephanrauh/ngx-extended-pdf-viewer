export interface IDownloadManager {
  /**
   * @param {Uint8Array} data
   * @param {string} filename
   * @param {string} [contentType]
   */
  downloadData(data: Uint8Array, filename: string, contentType?: string): void;
  /**
   * @param {Uint8Array} data
   * @param {string} filename
   * @param {string | null} [dest]
   * @returns {boolean} Indicating if the data was opened.
   */
  openOrDownloadData(data: Uint8Array, filename: string, dest?: string | null): boolean;
  /**
   * @param {Uint8Array} data
   * @param {string} url
   * @param {string} filename
   */
  download(data: Uint8Array, url: string, filename: string): void;
}
