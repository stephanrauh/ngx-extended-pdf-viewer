import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguagePipe } from 'ngx-markdown';
import { KeyValuePipe } from '@angular/common';
import { KeysConfig } from './types';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-keyboard-page',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    LanguagePipe,
    KeyValuePipe,
    MarkdownContentComponent,
    ContentPageComponent,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/keyboard/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <div>
          <form [formGroup]="keysForm">
            <p>
              See how the demo reacts to these settings. The source code below reflects the settings too. Also have a look at the tooltips: many keys have
              multiple key bindings.
            </p>
            <div>
              <pvs-markdown [data]="sourceCode() | language: 'HTML'" />
            </div>
            <div class="input-group mt-4 mb-2">
              <label for="ignoreKeyboard">Ignore Keyboard</label>
              <input id="ignoreKeyboard" type="checkbox" formControlName="ignoreKeyboard" />
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Accept</th>
                    <th>Ignore</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  @for (key of keys | keyvalue; track key.key) {
                    <tr>
                      @if (key.value.title; as title) {
                        <td [title]="title">{{ key.value.displayName }}</td>
                      } @else {
                        <td>{{ key.value.displayName }}</td>
                      }
                      <td>
                        @if (key.value.defaultAccept === null) {
                          <span>n/a</span>
                        } @else {
                          <div class="input-group" formGroupName="accept"><input type="checkbox" [formControlName]="key.key" /></div>
                        }
                      </td>
                      <td>
                        @if (key.value.defaultIgnore === null) {
                          <span>n/a</span>
                        } @else {
                          <div class="input-group" formGroupName="ignore"><input type="checkbox" [formControlName]="key.key" /></div>
                        }
                      </td>
                      <td>{{ key.value.meaning }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/hammond-organ-wikipedia.pdf"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [acceptKeys]="acceptedKeys()"
          [ignoreKeys]="ignoredKeys()"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class KeyboardPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  keys: KeysConfig = {
    CtrlWheel: {
      displayName: 'CTRL+WHEEL',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Zoom with mouse wheel',
      title: 'Alternative keys: CMD+WHEEL',
    },
    CtrlF: {
      displayName: 'CTRL+F',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Open find dialog',
      title: 'Alternative keys: SHIFT+CTRL, SHIFT+CMD, ALT+CMD',
    },
    CtrlG: {
      displayName: 'CTRL+G',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Find next',
      title: 'Alternative keys: SHIFT+CTRL, SHIFT+CMD, ALT+CMD',
    },
    CtrlPlus: {
      displayName: 'CTRL++',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Zoom in',
      title: 'Alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD',
    },
    CtrlMinus: {
      displayName: 'CTRL+-',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Zoom out',
      title: 'Alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD',
    },
    Ctrl0: {
      displayName: 'CTRL+0',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Reset zoom',
      title: 'Alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD',
    },
    Up: {
      displayName: 'UP',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Next page (only if zoom = "page fit")',
      title: 'Alternative keys: RIGHT, PAGE UP',
    },
    Down: {
      displayName: 'DOWN',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Previous page (only if zoom = "page fit")',
      title: 'Alternative keys: LEFT, PAGE DOWN',
    },
    CtrlUp: {
      displayName: 'CTRL+UP',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'First page',
    },
    CtrlDown: {
      displayName: 'CTRL+DOWN',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Last page',
    },
    P: {
      displayName: 'P',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Previous page',
    },
    N: {
      displayName: 'N',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Next Page',
    },
    J: {
      displayName: 'J',
      defaultAccept: false,
      defaultIgnore: true,
      meaning: 'Previous page',
    },
    K: {
      displayName: 'K',
      defaultAccept: false,
      defaultIgnore: true,
      meaning: 'Next Page',
    },
    Home: {
      displayName: 'HOME',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Next page',
    },
    End: {
      displayName: 'END',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Next page',
    },
    S: {
      displayName: 'S',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: '"select" mode',
    },
    CtrlS: {
      displayName: 'CTRL+S',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Download PDF',
    },
    H: {
      displayName: 'H',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: '"hand" mode"',
    },
    R: {
      displayName: 'R',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Rotate clockwise',
    },
    ShiftR: {
      displayName: 'SHIFT+R',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Rotate counter-clockwise',
    },
    CtrlAltP: {
      displayName: 'CTRL+ALT+P',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Presentation mode',
    },
    CtrlP: {
      displayName: 'CTRL+P',
      defaultAccept: null,
      defaultIgnore: null,
      meaning: 'print',
    },
    F4: {
      displayName: 'F4',
      defaultAccept: false,
      defaultIgnore: true,
      meaning: 'Toggle sidebar',
    },
    AltCtrlG: {
      displayName: 'ALT+CTRL+G',
      defaultAccept: false,
      defaultIgnore: false,
      meaning: 'Focus on page number field',
      title: 'Alternative keys: CMD+ALT+G',
    },
  };

  keysForm = this.formBuilder.nonNullable.group({
    ignoreKeyboard: false,
    accept: this.formBuilder.nonNullable.group<{ [key: symbol]: boolean }>({}),
    ignore: this.formBuilder.nonNullable.group<{ [key: symbol]: boolean }>({}),
  });

  acceptKeysValueChange = toSignal(this.keysForm.controls.accept.valueChanges);
  ignoredKeysValueChange = toSignal(this.keysForm.controls.ignore.valueChanges);
  ignoreKeyboard = toSignal(this.keysForm.controls.ignoreKeyboard.valueChanges);

  acceptedKeys = computed(() => {
    const values = this.acceptKeysValueChange();
    let acceptedKeys: string[] = [];

    if (!values) {
      return acceptedKeys;
    }

    acceptedKeys = Object.entries(values)
      .filter(([, value]) => value)
      .map(([formName]) => this.keys[formName].displayName);
    return acceptedKeys;
  });

  ignoredKeys = computed(() => {
    const values = this.ignoredKeysValueChange();
    let ignoredKeys: string[] = [];

    if (!values) {
      return ignoredKeys;
    }

    ignoredKeys = Object.entries(values)
      .filter(([, value]) => value)
      .map(([formName]) => this.keys[formName].displayName);
    return ignoredKeys;
  });

  sourceCode = computed(() => {
    const acceptedKeys = this.acceptedKeys();
    const ignoredKeys = this.ignoredKeys();
    const ignoreKeyboard = this.ignoreKeyboard() ?? false;
    return this.getSourceCode(acceptedKeys, ignoredKeys, ignoreKeyboard);
  });

  ngOnInit() {
    Object.entries(this.keys).forEach(([formName, key]) => {
      this.keysForm.controls.accept.addControl(formName, new FormControl(key.defaultAccept));
      this.keysForm.controls.ignore.addControl(formName, new FormControl(key.defaultIgnore));
    });
  }

  private getSourceCode(accepted: string[], ignored: string[], ignoreKeyboard: boolean): string {
    return `<ngx-extended-pdf-viewer
    src="/assets/pdfs/hammond-organ-wikipedia.pdf"
    [ignoreKeyboard]="${ignoreKeyboard}"
    [acceptKeys]="[${accepted.map((a) => `'${a}'`)}]"
    [ignoreKeys]="[${ignored.map((a) => `'${a}'`)}]"
    [page]="2"
    showPresentationModeButton="true"
>
  </ngx-extended-pdf-viewer>`;
  }
}
