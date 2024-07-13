export interface IEventBus {
  destroy(): void;
  on(eventName: string, listener: (event: any) => void, options?: { external?: boolean; once?: boolean; signal?: any });
  off(eventName: string, listener: (event: any) => void);
  dispatch(eventName: string, options?: any): void;
}
