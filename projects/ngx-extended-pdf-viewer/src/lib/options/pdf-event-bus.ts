export interface IEventBus {
  _listeners: Map<string, (event: any) => void>;
  on(eventName: string, listener: (event: any) => void);
  off(eventName: string, listener: (event: any) => void);
  dispatch(eventName: string, options?: any): void;
}
