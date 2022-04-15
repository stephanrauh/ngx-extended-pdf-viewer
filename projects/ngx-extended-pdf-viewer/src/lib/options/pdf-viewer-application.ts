import { PasswordPrompt } from './password-prompt';
import { IEventBus } from './pdf-event-bus';
import { IPDFViewer } from './pdf-viewer';
import { IPDFViewerAppConfig } from './pdf-viewer-app-config';

export interface IWebL10n {
  get(key: string, args: any, fallbackString: string): string;
}

export interface ViewHistory {
  get(name: string, defaultValue?: string): Promise<string>;
}

export interface FindController {
  _pageMatches: Array<any>;
  _pageMatchesColor: Array<number>;
  _pageMatchesLength: Array<number>;
}

export interface IPDFViewerApplication {
  appConfig: IPDFViewerAppConfig;
  _boundEvents: any;
  enablePrint: boolean;
  eventBus: IEventBus;
  findController: FindController;
  isViewerEmbedded: boolean;
  l10n: IWebL10n;
  onError: (error: Error) => void;
  page: number;
  pagesCount: number;
  passwordPrompt: PasswordPrompt;
  pdfDocument: any;
  pdfLinkService: any /* PDFLinkService;*/;
  pdfSidebar: any;
  pdfViewer: IPDFViewer;
  printKeyDownListener: undefined | ((this: Window, ev: KeyboardEvent) => any);
  sidebarViewOnLoad: 0 | 1;
  spreadModeOnLoad: 0 | 1 | 2;
  secondaryToolbar: any;
  store: ViewHistory;
  toolbar: any;
  viewer: HTMLDivElement;

  _cleanup(): void;
  close(): void;
  open(source: string | ArrayBuffer | { range: any } | any, options?: any): Promise<any>;
  unbindEvents(): void;
  unbindWindowEvents(): void;
}
