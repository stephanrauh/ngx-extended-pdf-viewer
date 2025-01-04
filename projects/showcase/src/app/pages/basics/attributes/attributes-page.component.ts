import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { attributes, attributesSettings } from './attributes-table.data';

@Component({
  selector: 'pvs-attributes-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, Angular2SmartTableModule],
  template: `<pvs-content-page>
    <h2>Available Attributes</h2>
    <p>Below you find an interactive list of all available attributes.</p>
    <angular2-smart-table [settings]="settings" [source]="data" />
  </pvs-content-page>`,
})
export class AttributesPageComponent {
  protected readonly data = attributes;
  protected readonly settings = attributesSettings;
}
