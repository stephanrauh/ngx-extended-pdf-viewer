export interface IPDFViewerAppConfig {
  defaultUrl: string;
  filenameForDownload: string | undefined;
  sidebarViewOnLoad: 0 | 1;
  /* static */ get(name: any): any;
  /* static */ getAll(kind?: null): any;
  /* static */ set(name: any, value: any): void;
  /* static */ setAll(options: any): void;
  /* static */ remove(name: any): void;
  /**
   * @ignore
   */
  /* static */ _hasUserOptions(): boolean;
}
