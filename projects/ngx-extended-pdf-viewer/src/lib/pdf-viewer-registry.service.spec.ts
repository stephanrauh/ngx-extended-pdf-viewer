import { PdfViewerRegistry } from './pdf-viewer-registry.service';

describe('PdfViewerRegistry (#3306)', () => {
  let registry: PdfViewerRegistry;
  const first = { printPdfInThisViewer: jest.fn() };
  const second = { printPdfInThisViewer: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    registry = new PdfViewerRegistry();
    registry.register(first);
    registry.register(second);
  });

  it('makes the oldest live viewer the primary one', () => {
    expect(registry.primary()).toBe(first);
    expect(registry.count()).toBe(2);
    registry.unregister(first);
    expect(registry.primary()).toBe(second);
    expect(registry.count()).toBe(1);
  });

  it('makes the primary viewer the active one until the user works with another one', () => {
    expect(registry.active()).toBe(first);
    registry.activate(second);
    expect(registry.active()).toBe(second);
  });

  it('falls back to the primary viewer when the active one is destroyed', () => {
    registry.activate(second);
    registry.unregister(second);
    expect(registry.active()).toBe(first);
  });

  it('prints the active viewer', () => {
    registry.print();
    expect(first.printPdfInThisViewer).toHaveBeenCalledTimes(1);
    registry.activate(second);
    registry.print();
    expect(second.printPdfInThisViewer).toHaveBeenCalledTimes(1);
    expect(first.printPdfInThisViewer).toHaveBeenCalledTimes(1);
  });

  it("remembers the browser's window.print(), even after a viewer has replaced it", () => {
    const nativePrint = window.print;
    window.print = registry.print;
    try {
      expect(registry.nativePrint).toBe(nativePrint);
    } finally {
      window.print = nativePrint;
    }
  });

  it('knows whether a live viewer prints with pdf.js', () => {
    const printsWithPdfJs = { replaceBrowserPrint: () => true };
    const printsWithTheBrowser = { replaceBrowserPrint: () => false };
    registry.unregister(first);
    registry.unregister(second);
    expect(registry.someViewerPrintsWithPdfJs()).toBe(false);
    registry.register(printsWithTheBrowser);
    expect(registry.someViewerPrintsWithPdfJs()).toBe(false);
    registry.register(printsWithPdfJs);
    expect(registry.someViewerPrintsWithPdfJs()).toBe(true);
    registry.unregister(printsWithPdfJs);
    expect(registry.someViewerPrintsWithPdfJs()).toBe(false);
  });

  it('does nothing when there is no viewer', () => {
    registry.unregister(first);
    registry.unregister(second);
    expect(() => registry.print()).not.toThrow();
  });
});
