export class NgxConsole {
  public filter = (level: string, message: any): boolean => {
    return false;
  }

  public log(message: any): void {
    console.log(message);
  }
  public error(message: any): void {
    console.error(message);
  }
  public warn(message: any): void {
    console.warn(message);
  }
}

window['ngxConsole'] = new NgxConsole();
