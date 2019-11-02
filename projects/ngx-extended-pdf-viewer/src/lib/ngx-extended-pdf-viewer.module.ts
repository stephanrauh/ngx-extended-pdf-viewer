import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';

function isKeyIgnored(cmd: number, keycode: number): boolean {
  if (keycode === 16 || keycode === 17 || keycode === 18 || keycode === 224) {
    // ignore solitary SHIFT, ALT, CMD, and CTRL because they only make sense as two-key-combinations
    return true;
  }
  // cmd is a bit-array:
  // 1 == CTRL
  // 2 == ALT
  // 4 == SHIFT
  // 8 == META
  const options = (window as any).PDFViewerApplicationOptions;
  const ignoreKeyboard = options.get('ignoreKeyboard');
  if (!!ignoreKeyboard) {
    return true;
  }

  const ignoreKeys: Array<string> = options.get('ignoreKeys');
  if (!!ignoreKeys && ignoreKeys.length > 0) {
    if (isKeyInList(ignoreKeys, cmd, keycode)) {
      return true;
    }
  }

  const acceptKeys = options.get('acceptKeys');
  if (!!acceptKeys && acceptKeys.length > 0) {
    return !isKeyInList(acceptKeys, cmd, keycode);
  }

  return false;
}

function isKeyInList(settings: Array<string>, cmd: number, keycode: number): boolean {
  return settings.some(keyDef => isKey(keyDef, cmd, keycode));
}

function isKey(keyDef: string, cmd: number, keycode: number): boolean {
  let cmdDef = 0;
  let key = 0;
  keyDef = keyDef.toUpperCase();
  if (keyDef.startsWith('CTRL+')) {
    cmdDef = 1;
    keyDef = keyDef.substring(5);
  }
  if (keyDef.startsWith('CMD+')) {
    cmdDef = 1;
    keyDef = keyDef.substring(4);
  }
  if (keyDef.startsWith('ALT+')) {
    cmdDef = 2;
    keyDef = keyDef.substring(4);
  }
  if (keyDef.startsWith('SHIFT+')) {
    cmdDef = 4;
    keyDef = keyDef.substring(6);
  }
  if (keyDef.startsWith('META+')) {
    cmdDef = 8;
    keyDef = keyDef.substring(5);
  }
  if (keyDef.toLowerCase() === 'up') {
    key = 38;
  } else if (keyDef.toLowerCase() === 'down') {
    key = 40;
  } else if (keyDef.toLowerCase() === '+' || keyDef.toLowerCase() === '"+"') {
    key = 171;
  } else if (keyDef.toLowerCase() === '-' || keyDef.toLowerCase() === '"-"') {
    key = 173;
  } else if (keyDef.toLowerCase() === 'esc') {
    key = 27;
  } else if (keyDef.toLowerCase() === 'enter') {
    key = 13;
  } else if (keyDef.toLowerCase() === 'space') {
    key = 32;
  } else if (keyDef.toLowerCase() === 'f4') {
    key = 115;
  } else if (keyDef.toLowerCase() === 'backspace') {
    key = 8;
  } else if (keyDef.toLowerCase() === 'home') {
    key = 36;
  } else if (keyDef.toLowerCase() === 'end') {
    key = 35;
  } else if (keyDef.toLowerCase() === 'left') {
    key = 37;
  } else if (keyDef.toLowerCase() === 'right') {
    key = 39;
  } else {
    key = keyDef.charCodeAt(0);
  }
  return key === keycode && cmd === cmdDef;
}

(window as any).isKeyIgnored = isKeyIgnored;

@NgModule({
  imports: [CommonModule],
  declarations: [NgxExtendedPdfViewerComponent],
  providers: [NgxExtendedPdfViewerService],
  exports: [NgxExtendedPdfViewerComponent]
})
export class NgxExtendedPdfViewerModule {
  constructor() {}
}
