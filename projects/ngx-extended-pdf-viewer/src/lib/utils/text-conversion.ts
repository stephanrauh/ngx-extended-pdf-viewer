/**
 * Represents a text item from PDF.js text content extraction.
 */
export interface TextInfoItem {
  str: string;
  hasEOL?: boolean;
  type?: string;
}

/**
 * Converts an array of PDF.js text content items into a plain text string.
 *
 * Items with a `type` property (TextMarkedContent) are filtered out.
 * Items with `hasEOL` get a newline appended after their string content.
 *
 * @param textInfoItems - Array of text items from PDF.js getTextContent()
 * @returns The concatenated plain text
 */
export function convertTextInfoToText(textInfoItems: Array<TextInfoItem>): string {
  if (!textInfoItems) {
    return '';
  }
  return textInfoItems
    .filter((info) => !info.type)
    .map((info) => {
      return info.hasEOL ? info.str + '\n' : info.str;
    })
    .join('');
}
