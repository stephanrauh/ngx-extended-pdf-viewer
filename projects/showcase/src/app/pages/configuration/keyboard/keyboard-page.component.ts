import { Component, computed, inject, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'pvs-keyboard-page',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    ContentPageComponent,
    MarkdownContentComponent,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    LanguagePipe,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/keyboard/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
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
                  <tr>
                    <td title="alternative keys: CMD+WHEEL">CTRL+WHEEL</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlWheel" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlWheel" /></div>
                    </td>
                    <td>zoom with mouse wheel</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: SHIFT+CTRL, SHIFT+CMD, ALT+CMD">CTRL+F</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlF" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlF" /></div>
                    </td>
                    <td>open find dialog</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: SHIFT+CTRL, SHIFT+CMD, ALT+CMD">CTRL+G</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlG" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlG" /></div>
                    </td>
                    <td>find next</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD">CTRL+"+"</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlPlus" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlPlus" /></div>
                    </td>
                    <td>zoom in</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD">CTRL+"-"</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlMinus" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlMinus" /></div>
                    </td>
                    <td>zoom out</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: CMD, SHIFT+CTRL, SHIFT+CMD">CTRL+0</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="Ctrl0" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="Ctrl0" /></div>
                    </td>
                    <td>reset zoom</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: RIGHT, PAGE UP">UP</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="Up" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="Up" /></div>
                    </td>
                    <td>next page (only if zoom = "page fit")</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: LEFT, PAGE DOWN">DOWN</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="Down" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="Down" /></div>
                    </td>
                    <td>previous page (only if zoom = "page fit")</td>
                  </tr>
                  <tr>
                    <td>CTRL+UP</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlUp" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlUp" /></div>
                    </td>
                    <td>first page</td>
                  </tr>
                  <tr>
                    <td>CTRL+DOWN</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlDown" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlDown" /></div>
                    </td>
                    <td>last page</td>
                  </tr>
                  <tr>
                    <td>P</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="P" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="P" /></div>
                    </td>
                    <td>previous page</td>
                  </tr>
                  <tr>
                    <td>N</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="N" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="N" /></div>
                    </td>
                    <td>next page</td>
                  </tr>
                  <tr>
                    <td>J</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="J" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="J" /></div>
                    </td>
                    <td>previous page</td>
                  </tr>
                  <tr>
                    <td>K</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="K" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="K" /></div>
                    </td>
                    <td>next page</td>
                  </tr>
                  <tr>
                    <td>HOME</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="Home" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="Home" /></div>
                    </td>
                    <td>next page</td>
                  </tr>
                  <tr>
                    <td>END</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="End" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="End" /></div>
                    </td>
                    <td>next page</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="S" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="S" /></div>
                    </td>
                    <td>"select" mode</td>
                  </tr>
                  <tr>
                    <td>CTRL+S</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlS" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlS" /></div>
                    </td>
                    <td>download PDF</td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="H" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="H" /></div>
                    </td>
                    <td>"hand" mode"</td>
                  </tr>
                  <tr>
                    <td>R</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="R" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="R" /></div>
                    </td>
                    <td>rotate clockwise</td>
                  </tr>
                  <tr>
                    <td>SHIFT+R</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="ShiftR" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="ShiftR" /></div>
                    </td>
                    <td>rotate counter-clockwise</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: CMD+ALT+P">CTRL+ALT+P</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="CtrlAltP" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="CtrlAltP" /></div>
                    </td>
                    <td>presentation mode</td>
                  </tr>
                  <tr>
                    <td>CTRL+P</td>
                    <td>n/a</td>
                    <td>n/a</td>
                    <td>print</td>
                  </tr>
                  <tr>
                    <td>F4</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="F4" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="F4" /></div>
                    </td>
                    <td>toggle sidebar</td>
                  </tr>
                  <tr>
                    <td title="alternative keys: CMD+ALT+G">ALT+CTRL+G</td>
                    <td>
                      <div class="input-group" formGroupName="accept"><input type="checkbox" formControlName="AltCtrlG" /></div>
                    </td>
                    <td>
                      <div class="input-group" formGroupName="ignore"><input type="checkbox" formControlName="AltCtrlG" /></div>
                    </td>
                    <td>focus on page number field</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/hammond-organ-wikipedia.pdf"
          zoom="page-width"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [acceptKeys]="acceptedKeys()"
          [ignoreKeys]="ignoredKeys()"
          pvsSetMinifiedLibraryUsage
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class KeyboardPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  private keys = {
    CtrlWheel: {
      displayName: 'CTRL+WHEEL',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlF: {
      displayName: 'CTRL+F',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlG: {
      displayName: 'CTRL+G',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlPlus: {
      displayName: 'CTRL++',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlMinus: {
      displayName: 'CTRL+-',
      defaultAccept: false,
      defaultIgnore: false,
    },
    Ctrl0: {
      displayName: 'CTRL+0',
      defaultAccept: false,
      defaultIgnore: false,
    },
    Up: {
      displayName: 'UP',
      defaultAccept: false,
      defaultIgnore: false,
    },
    Down: {
      displayName: 'DOWN',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlUp: {
      displayName: 'CTRL+UP',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlDown: {
      displayName: 'CTRL+DOWN',
      defaultAccept: false,
      defaultIgnore: false,
    },
    P: {
      displayName: 'P',
      defaultAccept: false,
      defaultIgnore: false,
    },
    N: {
      displayName: 'N',
      defaultAccept: false,
      defaultIgnore: false,
    },
    J: {
      displayName: 'J',
      defaultAccept: false,
      defaultIgnore: true,
    },
    K: {
      displayName: 'K',
      defaultAccept: false,
      defaultIgnore: true,
    },
    Home: {
      displayName: 'HOME',
      defaultAccept: false,
      defaultIgnore: false,
    },
    End: {
      displayName: 'END',
      defaultAccept: false,
      defaultIgnore: false,
    },
    S: {
      displayName: 'S',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlS: {
      displayName: 'CTRL+S',
      defaultAccept: false,
      defaultIgnore: false,
    },
    H: {
      displayName: 'H',
      defaultAccept: false,
      defaultIgnore: false,
    },
    R: {
      displayName: 'R',
      defaultAccept: false,
      defaultIgnore: false,
    },
    ShiftR: {
      displayName: 'SHIFT+R',
      defaultAccept: false,
      defaultIgnore: false,
    },
    CtrlAltP: {
      displayName: 'CTRL+ALT+P',
      defaultAccept: false,
      defaultIgnore: false,
    },
    F4: {
      displayName: 'F4',
      defaultAccept: false,
      defaultIgnore: true,
    },
    AltCtrlG: {
      displayName: 'ALT+CTRL+G',
      defaultAccept: false,
      defaultIgnore: false,
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
