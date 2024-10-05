export type Content = Markdown | PdfViewer;

export type Markdown = {
  type: 'markdown';
  src: string;
};

export type PdfViewer = {
  type: 'pdf-viewer';
  src: string;
};
