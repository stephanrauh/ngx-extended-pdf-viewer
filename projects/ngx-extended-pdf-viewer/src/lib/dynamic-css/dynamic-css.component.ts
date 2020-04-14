import { Component, OnInit, Renderer2, Inject, OnChanges, Input, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'pdf-dynamic-css',
  templateUrl: './dynamic-css.component.html',
  styleUrls: ['./dynamic-css.component.css']
})
export class DynamicCssComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public zoom = 1.0;

  @Input()
  public width = 100;

  public xs = 490;

  public sm = 560;

  public md = 610;

  public lg = 660;

  public xl = 740;

  public xxl = 830;

  public get style(): string {
    return `
@media all and (max-width: ${this.xl}px) {
  #toolbarViewerMiddle {
    display: table;
    margin: auto;
    left: auto;
    position: inherit;
    transform: none;
  }
}

@media all and (max-width: 840px) {
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
  #outerContainer .visibleLargeView,
  #outerContainer .visibleMediumView {
    display: none;
  }
}

@media all and (max-width: ${this.lg}px) {
  .toolbarButtonSpacer {
    width: 15px;
  }

  #outerContainer .hiddenLargeView {
    display: none;
  }
  #outerContainer .visibleLargeView {
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
  #outerContainer .visibleMediumView {
    display: inherit;
  }
}

@media all and (max-width: ${this.sm}px) {
  .hiddenSmallView,
  .hiddenSmallView * {
    display: none;
  }
  .visibleSmallView {
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

@media all and (max-width: ${this.xs}px) {
  #scaleSelectContainer {
    display: none;
  }
}

.visibleXLView,
.visibleXXLView,
.visibleTinyView {
  display: none;
}

.hiddenXLView,
.hiddenXXLView {
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
  #outerContainer .visibleXXLView {
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
  .hiddenTinyView,
  .hiddenTinyView * {
    display: none;
  }
  .visibleTinyView {
    display: inherit;
  }
}
  `;
}

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this.injectStyle();
  }

  ngOnChanges() {
    const fullWith = this.document.body.clientWidth;
    const partialViewScale = fullWith / this.width;
    const scaleFactor = partialViewScale * (this.zoom ? this.zoom : 1);

    this.xs = scaleFactor * 490;
    this.sm = scaleFactor * 560;
    this.md = scaleFactor * 610;
    this.lg = scaleFactor * 660;
    this.xl = scaleFactor * 740;
    this.xxl = scaleFactor * 830;

    const styles = this.document.getElementById('pdf-dynamic-css');
    if (styles) {
      styles.innerHTML = this.style;
    }
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-dynamic-css';
    styles.innerHTML = this.style;
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-dynamic-css') as HTMLElement;
    if (styles && styles.parentElement) {
      (styles.parentElement as any).removeChild(styles);
    }
  }
}
