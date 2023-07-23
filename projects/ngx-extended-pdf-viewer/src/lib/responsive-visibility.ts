import { Pipe, PipeTransform } from '@angular/core';

export type ResponsiveVisibility = boolean | 'always-visible' | 'always-in-secondary-menu' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export class PdfBreakpoints {
  static xs = 490;

  static sm = 560;

  static md = 610;

  static lg = 660;

  static xl = 780;

  static xxl = 900;
}

export type ResponsiveCSSClass =
  | 'hiddenXXSView'
  | 'hiddenTinyView'
  | 'hiddenSmallView'
  | 'hiddenMediumView'
  | 'hiddenLargeView'
  | 'hiddenXLView'
  | 'hiddenXXLView'
  | 'invisible'
  | 'always-visible'
  | 'always-in-secondary-menu';

export type ResponsiveCSSClassInSecondaryToolbar =
  | 'visibleXXSView'
  | 'visibleTinyView'
  | 'visibleSmallView'
  | 'visibleMediumView'
  | 'visibleLargeView'
  | 'visibleXLView'
  | 'visibleXXLView'
  | 'invisible'
  | 'always-visible'
  | 'always-in-secondary-menu';

@Pipe({ name: 'responsiveCSSClass' })
export class ResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveVisibility | undefined, defaultClass: ResponsiveCSSClass): ResponsiveCSSClass {
    switch (visible) {
      case undefined:
        return defaultClass;
      case false:
        return 'invisible';
      case true:
        return defaultClass;
      case 'always-visible':
        return 'always-visible';
      case 'always-in-secondary-menu':
        return 'always-in-secondary-menu';
      case 'xxs':
        return 'hiddenXXSView';
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

@Pipe({ name: 'invertForSecondaryToolbar' })
export class NegativeResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveCSSClass): ResponsiveCSSClassInSecondaryToolbar {
    switch (visible) {
      case undefined:
        return 'always-visible';
      case 'always-visible':
        return 'invisible';
      case 'invisible':
        return 'invisible';
      case 'always-in-secondary-menu':
        return 'always-in-secondary-menu';
      case 'hiddenXXSView':
        return 'visibleXXSView';
      case 'hiddenTinyView':
        return 'visibleTinyView';
      case 'hiddenSmallView':
        return 'visibleSmallView';
      case 'hiddenMediumView':
        return 'visibleMediumView';
      case 'hiddenLargeView':
        return 'visibleLargeView';
      case 'hiddenXLView':
        return 'visibleXLView';
      case 'hiddenXXLView':
        return 'visibleXXLView';
    }
  }
}
