import { AfterContentInit, AfterViewInit, Component, computed, contentChild, effect, ElementRef, input, OnInit, Renderer2, viewChild } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonService } from './pdf-shy-button-service';

@Component({
    selector: 'pdf-shy-button',
    styleUrls: ['./pdf-shy-button.component.scss'],
    templateUrl: './pdf-shy-button.component.html',
    standalone: false
})
export class PdfShyButtonComponent implements OnInit, AfterViewInit, AfterContentInit {
  public primaryToolbarId = input.required<string>();

  public secondaryMenuId = input<string>('');

  public cssClass = input<ResponsiveCSSClass>('invisible');

  public eventBusName = input<string | undefined>(undefined);

  public l10nId = input<string>('');

  public l10nLabel = input<string>('');

  public title = input<string>('');

  public toggled = input<boolean>(false);

  public disabled = input<boolean>(false);

  public order = input<number>(99999);

  public action = input<((htmlEvent?: Event, isSecondaryMenue?: boolean) => void) | undefined>(undefined);

  public closeOnClick = input<boolean>(true);

  public onlySecondaryMenu = input<boolean>(false);

  public ariaHasPopup = input<boolean | 'true' | 'menu' | 'dialog'>(false);

  public ariaControls = input<string | undefined>(undefined);

  public role = input<string | undefined>(undefined);

  public image = input<string>('');

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public renderContent = false;

  public buttonRef = viewChild<ElementRef>('buttonRef');

  public nestedContent = contentChild<ElementRef>('nestedContent');

  // Computed signal that validates and sanitizes the SVG string
  // Returns sanitized HTML for use in both primary toolbar and secondary toolbar
  public imageHtml = computed(() => {
    const value = this.image();
    if (!value) return undefined;

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

    // Validation: only <svg> and SVG tags are allowed
    const tags = value.split('<').filter((tag) => tag.length > 0);
    const legal = tags.every((tag) => tag.startsWith('svg') || tag.startsWith('/') || svgTags.includes(tag.split(/\s|>/)[0]));
    if (!legal) {
      throw new Error('Illegal image for PDFShyButton. Only SVG images are allowed. Please use only the tags <svg> and <path>. ' + value);
    }

    // Return validated raw SVG - sanitization happens in updateButtonImage and pipe
    return value;
  });

  constructor(
    private pdfShyButtonServiceService: PdfShyButtonService,
    private renderer: Renderer2,
    notificationService: PDFNotificationService,
    private pdfCspPolicyService: PdfCspPolicyService,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });

    // Replace ngOnChanges: update service when any input changes
    effect(() => {
      // Track all inputs to trigger effect on any change
      this.primaryToolbarId();
      this.secondaryMenuId();
      this.cssClass();
      this.eventBusName();
      this.l10nId();
      this.l10nLabel();
      this.title();
      this.toggled();
      this.disabled();
      this.order();
      this.action();
      this.closeOnClick();
      this.onlySecondaryMenu();
      this.ariaHasPopup();
      this.ariaControls();
      this.role();
      this.image();

      // Service update runs whenever any input changes
      this.pdfShyButtonServiceService.update(this);
    });
  }

  public ngAfterViewInit(): void {
    this.updateButtonImage();
  }

  public ngOnInit(): void {
    this.pdfShyButtonServiceService.add(this);
  }

  public onClick(htmlEvent: Event): void {
    if (htmlEvent instanceof KeyboardEvent && htmlEvent.key !== 'Enter' && htmlEvent.key !== ' ') {
      return;
    }

    const actionFn = this.action();
    const eventName = this.eventBusName();

    if (actionFn) {
      actionFn(htmlEvent, false);
      htmlEvent.preventDefault();
    } else if (eventName) {
      this.PDFViewerApplication?.eventBus.dispatch(eventName);
      htmlEvent.preventDefault();
    }
  }

  public updateButtonImage() {
    const btnRef = this.buttonRef();
    if (btnRef) {
      const el = btnRef.nativeElement;
      const imageHtmlValue = this.imageHtml();

      if (imageHtmlValue && typeof imageHtmlValue === 'string') {
        const temp = this.renderer.createElement('div');
        // imageHtmlValue is already sanitized by pdfCspPolicyService.sanitizeHTML in imageHtml computed
        // Use addTrustedHTML to properly handle Trusted Types
        this.pdfCspPolicyService.addTrustedHTML(temp, imageHtmlValue);
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
    if (this.primaryToolbarId() === 'nestedComponent') {
      this.renderContent = !!this.nestedContent();
      console.log('renderContent', this.renderContent);
    }
  }
}
