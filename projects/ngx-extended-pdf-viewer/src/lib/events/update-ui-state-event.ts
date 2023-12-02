export interface UpdateUIStateEvent {
  source: any; // the widget sending the event
  widget: 'SecondaryToolbar' | 'Toolbar'; // class name of the widget sending the event
  pageNumber: number; // new page number
  pagesCount: number; // total number of pages
  pageScale?: number; // numeric scale value (1 = 100%)
  pageScaleValue?: number | string; // scale (may also be numeric, but may also be 'auto' or '100%')
}
