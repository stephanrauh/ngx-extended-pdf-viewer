import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { PdfBreakpoints } from '../responsive-visibility';
import { addTrustedHTML } from '../theme/sanitized-css-injector';

@Component({
  selector: 'pdf-dynamic-css',
  templateUrl: './dynamic-css.component.html',
  styleUrls: ['./dynamic-css.component.css'],
})
export class DynamicCssComponent implements OnInit, OnChanges, OnDestroy {
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

@media all and (max-width: ${this.xl}px) {
  #toolbarViewerMiddle {
    display: table;
    margin: auto;
    left: auto;
    position: inherit;
    transform: none;
  }
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

@media all and (max-width: ${this.sm}px) {
  #scaleSelectContainer {
    display: none;
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

  #toolbarViewerMiddle {
    -webkit-transform: translateX(-36%);
    transform: translateX(-36%);
    display: unset;
    margin: unset;
    left: 50%;
    position: absolute;
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

@media all and (max-width: ${this.md}px) {
  #toolbarViewerMiddle {
    -webkit-transform: translateX(-26%);
    transform: translateX(-26%);
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

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(this.platformId)) {
      this.width = document.body.clientWidth;
    }
  }

  public ngOnInit() {
    this.injectStyle();
  }

  public ngOnChanges() {
    const fullWith = this.document.body.clientWidth;
    const partialViewScale = fullWith / this.width;
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
      addTrustedHTML(styles, this.style);

      this.renderer.appendChild(this.document.head, styles);
    }
    addTrustedHTML(styles, this.style);
  }

  private injectStyle() {
    if (this.width === 3.14159265359) {
      setTimeout(() => this.ngOnChanges(), 1);
    }
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-dynamic-css') as HTMLElement;
    if (styles?.parentElement) {
      (styles.parentElement as any).removeChild(styles);
    }
  }
}
