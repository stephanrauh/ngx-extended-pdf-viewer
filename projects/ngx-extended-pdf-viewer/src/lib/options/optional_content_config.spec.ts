import { listPdfLayers, OptionalContentConfig } from './optional_content_config';

describe('listPdfLayers', () => {
  const groups: Record<string, { name: string; visible: boolean }> = {
    '1R': { name: 'Text', visible: true },
    '2R': { name: 'Images', visible: false },
    '3R': { name: 'French', visible: true },
    '4R': { name: 'German', visible: false },
  };
  const configWithOrder = (order: Array<any> | null): OptionalContentConfig =>
    ({
      getOrder: () => order,
      getGroup: (id: string) => groups[id],
    }) as unknown as OptionalContentConfig;

  it('lists the layers in the order of the PDF file', () => {
    expect(listPdfLayers(configWithOrder(['2R', '1R']))).toEqual([
      { layerId: '2R', name: 'Images', visible: false },
      { layerId: '1R', name: 'Text', visible: true },
    ]);
  });

  it('includes the layers of nested groups', () => {
    const order = ['1R', { name: 'Languages', order: ['3R', { name: null, order: ['4R'] }] }, '2R'];
    expect(listPdfLayers(configWithOrder(order)).map((layer) => layer.layerId)).toEqual(['1R', '3R', '4R', '2R']);
  });

  it('returns an empty list when the document has no layers', () => {
    expect(listPdfLayers(configWithOrder(null))).toEqual([]);
  });
});
