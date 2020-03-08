export interface IPDFViewer {
  currentPageLabel: string | undefined;
  currentPageNumber: number;
  currentScaleValue: string | number;
  pagesRotation: 0 | 90 | 180 | 270;
  removePageBorders: boolean;
  spreadMode: 0 | 1 | 2;
}
