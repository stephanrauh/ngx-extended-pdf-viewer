import {
  assetsUrl,
  getSafeCanvasSize,
  getVersionSuffix,
  isBleedingEdge,
  pdfDefaultOptions,
  pdfjsBleedingEdgeVersion,
  pdfjsVersion,
} from './pdf-default-options';

describe('PDF Default Options Utility Functions', () => {
  describe('getVersionSuffix', () => {
    it('should return bleeding edge version for bleeding-edge folder', () => {
      expect(getVersionSuffix('assets/bleeding-edge')).toBe(pdfjsBleedingEdgeVersion);
      expect(getVersionSuffix('/path/bleeding-edge/assets')).toBe(pdfjsBleedingEdgeVersion);
      expect(getVersionSuffix('bleeding-edge')).toBe(pdfjsBleedingEdgeVersion);
    });

    it('should return regular version for regular folder', () => {
      expect(getVersionSuffix('assets')).toBe(pdfjsVersion);
      expect(getVersionSuffix('/path/to/assets')).toBe(pdfjsVersion);
      expect(getVersionSuffix('regular-folder')).toBe(pdfjsVersion);
    });

    it('should return regular version for empty or null folder', () => {
      expect(getVersionSuffix('')).toBe(pdfjsVersion);
      expect(getVersionSuffix(null as any)).toBe(pdfjsVersion);
      expect(getVersionSuffix(undefined as any)).toBe(pdfjsVersion);
    });

    it('should be case sensitive for bleeding-edge', () => {
      expect(getVersionSuffix('BLEEDING-EDGE')).toBe(pdfjsVersion);
      expect(getVersionSuffix('Bleeding-Edge')).toBe(pdfjsVersion);
      expect(getVersionSuffix('bleeding-EDGE')).toBe(pdfjsVersion);
    });

    it('should handle partial matches', () => {
      expect(getVersionSuffix('bleeding-edg')).toBe(pdfjsVersion);
      expect(getVersionSuffix('leeding-edge')).toBe(pdfjsVersion);
      expect(getVersionSuffix('assets-bleeding-edge-v2')).toBe(pdfjsBleedingEdgeVersion);
    });
  });

  describe('assetsUrl', () => {
    it('should return absolute URLs unchanged', () => {
      expect(assetsUrl('https://example.com/assets')).toBe('https://example.com/assets');
      expect(assetsUrl('http://localhost:3000/assets')).toBe('http://localhost:3000/assets');
      expect(assetsUrl('ftp://files.example.com/assets')).toBe('ftp://files.example.com/assets');
    });

    it('should prefix relative URLs with ./', () => {
      expect(assetsUrl('assets')).toBe('./assets');
      expect(assetsUrl('path/to/assets')).toBe('./path/to/assets');
      expect(assetsUrl('../assets')).toBe('./../assets');
    });

    it('should handle postfix parameter', () => {
      expect(assetsUrl('assets', '/suffix')).toBe('./assets/suffix');
      expect(assetsUrl('path/to/assets', '-v1')).toBe('./path/to/assets-v1');
      expect(assetsUrl('assets', '')).toBe('./assets');
    });

    it('should not add postfix to absolute URLs', () => {
      expect(assetsUrl('https://example.com/assets', '/suffix')).toBe('https://example.com/assets');
      expect(assetsUrl('http://localhost/assets', '-v1')).toBe('http://localhost/assets');
    });

    it('should handle edge cases', () => {
      expect(assetsUrl('')).toBe('./');
      expect(assetsUrl('', '/suffix')).toBe('.//suffix');
      expect(assetsUrl('file://')).toBe('file://');
    });

    it('should handle various protocol schemes', () => {
      expect(assetsUrl('custom://example.com/assets')).toBe('custom://example.com/assets');
      expect(assetsUrl('data://base64,content')).toBe('data://base64,content');
      expect(assetsUrl('mailto://test@example.com')).toBe('mailto://test@example.com');
    });
  });

  describe('isBleedingEdge', () => {
    let originalAssetsFolder: string;

    beforeEach(() => {
      originalAssetsFolder = pdfDefaultOptions.assetsFolder;
    });

    afterEach(() => {
      pdfDefaultOptions.assetsFolder = originalAssetsFolder;
    });

    it('should return true when assetsFolder contains bleeding-edge', () => {
      pdfDefaultOptions.assetsFolder = 'assets/bleeding-edge';
      expect(isBleedingEdge()).toBe(true);

      pdfDefaultOptions.assetsFolder = '/path/to/bleeding-edge/assets';
      expect(isBleedingEdge()).toBe(true);

      pdfDefaultOptions.assetsFolder = 'bleeding-edge';
      expect(isBleedingEdge()).toBe(true);
    });

    it('should return false when assetsFolder does not contain bleeding-edge', () => {
      pdfDefaultOptions.assetsFolder = 'assets';
      expect(isBleedingEdge()).toBe(false);

      pdfDefaultOptions.assetsFolder = '/path/to/assets';
      expect(isBleedingEdge()).toBe(false);

      pdfDefaultOptions.assetsFolder = 'regular-folder';
      expect(isBleedingEdge()).toBe(false);
    });

    it('should return false when assetsFolder is undefined or null', () => {
      (pdfDefaultOptions as any).assetsFolder = undefined;
      expect(isBleedingEdge()).toBe(undefined); // Optional chaining returns undefined, not false

      (pdfDefaultOptions as any).assetsFolder = null;
      expect(isBleedingEdge()).toBe(undefined); // Optional chaining returns undefined, not false
    });

    it('should be case sensitive', () => {
      pdfDefaultOptions.assetsFolder = 'BLEEDING-EDGE';
      expect(isBleedingEdge()).toBe(false);

      pdfDefaultOptions.assetsFolder = 'Bleeding-Edge';
      expect(isBleedingEdge()).toBe(false);
    });
  });

  describe('getSafeCanvasSize', () => {
    let originalWindow: any;
    let originalDocument: any;
    let originalProcess: any;
    let originalUserAgent: string;

    beforeEach(() => {
      originalWindow = (global as any).window;
      originalDocument = (global as any).document;
      originalProcess = (global as any).process;
      originalUserAgent = navigator.userAgent;
    });

    afterEach(() => {
      (global as any).window = originalWindow;
      (global as any).document = originalDocument;
      (global as any).process = originalProcess;
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: originalUserAgent,
      });
    });

    it('should return 4096 for server-side rendering', () => {
      (global as any).window = undefined;
      expect(getSafeCanvasSize()).toBe(4096);
    });

    it('should return 4096 when document is undefined', () => {
      (global as any).window = {};
      (global as any).document = undefined;
      expect(getSafeCanvasSize()).toBe(4096);
    });

    it('should return 4096 for test environment', () => {
      (global as any).process = { env: { NODE_ENV: 'test' } };
      expect(getSafeCanvasSize()).toBe(4096);

      (global as any).process = { env: { JEST_WORKER_ID: '1' } };
      expect(getSafeCanvasSize()).toBe(4096);

      (global as any).process = { env: { VITEST: 'true' } };
      expect(getSafeCanvasSize()).toBe(4096);
    });

    it('should return desktop default for desktop user agents', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(33554432); // 32 megapixels desktop default
    });

    it('should return mobile limit for iOS devices', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(5242880); // 5 megapixels iOS/mobile limit
    });

    it('should return mobile limit for iPad devices', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(5242880); // 5 megapixels iOS/mobile limit
    });

    it('should return mobile limit for Android devices', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Linux; Android 11; SM-G991B)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(5242880); // 5 megapixels mobile limit
    });

    it('should return desktop default for high-end desktop user agents', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(33554432); // 32 megapixels desktop default
    });

    it('should return desktop default for Linux desktop user agents', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (X11; Linux x86_64)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(33554432); // 32 megapixels desktop default
    });

    it('should return desktop default for Mac desktop user agents', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(33554432); // 32 megapixels desktop default
    });

    it('should return desktop default for IE11 user agents', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (compatible; MSIE 11.0; Windows NT 10.0)',
      });
      (global as any).process = undefined;

      const result = getSafeCanvasSize();
      expect(result).toBe(33554432); // Desktop default (no mobile UA)
    });
  });

  describe('version constants', () => {
    it('should have valid version strings', () => {
      expect(typeof pdfjsVersion).toBe('string');
      expect(pdfjsVersion).toMatch(/^\d+\.\d+\.\d+$/);

      expect(typeof pdfjsBleedingEdgeVersion).toBe('string');
      expect(pdfjsBleedingEdgeVersion).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('pdfDefaultOptions object', () => {
    it('should have expected structure', () => {
      expect(pdfDefaultOptions).toBeDefined();
      expect(typeof pdfDefaultOptions).toBe('object');
    });

    it('should have boolean properties', () => {
      expect(typeof pdfDefaultOptions.needsES5).toBe('boolean');
      expect(typeof pdfDefaultOptions.disableHistory).toBe('boolean');
      expect(typeof pdfDefaultOptions.disablePageLabels).toBe('boolean');
      expect(typeof pdfDefaultOptions.enablePermissions).toBe('boolean');
      expect(typeof pdfDefaultOptions.enablePrintAutoRotate).toBe('boolean');
      expect(typeof pdfDefaultOptions.enableSignatureEditor).toBe('boolean');
      expect(typeof pdfDefaultOptions.historyUpdateUrl).toBe('boolean');
      expect(typeof pdfDefaultOptions.ignoreDestinationZoom).toBe('boolean');
      expect(typeof pdfDefaultOptions.forcePageColors).toBe('boolean');
      expect(typeof pdfDefaultOptions.pdfBugEnabled).toBe('boolean');
      expect(typeof pdfDefaultOptions.removePageBorders).toBe('boolean');
      expect(typeof pdfDefaultOptions.enableXfa).toBe('boolean');
      expect(typeof pdfDefaultOptions.fontExtraProperties).toBe('boolean');
      expect(typeof pdfDefaultOptions.cMapPacked).toBe('boolean');
      expect(typeof pdfDefaultOptions.disableAutoFetch).toBe('boolean');
      expect(typeof pdfDefaultOptions.disableFontFace).toBe('boolean');
      expect(typeof pdfDefaultOptions.disableRange).toBe('boolean');
      expect(typeof pdfDefaultOptions.disableStream).toBe('boolean');
      expect(typeof pdfDefaultOptions.isEvalSupported).toBe('boolean');
      expect(typeof pdfDefaultOptions.isOffscreenCanvasSupported).toBe('boolean');
      expect(typeof pdfDefaultOptions.pdfBug).toBe('boolean');
    });

    it('should have numeric properties', () => {
      expect(typeof pdfDefaultOptions.annotationEditorMode).toBe('number');
      expect(typeof pdfDefaultOptions.annotationMode).toBe('number');
      expect(typeof pdfDefaultOptions.defaultZoomDelay).toBe('number');
      expect(typeof pdfDefaultOptions.cursorToolOnLoad).toBe('number');
      expect(typeof pdfDefaultOptions.externalLinkTarget).toBe('number');
      expect(typeof pdfDefaultOptions.maxCanvasPixels).toBe('number');
      expect(typeof pdfDefaultOptions.printResolution).toBe('number');
      expect(typeof pdfDefaultOptions.rangeChunkSize).toBe('number');
      expect(typeof pdfDefaultOptions.sidebarViewOnLoad).toBe('number');
      expect(typeof pdfDefaultOptions.scrollModeOnLoad).toBe('number');
      expect(typeof pdfDefaultOptions.spreadModeOnLoad).toBe('number');
      expect(typeof pdfDefaultOptions.textLayerMode).toBe('number');
      expect(typeof pdfDefaultOptions.viewOnLoad).toBe('number');
      expect(typeof pdfDefaultOptions.maxImageSize).toBe('number');
      expect(typeof pdfDefaultOptions.verbosity).toBe('number');
      expect(typeof pdfDefaultOptions.defaultCacheSize).toBe('number');
    });

    it('should have string properties', () => {
      expect(typeof pdfDefaultOptions.defaultUrl).toBe('string');
      expect(typeof pdfDefaultOptions.defaultZoomValue).toBe('string');
      expect(typeof pdfDefaultOptions.docBaseUrl).toBe('string');
      expect(typeof pdfDefaultOptions.externalLinkRel).toBe('string');
      expect(typeof pdfDefaultOptions.imageResourcesPath).toBe('string');
      expect(typeof pdfDefaultOptions.pageColorsBackground).toBe('string');
      expect(typeof pdfDefaultOptions.pageColorsForeground).toBe('string');
      expect(typeof pdfDefaultOptions.assetsFolder).toBe('string');
      expect(typeof pdfDefaultOptions._internalFilenameSuffix).toBe('string');
      expect(typeof pdfDefaultOptions.doubleTapZoomFactor).toBe('string');
    });

    it('should have function properties', () => {
      expect(typeof pdfDefaultOptions.cMapUrl).toBe('function');
      expect(typeof pdfDefaultOptions.sandboxBundleSrc).toBe('function');
      expect(typeof pdfDefaultOptions.workerSrc).toBe('function');
      expect(typeof pdfDefaultOptions.standardFontDataUrl).toBe('function');
      expect(typeof pdfDefaultOptions.wasmUrl).toBe('function');
    });

    it('should have null/undefined properties', () => {
      expect(pdfDefaultOptions.findController).toBeUndefined();
      expect(pdfDefaultOptions.workerPort).toBeNull();
      expect(pdfDefaultOptions.passwordPrompt).toBeUndefined();
    });

    it('should have reasonable default values', () => {
      expect(pdfDefaultOptions.defaultZoomDelay).toBe(400);
      expect(pdfDefaultOptions.annotationEditorMode).toBe(0);
      expect(pdfDefaultOptions.cursorToolOnLoad).toBe(0);
      expect(pdfDefaultOptions.defaultUrl).toBe('');
      expect(pdfDefaultOptions.defaultZoomValue).toBe('');
      expect(pdfDefaultOptions.externalLinkRel).toBe('noopener noreferrer nofollow');
      expect(pdfDefaultOptions.externalLinkTarget).toBe(0);
      expect(pdfDefaultOptions.imageResourcesPath).toBe('./images/');
      expect(pdfDefaultOptions.pageColorsBackground).toBe('Canvas');
      expect(pdfDefaultOptions.pageColorsForeground).toBe('CanvasText');
      expect(pdfDefaultOptions.printResolution).toBe(150);
      expect(pdfDefaultOptions.rangeChunkSize).toBe(65536);
      expect(pdfDefaultOptions.sidebarViewOnLoad).toBe(-1);
      expect(pdfDefaultOptions.scrollModeOnLoad).toBe(-1);
      expect(pdfDefaultOptions.spreadModeOnLoad).toBe(-1);
      expect(pdfDefaultOptions.textLayerMode).toBe(1);
      expect(pdfDefaultOptions.viewOnLoad).toBe(0);
      expect(pdfDefaultOptions.maxImageSize).toBe(-1);
      expect(pdfDefaultOptions.verbosity).toBe(1);
      expect(pdfDefaultOptions.assetsFolder).toBe('assets');
      expect(pdfDefaultOptions._internalFilenameSuffix).toBe('.min');
      expect(pdfDefaultOptions.defaultCacheSize).toBe(50);
    });

    it('should have ngx-extended-pdf-viewer specific properties', () => {
      expect(pdfDefaultOptions.doubleTapZoomFactor).toBe('page-width');
      expect(pdfDefaultOptions.doubleTapZoomsInHandMode).toBe(true);
      expect(pdfDefaultOptions.doubleTapZoomsInTextSelectionMode).toBe(false);
      expect(pdfDefaultOptions.doubleTapResetsZoomOnSecondDoubleTap).toBe(false);
      expect(pdfDefaultOptions.enableScripting).toBe(false);
      expect(pdfDefaultOptions.enableHWA).toBe(true);
      expect(pdfDefaultOptions.enableWebGPU).toBe(true);
      expect(pdfDefaultOptions.enableNewBadge).toBe(false);
      expect(pdfDefaultOptions.imagesRightClickMinSize).toBe(-1);
      expect(pdfDefaultOptions.positionPopupDialogsWithJavaScript).toBe(true);
      expect(pdfDefaultOptions.enablePageReordering).toBe(false);
      expect(pdfDefaultOptions.enableSplitMerge).toBe(false);
    });

    describe('function properties behavior', () => {
      it('should return correct cMapUrl', () => {
        const result = pdfDefaultOptions.cMapUrl();
        expect(result).toContain('cmaps/');
        expect(result).toContain('./assets');
      });

      it('should return correct sandboxBundleSrc', () => {
        const result = pdfDefaultOptions.sandboxBundleSrc();
        expect(result).toContain('pdf.sandbox');
        expect(result).toContain('.mjs');
      });

      it('should return correct workerSrc', () => {
        const result = pdfDefaultOptions.workerSrc();
        expect(result).toContain('pdf.worker');
        expect(result).toContain('.mjs');
        expect(result).toContain('./assets');
      });

      it('should return correct standardFontDataUrl', () => {
        const result = pdfDefaultOptions.standardFontDataUrl();
        expect(result).toContain('standard_fonts/');
        expect(result).toContain('./assets');
      });

      it('should return correct wasmUrl', () => {
        const result = pdfDefaultOptions.wasmUrl();
        expect(result).toContain('wasm/');
        expect(result).toContain('./assets');
      });

      it('should return ES5 versions when needsES5 is true', () => {
        const originalNeedsES5 = pdfDefaultOptions.needsES5;
        pdfDefaultOptions.needsES5 = true;

        const sandboxResult = pdfDefaultOptions.sandboxBundleSrc();
        const workerResult = pdfDefaultOptions.workerSrc();

        expect(sandboxResult).toContain('-es5.mjs');
        expect(workerResult).toContain('-es5.mjs');

        pdfDefaultOptions.needsES5 = originalNeedsES5;
      });

      it('should return minified versions when needsES5 is false', () => {
        const originalNeedsES5 = pdfDefaultOptions.needsES5;
        pdfDefaultOptions.needsES5 = false;

        const sandboxResult = pdfDefaultOptions.sandboxBundleSrc();
        const workerResult = pdfDefaultOptions.workerSrc();

        expect(sandboxResult).toContain('.min.mjs');
        expect(workerResult).toContain('.min.mjs');

        pdfDefaultOptions.needsES5 = originalNeedsES5;
      });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle undefined window gracefully', () => {
      const originalWindow = (global as any).window;
      (global as any).window = undefined;

      try {
        expect(() => getSafeCanvasSize()).not.toThrow();
        expect(getSafeCanvasSize()).toBe(4096);
      } finally {
        (global as any).window = originalWindow;
      }
    });

    it('should handle malformed folder paths', () => {
      expect(getVersionSuffix('\\bleeding-edge')).toBe(pdfjsBleedingEdgeVersion);
      expect(getVersionSuffix('bleeding-edge/')).toBe(pdfjsBleedingEdgeVersion);
      expect(getVersionSuffix('/bleeding-edge/')).toBe(pdfjsBleedingEdgeVersion);
    });

    it('should handle special characters in URLs', () => {
      expect(assetsUrl('assets with spaces')).toBe('./assets with spaces');
      expect(assetsUrl('assets%20encoded')).toBe('./assets%20encoded');
      expect(assetsUrl('assets?query=value')).toBe('./assets?query=value');
      expect(assetsUrl('assets#fragment')).toBe('./assets#fragment');
    });

    it('should handle malformed URLs in assetsUrl', () => {
      expect(assetsUrl('ht:/malformed')).toBe('./ht:/malformed');
      expect(assetsUrl('https:/missing-slash')).toBe('./https:/missing-slash');
      expect(assetsUrl(':///incomplete')).toBe(':///incomplete'); // Contains :// so treated as absolute URL
    });
  });
});
