import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

/**
 * Lifecycle compat: mount → unmount → remount via `@if (visible)`.
 * Catches regressions where ngOnDestroy leaves dangling state that
 * prevents a fresh mount from rendering.
 */
@Component({
  selector: 'app-ng-on-destroy',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './ng-on-destroy.component.html',
})
export class NgOnDestroyComponent {
  public visible = true;
  public hide(): void {
    this.visible = false;
  }
  public show(): void {
    this.visible = true;
  }
}
