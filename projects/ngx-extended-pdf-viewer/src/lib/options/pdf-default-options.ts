const _isIE11 = typeof window === 'undefined' ? false : !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export const pdfjsVersion = '2.13.482';
export const pdfjsBleedingEdgeVersion = '2.14.393';
export function getVersionSuffix(folder: string): string {
  if (folder && folder.includes('bleeding-edge')) {
    return pdfjsBleedingEdgeVersion;
  }
  return pdfjsVersion;
}

export let pdfDefaultOptions = {
  needsES5: _isIE11 || isEdge || needsES5,
  cursorToolOnLoad: 0,
  defaultUrl: '',
  defaultZoomValue: undefined,
  disableHistory: false,
  disablePageLabels: false,
  enablePrintAutoRotate: false,
  enableWebGL: false,
  eventBusDispatchToDOM: false,
  externalLinkRel: 'noopener noreferrer nofollow',
  externalLinkTarget: 0,
  historyUpdateUrl: false,
  ignoreDestinationZoom: false,
  imageResourcesPath: './images/',
  maxCanvasPixels: 16777216,
  pdfBugEnabled: false,
  rangeChunkSize: 65536,
  removePageBorders: false,
  renderer: 'canvas',
  renderInteractiveForms: true, // renamed - until pdf.js 2.10
  renderForms: true, // renamed - since pdf.js 2.11
  enableXfa: true,
  sidebarViewOnLoad: -1,
  scrollModeOnLoad: -1,
  spreadModeOnLoad: -1,
  textLayerMode: 2,
  useOnlyCssZoom: false,
  viewOnLoad: 0,
  cMapPacked: true,
  cMapUrl: () => `./${pdfDefaultOptions.assetsFolder}/cmaps/`,
  disableAutoFetch: false,
  disableCreateObjectURL: false,
  disableFontFace: false,
  disableRange: false,
  disableStream: false,
  isEvalSupported: true,
  maxImageSize: -1,
  pdfBug: false,
  postMessageTransfers: true,
  verbosity: 1,
  workerPort: null,
  assetsFolder: 'assets',
  sandboxBundleSrc: () =>
    pdfDefaultOptions.needsES5
      ? `./${pdfDefaultOptions.assetsFolder}/pdf.sandbox-${getVersionSuffix(pdfDefaultOptions.assetsFolder)}-es5.js`
      : `./${pdfDefaultOptions.assetsFolder}/pdf.sandbox-${getVersionSuffix(pdfDefaultOptions.assetsFolder)}.js`,
  workerSrc: () =>
    pdfDefaultOptions.needsES5
      ? `./${pdfDefaultOptions.assetsFolder}/pdf.worker-${getVersionSuffix(pdfDefaultOptions.assetsFolder)}-es5.js`
      : `./${pdfDefaultOptions.assetsFolder}/pdf.worker-${getVersionSuffix(pdfDefaultOptions.assetsFolder)}.js`,

  // options specific to ngx-extended-pdf-viewer (as opposed to being used by pdf.js)
  doubleTapZoomFactor: 'page-width',
  enableScripting: true,
  defaultCacheSize: 50,
  passwordPrompt: undefined,
};

if (typeof window !== 'undefined') {
  if ((<any>window).pdfDefaultOptions) {
    pdfDefaultOptions = (<any>window).pdfDefaultOptions;
  } else {
    (<any>window).pdfDefaultOptions = pdfDefaultOptions;
  }
}
