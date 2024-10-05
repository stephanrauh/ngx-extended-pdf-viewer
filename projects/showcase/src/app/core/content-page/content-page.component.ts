import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MarkdownContentComponent } from '../../shared/components/markdown-content.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pvs-content-page',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MarkdownContentComponent, MarkdownContentComponent, NgxExtendedPdfViewerModule],
  templateUrl: './content-page.component.html',
  preserveWhitespaces: true,
})
export class ContentPageComponent {
  private activatedRoute = inject(ActivatedRoute);

  private data = toSignal(this.activatedRoute.data);

  public pageTitle = computed(() => {
    const data = this.data();
    if (!data) {
      return '';
    }
    return data['pageTitle'];
  });
}
