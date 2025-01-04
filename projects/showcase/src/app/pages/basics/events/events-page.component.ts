import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { events, eventsSettings } from './events-table.data';

@Component({
  selector: 'pvs-events-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, Angular2SmartTableModule],
  template: `<pvs-content-page>
    <h2>Available Events</h2>
    <p>Below you find an interactive list of all events emitted by the PDF Viewer.</p>
    <angular2-smart-table [settings]="settings" [source]="data" />
  </pvs-content-page>`,
})
export class EventsPageComponent {
  protected readonly data = events;
  protected readonly settings = eventsSettings;
}
