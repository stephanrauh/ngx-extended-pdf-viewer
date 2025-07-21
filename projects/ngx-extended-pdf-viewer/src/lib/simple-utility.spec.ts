import { ResponsiveCSSClassPipe, NegativeResponsiveCSSClassPipe, PdfBreakpoints } from './responsive-visibility';

describe('Simple Utility Tests', () => {
  
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

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

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
  });

  describe('NegativeResponsiveCSSClassPipe', () => {
    let pipe: NegativeResponsiveCSSClassPipe;

    beforeEach(() => {
      pipe = new NegativeResponsiveCSSClassPipe();
    });

    it('should create', () => {
      expect(pipe).toBeTruthy();
    });

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

    it('should invert breakpoint strings to visible CSS classes', () => {
      expect(pipe.transform('xxs')).toBe('visibleXXSView');
      expect(pipe.transform('xs')).toBe('visibleTinyView');
      expect(pipe.transform('sm')).toBe('visibleSmallView');
      expect(pipe.transform('md')).toBe('visibleMediumView');
      expect(pipe.transform('lg')).toBe('visibleLargeView');
      expect(pipe.transform('xl')).toBe('visibleXLView');
      expect(pipe.transform('xxl')).toBe('visibleXXLView');
    });
  });
});