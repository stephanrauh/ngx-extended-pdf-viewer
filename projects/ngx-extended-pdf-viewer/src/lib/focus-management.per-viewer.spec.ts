import { ElementRef, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FocusManagementService } from './focus-management.service';

describe('FocusManagementService: one instance per viewer (#3306)', () => {
  let first: HTMLElement;
  let second: HTMLElement;
  let viewerService: FocusManagementService;

  function createViewer(): HTMLElement {
    const host = document.createElement('ngx-extended-pdf-viewer');
    host.innerHTML = '<button id="primaryEditorInk"></button><div id="editorInkParamsToolbar"><input type="range" /></div>';
    document.body.appendChild(host);
    return host;
  }

  beforeEach(() => {
    first = createViewer();
    second = createViewer();
    // what the viewer's `providers` do: the instance sees the viewer's ElementRef
    viewerService = Injector.create({
      parent: TestBed.inject(Injector),
      providers: [{ provide: ElementRef, useValue: new ElementRef(second) }, FocusManagementService],
    }).get(FocusManagementService);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    viewerService.ngOnDestroy();
    first.remove();
    second.remove();
  });

  it('looks up the dialog and the button in its own viewer', () => {
    jest.useFakeTimers();
    // jsdom has no layout, so offsetParent is always null: every element would count as hidden
    const input = second.querySelector('input')!;
    Object.defineProperty(input, 'offsetParent', { get: () => second });

    viewerService.moveFocusToDialog('editorInkParamsToolbar', undefined, 'primaryEditorInk');
    jest.advanceTimersByTime(50);
    expect(document.activeElement).toBe(input);

    viewerService.returnFocusToPrevious();
    expect(document.activeElement).toBe(second.querySelector('#primaryEditorInk'));
  });

  it('removes its live region and its keydown listener when destroyed', () => {
    const removeListener = jest.spyOn(document, 'removeEventListener');
    const region = (viewerService as any).ariaLiveRegion as HTMLElement;
    (viewerService as any).setupFocusCycling(second);
    expect(document.body.contains(region)).toBe(true);

    viewerService.ngOnDestroy();

    expect(document.body.contains(region)).toBe(false);
    expect(removeListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
