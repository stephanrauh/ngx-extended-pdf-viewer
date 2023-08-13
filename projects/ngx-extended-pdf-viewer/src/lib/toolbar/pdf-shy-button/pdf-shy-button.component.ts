import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonService } from './pdf-shy-button-service';

@Component({
  selector: 'pdf-shy-button',
  templateUrl: './pdf-shy-button.component.html',
})
export class PdfShyButtonComponent implements OnInit, OnChanges {
  @Input()
  public primaryToolbarId: string;

  @Input()
  public secondaryMenuId: string;

  @Input()
  public cssClass: ResponsiveCSSClass;

  @Input()
  public eventBusName: string | undefined = undefined;

  @Input()
  public l10nId: string;

  @Input()
  public l10nLabel: string;

  @Input()
  public title: string;

  @Input()
  public toggled: boolean;

  @Input()
  public disabled: boolean;

  @Input()
  public order: number;

  @Input()
  public action: (() => void) | undefined = undefined;

  @Input()
  public closeOnClick: boolean = true;

  @Input()
  public onlySecondaryMenu: boolean = false;

  private _imageHtml: SafeHtml;

  public get imageHtml(): SafeHtml {
    return this._imageHtml;
  }

  @Input()
  public set image(value: string) {
    const svgTags = [
      // 'a' is not allowed!
      'animate',
      'animateMotion',
      'animateTransform',
      'audio',
      'canvas',
      'circle',
      'clipPath',
      'defs',
      'desc',
      'discard',
      'ellipse',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feDropShadow',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'filter',
      'foreignObject',
      'g',
      'iframe',
      'image',
      'line',
      'linearGradient',
      'marker',
      'mask',
      'metadata',
      'mpath',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'radialGradient',
      'rect',
      'script',
      'set',
      'stop',
      'style',
      'svg',
      'switch',
      'symbol',
      'text',
      'textPath',
      'title',
      'tspan',
      'unknown',
      'use',
      'video',
      'view',
    ];

    // only <svg> and SVG tags are allowed
    const tags = value.split('<').filter((tag) => tag.length > 0);
    const legal = tags.every((tag) => tag.startsWith('svg') || tag.startsWith('/') || svgTags.includes(tag.split(/\s|\>/)[0]));
    if (!legal) {
      throw new Error('Illegal image for PDFShyButton. Only SVG images are allowed. Please use only the tags <svg> and <path>. ' + value);
    }
    this._imageHtml = this.sanitizeHtml(value);
  }

  constructor(private pdfShyButtonServiceService: PdfShyButtonService, private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.pdfShyButtonServiceService.add(this);
  }

  public ngOnChanges(changes: any): void {
    this.pdfShyButtonServiceService.update(this);
  }

  private sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html); // NOSONAR
  }

  public onClick(event: Event): void {
    if (this.action) {
      this.action();
      event.preventDefault();
    } else if (this.eventBusName) {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      PDFViewerApplication.eventBus.dispatch(this.eventBusName);
      event.preventDefault();
    }
  }
}
