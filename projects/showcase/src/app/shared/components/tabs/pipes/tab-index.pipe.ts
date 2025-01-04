import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabIndex',
  standalone: true,
})
export class TabIndexPipe implements PipeTransform {
  transform(isActive: boolean): unknown {
    return isActive ? '0' : '-1';
  }
}
