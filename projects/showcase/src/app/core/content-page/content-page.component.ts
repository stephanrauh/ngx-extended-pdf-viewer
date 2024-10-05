import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MarkdownContentComponent } from '../../shared/components/markdown-content.component';
import { Content } from '../../shared/types/content.types';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'pvs-content-page',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MarkdownContentComponent, MarkdownContentComponent, NgxExtendedPdfViewerModule],
  templateUrl: './content-page.component.html',
  preserveWhitespaces: true,
})
export class ContentPageComponent {
  public pageTitle = input.required<string>();
  public content = input<Content[]>([]);
}
