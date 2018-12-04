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
  public zoom = 42;
  public visible = { 0: true };
  public mobileFriendlyZoom = false;

  public get mobileZoom(): string | undefined {
    if (this.mobileFriendlyZoom) {
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
