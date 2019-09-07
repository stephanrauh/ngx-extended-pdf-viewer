export interface PagesRotationEvent {
  source: any; // Toolbar
  pagesRotation: 0 | 90 | 180 | 270;
  pageNumber: number;
}
