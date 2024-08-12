import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CSP_NONCE, Component, Inject, Input, OnDestroy, Optional, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NgxHasHeight } from '../ngx-has-height';
import { VerbosityLevel } from '../options/verbosity-level';
import { PdfCspPolicyService } from '../pdf-csp-policy.service';
import { PdfBreakpoints } from '../responsive-visibility';
import { UnitToPx } from '../unit-to-px';

@Component({
  selector: 'pdf-dynamic-css',
  templateUrl: './dynamic-css.component.html',
  styleUrls: ['./dynamic-css.component.css'],
})
export class DynamicCssComponent implements OnDestroy {
  @Input()
  public zoom = 1.0;

  @Input()
  public width = 3.14159265359;

  public xxs = 455;

  public xs = 490;

  public sm = 560;

  public md = 610;

  public lg = 660;

  public xl = 740;

  public xxl = 830;

  public get style(): string {
    return `
#toolbarContainer .always-in-secondary-menu {
  display: none;
}

#secondaryToolbar .always-in-secondary-menu {
  display: inline-flex;
}

#outerContainer #mainContainer .visibleXXSView,
#outerContainer #mainContainer .visibleTinyView,
#outerContainer #mainContainer .visibleSmallView,
#outerContainer #mainContainer .visibleMediumView,
#outerContainer #mainContainer .visibleLargeView,
#outerContainer #mainContainer .visibleXLView,
#outerContainer #mainContainer .visibleXXLView {
  display: none;
}

.pdf-margin-top-3px {
  margin-top: 3px;
}

.pdf-margin-top--2px {
  margin-top: -2px;
}

@media all and (max-width: ${this.xxl}) {
  #sidebarContent {
    background-color: rgba(0, 0, 0, 0.7);
  }

  html[dir='ltr'] #outerContainer.sidebarOpen #viewerContainer {
    left: 0px !important;
  }
  html[dir='rtl'] #outerContainer.sidebarOpen #viewerContainer {
    right: 0px !important;
  }

  #outerContainer .hiddenLargeView,
  #outerContainer .hiddenMediumView {
    display: inherit;
  }
}

@media all and (max-width: ${this.lg}px) {
  .toolbarButtonSpacer {
    width: 15px;
  }

  #outerContainer .hiddenLargeView {
    display: none;
  }
  #outerContainer  #mainContainer .visibleLargeView {
    display: inherit;
  }
}

@media all and (max-width: ${this.md}px) {
  .toolbarButtonSpacer {
    display: none;
  }
  #outerContainer .hiddenMediumView {
    display: none;
  }
  #outerContainer  #mainContainer .visibleMediumView {
    display: inherit;
  }
}

@media all and (max-width: ${this.sm}px) {
  #outerContainer .hiddenSmallView,
  #outerContainer .hiddenSmallView * {
    display: none;
  }
  #outerContainer  #mainContainer .visibleSmallView {
    display: inherit;
  }
  .toolbarButtonSpacer {
    width: 0;
  }
  html[dir='ltr'] .findbar {
    left: 38px;
  }
  html[dir='rtl'] .findbar {
    right: 38px;
  }
}

#outerContainer .visibleXLView,
#outerContainer .visibleXXLView,
#outerContainer .visibleTinyView {
  display: none;
}

#outerContainer .hiddenXLView,
#outerContainer .hiddenXXLView {
  display: unset;
}

@media all and (max-width: ${this.xl}px) {
  #outerContainer .hiddenXLView {
    display: none;
  }
  #outerContainer .visibleXLView {
    display: inherit;
  }
}

@media all and (max-width: ${this.xxl}px) {
  #outerContainer .hiddenXXLView {
    display: none;
  }
  #outerContainer  #mainContainer .visibleXXLView {
    display: inherit;
  }
}

@media all and (max-width: ${this.xs}px) {
  #outerContainer .hiddenTinyView,
  #outerContainer .hiddenTinyView * {
    display: none;
  }
  #outerContainer  #mainContainer .visibleTinyView {
    display: inherit;
  }
}

@media all and (max-width: ${this.xxs}px) {
  #outerContainer .hiddenXXSView,
  #outerContainer .hiddenXXSView * {
    display: none;
  }
  #outerContainer #mainContainer .visibleXXSView {
    display: inherit;
  }
}
  `;
  }

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId,
    private pdfCspPolicyService: PdfCspPolicyService,
    @Inject(CSP_NONCE) @Optional() private nonce?: string | null
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.width = document.body.clientWidth;
    }
  }

  public updateToolbarWidth() {
    const container = document.getElementById('toolbarViewer') ?? document.getElementById('outerContainer');
    if (!container) {
      return;
    }
    const toolbarWidthInPixels = container.clientWidth;

    const fullWith = this.document.body.clientWidth;
    const partialViewScale = fullWith / toolbarWidthInPixels;
    const scaleFactor = partialViewScale * (this.zoom ? this.zoom : 1);

    this.xs = scaleFactor * PdfBreakpoints.xs;
    this.sm = scaleFactor * PdfBreakpoints.sm;
    this.md = scaleFactor * PdfBreakpoints.md;
    this.lg = scaleFactor * PdfBreakpoints.lg;
    this.xl = scaleFactor * PdfBreakpoints.xl;
    this.xxl = scaleFactor * PdfBreakpoints.xxl;

    let styles = this.document.getElementById('pdf-dynamic-css') as HTMLStyleElement;
    if (!styles) {
      styles = this.document.createElement('STYLE') as HTMLStyleElement;
      styles.id = 'pdf-dynamic-css';
      this.pdfCspPolicyService.addTrustedCSS(styles, this.style);

      if (this.nonce) {
        styles.nonce = this.nonce;
      }

      this.renderer.appendChild(this.document.head, styles);
    } else {
      this.pdfCspPolicyService.addTrustedCSS(styles, this.style);
    }
  }

  public removeScrollbarInInfiniteScrollMode(
    restoreHeight: boolean,
    pageViewMode: string,
    primaryMenuVisible: boolean,
    ngxExtendedPdfViewer: NgxHasHeight,
    logLevel: VerbosityLevel
  ): void {
    if (pageViewMode === 'infinite-scroll' || restoreHeight) {
      const viewer = document.getElementById('viewer');
      const zoom = document.getElementsByClassName('zoom')[0];
      if (viewer) {
        setTimeout(() => {
          if (pageViewMode === 'infinite-scroll') {
            const height = viewer.clientHeight + 17;
            if (primaryMenuVisible) {
              ngxExtendedPdfViewer.height = height + 35 + 'px';
            } else if (height > 17) {
              ngxExtendedPdfViewer.height = height + 'px';
            } else if (ngxExtendedPdfViewer.height === undefined) {
              ngxExtendedPdfViewer.height = '100%';
            }
            if (zoom) {
              (<HTMLElement>zoom).style.height = ngxExtendedPdfViewer.height;
            }
          } else if (restoreHeight) {
            ngxExtendedPdfViewer.autoHeight = true;
            ngxExtendedPdfViewer.height = undefined;
            this.checkHeight(ngxExtendedPdfViewer, logLevel);
          }
        });
      }
    }
  }

  public checkHeight(ngxExtendedPdfViewer: NgxHasHeight, logLevel: VerbosityLevel): void {
    if (this.isHeightDefinedWithUnits(ngxExtendedPdfViewer.height)) return;
    if (this.isPrinting()) return;

    const container = this.getContainer();
    if (!container) return;

    if (this.isContainerHeightZero(container, ngxExtendedPdfViewer, logLevel)) {
      ngxExtendedPdfViewer.autoHeight = true;
    }

    if (ngxExtendedPdfViewer.autoHeight) {
      this.adjustHeight(container, ngxExtendedPdfViewer);
    }
  }

  /**
   * The height is defined with one of the units vh, vw, em, rem, etc.
   * So the height check isn't necessary.
   * @param height the height of the container
   */
  private isHeightDefinedWithUnits(height: string | undefined): boolean {
    return height ? isNaN(Number(height.replace('%', ''))) : false;
  }

  /**
   * #1702 workaround to a Firefox bug: when printing, container.clientHeight is temporarily 0,
   * causing ngx-extended-pdf-viewer to default to 100 pixels height. So it's better to do nothing.
   * @returns true if data-pdfjsprinting is set
   */
  private isPrinting(): boolean {
    return !!document.querySelector('[data-pdfjsprinting]');
  }

  private getContainer(): HTMLElement | null {
    return typeof document !== 'undefined' ? (document.getElementsByClassName('zoom')[0] as HTMLElement) : null;
  }

  private isContainerHeightZero(container: HTMLElement, ngxExtendedPdfViewer: NgxHasHeight, logLevel: VerbosityLevel): boolean {
    if (container.clientHeight === 0) {
      if (logLevel >= VerbosityLevel.WARNINGS && !ngxExtendedPdfViewer.autoHeight) {
        console.warn(
          "The height of the PDF viewer widget is zero pixels. Please check the height attribute. Is there a syntax error? Or are you using a percentage with a CSS framework that doesn't support this? The height is adjusted automatedly."
        );
      }
      return true;
    }
    return false;
  }

  private adjustHeight(container: HTMLElement, ngxExtendedPdfViewer: NgxHasHeight): void {
    const available = window.innerHeight;
    const rect = container.getBoundingClientRect();
    const top = rect.top;
    let maximumHeight = available - top;
    const padding = this.calculateBorderMargin(container);
    maximumHeight -= padding;
    ngxExtendedPdfViewer.minHeight = maximumHeight > 100 ? `${maximumHeight}px` : '100px';
    ngxExtendedPdfViewer.markForCheck();
  }

  private calculateBorderMargin(container: HTMLElement | null): number {
    if (container) {
      const computedStyle = window.getComputedStyle(container);

      const padding = UnitToPx.toPx(computedStyle.paddingBottom);
      const margin = UnitToPx.toPx(computedStyle.marginBottom);
      if (container.style.zIndex) {
        return padding + margin;
      }
      return padding + margin + this.calculateBorderMargin(container.parentElement);
    }
    return 0;
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-dynamic-css') as HTMLElement;
    if (styles?.parentElement) {
      (styles.parentElement as any).removeChild(styles);
    }
  }
}
