import { isBrowser } from "./isBrowser";

/**
 * `true` when in browser and `window.matchMedia()` is available.
 * @type {boolean}
 */
export const canUseMatchMedia =
  isBrowser && typeof window.matchMedia === "function";
