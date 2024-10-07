import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabButtonId',
  standalone: true,
})
export class TabButtonIdPipe implements PipeTransform {
  transform(key: string): unknown {
    return `tab-${key}`;
  }
}
