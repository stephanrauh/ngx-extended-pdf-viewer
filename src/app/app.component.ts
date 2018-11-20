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
}
