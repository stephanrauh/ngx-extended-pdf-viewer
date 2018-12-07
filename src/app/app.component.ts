import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ngx-extended-pdf-viewer';
  public pdf = 'assets/example.pdf';
  public hidden = false;
  public zoom: number | string | undefined = 42;
  public visible = { 0: true };
  public mobileFriendlyZoomPercent = false;
  public showSidebar = false;

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
    return this.zoom === '84%';
  }

  public set zoom84percent(auto: boolean) {
    if (auto) {
      this.zoom = '84%';
    }
  }

  public get zoom42(): boolean {
    return this.zoom === '42';
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
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    console.log('Hiding');
    this.visible[0] = false;
    this.visible[1] = false;
    this.visible[2] = false;
    this.visible[3] = false;
  }
}
