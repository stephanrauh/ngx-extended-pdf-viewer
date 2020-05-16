import { IPDFViewerApplicationOptions } from './pdf-viewer-application-options';
import { IPDFViewerAppConfig } from './pdf-viewer-app-config';
import { IPDFViewer } from './pdf-viewer';
import { IEventBus } from './pdf-event-bus';

export interface IPDFViewerApplication {
  appConfig: IPDFViewerAppConfig;
  _boundEvents: any;
  enablePrint: boolean;
  eventBus: IEventBus;
  isViewerEmbedded: boolean;
  onError: (error: Error) => void;
  page: number;
  pagesCount: number;
  pdfDocument: any;
  pdfLinkService: any;
  pdfSidebar: any;
  pdfViewer: IPDFViewer;
  printKeyDownListener: undefined | ((this: Window, ev: KeyboardEvent) => any);
  sidebarViewOnLoad: 0 | 1;
  spreadModeOnLoad: 0 | 1 | 2;
  secondaryToolbar: any;
  toolbar: any;
  viewer: HTMLDivElement;

  cleanup(): void;
  close(): void;
  open(source: string | any, options?: any): Promise<any>;
  unbindEvents(): void;
  unbindWindowEvents(): void;
}

