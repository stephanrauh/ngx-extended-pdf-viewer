import { PdfSidebarView } from './pdf-sidebar-views';

export interface IPDFViewerAppConfig {
  defaultUrl: string;
  filenameForDownload: string | undefined;
  /** the element containing the viewer (inside <ngx-extended-pdf-viewer>) */
  appContainer?: HTMLElement;
  sidebarViewOnLoad: PdfSidebarView;
  /* static */ get(name: any): any;
  /* static */ getAll(kind?: null): any;
  /* static */ set(name: any, value: any): void;
  /* static */ setAll(options: any): void;
  /* static */ remove(name: any): void;
  /**
   * @ignore
   */
  /* static */ _hasUserOptions(): boolean;
  openFileInput?: HTMLInputElement; // since pdf.js 2.14
}
