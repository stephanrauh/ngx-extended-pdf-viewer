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

  public activateTab(tab: number): void {
    console.log(tab);
    setTimeout(() => {
      this.visible[tab] = true;
    }, 1000);
  }
}
