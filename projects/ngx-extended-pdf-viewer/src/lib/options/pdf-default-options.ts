const _isIE11 = typeof window === 'undefined' ? false : !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export let pdfjsVersion = '2.9.149';
export let pdfjsBleedingEdgeVersion = '2.10.150';

export function getVersionSuffix(folder: string): string {
  if (folder && folder.includes('bleeding-edge')) {
    return pdfjsBleedingEdgeVersion;
  }
  return pdfjsVersion;
}

export let pdfDefaultOptions = {
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
  imageResourcesPath: './images/',
  maxCanvasPixels: 16777216,
  pdfBugEnabled: false,
  removePageBorders: false,
  renderer: 'canvas',
  renderInteractiveForms: true,
  sidebarViewOnLoad: -1,
  scrollModeOnLoad: -1,
  spreadModeOnLoad: -1,
  textLayerMode: 2,
  useOnlyCssZoom: false,
  viewOnLoad: 0,
  cMapPacked: true,
  cMapUrl: () => './' + pdfDefaultOptions.assetsFolder + '/cmaps/',
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
  _isIE11 || isEdge || needsES5
    ? './' + pdfDefaultOptions.assetsFolder + '/pdf.sandbox-' + getVersionSuffix(pdfDefaultOptions.assetsFolder) + '-es5.js'
    : './' + pdfDefaultOptions.assetsFolder + '/pdf.sandbox-' + getVersionSuffix(pdfDefaultOptions.assetsFolder) + '.js',
  workerSrc: () =>
    _isIE11 || isEdge || needsES5
      ? './' + pdfDefaultOptions.assetsFolder + '/pdf.worker-' + getVersionSuffix(pdfDefaultOptions.assetsFolder) + '-es5.js'
      : './' + pdfDefaultOptions.assetsFolder + '/pdf.worker-' + getVersionSuffix(pdfDefaultOptions.assetsFolder) + '.js',

  // options specific to ngx-extended-pdf-viewer (as opposed to being used by pdf.js)
  doubleTapZoomFactor: 'page-width'
};

if (typeof window !== 'undefined') {
  if ((<any>window).pdfDefaultOptions) {
    pdfDefaultOptions = (<any>window).pdfDefaultOptions;
  } else {
    (<any>window).pdfDefaultOptions = pdfDefaultOptions;
  }
}
