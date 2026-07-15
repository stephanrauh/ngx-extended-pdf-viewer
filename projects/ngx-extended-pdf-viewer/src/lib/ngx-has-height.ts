export interface NgxHasHeight {
  // `| undefined` is explicit so the component's `string | undefined` getters
  // satisfy this interface under `exactOptionalPropertyTypes: true` (#3239).
  // For normal TypeScript this is equivalent to `?: string`.
  height?: string | undefined;
  autoHeight: boolean;

  minHeight?: string | undefined;

  markForCheck(): void;
}
