export class NgxConsole {
    static ngxConsoleFilter: (_level: any, _message: any) => boolean;
    static log(message: any, reason: any): void;
    static error(message: any, reason: any): void;
    static warn(message: any, reason: any): void;
    static debug(message: any, reason: any): void;
    set ngxConsoleFilter(filter: (_level: any, _message: any) => boolean);
    get ngxConsoleFilter(): (_level: any, _message: any) => boolean;
    reset(): void;
}
