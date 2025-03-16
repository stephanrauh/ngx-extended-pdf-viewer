import { AnnotationMode } from './editor-annotations';

const _isIE11 = typeof window === 'undefined' ? false : !!(<any>globalThis).MSInputMethodContext && !!(<any>document).documentMode;
const isEdge = typeof navigator === 'undefined' || /Edge\/\d./i.test(navigator.userAgent);
const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';

export const pdfjsVersion = '4.10.706';
export const pdfjsBleedingEdgeVersion = '4.10.705';
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

export function getSafeCanvasSize(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 4096;
  }
  // Create a temporary WebGL context
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  let maxTextureSize;
  if (gl instanceof WebGLRenderingContext) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  } else {
    maxTextureSize = 4096;
  }
  // Get available device RAM (in MB)
  function getAvailableMemoryMB(): number {
    if ('deviceMemory' in navigator) {
      return (navigator.deviceMemory as number) * 1024; // Convert GB to MB
    }
    if (window.performance && 'memory' in window.performance) {
      return (window.performance.memory as any).jsHeapSizeLimit / 1024 / 1024; // Only works on Chrome, Firefox, and Edgewindow.performance.memory.jsHeapSizeLimit / 1024 / 1024; // Only works on Chrome
    }
    return 4096; // Default to 4GB if unknown
  }

  const availableMemoryMB = getAvailableMemoryMB();

  // Conservative formula: Scale by square root of available memory
  let estimatedSafeSize = Math.floor(Math.sqrt((availableMemoryMB * 1024 * 1024) / 6));

  // Apply platform-specific limits
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  const isHighEndDesktop = availableMemoryMB > 12000; // Assume high-end desktops have >12GB RAM

  if (isIOS) {
    estimatedSafeSize = Math.min(estimatedSafeSize, 4096); // iOS Safari memory limits
  } else if (isMobile) {
    estimatedSafeSize = Math.min(estimatedSafeSize, 4096); // Most mobile devices
  } else if (isHighEndDesktop) {
    estimatedSafeSize = Math.min(estimatedSafeSize, 8192); // Allow larger sizes for desktops
  } else {
    estimatedSafeSize = Math.min(estimatedSafeSize, 6000); // Mid-range desktops
  }

  // Final limit based on GPU and estimated memory safety
  const maxWidth = Math.min(maxTextureSize, estimatedSafeSize);
  return maxWidth * maxWidth;
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
