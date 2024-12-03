import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';

import { Angular2SmartTableModule } from 'angular2-smart-table';
import { availableCssRules, cssRulesSettings } from './css-table.data';

@Component({
  selector: 'pvs-css-rules-page',
  standalone: true,
  imports: [ContentPageComponent, Angular2SmartTableModule],
  template: ` <pvs-content-page>
    <angular2-smart-table [settings]="settings" [source]="data" />
  </pvs-content-page>`,
})
export class CSSRulesPageComponent {
  protected readonly data = availableCssRules;
  protected readonly settings = cssRulesSettings;
}
