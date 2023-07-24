import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonService } from './pdf-shy-button-service';

@Component({
  selector: 'pdf-shy-button',
  templateUrl: './pdf-shy-button.component.html',
  styleUrls: ['./pdf-shy-button.component.css'],
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

  private _imageHtml: SafeHtml;

  public get imageHtml(): SafeHtml {
    return this._imageHtml;
  }

  @Input()
  public set image(value: string) {
    this._imageHtml = this.sanitizeHtml(value);
  }

  constructor(private pdfShyButtonServiceService: PdfShyButtonService, private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.pdfShyButtonServiceService.add(this);
  }

  public ngOnChanges(changes: any): void {
    this.pdfShyButtonServiceService.update(this);
  }

  public sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
