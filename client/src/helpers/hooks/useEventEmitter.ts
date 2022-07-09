import { useEffect } from "react";

export interface EventEmitter {
  on<T>(event: string, listener: (event: T) => void): void;
  once<T>(event: string, listener: (event: T) => void): void;
  removeListener<T>(event: string, listener: (event: T) => void): void;
  off<T>(event: string, listener: (event: T) => void): void;
}

/**
 * @function useEventEmitter
 * @description Slightly different than `useEvent`, this version of the function is
 * for Node's EventEmitter interface, as opposed to the browser EventTarget interface.
 * Otherwise, this works exactly the same.
 */
export default function useEventEmitter<T>(
  eventEmitter: EventEmitter | undefined,
  event: string,
  callback: (event: T) => void,
) {
  useEffect(() => {
    eventEmitter?.on(event, callback);
    return () => eventEmitter?.removeListener(event, callback);
  }, [eventEmitter, callback, event]);
}
