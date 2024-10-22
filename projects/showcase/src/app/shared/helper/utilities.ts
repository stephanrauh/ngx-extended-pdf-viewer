export function isLocalhost(): boolean {
  if (!isBrowser()) {
    return false;
  }
  return location.hostname === 'localhost';
}

/**
 * Checks if the code is running in a browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
