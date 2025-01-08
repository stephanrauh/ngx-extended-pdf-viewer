import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild, effect } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonService } from './pdf-shy-button-service';

@Component({
  selector: 'pdf-shy-button',
  styleUrls: ['./pdf-shy-button.component.scss'],
  templateUrl: './pdf-shy-button.component.html',
})
export class PdfShyButtonComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  @Input()
  public primaryToolbarId: string;

  @Input()
  public secondaryMenuId: string;

  @Input()
  public cssClass: ResponsiveCSSClass = 'invisible';

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
  public action: ((htmlEvent?: Event, isSecondaryMenue?: boolean) => void) | undefined = undefined;

  @Input()
  public closeOnClick: boolean = true;

  @Input()
  public onlySecondaryMenu: boolean = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public renderContent = false;

  @ViewChild('buttonRef', { static: false }) buttonRef: ElementRef;

  @ContentChild('nestedContent', { static: false }) nestedContent: ElementRef | null = null;

  private _imageHtml: string | undefined;

  public get imageHtml(): string | SafeHtml | undefined {
    if (this._imageHtml) {
      // allow non-literal svg tags (sanitized in the setter)
      return this.sanitizer.bypassSecurityTrustHtml(this._imageHtml); // NOSONAR
    }
    return undefined;
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
    const legal = tags.every((tag) => tag.startsWith('svg') || tag.startsWith('/') || svgTags.includes(tag.split(/\s|>/)[0]));
    if (!legal) {
      throw new Error('Illegal image for PDFShyButton. Only SVG images are allowed. Please use only the tags <svg> and <path>. ' + value);
    }
    this._imageHtml = this.pdfCspPolicyService.sanitizeHTML(value);
  }

  constructor(
    private pdfShyButtonServiceService: PdfShyButtonService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    notificationService: PDFNotificationService,
    private pdfCspPolicyService: PdfCspPolicyService,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public ngAfterViewInit(): void {
    this.updateButtonImage();
  }

  public ngOnInit(): void {
    this.pdfShyButtonServiceService.add(this);
  }

  public ngOnChanges(changes: any): void {
    this.pdfShyButtonServiceService.update(this);
  }

  public onClick(htmlEvent: Event): void {
    if (htmlEvent instanceof KeyboardEvent && htmlEvent.key !== 'Enter' && htmlEvent.key !== ' ') {
      return;
    }

    if (this.action) {
      this.action(htmlEvent, false);
      htmlEvent.preventDefault();
    } else if (this.eventBusName) {
      this.PDFViewerApplication?.eventBus.dispatch(this.eventBusName);
      htmlEvent.preventDefault();
    }
  }

  public updateButtonImage() {
    if (this.buttonRef) {
      const el = this.buttonRef.nativeElement;
      if (this._imageHtml) {
        const temp = this.renderer.createElement('div');
        this.pdfCspPolicyService.addTrustedHTML(temp, this._imageHtml);
        const image = temp.children[0];
        if (!el.innerHTML.includes(image.innerHTML)) {
          // if using SSR, the HTML code may already be there
          this.renderer.appendChild(el, image);
        }
      } else {
        const childNodes = el.childNodes;
        for (let child of childNodes) {
          this.renderer.removeChild(el, child);
        }
      }
    }
  }

  ngAfterContentInit() {
    if (this.primaryToolbarId === 'nestedComponent') {
      this.renderContent = !!this.nestedContent;
      console.log('renderContent', this.renderContent);
    }
  }
}
