import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-on-destroy-example',
  templateUrl: './ng-on-destroy.component.html',
  styleUrls: ['./ng-on-destroy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgOnDestroyComponent {

  public visible=false;

  constructor() {
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public toggle(): void {
    this.visible = true;
    setTimeout((() => this.visible = false), 0);
  }


  /*
  100 produces:
  Unhandled Promise rejection: Cannot read properties of null (reading 'addEventListener') ; Zone: <root> ; Task: Promise.then ; Value: TypeError: Cannot read properties of null (reading 'addEventListener')
    at Object.bindWindowEvents (http://localhost:4200/assets/viewer-3.5.542.min.js:44:31520)
    at Object.initialize (http://localhost:4200/assets/viewer-3.5.542.min.js:44:3983) TypeError: Cannot read properties of null (reading 'addEventListener')
    at Object.bindWindowEvents (http://localhost:4200/assets/viewer-3.5.542.min.js:44:31520)
    at Object.initialize (http://localhost:4200/assets/viewer-3.5.542.min.js:44:3983)
*/
}
