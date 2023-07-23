import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfShyButtonService } from './pdf-shy-button-service';

@Component({
  selector: 'pdf-shy-button',
  templateUrl: './pdf-shy-button.component.html',
  styleUrls: ['./pdf-shy-button.component.css'],
})
export class PdfShyButtonComponent implements OnInit, OnChanges {
  @Input()
  public id: string;

  @Input()
  public secondaryToolbarId: string;

  @Input()
  public cssClass: string;

  @Input()
  public eventBusName: string;

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
  public action: (() => void) | undefined;

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
