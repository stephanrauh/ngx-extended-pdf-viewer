import { Directive } from '@angular/core';

@Directive({
  selector: '[pvsButton]',
  standalone: true,
  host: {
    class: 'bg-primary-light text-on-primary-light p-2',
  },
})
export class ButtonDirective {}
