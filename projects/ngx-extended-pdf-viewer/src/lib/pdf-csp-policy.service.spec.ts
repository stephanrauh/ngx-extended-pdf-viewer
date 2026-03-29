import { PdfCspPolicyService } from './pdf-csp-policy.service';

// Note: SSR guards (typeof window === 'undefined') cannot be tested in jsdom
// because window is always defined. Those branches are covered by manual/e2e SSR testing.

describe('PdfCspPolicyService', () => {
  let service: PdfCspPolicyService;
  let originalTrustedTypes: any;

  beforeEach(() => {
    service = new PdfCspPolicyService();
    originalTrustedTypes = (globalThis as any).trustedTypes;
  });

  afterEach(() => {
    if (originalTrustedTypes === undefined) {
      delete (globalThis as any).trustedTypes;
    } else {
      (globalThis as any).trustedTypes = originalTrustedTypes;
    }
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have sanitizer undefined initially', () => {
      expect((service as any).sanitizer).toBeUndefined();
    });
  });

  describe('init method', () => {
    it('should create policy with name pdf-viewer when trustedTypes is available', () => {
      const mockPolicy = {
        createHTML: jest.fn((input: string) => input),
        createScriptURL: jest.fn((input: string) => input),
      };
      const mockCreatePolicy = jest.fn(() => mockPolicy);
      (globalThis as any).trustedTypes = { createPolicy: mockCreatePolicy };

      service.init();

      expect(mockCreatePolicy).toHaveBeenCalledWith('pdf-viewer', expect.objectContaining({
        createHTML: expect.any(Function),
        createScriptURL: expect.any(Function),
      }));
      expect((service as any).sanitizer).toBe(mockPolicy);
    });

    it('should not create policy when trustedTypes is not available', () => {
      delete (globalThis as any).trustedTypes;

      service.init();

      expect((service as any).sanitizer).toBeUndefined();
    });

    it('should be idempotent - calling init twice only creates policy once', () => {
      const mockPolicy = {
        createHTML: jest.fn((input: string) => input),
        createScriptURL: jest.fn((input: string) => input),
      };
      const mockCreatePolicy = jest.fn(() => mockPolicy);
      (globalThis as any).trustedTypes = { createPolicy: mockCreatePolicy };

      service.init();
      service.init();

      expect(mockCreatePolicy).toHaveBeenCalledTimes(1);
    });

    it('should skip initialization if sanitizer is already set', () => {
      const existingSanitizer = { createHTML: jest.fn(), createScriptURL: jest.fn() };
      (service as any).sanitizer = existingSanitizer;

      const mockCreatePolicy = jest.fn();
      (globalThis as any).trustedTypes = { createPolicy: mockCreatePolicy };

      service.init();

      expect(mockCreatePolicy).not.toHaveBeenCalled();
      expect((service as any).sanitizer).toBe(existingSanitizer);
    });
  });

  describe('init policy callbacks', () => {
    it('createHTML callback should pass through input unchanged', () => {
      let capturedCreateHTML: ((input: string) => string) | undefined;
      (globalThis as any).trustedTypes = {
        createPolicy: jest.fn((_name: string, config: any) => {
          capturedCreateHTML = config.createHTML;
          return { createHTML: config.createHTML, createScriptURL: config.createScriptURL };
        }),
      };

      service.init();

      expect(capturedCreateHTML!('hello <b>world</b>')).toBe('hello <b>world</b>');
    });

    it('createScriptURL callback should pass through input unchanged', () => {
      let capturedCreateScriptURL: ((input: string) => string) | undefined;
      (globalThis as any).trustedTypes = {
        createPolicy: jest.fn((_name: string, config: any) => {
          capturedCreateScriptURL = config.createScriptURL;
          return { createHTML: config.createHTML, createScriptURL: config.createScriptURL };
        }),
      };

      service.init();

      expect(capturedCreateScriptURL!('https://example.com/script.js')).toBe('https://example.com/script.js');
    });
  });

  describe('with trustedTypes available', () => {
    let mockPolicy: any;

    beforeEach(() => {
      mockPolicy = {
        createHTML: jest.fn((input: string) => `trusted-html-${input}`),
        createScriptURL: jest.fn((input: string) => `trusted-url-${input}`),
      };
      (globalThis as any).trustedTypes = { createPolicy: jest.fn(() => mockPolicy) };
    });

    describe('addTrustedCSS', () => {
      it('should set textContent via sanitizer.createHTML', () => {
        const el = { textContent: '' } as HTMLElement;
        service.addTrustedCSS(el, 'body { color: red; }');

        expect(mockPolicy.createHTML).toHaveBeenCalledWith('body { color: red; }');
        expect(el.textContent).toBe('trusted-html-body { color: red; }');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.addTrustedCSS({ textContent: '' } as HTMLElement, 'css');

        expect(initSpy).toHaveBeenCalled();
      });
    });

    describe('addTrustedJavaScript', () => {
      it('should set src via sanitizer.createScriptURL', () => {
        const script = { src: '' } as HTMLScriptElement;
        service.addTrustedJavaScript(script, 'https://example.com/script.js');

        expect(mockPolicy.createScriptURL).toHaveBeenCalledWith('https://example.com/script.js');
        expect(script.src).toBe('trusted-url-https://example.com/script.js');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.addTrustedJavaScript({ src: '' } as HTMLScriptElement, 'url');

        expect(initSpy).toHaveBeenCalled();
      });
    });

    describe('sanitizeHTML', () => {
      it('should return sanitized HTML via sanitizer.createHTML', () => {
        const result = service.sanitizeHTML('<div>test</div>');

        expect(mockPolicy.createHTML).toHaveBeenCalledWith('<div>test</div>');
        expect(result).toBe('trusted-html-<div>test</div>');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.sanitizeHTML('<p>test</p>');

        expect(initSpy).toHaveBeenCalled();
      });
    });

    describe('addTrustedHTML', () => {
      it('should set innerHTML via sanitizer.createHTML', () => {
        const el = { innerHTML: '' } as HTMLElement;
        service.addTrustedHTML(el, '<p>content</p>');

        expect(mockPolicy.createHTML).toHaveBeenCalledWith('<p>content</p>');
        expect(el.innerHTML).toBe('trusted-html-<p>content</p>');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.addTrustedHTML({ innerHTML: '' } as HTMLElement, '<p>x</p>');

        expect(initSpy).toHaveBeenCalled();
      });
    });

    describe('createTrustedHTML', () => {
      it('should return trusted HTML via sanitizer.createHTML', () => {
        const result = service.createTrustedHTML('<article>content</article>');

        expect(mockPolicy.createHTML).toHaveBeenCalledWith('<article>content</article>');
        expect(result).toBe('trusted-html-<article>content</article>');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.createTrustedHTML('<div>x</div>');

        expect(initSpy).toHaveBeenCalled();
      });
    });

    describe('generateTrustedURL', () => {
      it('should return trusted URL via sanitizer.createScriptURL', () => {
        const result = service.generateTrustedURL('https://cdn.example.com/lib.js');

        expect(mockPolicy.createScriptURL).toHaveBeenCalledWith('https://cdn.example.com/lib.js');
        expect(result).toBe('trusted-url-https://cdn.example.com/lib.js');
      });

      it('should call init automatically', () => {
        const initSpy = jest.spyOn(service, 'init');
        service.generateTrustedURL('url');

        expect(initSpy).toHaveBeenCalled();
      });
    });
  });

  describe('without trustedTypes available (fallback behavior)', () => {
    beforeEach(() => {
      delete (globalThis as any).trustedTypes;
    });

    it('addTrustedCSS should set textContent directly', () => {
      const el = { textContent: '' } as HTMLElement;
      service.addTrustedCSS(el, 'body { margin: 0; }');
      expect(el.textContent).toBe('body { margin: 0; }');
    });

    it('addTrustedJavaScript should set src directly', () => {
      const script = { src: '' } as HTMLScriptElement;
      service.addTrustedJavaScript(script, 'https://example.com/app.js');
      expect(script.src).toBe('https://example.com/app.js');
    });

    it('sanitizeHTML should return HTML as-is', () => {
      const result = service.sanitizeHTML('<div>plain</div>');
      expect(result).toBe('<div>plain</div>');
    });

    it('addTrustedHTML should set innerHTML directly', () => {
      const el = { innerHTML: '' } as HTMLElement;
      service.addTrustedHTML(el, '<span>direct</span>');
      expect(el.innerHTML).toBe('<span>direct</span>');
    });

    it('createTrustedHTML should return HTML as-is', () => {
      const result = service.createTrustedHTML('<footer>foot</footer>');
      expect(result).toBe('<footer>foot</footer>');
    });

    it('generateTrustedURL should return URL as-is', () => {
      const result = service.generateTrustedURL('https://example.com/file.js');
      expect(result).toBe('https://example.com/file.js');
    });
  });

  describe('policy reuse across multiple method calls', () => {
    it('should create policy only once when multiple methods are called', () => {
      const mockPolicy = {
        createHTML: jest.fn((input: string) => input),
        createScriptURL: jest.fn((input: string) => input),
      };
      const mockCreatePolicy = jest.fn(() => mockPolicy);
      (globalThis as any).trustedTypes = { createPolicy: mockCreatePolicy };

      service.sanitizeHTML('<div>1</div>');
      service.createTrustedHTML('<div>2</div>');
      service.generateTrustedURL('url1');
      service.addTrustedCSS({ textContent: '' } as HTMLElement, 'css');
      service.addTrustedJavaScript({ src: '' } as HTMLScriptElement, 'url2');
      service.addTrustedHTML({ innerHTML: '' } as HTMLElement, '<p>3</p>');

      expect(mockCreatePolicy).toHaveBeenCalledTimes(1);
    });

    it('should use the same policy for all calls', () => {
      const mockPolicy = {
        createHTML: jest.fn((input: string) => `html-${input}`),
        createScriptURL: jest.fn((input: string) => `url-${input}`),
      };
      (globalThis as any).trustedTypes = { createPolicy: jest.fn(() => mockPolicy) };

      const htmlResult = service.sanitizeHTML('<div>a</div>');
      const urlResult = service.generateTrustedURL('https://x.com/a.js');

      expect(htmlResult).toBe('html-<div>a</div>');
      expect(urlResult).toBe('url-https://x.com/a.js');
      expect(mockPolicy.createHTML).toHaveBeenCalledTimes(1);
      expect(mockPolicy.createScriptURL).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      const mockPolicy = {
        createHTML: jest.fn((input: string) => `trusted-${input}`),
        createScriptURL: jest.fn((input: string) => `trusted-${input}`),
      };
      (globalThis as any).trustedTypes = { createPolicy: jest.fn(() => mockPolicy) };
    });

    it('should handle empty strings', () => {
      const htmlResult = service.sanitizeHTML('');
      expect(htmlResult).toBe('trusted-');

      const createResult = service.createTrustedHTML('');
      expect(createResult).toBe('trusted-');

      const urlResult = service.generateTrustedURL('');
      expect(urlResult).toBe('trusted-');
    });

    it('should handle strings with special characters', () => {
      const result = service.sanitizeHTML('<script>alert("xss")</script>');
      expect(result).toBe('trusted-<script>alert("xss")</script>');
    });
  });
});
