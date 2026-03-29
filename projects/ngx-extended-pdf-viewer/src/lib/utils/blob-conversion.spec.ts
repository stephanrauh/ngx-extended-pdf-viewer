import { convertBlobToUint8Array } from './blob-conversion';

describe('convertBlobToUint8Array', () => {
  it('should convert a normal Blob to Uint8Array using arrayBuffer()', async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5]);
    const blob = new Blob([data]);

    const result = await convertBlobToUint8Array(blob);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(5);
    expect(Array.from(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should convert an empty Blob', async () => {
    const blob = new Blob([]);

    const result = await convertBlobToUint8Array(blob);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
  });

  it('should convert a text Blob', async () => {
    const blob = new Blob(['hello'], { type: 'text/plain' });

    const result = await convertBlobToUint8Array(blob);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(5);
    // 'hello' in UTF-8
    expect(Array.from(result)).toEqual([104, 101, 108, 108, 111]);
  });

  it('should convert a large Blob', async () => {
    const size = 10000;
    const data = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      data[i] = i % 256;
    }
    const blob = new Blob([data]);

    const result = await convertBlobToUint8Array(blob);

    expect(result.length).toBe(size);
    expect(result[0]).toBe(0);
    expect(result[255]).toBe(255);
    expect(result[256]).toBe(0);
  });

  it('should fall back to FileReader when arrayBuffer is not available', async () => {
    const data = new Uint8Array([10, 20, 30]);
    const blob = new Blob([data]);

    // Remove arrayBuffer to force FileReader fallback
    const originalArrayBuffer = blob.arrayBuffer;
    Object.defineProperty(blob, 'arrayBuffer', { value: undefined });

    const result = await convertBlobToUint8Array(blob);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([10, 20, 30]);

    // Restore
    Object.defineProperty(blob, 'arrayBuffer', { value: originalArrayBuffer });
  });

  it('should reject when FileReader returns null result', async () => {
    const blob = new Blob([new Uint8Array([1, 2])]);

    // Remove arrayBuffer to force FileReader fallback
    Object.defineProperty(blob, 'arrayBuffer', { value: undefined });

    // Mock FileReader to simulate a null result
    const originalFileReader = globalThis.FileReader;
    const mockFileReader = {
      onloadend: null as any,
      onerror: null as any,
      result: null,
      readAsArrayBuffer: jest.fn(function(this: any) {
        // Simulate onloadend with null result
        setTimeout(() => {
          if (this.onloadend) {
            this.onloadend();
          }
        }, 0);
      }),
    };

    globalThis.FileReader = jest.fn(() => mockFileReader) as any;

    await expect(convertBlobToUint8Array(blob)).rejects.toThrow('Error converting Blob to Uint8Array');

    globalThis.FileReader = originalFileReader;
  });

  it('should reject when FileReader encounters an error', async () => {
    const blob = new Blob([new Uint8Array([1, 2])]);

    // Remove arrayBuffer to force FileReader fallback
    Object.defineProperty(blob, 'arrayBuffer', { value: undefined });

    // Mock FileReader to simulate an error
    const originalFileReader = globalThis.FileReader;
    const mockFileReader = {
      onloadend: null as any,
      onerror: null as any,
      result: null,
      readAsArrayBuffer: jest.fn(function(this: any) {
        // Simulate onerror
        setTimeout(() => {
          if (this.onerror) {
            this.onerror();
          }
        }, 0);
      }),
    };

    globalThis.FileReader = jest.fn(() => mockFileReader) as any;

    await expect(convertBlobToUint8Array(blob)).rejects.toThrow('FileReader error');

    globalThis.FileReader = originalFileReader;
  });

  it('should handle Blob created from multiple parts', async () => {
    const part1 = new Uint8Array([1, 2]);
    const part2 = new Uint8Array([3, 4]);
    const blob = new Blob([part1, part2]);

    const result = await convertBlobToUint8Array(blob);

    expect(Array.from(result)).toEqual([1, 2, 3, 4]);
  });
});
