import { Pipe, PipeTransform } from '@angular/core';

export type ResponsiveVisibility = boolean | 'always-visible' | 'always-in-secondary-menu' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export class PdfBreakpoints {
  static xs = 490;

  static sm = 560;

  static md = 610;

  static lg = 660;

  static xl = 790;

  static xxl = 910;

  // stephanrauh/pdf.js#14 and stephanrauh/pdf.js#15 modified by ngx-extended-pdf-viewer
  // The default toolbar is full at 910 px. The eraser and the undo/redo
  // buttons only fit into the primary toolbar above this width.
  static xxxl = 1000;
  // stephanrauh/pdf.js#14 and stephanrauh/pdf.js#15 end of modification by ngx-extended-pdf-viewer
}

export type ResponsiveCSSClass =
  | 'hiddenXXSView'
  | 'hiddenTinyView'
  | 'hiddenSmallView'
  | 'hiddenMediumView'
  | 'hiddenLargeView'
  | 'hiddenXLView'
  | 'hiddenXXLView'
  | 'hiddenXXXLView'
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
  | 'visibleXXXLView'
  | 'invisible'
  | 'always-visible'
  | 'always-in-secondary-menu';

@Pipe({
    name: 'responsiveCSSClass',
    standalone: false
})
export class ResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveVisibility | undefined, defaultClass: ResponsiveCSSClass = 'always-visible'): ResponsiveCSSClass {
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
      case 'xxxl':
        return 'hiddenXXXLView';
    }
  }
}

@Pipe({
    name: 'invertForSecondaryToolbar',
    standalone: false
})
export class NegativeResponsiveCSSClassPipe implements PipeTransform {
  transform(visible: ResponsiveCSSClass | ResponsiveVisibility): ResponsiveCSSClassInSecondaryToolbar {
    switch (visible) {
      case undefined:
        return 'always-visible';
      case 'always-visible':
      case true:
        return 'invisible';
      case 'invisible':
      case false:
        return 'invisible';
      case 'always-in-secondary-menu':
        return 'always-in-secondary-menu';
      case 'hiddenXXSView':
      case 'xxs':
        return 'visibleXXSView';
      case 'hiddenTinyView':
      case 'xs':
        return 'visibleTinyView';
      case 'sm':
      case 'hiddenSmallView':
        return 'visibleSmallView';
      case 'md':
      case 'hiddenMediumView':
        return 'visibleMediumView';
      case 'lg':
      case 'hiddenLargeView':
        return 'visibleLargeView';
      case 'xl':
      case 'hiddenXLView':
        return 'visibleXLView';
      case 'xxl':
      case 'hiddenXXLView':
        return 'visibleXXLView';
      case 'xxxl':
      case 'hiddenXXXLView':
        return 'visibleXXXLView';
    }
  }
}
