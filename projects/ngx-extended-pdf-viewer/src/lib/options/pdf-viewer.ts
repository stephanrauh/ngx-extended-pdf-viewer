import { OptionalContentConfig } from './optional_content_config';
import { PDFPageView } from './pdf_page_view';

export enum ScrollModeType {
  vertical = 0,
  horizontal = 1,
  wrapped = 2,
  page = 3,
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
export interface IPDFRenderingQueue {
  getHighestPriority(visiblePage: Array<any>, pages: Array<any>, scrolledDown: boolean, preRenderExtra: boolean);
}

export type FreeTextEditorAnnotation = {
  annotationType: 3;
  color: Array<number>; // an array of three integer numbers
  fontSize: number;
  value: string;
  pageIndex: number;
  rect: Array<number>; // rect[1] is the y position; rect[2] is the x position
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type BezierPath = {
  bezier: Array<number>;
  points: Array<number>;
};

export type InkEditorAnnotation = {
  annotationType: 15;
  color: Array<number>; // an array of three integer numbers
  thickness: number;
  opacity: number;
  paths: Array<BezierPath>;
  pageIndex: number;
  rect: Array<number>; // [left, bottom, right, top]
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type EditorAnnotation = InkEditorAnnotation | FreeTextEditorAnnotation;

export interface IPDFViewer {
  currentPageLabel: string | undefined;
  currentPageNumber: number;
  currentScaleValue: string | number;
  pagesRotation: 0 | 90 | 180 | 270;
  removePageBorders: boolean;
  renderingQueue: IPDFRenderingQueue;
  scrollMode: ScrollModeType;
  pageViewMode: PageViewModeType;
  spreadMode: 0 | 1 | 2;
  _pages: Array<PDFPageView>;
  addPageToRenderQueue(pageIndex: number): boolean;
  _getVisiblePages(): Array<any>;
  optionalContentConfigPromise: Promise<OptionalContentConfig> | null;
  _scrollPageIntoView({ pageDiv: HTMLElement, pageSpot: any, pageNumber: number }): void;
  getSerializedAnnotations(): EditorAnnotation[] | null; // #1783 added by ngx-extended-pdf-viewer
  addEditorAnnotation(serialized: string | EditorAnnotation): void; // #1783 added by ngx-extended-pdf-viewer
  removeEditorAnnotations(filter?: (serialized: EditorAnnotation) => boolean): void; // #1783 added by ngx-extended-pdf-viewer
  getPageView(index: number): PDFPageView;
  destroyBookMode(): void;
  stopRendering(): void;
}
