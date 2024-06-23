export class NgxConsole {
  public static init() {
    if (!globalThis['ngxConsoleFilter']) {
      globalThis['ngxConsoleFilter'] = function (_level: string, _message: any): boolean {
        return true;
      };
    }
    if (!globalThis['ngxConsole']) {
      globalThis['ngxConsole'] = new NgxConsole();
    }
  }

  public log(message: any, reason?: any): void {
    const filter = globalThis['ngxConsoleFilter'] ?? (() => true);
    if (filter('log', message)) {
      if (reason !== undefined) {
        console.log('%s', message, reason);
      } else {
        console.log(message);
      }
    }
  }

  public error(message: any, reason?: any): void {
    const filter = globalThis['ngxConsoleFilter'] ?? (() => true);
    if (filter('error', message)) {
      if (reason !== undefined) {
        console.error('%s', message, reason);
      } else {
        console.error(message);
      }
    }
  }
  public warn(message: any, reason?: any): void {
    const filter = globalThis['ngxConsoleFilter'] ?? (() => true);
    if (filter('warn', message)) {
      if (reason !== undefined) {
        console.warn('%s', message, reason);
      } else {
        console.warn(message);
      }
    }
  }
}
