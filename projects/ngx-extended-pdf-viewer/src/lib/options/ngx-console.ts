export declare class INgxConsole {
  static log(...args: any[]): void;
  static error(...args: any[]): void;
  static warn(...args: any[]): void;
  static info(...args: any[]): void;
  static debug(...args: any[]): void;
  set ngxConsoleFilter(filter: (_level, _message) => boolean);

  reset(): void;
}
