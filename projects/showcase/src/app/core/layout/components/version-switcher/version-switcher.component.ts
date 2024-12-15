import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BROWSER_STORAGE } from '../../../../shared/helper/browser-storage.token';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'pvs-version-switcher',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div class="input-wrapper flex flex-wrap gap-2 items-center justify-end">
      <label for="version">PDF Viewer Version</label>
      <select id="version" [formControl]="viewer">
        <option [value]="stableVersion">Stable (based on pdf.js 4.7)</option>
        <option [value]="bleedingEdgeVersion">Bleeding Edge (preview of pdf.js 4.7++)</option>
      </select>
    </div>
  `,
})
export class VersionSwitcherComponent {
  private localStorage = inject(BROWSER_STORAGE);
  private document = inject(DOCUMENT);

  stableVersion = 'ngx-extended-pdf-viewer';
  bleedingEdgeVersion = 'bleeding-edge';

  viewer = new FormControl(this.stableVersion);

  constructor() {
    const viewer = this.getActiveViewer();
    this.viewer.setValue(viewer);
    switch (viewer) {
      case this.bleedingEdgeVersion: {
        pdfDefaultOptions.assetsFolder = 'bleeding-edge';
        break;
      }
      default: {
        pdfDefaultOptions.assetsFolder = 'assets';
        break;
      }
    }
    this.viewer.valueChanges.pipe(takeUntilDestroyed()).subscribe((version) => {
      if (!version) {
        return;
      }
      this.setActiveViewer(version);
      this.reloadPage();
    });
  }

  private setActiveViewer(version: string) {
    if (!this.localStorage) {
      return;
    }

    this.localStorage.setItem('showcase.viewer', version);
  }

  private getActiveViewer() {
    let version: string | null = null;
    try {
      if (this.localStorage) {
        version = this.localStorage.getItem('showcase.viewer');
      }
    } catch /* (safariSecurityException) */ {
      // localStorage is not available on Safari
    }

    return version ?? this.stableVersion;
  }

  private reloadPage() {
    this.document.location.reload();
  }
}
