import { Pipe, PipeTransform } from '@angular/core';

export type ResponsiveVisibility = boolean | 'always-visible' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export class PdfBreakpoints {
  static xs = 490;

  static sm = 560;

  static md = 610;

  static lg = 660;

  static xl = 740;

  static xxl = 830;
}

@Pipe({ name: 'responsiveCSSClass' })
export class ResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveVisibility | undefined, defaultClass: string): string {
    switch (visible) {
      case undefined:
        return defaultClass;
      case false:
        return 'invisible';
      case true:
        return defaultClass;
      case 'always-visible':
        return '';
      case 'xs':
        return 'hiddenTinyView';
      case 'sm':
        return 'hiddenSmallView';
      case 'md':
        return 'hiddenMediumView';
      case 'lg':
        return 'hiddenLargeView';
      case 'xl':
        return 'hiddenXLView';
      case 'xxl':
        return 'hiddenXXLView';
    }
  }
}

@Pipe({ name: 'negativeResponsiveCSSClass' })
export class NegativeResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveVisibility, defaultClass: string): string {
    switch (visible) {
      case undefined:
        return 'invisible';
      case false:
        return 'invisible';
      case true:
        return defaultClass;
      case 'always-visible':
        return 'invisible';
      case 'xs':
        return 'visibleTinyView';
      case 'sm':
        return 'visibleSmallView';
      case 'md':
        return 'visibleMediumView';
      case 'lg':
        return 'visibleLargeView';
      case 'xl':
        return 'visibleXLView';
      case 'xxl':
        return 'visibleXXLView';
    }
  }
}
