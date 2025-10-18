import { AnnotationMode } from './editor-annotations';

const _isIE11 = typeof window === 'undefined' ? false : !!(<any>globalThis).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export const pdfjsVersion = '5.4.919';
export const pdfjsBleedingEdgeVersion = '5.4.1073';
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

export function isBleedingEdge(): boolean {
  return pdfDefaultOptions.assetsFolder?.includes('bleeding-edge');
}

declare const process: any;

function isTestEnvironment(): boolean {
  return (
    typeof process !== 'undefined' &&
    typeof (process as any).env !== 'undefined' &&
    ((process as any).env.NODE_ENV === 'test' || (process as any).env.JEST_WORKER_ID !== undefined || (process as any).env.VITEST !== undefined)
  );
}

export function getSafeCanvasSize(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined' || isTestEnvironment()) {
    return 4096;
  }
  
  // Use PDF.js defaults for maximum compatibility
  // The IOSCanvasOptimizationService handles dynamic optimization
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  
  if (isIOS || isMobile) {
    return 5242880; // PDF.js iOS/Android limit (5 megapixels)
  }
  
  return 33554432; // PDF.js desktop default (32 megapixels)
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
  enableSignatureEditor: false,
  externalLinkRel: 'noopener noreferrer nofollow',
  externalLinkTarget: 0,
  findController: undefined, // must extend PDFFindController
  historyUpdateUrl: false,
  ignoreDestinationZoom: false,
  imageResourcesPath: './images/',
  maxCanvasPixels: getSafeCanvasSize(),
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
  wasmUrl: () => `${assetsUrl(pdfDefaultOptions.assetsFolder, '/..')}/wasm/`,

  // options specific to ngx-extended-pdf-viewer (as opposed to being used by pdf.js)
  doubleTapZoomFactor: 'page-width',
  doubleTapZoomsInHandMode: true,
  doubleTapZoomsInTextSelectionMode: false,
  doubleTapResetsZoomOnSecondDoubleTap: false,
  enableScripting: false,
  enableCatalogAAJavaScript: false,
  enableOpenActionJavaScript: false,
  defaultCacheSize: 50,
  passwordPrompt: undefined,
  enableHWA: true, // enable hardware acceleration. Active since pdf.js 4.4.
  positionPopupDialogsWithJavaScript: true,
  enablePageReordering: false, // allows users to reorder pages by dragging thumbnails,
  pdfBackgroundColor: '', // background color for PDF content rendering
};
