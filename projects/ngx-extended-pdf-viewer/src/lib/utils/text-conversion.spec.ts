import { convertTextInfoToText, TextInfoItem } from './text-conversion';

describe('convertTextInfoToText', () => {
  it('should return empty string for null/undefined input', () => {
    expect(convertTextInfoToText(null as any)).toBe('');
    expect(convertTextInfoToText(undefined as any)).toBe('');
  });

  it('should return empty string for empty array', () => {
    expect(convertTextInfoToText([])).toBe('');
  });

  it('should concatenate simple text items', () => {
    const items: TextInfoItem[] = [
      { str: 'Hello' },
      { str: ' ' },
      { str: 'World' },
    ];
    expect(convertTextInfoToText(items)).toBe('Hello World');
  });

  it('should add newlines for items with hasEOL', () => {
    const items: TextInfoItem[] = [
      { str: 'Line 1', hasEOL: true },
      { str: 'Line 2', hasEOL: true },
      { str: 'Line 3' },
    ];
    expect(convertTextInfoToText(items)).toBe('Line 1\nLine 2\nLine 3');
  });

  it('should filter out TextMarkedContent items (items with type property)', () => {
    const items: TextInfoItem[] = [
      { str: 'Hello' },
      { str: '', type: 'beginMarkedContent' },
      { str: 'World' },
      { str: '', type: 'endMarkedContent' },
    ];
    expect(convertTextInfoToText(items)).toBe('HelloWorld');
  });

  it('should handle items with hasEOL set to false', () => {
    const items: TextInfoItem[] = [
      { str: 'No EOL', hasEOL: false },
      { str: ' here' },
    ];
    expect(convertTextInfoToText(items)).toBe('No EOL here');
  });

  it('should handle empty strings in items', () => {
    const items: TextInfoItem[] = [
      { str: '' },
      { str: 'text' },
      { str: '' },
    ];
    expect(convertTextInfoToText(items)).toBe('text');
  });

  it('should handle items with only EOL markers', () => {
    const items: TextInfoItem[] = [
      { str: '', hasEOL: true },
      { str: '', hasEOL: true },
    ];
    expect(convertTextInfoToText(items)).toBe('\n\n');
  });

  it('should handle mixed content with marked content and EOL', () => {
    const items: TextInfoItem[] = [
      { str: 'Title', hasEOL: true },
      { str: '', type: 'beginMarkedContentProps' },
      { str: 'Body text' },
      { str: '', type: 'endMarkedContent' },
      { str: ' continues', hasEOL: true },
    ];
    expect(convertTextInfoToText(items)).toBe('Title\nBody text continues\n');
  });

  it('should handle single item', () => {
    expect(convertTextInfoToText([{ str: 'alone' }])).toBe('alone');
  });

  it('should handle single item with EOL', () => {
    expect(convertTextInfoToText([{ str: 'alone', hasEOL: true }])).toBe('alone\n');
  });

  it('should handle unicode text', () => {
    const items: TextInfoItem[] = [
      { str: 'Hallo ', hasEOL: false },
      { str: 'Welt' },
    ];
    expect(convertTextInfoToText(items)).toBe('Hallo Welt');
  });

  it('should handle special characters', () => {
    const items: TextInfoItem[] = [
      { str: 'Price: $100.00', hasEOL: true },
      { str: 'Tax: 8.5%' },
    ];
    expect(convertTextInfoToText(items)).toBe('Price: $100.00\nTax: 8.5%');
  });
});
