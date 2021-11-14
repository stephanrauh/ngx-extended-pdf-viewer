Window['ngxConsoleFilter'] = (level: string, message: any): boolean => {
  return true;
}
export class NgxConsole {
  public log(message: any): void {
    if (Window['ngxConsoleFilter']('log', message)) {
      console.log(message);
    }
  }
  public error(message: any): void {
    if (Window['ngxConsoleFilter']('error', message)) {
      console.error(message);
    }

  }
  public warn(message: any): void {
    if (Window['ngxConsoleFilter']('warn', message)) {
      console.warn(message);
    }
  }
}

Window['ngxConsole'] = new NgxConsole();
