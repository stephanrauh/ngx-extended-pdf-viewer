export enum ScrollModeType {
  vertical = 0,
  horizontal = 1,
  wrapped = 2
}

export interface ScrollModeChangedEvent {
  mode: ScrollModeType;
}

export interface IPDFViewer {
  currentPageLabel: string | undefined;
  currentPageNumber: number;
  currentScaleValue: string | number;
  pagesRotation: 0 | 90 | 180 | 270;
  removePageBorders: boolean;
  scrollMode: ScrollModeType;
  spreadMode: 0 | 1 | 2;
}
