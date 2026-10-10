export interface OptionalContentConfig {
    name: any;
    creator: any;
    _order: any;
    _groups: Map<any, any>;
    _evaluateVisibilityExpression(array: any): any;
    isVisible(group: any): any;
    setVisibility(id: any, visible?: boolean): void;
    getOrder(): any;
    getGroups(): any;
    getGroup(id: any): any;
}

export interface OptionalContentGroup {
  visible: boolean;
  name: string;
  intent: any;
}

export interface PdfLayer {
  layerId: string;
  name: string;
  visible: boolean;
}

/**
 * Lists the layers in the order of the PDF file, including the layers of nested groups.
 * `getOrder()` yields layer ids and, for a group, an object with the `order` of its members.
 */
export function listPdfLayers(optionalContentConfig: OptionalContentConfig): Array<PdfLayer> {
  const layers: Array<PdfLayer> = [];
  const collect = (order: Array<any> | null | undefined): void => {
    for (const entry of order ?? []) {
      if (typeof entry === 'object' && entry !== null) {
        collect(entry.order);
      } else {
        const group = optionalContentConfig.getGroup(entry);
        layers.push({ layerId: entry, name: group.name, visible: group.visible });
      }
    }
  };
  collect(optionalContentConfig.getOrder());
  return layers;
}
