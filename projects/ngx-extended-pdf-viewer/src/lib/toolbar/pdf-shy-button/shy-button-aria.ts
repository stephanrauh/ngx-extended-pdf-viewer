/**
 * #3295 The ARIA attributes of a shy button. The toolbar button and its entry in the secondary
 * menu both use this function, so screen readers announce them the same way.
 *
 * Each state only where it applies: aria-expanded only on a button that opens something,
 * aria-checked only on a radio, aria-pressed only on a toggle button.
 */
export interface ShyButtonAria {
  role: string | null;
  expanded: 'true' | 'false' | null;
  checked: 'true' | 'false' | null;
  pressed: 'true' | 'false' | null;
  haspopup: string | null;
  controls: string | null;
}

export interface ShyButtonAriaInput {
  toggled: boolean;
  toggleButton?: boolean | undefined;
  role?: string | undefined;
  ariaHasPopup?: boolean | 'true' | 'menu' | 'dialog' | undefined;
  ariaControls?: string | undefined;
}

export function shyButtonAria({ toggled, toggleButton, role, ariaHasPopup, ariaControls }: ShyButtonAriaInput): ShyButtonAria {
  const state = toggled ? 'true' : 'false';
  const isRadio = role === 'radio';
  const opensPopup = !!ariaHasPopup || !!ariaControls;
  return {
    role: role || null,
    expanded: !isRadio && opensPopup ? state : null,
    checked: isRadio ? state : null,
    pressed: toggleButton ? state : null,
    haspopup: ariaHasPopup ? String(ariaHasPopup) : null,
    controls: ariaControls || null,
  };
}
