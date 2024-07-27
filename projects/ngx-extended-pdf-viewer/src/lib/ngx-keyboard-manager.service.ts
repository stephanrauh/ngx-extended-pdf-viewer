import { Injectable } from '@angular/core';
import { IPDFViewerApplication } from '../public_api';

@Injectable({
  providedIn: 'root',
})
export class NgxKeyboardManagerService {
  /** Allows the user to disable the keyboard bindings completely */
  public ignoreKeyboard = false;

  /** Allows the user to disable a list of key bindings. */
  public ignoreKeys: Array<string> = [];

  /** Allows the user to enable a list of key bindings explicitly. If this property is set, every other key binding is ignored. */
  public acceptKeys: Array<string> = [];

  constructor() {}

  public isKeyIgnored(cmd: number, keycode: number | 'WHEEL'): boolean {
    if (keycode === 'WHEEL') {
      if (!!this.ignoreKeys && this.isKeyInList(this.ignoreKeys, cmd, 'WHEEL')) {
        return true;
      }
      if (!!this.acceptKeys && this.acceptKeys.length > 0) {
        return !this.isKeyInList(this.acceptKeys, cmd, 'WHEEL');
      }

      return false;
    }

    if (keycode === 16 || keycode === 17 || keycode === 18 || keycode === 224) {
      // ignore solitary SHIFT, ALT, CMD, and CTRL because they only make sense as two-key-combinations
      return true;
    }
    // cmd is a bit-array:
    // 1 == CTRL
    // 2 == ALT
    // 4 == SHIFT
    // 8 == META
    if (!!this.ignoreKeyboard) {
      return true;
    }

    if (!!this.ignoreKeys && this.ignoreKeys.length > 0) {
      if (this.isKeyInList(this.ignoreKeys, cmd, keycode)) {
        return true;
      }
    }

    if (!!this.acceptKeys && this.acceptKeys.length > 0) {
      return !this.isKeyInList(this.acceptKeys, cmd, keycode);
    }
    return false;
  }

  private isKeyInList(settings: Array<string>, cmd: number, keycode: number | 'WHEEL'): boolean {
    if (!settings) {
      return true;
    }
    return settings.some((keyDef) => this.isKey(keyDef, cmd, keycode));
  }

  private isKey(keyDef: string, cmd: number, keycode: number | 'WHEEL'): boolean {
    let cmdDef = 0;
    let key = 0;
    keyDef = keyDef.toLowerCase();
    // tslint:disable: no-bitwise
    if (keyDef.includes('ctrl+')) {
      cmdDef |= 1;
      keyDef = keyDef.replace('ctrl+', '');
    }
    if (keyDef.includes('cmd+')) {
      cmdDef |= 8;
      keyDef = keyDef.replace('cmd+', '');
    }
    if (keyDef.includes('alt+')) {
      cmdDef |= 2;
      keyDef = keyDef.replace('alt+', '');
    }
    if (keyDef.includes('shift+')) {
      cmdDef |= 4;
      keyDef = keyDef.replace('shift+', '');
    }
    if (keyDef.includes('meta+')) {
      cmdDef |= 8;
      keyDef = keyDef.replace('meta+', '');
    }

    if (keyDef === 'up') {
      key = 38;
    } else if (keyDef === 'down') {
      key = 40;
    } else if (keyDef === '+' || keyDef === '"+"') {
      key = 171;
    } else if (keyDef === '-' || keyDef === '"-"') {
      key = 173;
    } else if (keyDef === 'esc') {
      key = 27;
    } else if (keyDef === 'enter') {
      key = 13;
    } else if (keyDef === 'space') {
      key = 32;
    } else if (keyDef === 'f4') {
      key = 115;
    } else if (keyDef === 'backspace') {
      key = 8;
    } else if (keyDef === 'home') {
      key = 36;
    } else if (keyDef === 'end') {
      key = 35;
    } else if (keyDef === 'left') {
      key = 37;
    } else if (keyDef === 'right') {
      key = 39;
    } else if (keyDef === 'pagedown') {
      key = 34;
    } else if (keyDef === 'pageup') {
      key = 33;
    } else {
      key = keyDef.toUpperCase().charCodeAt(0);
    }
    if (keycode === 'WHEEL') {
      return keyDef === 'wheel' && cmd === cmdDef;
    }
    return key === keycode && cmd === cmdDef;
  }

  public registerKeyboardListener(PDFViewerApplication: IPDFViewerApplication) {
    PDFViewerApplication.ngxKeyboardManager = this;
  }
}
