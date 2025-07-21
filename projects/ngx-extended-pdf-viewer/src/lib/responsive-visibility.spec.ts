import { 
  ResponsiveCSSClassPipe, 
  NegativeResponsiveCSSClassPipe, 
  PdfBreakpoints,
  ResponsiveVisibility,
  ResponsiveCSSClass
} from './responsive-visibility';

describe('PdfBreakpoints', () => {
  it('should define correct breakpoint values', () => {
    expect(PdfBreakpoints.xs).toBe(490);
    expect(PdfBreakpoints.sm).toBe(560);
    expect(PdfBreakpoints.md).toBe(610);
    expect(PdfBreakpoints.lg).toBe(660);
    expect(PdfBreakpoints.xl).toBe(790);
    expect(PdfBreakpoints.xxl).toBe(910);
  });

  it('should have breakpoints in ascending order', () => {
    expect(PdfBreakpoints.xs).toBeLessThan(PdfBreakpoints.sm);
    expect(PdfBreakpoints.sm).toBeLessThan(PdfBreakpoints.md);
    expect(PdfBreakpoints.md).toBeLessThan(PdfBreakpoints.lg);
    expect(PdfBreakpoints.lg).toBeLessThan(PdfBreakpoints.xl);
    expect(PdfBreakpoints.xl).toBeLessThan(PdfBreakpoints.xxl);
  });
});

describe('ResponsiveCSSClassPipe', () => {
  let pipe: ResponsiveCSSClassPipe;

  beforeEach(() => {
    pipe = new ResponsiveCSSClassPipe();
  });

  describe('transform method', () => {
    it('should return default class for undefined input', () => {
      expect(pipe.transform(undefined as any)).toBe('always-visible');
      expect(pipe.transform(undefined as any, 'hiddenSmallView')).toBe('hiddenSmallView');
    });

    it('should return invisible for false input', () => {
      expect(pipe.transform(false)).toBe('invisible');
      expect(pipe.transform(false, 'hiddenSmallView')).toBe('invisible');
    });

    it('should return default class for true input', () => {
      expect(pipe.transform(true)).toBe('always-visible');
      expect(pipe.transform(true, 'hiddenMediumView')).toBe('hiddenMediumView');
    });

    it('should return same value for special string inputs', () => {
      expect(pipe.transform('always-visible')).toBe('always-visible');
      expect(pipe.transform('always-in-secondary-menu')).toBe('always-in-secondary-menu');
    });

    it('should map breakpoint strings to corresponding CSS classes', () => {
      expect(pipe.transform('xxs')).toBe('hiddenXXSView');
      expect(pipe.transform('xs')).toBe('hiddenTinyView');
      expect(pipe.transform('sm')).toBe('hiddenSmallView');
      expect(pipe.transform('md')).toBe('hiddenMediumView');
      expect(pipe.transform('lg')).toBe('hiddenLargeView');
      expect(pipe.transform('xl')).toBe('hiddenXLView');
      expect(pipe.transform('xxl')).toBe('hiddenXXLView');
    });

    it('should handle all valid ResponsiveVisibility values', () => {
      const validInputs: ResponsiveVisibility[] = [
        true, false, 'always-visible', 'always-in-secondary-menu',
        'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
      ];

      validInputs.forEach(input => {
        expect(() => pipe.transform(input)).not.toThrow();
        expect(typeof pipe.transform(input)).toBe('string');
      });
    });
  });
});

describe('NegativeResponsiveCSSClassPipe', () => {
  let pipe: NegativeResponsiveCSSClassPipe;

  beforeEach(() => {
    pipe = new NegativeResponsiveCSSClassPipe();
  });

  describe('transform method', () => {
    it('should return always-visible for undefined input', () => {
      expect(pipe.transform(undefined as any)).toBe('always-visible');
    });

    it('should invert always-visible and true to invisible', () => {
      expect(pipe.transform('always-visible')).toBe('invisible');
      expect(pipe.transform(true)).toBe('invisible');
    });

    it('should keep invisible and false as invisible', () => {
      expect(pipe.transform('invisible')).toBe('invisible');
      expect(pipe.transform(false)).toBe('invisible');
    });

    it('should preserve always-in-secondary-menu', () => {
      expect(pipe.transform('always-in-secondary-menu')).toBe('always-in-secondary-menu');
    });

    it('should invert hidden CSS classes to visible ones', () => {
      expect(pipe.transform('hiddenXXSView')).toBe('visibleXXSView');
      expect(pipe.transform('hiddenTinyView')).toBe('visibleTinyView');
      expect(pipe.transform('hiddenSmallView')).toBe('visibleSmallView');
      expect(pipe.transform('hiddenMediumView')).toBe('visibleMediumView');
      expect(pipe.transform('hiddenLargeView')).toBe('visibleLargeView');
      expect(pipe.transform('hiddenXLView')).toBe('visibleXLView');
      expect(pipe.transform('hiddenXXLView')).toBe('visibleXXLView');
    });

    it('should invert breakpoint strings to visible CSS classes', () => {
      expect(pipe.transform('xxs')).toBe('visibleXXSView');
      expect(pipe.transform('xs')).toBe('visibleTinyView');
      expect(pipe.transform('sm')).toBe('visibleSmallView');
      expect(pipe.transform('md')).toBe('visibleMediumView');
      expect(pipe.transform('lg')).toBe('visibleLargeView');
      expect(pipe.transform('xl')).toBe('visibleXLView');
      expect(pipe.transform('xxl')).toBe('visibleXXLView');
    });

    it('should handle mixed input types correctly', () => {
      // Test with ResponsiveCSSClass inputs
      expect(pipe.transform('hiddenSmallView' as ResponsiveCSSClass)).toBe('visibleSmallView');
      
      // Test with ResponsiveVisibility inputs
      expect(pipe.transform('sm' as ResponsiveVisibility)).toBe('visibleSmallView');
      expect(pipe.transform(true as ResponsiveVisibility)).toBe('invisible');
      expect(pipe.transform(false as ResponsiveVisibility)).toBe('invisible');
    });

    it('should produce valid secondary toolbar CSS classes', () => {
      const inputs = [
        'hiddenXXSView', 'hiddenTinyView', 'hiddenSmallView', 'hiddenMediumView',
        'hiddenLargeView', 'hiddenXLView', 'hiddenXXLView', 'always-visible', 
        'invisible', 'always-in-secondary-menu'
      ];

      inputs.forEach(input => {
        const result = pipe.transform(input as any);
        expect(typeof result).toBe('string');
        expect(['visibleXXSView', 'visibleTinyView', 'visibleSmallView', 'visibleMediumView',
                'visibleLargeView', 'visibleXLView', 'visibleXXLView', 'invisible',
                'always-visible', 'always-in-secondary-menu']).toContain(result);
      });
    });
  });

  describe('integration with ResponsiveCSSClassPipe', () => {
    let responsivePipe: ResponsiveCSSClassPipe;
    let negativePipe: NegativeResponsiveCSSClassPipe;

    beforeEach(() => {
      responsivePipe = new ResponsiveCSSClassPipe();
      negativePipe = new NegativeResponsiveCSSClassPipe();
    });

    it('should properly invert output from ResponsiveCSSClassPipe', () => {
      const visibility: ResponsiveVisibility = 'sm';
      const cssClass = responsivePipe.transform(visibility);
      const invertedClass = negativePipe.transform(cssClass);
      
      expect(cssClass).toBe('hiddenSmallView');
      expect(invertedClass).toBe('visibleSmallView');
    });

    it('should handle chained transformations', () => {
      const testCases: ResponsiveVisibility[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      
      testCases.forEach(visibility => {
        const cssClass = responsivePipe.transform(visibility);
        const invertedClass = negativePipe.transform(cssClass);
        
        expect(cssClass.startsWith('hidden')).toBe(true);
        expect(invertedClass.startsWith('visible')).toBe(true);
      });
    });
  });
});