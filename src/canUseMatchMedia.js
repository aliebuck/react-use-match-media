import { isBrowser } from "./isBrowser";

export const canUseMatchMedia =
  isBrowser && typeof window.matchMedia === "function";
