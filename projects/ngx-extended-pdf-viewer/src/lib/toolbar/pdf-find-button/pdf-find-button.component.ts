import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-find-button',
  templateUrl: './pdf-find-button.component.html',
  styleUrls: ['./pdf-find-button.component.css'],
})
export class PdfFindButtonComponent {
  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Input()
  public findbarVisible = false;

  @Output()
  public findbarVisibleChange = new EventEmitter<boolean>();

  public onClick: () => void;

  constructor() {
    const emitter = this.findbarVisibleChange;
    this.onClick = () => {
      setTimeout(() => {
        emitter.emit(!this.findbarVisible);
      });
    };
  }
}
