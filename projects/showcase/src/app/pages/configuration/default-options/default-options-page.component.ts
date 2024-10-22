import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { availableOptions, optionsSettings } from './options-table.data';

@Component({
  selector: 'pvs-default-options-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, Angular2SmartTableModule],
  template: `<pvs-content-page [otherTabs]="[{ title: 'Available Options', template: availableOptions }]">
    <pvs-markdown src="/assets/pages/configuration/default-options/text.md" />
    <ng-template #availableOptions>
      <h2>Available Options</h2>
      <p>Below you find an interactive list of all available options.</p>
      <angular2-smart-table [settings]="optionsSettings" [source]="data" />
    </ng-template>
  </pvs-content-page>`,
})
export class DefaultOptionsPageComponent {
  protected readonly optionsSettings = optionsSettings;
  protected readonly data = availableOptions;
}
