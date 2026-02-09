/**
 * Creates a mock EventBus that honors AbortSignal for listener removal.
 *
 * Unlike a plain `jest.fn()` mock, dispatching an event after the listener's
 * signal has been aborted will **not** invoke the handler, which lets tests
 * prove that `ngOnDestroy` / re-init actually unsubscribes listeners.
 */
export function createSignalAwareEventBus() {
  const listeners = new Map<string, Set<{ handler: Function }>>();

  const on = jest.fn(
    (event: string, handler: Function, options?: { signal?: AbortSignal }) => {
      if (options?.signal?.aborted) return;

      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      const entry = { handler };
      listeners.get(event)!.add(entry);

      if (options?.signal) {
        options.signal.addEventListener('abort', () => {
          listeners.get(event)?.delete(entry);
        });
      }
    },
  );

  const dispatch = jest.fn((event: string, data?: any) => {
    const entries = listeners.get(event);
    if (entries) {
      entries.forEach(({ handler }) => handler(data));
    }
  });

  return {
    on,
    dispatch,
    destroy: jest.fn(),
    /** Number of active (non-aborted) listeners for the given event. */
    getListenerCount(event: string): number {
      return listeners.get(event)?.size ?? 0;
    },
  };
}

export type SignalAwareEventBus = ReturnType<typeof createSignalAwareEventBus>;
