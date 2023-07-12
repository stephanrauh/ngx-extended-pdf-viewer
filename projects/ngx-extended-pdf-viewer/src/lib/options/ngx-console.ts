globalThis['ngxConsoleFilter'] = (_level: string, _message: any): boolean => {
  return true;
};
export class NgxConsole {
  public log(message: any, reason?: any): void {
    if (globalThis['ngxConsoleFilter']('log', message)) {
      console.log(message, reason);
    }
  }
  public error(message: any, reason?: any): void {
    if (globalThis['ngxConsoleFilter']('error', message)) {
      console.error(message, reason);
    }
  }
  public warn(message: any, reason?: any): void {
    if (globalThis['ngxConsoleFilter']('warn', message)) {
      console.warn(message, reason);
    }
  }
}

globalThis['ngxConsole'] = new NgxConsole();
