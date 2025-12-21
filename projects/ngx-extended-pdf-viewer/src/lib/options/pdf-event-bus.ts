export interface IEventBus {
  destroy(): void;
  on(eventName: string, listener: (event: any) => void, options?: { external?: boolean; once?: boolean; signal?: any }): void;
  off(eventName: string, listener: (event: any) => void): void;
  dispatch(eventName: string, options?: any): void;
}
