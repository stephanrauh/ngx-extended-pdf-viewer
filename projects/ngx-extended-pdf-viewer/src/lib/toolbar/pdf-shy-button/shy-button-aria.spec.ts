import { shyButtonAria } from './shy-button-aria';

describe('shyButtonAria (#3295)', () => {
  it('gives a plain action button no states at all', () => {
    expect(shyButtonAria({ toggled: false })).toEqual({ role: null, expanded: null, checked: null, pressed: null, haspopup: null, controls: null });
  });

  it('does not announce a toggled button as expanded when it opens nothing', () => {
    expect(shyButtonAria({ toggled: true }).expanded).toBeNull();
  });

  it('announces a toggle button as pressed or not pressed', () => {
    expect(shyButtonAria({ toggled: false, toggleButton: true }).pressed).toBe('false');
    expect(shyButtonAria({ toggled: true, toggleButton: true }).pressed).toBe('true');
  });

  it('announces a button that opens a popup as expanded or collapsed', () => {
    expect(shyButtonAria({ toggled: false, ariaControls: 'panel' })).toEqual(
      expect.objectContaining({ expanded: 'false', controls: 'panel', haspopup: null }),
    );
    expect(shyButtonAria({ toggled: true, ariaHasPopup: 'dialog' })).toEqual(expect.objectContaining({ expanded: 'true', haspopup: 'dialog' }));
  });

  it('gives a radio aria-checked, but never aria-expanded', () => {
    expect(shyButtonAria({ toggled: true, role: 'radio', ariaHasPopup: 'true', ariaControls: 'panel' })).toEqual(
      expect.objectContaining({ role: 'radio', checked: 'true', expanded: null }),
    );
  });
});
