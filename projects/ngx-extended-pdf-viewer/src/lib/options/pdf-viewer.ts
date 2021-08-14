export enum ScrollModeType {
  vertical = 0,
  horizontal = 1,
  wrapped = 2
}

export enum SpreadModeType {
  UNKNOWN = -1,
  NONE = 0, // Default value.
  ODD = 1,
  EVEN = 2,
}

export type PageViewModeType = 'single' | 'book' | 'multiple' | 'infinite-scroll';

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
  _pages: Array<any>;
}
