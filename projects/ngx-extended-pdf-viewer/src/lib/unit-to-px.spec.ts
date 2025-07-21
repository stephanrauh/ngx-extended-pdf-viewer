import { UnitToPx } from './unit-to-px';

describe('UnitToPx', () => {
  beforeEach(() => {
    // Reset the cache before each test
    (UnitToPx as any).pxPerUnitCache = {};
    // Clean up any DOM elements
    try {
      if ((UnitToPx as any).con && (UnitToPx as any).con.parentNode) {
        (UnitToPx as any).con.parentNode.removeChild((UnitToPx as any).con);
      }
    } catch (e) {
      // Ignore cleanup errors in test environment
    }
    (UnitToPx as any).con = undefined;
    (UnitToPx as any).el = undefined;
  });

  describe('toPx', () => {
    it('should convert px values correctly', () => {
      expect(UnitToPx.toPx('10px')).toBe(10);
      expect(UnitToPx.toPx('100px')).toBe(100);
      expect(UnitToPx.toPx('0px')).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(UnitToPx.toPx('10.5px')).toBe(10.5);
      expect(UnitToPx.toPx('0.25px')).toBe(0.25);
    });

    it('should handle negative values', () => {
      expect(UnitToPx.toPx('-10px')).toBe(-10);
      expect(UnitToPx.toPx('-5.5px')).toBe(-5.5);
    });

    it('should handle values with whitespace', () => {
      expect(UnitToPx.toPx('  10px  ')).toBe(10);
      expect(UnitToPx.toPx('\t5px\n')).toBe(5);
    });

    it('should handle unitless values (defaulting to 1)', () => {
      expect(UnitToPx.toPx('px')).toBe(1);
    });

    it('should convert em values to pixels', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ width: 1600, height: 0, top: 0, left: 0, bottom: 0, right: 1600, x: 0, y: 0, toJSON: () => ({}) })),
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: {
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        const result = UnitToPx.toPx('1em');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });

    it('should convert rem values to pixels', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ width: 1600, height: 0, top: 0, left: 0, bottom: 0, right: 1600, x: 0, y: 0, toJSON: () => ({}) })),
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: {
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        const result = UnitToPx.toPx('1rem');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });

    it('should convert pt values to pixels', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ width: 1333, height: 0, top: 0, left: 0, bottom: 0, right: 1333, x: 0, y: 0, toJSON: () => ({}) })), // 100pt ≈ 133.3px
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: {
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        const result = UnitToPx.toPx('12pt');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });

    it('should cache px per unit calculations', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({
          width: 1600, // 100 * 16px = 1600px for 1em
          height: 16,
          top: 0,
          left: 0,
          bottom: 16,
          right: 1600,
          x: 0,
          y: 0,
          toJSON: () => ({})
        }))
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: {
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      let createElementCallCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          createElementCallCount++;
          return createElementCallCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        // First call should trigger DOM manipulation and caching
        const result1 = UnitToPx.toPx('1em');
        expect(typeof result1).toBe('number');
        expect(result1).toBeGreaterThan(0);
        expect(result1).toBe(16); // 1600 / 100 = 16

        // Second call should use cache
        const result2 = UnitToPx.toPx('2em');
        expect(typeof result2).toBe('number');
        expect(result2).toBeGreaterThan(0);
        expect(result2).toBe(32); // 2 * 16 = 32
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });

    it('should throw TypeError for invalid length strings', () => {
      expect(() => UnitToPx.toPx('')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('invalid')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('abc')).toThrow(TypeError);
      expect(() => UnitToPx.toPx(null as any)).toThrow(TypeError);
      expect(() => UnitToPx.toPx(undefined as any)).toThrow(TypeError);
    });

    it('should handle NaN values', () => {
      expect(() => UnitToPx.toPx('NaNpx')).toThrow(TypeError);
    });
  });

  describe('server-side rendering', () => {
    let originalDocument: any;

    beforeEach(() => {
      originalDocument = (global as any).document;
    });

    afterEach(() => {
      (global as any).document = originalDocument;
    });

    it('should return dummy implementation for SSR when document is undefined', () => {
      // Store original values
      const originalCache = (UnitToPx as any).pxPerUnitCache;
      const originalCon = (UnitToPx as any).con;
      const originalEl = (UnitToPx as any).el;
      
      try {
        // Reset everything for clean SSR test
        (UnitToPx as any).pxPerUnitCache = {};
        (UnitToPx as any).con = undefined;
        (UnitToPx as any).el = undefined;
        
        // Mock the initElements method to simulate document being undefined
        const originalInitElements = (UnitToPx as any).initElements;
        (UnitToPx as any).initElements = jest.fn(); // Do nothing, simulating document undefined
        
        // This should use the dummy implementation and return the numeric value * 1
        const result = UnitToPx.toPx('16em');
        expect(result).toBe(16); // 16 * 1 (dummy implementation) = 16
        
        // Test other values
        expect(UnitToPx.toPx('2rem')).toBe(2);
        expect(UnitToPx.toPx('12pt')).toBe(12);
        
        // Verify cache was populated with 1 for SSR
        expect((UnitToPx as any).pxPerUnitCache['em']).toBe(1);
        expect((UnitToPx as any).pxPerUnitCache['rem']).toBe(1);
        expect((UnitToPx as any).pxPerUnitCache['pt']).toBe(1);
        
        // Restore initElements
        (UnitToPx as any).initElements = originalInitElements;
      } finally {
        // Restore everything
        (UnitToPx as any).pxPerUnitCache = originalCache;
        (UnitToPx as any).con = originalCon;
        (UnitToPx as any).el = originalEl;
      }
    });
  });

  describe('edge cases', () => {
    it('should handle zero values correctly', () => {
      // Zero values should return 0 regardless of unit
      expect(UnitToPx.toPx('0em')).toBe(0);
      expect(UnitToPx.toPx('0rem')).toBe(0);
      expect(UnitToPx.toPx('0pt')).toBe(0);
    });

    it('should handle very large values', () => {
      expect(UnitToPx.toPx('999999px')).toBe(999999);
    });

    it('should handle very small decimal values', () => {
      expect(UnitToPx.toPx('0.001px')).toBe(0.001);
    });

    it('should handle mixed case units', () => {
      expect(() => UnitToPx.toPx('16PX')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('1EM')).toThrow(TypeError);
    });

    it('should handle scientific notation', () => {
      expect(() => UnitToPx.toPx('1e2px')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('1.5e1px')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('2e-1px')).toThrow(TypeError);
    });
  });

  describe('additional CSS units', () => {
    const mockSetupForUnits = () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ 
          width: 1200, // Mocked width for calculations
          height: 0, top: 0, left: 0, bottom: 0, right: 1200, x: 0, y: 0, toJSON: () => ({}) 
        })),
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: { removeChild: jest.fn() }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      return { originalCreateElement, originalAppendChild };
    };

    const restoreMocks = (mocks: { originalCreateElement: any, originalAppendChild: any }) => {
      document.createElement = mocks.originalCreateElement;
      document.body.appendChild = mocks.originalAppendChild;
    };

    it('should convert pc (picas) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('1pc');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert in (inches) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('1in');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert cm (centimeters) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('1cm');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert mm (millimeters) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('10mm');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert vh (viewport height) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('10vh');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert vw (viewport width) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('10vw');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert ex (x-height) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('2ex');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert ch (character) values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('5ch');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });

    it('should convert percentage values to pixels', () => {
      const mocks = mockSetupForUnits();
      try {
        const result = UnitToPx.toPx('50%');
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      } finally {
        restoreMocks(mocks);
      }
    });
  });

  describe('complex number formats', () => {
    it('should handle numbers with leading plus sign', () => {
      expect(UnitToPx.toPx('+10px')).toBe(10);
      expect(UnitToPx.toPx('+5.5px')).toBe(5.5);
    });

    it('should handle numbers with multiple decimal points gracefully', () => {
      expect(() => UnitToPx.toPx('1.2.3px')).toThrow(TypeError);
    });

    it('should handle empty decimal values', () => {
      expect(() => UnitToPx.toPx('.px')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('px.')).toThrow(TypeError);
    });

    it('should handle numbers with trailing dots', () => {
      expect(UnitToPx.toPx('10.px')).toBe(10);
    });

    it('should handle numbers with leading dots', () => {
      expect(UnitToPx.toPx('.5px')).toBe(0.5);
    });
  });

  describe('error handling and validation', () => {
    it('should throw TypeError for unsupported units', () => {
      expect(() => UnitToPx.toPx('10xyz')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('5foo')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('1unknown')).toThrow(TypeError);
    });

    it('should throw TypeError for malformed input', () => {
      expect(() => UnitToPx.toPx('px10')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('em5')).toThrow(TypeError);
      // '10 px' with space is actually valid due to regex allowing whitespace
      expect(UnitToPx.toPx('10 px')).toBe(10);
    });

    it('should throw TypeError for non-string input', () => {
      expect(() => UnitToPx.toPx(123 as any)).toThrow(TypeError);
      expect(() => UnitToPx.toPx({} as any)).toThrow(TypeError);
      expect(() => UnitToPx.toPx([] as any)).toThrow(TypeError);
      expect(() => UnitToPx.toPx(true as any)).toThrow(TypeError);
    });

    it('should throw TypeError for Infinity values', () => {
      expect(() => UnitToPx.toPx('Infinitypx')).toThrow(TypeError);
      expect(() => UnitToPx.toPx('-Infinitypx')).toThrow(TypeError);
    });
  });

  describe('performance and caching', () => {
    beforeEach(() => {
      // Clear cache for clean tests
      (UnitToPx as any).pxPerUnitCache = {};
    });

    it('should cache results for repeated unit conversions', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ 
          width: 1600, 
          height: 0, top: 0, left: 0, bottom: 0, right: 1600, x: 0, y: 0, toJSON: () => ({}) 
        })),
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: { removeChild: jest.fn() }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        // First calls should trigger caching
        UnitToPx.toPx('1em');
        UnitToPx.toPx('2rem');
        
        // Verify cache has entries
        const cache = (UnitToPx as any).pxPerUnitCache;
        expect(cache['em']).toBeDefined();
        expect(cache['rem']).toBeDefined();
        
        // Clear the mock call history
        mockElement.getBoundingClientRect.mockClear();
        
        // Subsequent calls should use cache (no new DOM operations)
        UnitToPx.toPx('3em');
        UnitToPx.toPx('4rem');
        
        // getBoundingClientRect should not have been called again
        expect(mockElement.getBoundingClientRect).not.toHaveBeenCalled();
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });

    it('should handle rapid successive calls efficiently', () => {
      const start = performance.now();
      
      // Make multiple calls with pixel values (fastest path)
      for (let i = 0; i < 100; i++) {
        UnitToPx.toPx(`${i}px`);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // Should complete quickly (less than 10ms for 100 operations)
      expect(duration).toBeLessThan(10);
    });
  });

  describe('real-world scenarios', () => {
    it('should handle typical CSS font sizes', () => {
      expect(UnitToPx.toPx('12px')).toBe(12);
      expect(UnitToPx.toPx('14px')).toBe(14);
      expect(UnitToPx.toPx('16px')).toBe(16);
      expect(UnitToPx.toPx('18px')).toBe(18);
      expect(UnitToPx.toPx('24px')).toBe(24);
    });

    it('should handle typical margin/padding values', () => {
      expect(UnitToPx.toPx('0px')).toBe(0);
      expect(UnitToPx.toPx('4px')).toBe(4);
      expect(UnitToPx.toPx('8px')).toBe(8);
      expect(UnitToPx.toPx('16px')).toBe(16);
      expect(UnitToPx.toPx('32px')).toBe(32);
    });

    it('should handle CSS custom property-like values', () => {
      // These would typically come from CSS custom properties - need to mock DOM
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ 
          width: 24, 
          height: 0, top: 0, left: 0, bottom: 0, right: 24, x: 0, y: 0, toJSON: () => ({}) 
        }))
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn(),
        parentNode: { 
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockContainer);
      
      // Mock createElement to return container first, then element
      let callCount = 0;
      document.createElement = jest.fn(() => {
        callCount++;
        if (callCount === 1) return mockContainer; // First call for 'con'
        return mockElement; // Second call for 'el'
      });
      
      try {
        expect(UnitToPx.toPx('1.5rem')).toBeGreaterThan(0);
        expect(UnitToPx.toPx('0.875em')).toBeGreaterThan(0);
        expect(UnitToPx.toPx('1.25rem')).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        appendChildSpy.mockRestore();
      }
    });

    it('should handle responsive design values', () => {
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ 
          width: 800, // 8vw on 1000px viewport = 80px
          height: 0, top: 0, left: 0, bottom: 0, right: 800, x: 0, y: 0, toJSON: () => ({}) 
        })),
        appendChild: jest.fn()
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn().mockReturnValue(mockElement),
        parentNode: { removeChild: jest.fn() }
      } as any;
      
      const originalCreateElement = document.createElement;
      let callCount = 0;
      document.createElement = jest.fn((tagName) => {
        if (tagName === 'div') {
          callCount++;
          return callCount === 1 ? mockContainer : mockElement;
        }
        return originalCreateElement.call(document, tagName);
      });
      
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn().mockReturnValue(mockContainer);
      
      try {
        // Test viewport units
        expect(UnitToPx.toPx('8vw')).toBeGreaterThan(0);
        expect(UnitToPx.toPx('5vh')).toBeGreaterThan(0);
        
        // Test relative units
        expect(UnitToPx.toPx('1.2em')).toBeGreaterThan(0);
        expect(UnitToPx.toPx('1.5rem')).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        document.body.appendChild = originalAppendChild;
      }
    });
  });

  describe('boundary conditions', () => {
    it('should handle maximum safe integer values', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER;
      expect(UnitToPx.toPx(`${maxSafe}px`)).toBe(maxSafe);
    });

    it('should handle minimum safe integer values', () => {
      const minSafe = Number.MIN_SAFE_INTEGER;
      expect(UnitToPx.toPx(`${minSafe}px`)).toBe(minSafe);
    });

    it('should handle very small positive values', () => {
      expect(UnitToPx.toPx('0.0001px')).toBe(0.0001);
      expect(() => UnitToPx.toPx('1e-10px')).toThrow(TypeError); // Scientific notation not supported
    });

    it('should handle edge case with just unit (no number)', () => {
      expect(UnitToPx.toPx('px')).toBe(1);
      
      // Need to mock DOM for em and rem
      const mockElement = {
        style: {} as CSSStyleDeclaration,
        getBoundingClientRect: jest.fn(() => ({ 
          width: 16, 
          height: 0, top: 0, left: 0, bottom: 0, right: 16, x: 0, y: 0, toJSON: () => ({}) 
        }))
      } as any;
      
      const mockContainer = {
        style: {} as CSSStyleDeclaration,
        appendChild: jest.fn(),
        parentNode: { 
          removeChild: jest.fn()
        }
      } as any;
      
      const originalCreateElement = document.createElement;
      const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockContainer);
      
      // Mock createElement to return container first, then element
      let callCount = 0;
      document.createElement = jest.fn(() => {
        callCount++;
        if (callCount === 1) return mockContainer; // First call for 'con'
        return mockElement; // Second call for 'el'
      });
      
      try {
        expect(UnitToPx.toPx('em')).toBeGreaterThan(0);
        expect(UnitToPx.toPx('rem')).toBeGreaterThan(0);
      } finally {
        document.createElement = originalCreateElement;
        appendChildSpy.mockRestore();
      }
    });
  });
});