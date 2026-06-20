import { AnnotationMode } from './editor-annotations';

const _isIE11 = typeof window === 'undefined' ? false : !!(<any>globalThis).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export const pdfjsVersion = '6.0.1165';
export const pdfjsBleedingEdgeVersion = '6.0.1167';
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

// #3209: a relative asset URL such as "./assets/pdf.worker-x.min.mjs" is
// resolved by pdf.js (and the browser's `new Worker()`) against the current
// route or, with a `<base href>`, gets the base applied twice — producing
// mangled URLs like ".../crossdomainproxy//crossdomainproxy/../...". Resolving
// against `document.baseURI` here yields a stable absolute URL, mirroring the
// wasmUrl (#3140) fix. Absolute folders and SSR (no `document`) keep the exact
// string `assetsUrl()` already produced, so existing setups are unaffected.
export function resolveAssetUrlAgainstBaseHref(composedUrl: string): string {
  if (composedUrl.startsWith('./') && typeof document !== 'undefined') {
    return new URL(composedUrl, document.baseURI).href;
  }
  return composedUrl;
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
  enableComment: true,
  enablePermissions: false,
  docBaseUrl: '',
  enablePrintAutoRotate: true,
  enableSignatureEditor: false,
  externalLinkRel: 'noopener noreferrer nofollow',
  externalLinkTarget: 0,
  findController: undefined as any, // must extend PDFFindController
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
    return resolveAssetUrlAgainstBaseHref(`${assetsUrl(pdfDefaultOptions.assetsFolder, '/..')}/cmaps/`);
  },
  disableAutoFetch: false,
  disableFontFace: false,
  disableRange: false,
  disableStream: true,
  isOffscreenCanvasSupported: true,
  maxImageSize: -1,
  pdfBug: false,
  verbosity: 1,
  workerPort: null as any,
  assetsFolder: 'assets',
  _internalFilenameSuffix: '.min', // don't modify this - it's an internal field
  sandboxBundleSrc: function () {
    return resolveAssetUrlAgainstBaseHref(
      pdfDefaultOptions.needsES5
        ? `./pdf.sandbox-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}-es5.mjs`
        : `./pdf.sandbox-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}${pdfDefaultOptions._internalFilenameSuffix}.mjs`
    );
  },
  workerSrc: function () {
    return resolveAssetUrlAgainstBaseHref(
      pdfDefaultOptions.needsES5
        ? `${assetsUrl(pdfDefaultOptions.assetsFolder)}/pdf.worker-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}-es5.mjs`
        : `${assetsUrl(pdfDefaultOptions.assetsFolder)}/pdf.worker-${getVersionSuffix(assetsUrl(pdfDefaultOptions.assetsFolder))}${
            pdfDefaultOptions._internalFilenameSuffix
          }.mjs`
    );
  },
  standardFontDataUrl: () => resolveAssetUrlAgainstBaseHref(`${assetsUrl(pdfDefaultOptions.assetsFolder, '/..')}/standard_fonts/`),
  // #3140: wasm files live inside the assets folder (not as a sibling).
  // Resolve against document.baseURI so the path stays correct on sub-routes
  // (pdf.js's QuickJS loader resolves wasmUrl against `location.href`, which
  // otherwise turns `./assets/wasm/` into `/<route>/assets/wasm/`).
  wasmUrl: () => {
    const folder = pdfDefaultOptions.assetsFolder;
    if (folder?.includes('://')) {
      return `${folder}/wasm/`;
    }
    if (typeof document !== 'undefined') {
      return new URL(`${folder}/wasm/`, document.baseURI).href;
    }
    return `./${folder}/wasm/`;
  },

  // options specific to ngx-extended-pdf-viewer (as opposed to being used by pdf.js)
  doubleTapZoomFactor: 'page-width',
  doubleTapZoomsInHandMode: true,
  doubleTapZoomsInTextSelectionMode: false,
  doubleTapResetsZoomOnSecondDoubleTap: false,
  enableScripting: false,
  enableCatalogAAJavaScript: false,
  enableOpenActionJavaScript: false,
  defaultCacheSize: 50,
  passwordPrompt: undefined as any,
  enableHWA: true, // enable hardware acceleration. Active since pdf.js 4.4, default true since pdf.js 5.6.
  enableWebGPU: true, // enable WebGPU mesh shading for improved rendering performance
  enableNewBadge: false, // show a "New" badge on the manage button (upstream default for MOZCENTRAL only)
  imagesRightClickMinSize: -1, // minimum size (px) for right-clickable images in text layer; -1 = disabled
  positionPopupDialogsWithJavaScript: true,
  enablePageReordering: false, // allows users to reorder pages by dragging thumbnails
  enableSplitMerge: false, // allows users to copy, cut, delete, and export selected pages
  enableMerge: false, // adds an "Add file" button to the sidebar that merges another PDF/image into the current document
  useWasm: true, // set to false to disable WebAssembly for image decoding (uses *_nowasm_fallback.js instead). Required for CSPs that forbid `wasm-unsafe-eval`.
  enableAltText: false, // enables the alt-text editor for images that the user adds via the stamp/image annotation tool
  enableAutoLinking: true, // detects URLs and email addresses in the text layer and turns them into clickable links
  enableHighlightFloatingButton: false, // shows a floating "Highlight" shortcut next to selected text (experimental upstream)
  pdfBackgroundColor: '', // background color for PDF content rendering
};
