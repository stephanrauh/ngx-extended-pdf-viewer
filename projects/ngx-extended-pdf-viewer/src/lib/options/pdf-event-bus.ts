export interface IEventBus {
  destroy(): void;
  on(eventName: string, listener: (event: any) => void);
  off(eventName: string, listener: (event: any) => void);
  dispatch(eventName: string, options?: any): void;
}
