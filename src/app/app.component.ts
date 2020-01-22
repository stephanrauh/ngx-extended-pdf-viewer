import { Component } from '@angular/core';
import { pdfBase64 } from './pdfBase64';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { PagesLoadedEvent, PageRenderedEvent, PdfDownloadedEvent, PdfLoadedEvent } from 'projects/ngx-extended-pdf-viewer/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pdf = 'assets/example.pdf';
  public hidden = false;
  public zoom: number | string | undefined = 'page-width';
  public visible = { 0: true };
  public mobileFriendlyZoomPercent = false;
  public currentZoomFactor: number;
  public showSidebarButton = false;
  public sidebarVisible = undefined;

  public height: string | undefined = '80vh';
  public filenameForDownload: string | undefined = undefined;
  public language = 'es-ES';
  public nameddest = 'chapter_5';
  public printResolution: string | undefined = undefined;
  public _searchtext = '';
  public spread = 'off';
  public contextMenuAllowed = true;

  public rotation = 0;

  public ignoreKeyboard = false;
  public showBorders = true;

  public page: number | undefined = undefined;

  public pageLabel: string | undefined = undefined;

  public handTool: boolean | undefined = undefined;

  public base64 = pdfBase64; // this.base64ToArrayBuffer(pdfBase64);

  public get searchtext(): string {
    return this._searchtext;
  }

  public set searchtext(text: string) {
    if (this.ngxExtendedPdfViewerService.find(text)) {
      this._searchtext = text;
    }
  }

  public get zoomAuto(): boolean {
    return this.zoom === 'auto';
  }

  public set zoomAuto(auto: boolean) {
    if (auto) {
      this.zoom = 'auto';
    }
  }

  public get zoomPageActual(): boolean {
    return this.zoom === 'page-actual';
  }

  public set zoomPageActual(auto: boolean) {
    if (auto) {
      this.zoom = 'page-actual';
    }
  }

  public get zoomPageFit(): boolean {
    return this.zoom === 'page-fit';
  }

  public set zoomPageFit(auto: boolean) {
    if (auto) {
      this.zoom = 'page-fit';
    }
  }

  public get zoomPageWidth(): boolean {
    return this.zoom === 'page-width';
  }

  public set zoomPageWidth(auto: boolean) {
    if (auto) {
      this.zoom = 'page-width';
    }
  }

  public get zoom84percent(): boolean {
    return this.zoom === '84%'  || this.zoom === 84;
  }

  public set zoom84percent(auto: boolean) {
    if (auto) {
      this.zoom = '84%';
    }
  }

  public get zoom42(): boolean {
    return this.zoom === '42' || this.zoom === 42;
  }

  public set zoom42(auto: boolean) {
    if (auto) {
      this.zoom = '42';
    }
  }

  public get mobileFriendlyZoom(): string | undefined {
    if (this.mobileFriendlyZoomPercent) {
      return '200%';
    }
    return undefined;
  }

  public activateTab(tab: number): void {
    this.hideOtherPDFs();
    this.ignoreKeyboard = this.ignoreKeyboard || tab === 0;
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    this.visible[0] = false;
    this.visible[1] = false;
    this.visible[2] = false;
    this.visible[3] = false;
    this.visible[4] = false;
    this.visible[5] = false;
    this.visible[6] = false;
    this.visible[7] = false;
    this.visible[8] = false;
  }

  public get height50() {
    return this.height === '50%';
  }

  public set height50(value: boolean) {
    if (value) {
      this.height = '50%';
    } else {
      if (this.height === '50%') {
        this.height = undefined;
      }
    }
  }

  public get height314() {
    return this.height === '314px';
  }

  public set height314(value: boolean) {
    if (value) {
      this.height = '314px';
    } else {
      if (this.height === '314px') {
        this.height = undefined;
      }
    }
  }

  public get height80vh() {
    return this.height === '80vh';
  }

  public set height80vh(value: boolean) {
    if (value) {
      this.height = '80vh';
    } else {
      if (this.height === '80vh') {
        this.height = undefined;
      }
    }
  }
  public get height100() {
    return this.height === '100%';
  }

  public set height100(value: boolean) {
    if (value) {
      this.height = '100%';
    } else {
      if (this.height === '100%') {
        this.height = undefined;
      }
    }
  }

  constructor(private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService, public dialog: MatDialog) {}

  public openDialog(): void {
    this.hidden = true;
    setTimeout(() => {
      const dialogRef = this.dialog.open(ModalDialogComponent, {
        width: '750px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.hidden = false;
      });
    });
  }

  public onPagesLoaded(event: PagesLoadedEvent) {
    console.log('Document loaded with ' + event.pagesCount + ' pages');
  }

  public onPageRendered(event: PageRenderedEvent) {
    console.log(event);
  }

  public onDownload(event: PdfDownloadedEvent) {
    console.log(event);
  }

  public findNext(): void {
    this.ngxExtendedPdfViewerService.findNext();
  }

  public findPrevious(): void {
    this.ngxExtendedPdfViewerService.findPrevious();
  }

  public updateCurrentZoomFactor(zoom: number) {
    this.currentZoomFactor = zoom;
  }

  public beforePrint(): void {
    console.log('event "beforePrint" fired');
  }

  public afterPrint(): void {
    console.log('event "afterPrint" fired');
  }

  public onPdfLoaded(event: PdfLoadedEvent): void {
    console.log('PDF loaded with ' + event.pagesCount + ' pages');
  }

  public onPdfLoadFailed(error: Error): void {
    console.log(error);
  }

  public onSourceChange(event: string) {
    console.log('Source changed. The new file is ' + event);
  }

  public onZoomChange(event: any): void {
    console.log(event);
  }
}
