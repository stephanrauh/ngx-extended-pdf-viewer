export interface IPDFViewerApplicationOptions {
  get(name: string): any;
  getAll(kind: string | null): any;
  set(name: string, value: any): void;
  remove(name: string): void;
}

