import { ResponsiveCSSClassPipe, NegativeResponsiveCSSClassPipe, ResponsiveVisibility, ResponsiveCSSClass } from './responsive-visibility';

describe('ResponsiveCSSClassPipe', () => {
  let pipe: ResponsiveCSSClassPipe;

  beforeEach(() => {
    pipe = new ResponsiveCSSClassPipe();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('transform with default class', () => {
    it('should return default class for undefined input', () => {
      expect(pipe.transform(undefined)).toBe('always-visible');
    });

    it('should return custom default class for undefined input', () => {
      expect(pipe.transform(undefined, 'hiddenMediumView')).toBe('hiddenMediumView');
    });

    it('should return default class for true input', () => {
      expect(pipe.transform(true)).toBe('always-visible');
    });

    it('should return custom default class for true input', () => {
      expect(pipe.transform(true, 'hiddenLargeView')).toBe('hiddenLargeView');
    });
  });

  describe('transform boolean values', () => {
    it('should return invisible for false', () => {
      expect(pipe.transform(false)).toBe('invisible');
    });

    it('should return invisible for false regardless of default class', () => {
      expect(pipe.transform(false, 'hiddenSmallView')).toBe('invisible');
    });
  });

  describe('transform string values', () => {
    it('should return always-visible for "always-visible"', () => {
      expect(pipe.transform('always-visible')).toBe('always-visible');
    });

    it('should return always-in-secondary-menu for "always-in-secondary-menu"', () => {
      expect(pipe.transform('always-in-secondary-menu')).toBe('always-in-secondary-menu');
    });
  });

  describe('transform breakpoint values', () => {
    it('should return hiddenXXSView for "xxs"', () => {
      expect(pipe.transform('xxs')).toBe('hiddenXXSView');
    });

    it('should return hiddenTinyView for "xs"', () => {
      expect(pipe.transform('xs')).toBe('hiddenTinyView');
    });

    it('should return hiddenSmallView for "sm"', () => {
      expect(pipe.transform('sm')).toBe('hiddenSmallView');
    });

    it('should return hiddenMediumView for "md"', () => {
      expect(pipe.transform('md')).toBe('hiddenMediumView');
    });

    it('should return hiddenLargeView for "lg"', () => {
      expect(pipe.transform('lg')).toBe('hiddenLargeView');
    });

    it('should return hiddenXLView for "xl"', () => {
      expect(pipe.transform('xl')).toBe('hiddenXLView');
    });

    it('should return hiddenXXLView for "xxl"', () => {
      expect(pipe.transform('xxl')).toBe('hiddenXXLView');
    });
  });

  describe('comprehensive transform scenarios', () => {
    it('should handle all breakpoint values with custom default', () => {
      const customDefault: ResponsiveCSSClass = 'hiddenSmallView';
      
      expect(pipe.transform('xxs', customDefault)).toBe('hiddenXXSView');
      expect(pipe.transform('xs', customDefault)).toBe('hiddenTinyView');
      expect(pipe.transform('sm', customDefault)).toBe('hiddenSmallView');
      expect(pipe.transform('md', customDefault)).toBe('hiddenMediumView');
      expect(pipe.transform('lg', customDefault)).toBe('hiddenLargeView');
      expect(pipe.transform('xl', customDefault)).toBe('hiddenXLView');
      expect(pipe.transform('xxl', customDefault)).toBe('hiddenXXLView');
    });

    it('should consistently return the same output for same input', () => {
      const testValues: (ResponsiveVisibility | undefined)[] = [
        undefined, true, false, 'always-visible', 'always-in-secondary-menu',
        'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
      ];

      testValues.forEach(value => {
        const result1 = pipe.transform(value);
        const result2 = pipe.transform(value);
        expect(result1).toBe(result2);
      });
    });
  });
});

describe('NegativeResponsiveCSSClassPipe', () => {
  let pipe: NegativeResponsiveCSSClassPipe;

  beforeEach(() => {
    pipe = new NegativeResponsiveCSSClassPipe();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('transform basic values', () => {
    it('should return always-visible for undefined', () => {
      expect(pipe.transform(undefined as any)).toBe('always-visible');
    });

    it('should return invisible for always-visible', () => {
      expect(pipe.transform('always-visible')).toBe('invisible');
    });

    it('should return invisible for true', () => {
      expect(pipe.transform(true)).toBe('invisible');
    });

    it('should return invisible for invisible', () => {
      expect(pipe.transform('invisible')).toBe('invisible');
    });

    it('should return invisible for false', () => {
      expect(pipe.transform(false)).toBe('invisible');
    });

    it('should return always-in-secondary-menu for always-in-secondary-menu', () => {
      expect(pipe.transform('always-in-secondary-menu')).toBe('always-in-secondary-menu');
    });
  });

  describe('transform hidden CSS classes to visible', () => {
    it('should transform hiddenXXSView to visibleXXSView', () => {
      expect(pipe.transform('hiddenXXSView')).toBe('visibleXXSView');
    });

    it('should transform hiddenTinyView to visibleTinyView', () => {
      expect(pipe.transform('hiddenTinyView')).toBe('visibleTinyView');
    });

    it('should transform hiddenSmallView to visibleSmallView', () => {
      expect(pipe.transform('hiddenSmallView')).toBe('visibleSmallView');
    });

    it('should transform hiddenMediumView to visibleMediumView', () => {
      expect(pipe.transform('hiddenMediumView')).toBe('visibleMediumView');
    });

    it('should transform hiddenLargeView to visibleLargeView', () => {
      expect(pipe.transform('hiddenLargeView')).toBe('visibleLargeView');
    });

    it('should transform hiddenXLView to visibleXLView', () => {
      expect(pipe.transform('hiddenXLView')).toBe('visibleXLView');
    });

    it('should transform hiddenXXLView to visibleXXLView', () => {
      expect(pipe.transform('hiddenXXLView')).toBe('visibleXXLView');
    });
  });

  describe('transform responsive visibility values to visible', () => {
    it('should transform xxs to visibleXXSView', () => {
      expect(pipe.transform('xxs')).toBe('visibleXXSView');
    });

    it('should transform xs to visibleTinyView', () => {
      expect(pipe.transform('xs')).toBe('visibleTinyView');
    });

    it('should transform sm to visibleSmallView', () => {
      expect(pipe.transform('sm')).toBe('visibleSmallView');
    });

    it('should transform md to visibleMediumView', () => {
      expect(pipe.transform('md')).toBe('visibleMediumView');
    });

    it('should transform lg to visibleLargeView', () => {
      expect(pipe.transform('lg')).toBe('visibleLargeView');
    });

    it('should transform xl to visibleXLView', () => {
      expect(pipe.transform('xl')).toBe('visibleXLView');
    });

    it('should transform xxl to visibleXXLView', () => {
      expect(pipe.transform('xxl')).toBe('visibleXXLView');
    });
  });

  describe('comprehensive inversion behavior', () => {
    it('should properly invert all breakpoint values', () => {
      const breakpointMapping = [
        { input: 'xxs', expected: 'visibleXXSView' },
        { input: 'hiddenXXSView', expected: 'visibleXXSView' },
        { input: 'xs', expected: 'visibleTinyView' },
        { input: 'hiddenTinyView', expected: 'visibleTinyView' },
        { input: 'sm', expected: 'visibleSmallView' },
        { input: 'hiddenSmallView', expected: 'visibleSmallView' },
        { input: 'md', expected: 'visibleMediumView' },
        { input: 'hiddenMediumView', expected: 'visibleMediumView' },
        { input: 'lg', expected: 'visibleLargeView' },
        { input: 'hiddenLargeView', expected: 'visibleLargeView' },
        { input: 'xl', expected: 'visibleXLView' },
        { input: 'hiddenXLView', expected: 'visibleXLView' },
        { input: 'xxl', expected: 'visibleXXLView' },
        { input: 'hiddenXXLView', expected: 'visibleXXLView' }
      ];

      breakpointMapping.forEach(({ input, expected }) => {
        expect(pipe.transform(input as any)).toBe(expected);
      });
    });

    it('should consistently return the same output for same input', () => {
      const testValues = [
        undefined, 'always-visible', true, 'invisible', false, 'always-in-secondary-menu',
        'hiddenXXSView', 'xxs', 'hiddenTinyView', 'xs', 'hiddenSmallView', 'sm',
        'hiddenMediumView', 'md', 'hiddenLargeView', 'lg', 'hiddenXLView', 'xl',
        'hiddenXXLView', 'xxl'
      ];

      testValues.forEach(value => {
        const result1 = pipe.transform(value as any);
        const result2 = pipe.transform(value as any);
        expect(result1).toBe(result2);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle mixed case scenarios for visibility logic', () => {
      // Test that visible/invisible logic works correctly
      expect(pipe.transform('always-visible')).toBe('invisible');
      expect(pipe.transform('invisible')).toBe('invisible');
      expect(pipe.transform(true)).toBe('invisible');
      expect(pipe.transform(false)).toBe('invisible');
    });

    it('should maintain special secondary menu behavior', () => {
      expect(pipe.transform('always-in-secondary-menu')).toBe('always-in-secondary-menu');
    });
  });
});

describe('Pipe Integration', () => {
  let responsivePipe: ResponsiveCSSClassPipe;
  let negativePipe: NegativeResponsiveCSSClassPipe;

  beforeEach(() => {
    responsivePipe = new ResponsiveCSSClassPipe();
    negativePipe = new NegativeResponsiveCSSClassPipe();
  });

  describe('pipe composition behavior', () => {
    it('should demonstrate inversion relationship between pipes', () => {
      // Test that the negative pipe inverts the responsive pipe behavior
      const responsiveValue: ResponsiveVisibility = 'md';
      
      const primaryResult = responsivePipe.transform(responsiveValue);
      expect(primaryResult).toBe('hiddenMediumView');
      
      const invertedResult = negativePipe.transform(responsiveValue);
      expect(invertedResult).toBe('visibleMediumView');
    });

    it('should handle complex pipeline scenarios', () => {
      const testScenarios = [
        { 
          input: 'lg' as ResponsiveVisibility, 
          primaryExpected: 'hiddenLargeView',
          invertedExpected: 'visibleLargeView'
        },
        { 
          input: true as ResponsiveVisibility, 
          primaryExpected: 'always-visible',
          invertedExpected: 'invisible'
        },
        { 
          input: false as ResponsiveVisibility, 
          primaryExpected: 'invisible',
          invertedExpected: 'invisible'
        }
      ];

      testScenarios.forEach(({ input, primaryExpected, invertedExpected }) => {
        expect(responsivePipe.transform(input)).toBe(primaryExpected);
        expect(negativePipe.transform(input)).toBe(invertedExpected);
      });
    });
  });
});