import { AnnotationMode } from './editor-annotations';

const _isIE11 = typeof window === 'undefined' ? false : !!(<any>globalThis).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export const pdfjsVersion = '4.7.710';
export const pdfjsBleedingEdgeVersion = '4.10.681';
export function getVersionSuffix(folder: string): string {
  if (folder?.includes('bleeding-edge')) {
    return pdfjsBleedingEdgeVersion;
  }
  return pdfjsVersion;
}

export function assetsUrl(url: string, postfixIfPathIsRelativ = ''): string {
  if (url.includes('://')) {
    // the assets folder is on an absolute path (like https://example.com/assets)
    return url;
  }
  return `./${url + postfixIfPathIsRelativ}`;
}

// sonar ignore next line
export const pdfDefaultOptions = {
  needsES5: _isIE11 || isEdge || needsES5,
  annotationEditorMode: 0,
  annotationMode: AnnotationMode.ENABLE_FORMS,
  defaultZoomDelay: 400, // milliseconds
  cursorToolOnLoad: 0,
  defaultUrl: '',
  defaultZoomValue: '',
  disableHistory: false,
  disablePageLabels: false,
  enablePermissions: false,
  docBaseUrl: '',
  enablePrintAutoRotate: true,
  externalLinkRel: 'noopener noreferrer nofollow',
  externalLinkTarget: 0,
  findController: undefined, // must extend PDFFindController
  historyUpdateUrl: false,
  ignoreDestinationZoom: false,
  imageResourcesPath: './images/',
  maxCanvasPixels: -1, // ngx-extended-pdf-viewer calculates this value automatically
  forcePageColors: false,
  pageColorsBackground: 'Canvas',
  pageColorsForeground: 'CanvasText',
  pdfBugEnabled: false,
  printResolution: 150,
  rangeChunkSize: 65536,
  removePageBorders: false,
  enableXfa: true,
  fontExtraProperties: false,
  sidebarViewOnLoad: -1,
  scrollModeOnLoad: -1,
  spreadModeOnLoad: -1,
  textLayerMode: 1,
  // viewerCssTheme: 0, // not supported by ngx-extended-pdf-viewer, use [theme] instead
  viewOnLoad: 0,
  cMapPacked: true,
  cMapUrl: function () {
    return `${assetsUrl(pdfDefaultOptions.assetsFolder, '/..')}/cmaps/`;
  },
  disableAutoFetch: false,
  disableFontFace: false,
  disableRange: false,
  disableStream: true,
  isEvalSupported: true,
  isOffscreenCanvasSupported: true,
  maxImageSize: -1,
  pdfBug: false,
  verbosity: 1,
  workerPort: null,
  assetsFolder: 'assets',
  _internalFilenameSuffix: '.min', // don't modify this - it's an internal field
  sandboxBundleSrc: function () {
    return pdfDefaultOptions.needsES5
      ? `./pdf.sandbox-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}-es5.mjs`
      : `./pdf.sandbox-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}${pdfDefaultOptions._internalFilenameSuffix}.mjs`;
  },
  workerSrc: function () {
    return pdfDefaultOptions.needsES5
      ? `${assetsUrl(pdfDefaultOptions.assetsFolder)}/pdf.worker-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}-es5.mjs`
      : `${assetsUrl(pdfDefaultOptions.assetsFolder)}/pdf.worker-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}${
          pdfDefaultOptions._internalFilenameSuffix
        }.mjs`;
  },
  standardFontDataUrl: () => `${assetsUrl(pdfDefaultOptions.assetsFolder, '/..')}/standard_fonts/`,

  // options specific to ngx-extended-pdf-viewer (as opposed to being used by pdf.js)
  doubleTapZoomFactor: 'page-width',
  doubleTapZoomsInHandMode: true,
  doubleTapZoomsInTextSelectionMode: false,
  doubleTapResetsZoomOnSecondDoubleTap: false,
  enableScripting: true,
  defaultCacheSize: 50,
  passwordPrompt: undefined,
  enableHWA: true, // enable hardware acceleration. Active since pdf.js 4.4.
};
