export interface ScaleChangingEvent {
  source: any; // Toolbar

  /** Numerical scale factor. If the page is displayed in original size, this scale equals 1.0. */
  scale: number;

  /** Prefefined value, or undefined, if the new scale is a percentage. */
  presetValue: 'auto' | 'page-actual' | 'page-fit' | 'page-width' | undefined;

  /** Previous numerical scale factor. If the page was displayed in original size, this scale equals 1.0. */
  previousScale: number;

  /** Previous prefefined value, or undefined, if a percentage was used. */
  previousPresetValue: 'auto' | 'page-actual' | 'page-fit' | 'page-width' | undefined;
}
