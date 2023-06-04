globalThis['ngxConsoleFilter'] = (_level: string, _message: any): boolean => {
  return true;
};
export class NgxConsole {
  public log(message: any): void {
    if (globalThis['ngxConsoleFilter']('log', message)) {
      console.log(message);
    }
  }
  public error(message: any): void {
    if (globalThis['ngxConsoleFilter']('error', message)) {
      console.error(message);
    }
  }
  public warn(message: any): void {
    if (globalThis['ngxConsoleFilter']('warn', message)) {
      console.warn(message);
    }
  }
}

globalThis['ngxConsole'] = new NgxConsole();
