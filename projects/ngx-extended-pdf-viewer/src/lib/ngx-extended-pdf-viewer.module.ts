import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { PdfZoomDropdownComponent } from './toolbar/pdf-zoom-dropdown/pdf-zoom-dropdown.component';

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
  return key === keycode && cmd === cmdDef;
}

(window as any).isKeyIgnored = isKeyIgnored;

@NgModule({
  imports: [CommonModule],
  declarations: [NgxExtendedPdfViewerComponent, PdfZoomDropdownComponent],
  providers: [NgxExtendedPdfViewerService],
  exports: [NgxExtendedPdfViewerComponent]
})
export class NgxExtendedPdfViewerModule {
  constructor() {}
}
