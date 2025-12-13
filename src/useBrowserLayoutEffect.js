import { useLayoutEffect } from "react";
import { isBrowser } from "./isBrowser";

const noop = () => {};

/**
 * `useLayoutEffect` that only runs in the browser.
 * On the server (SSR), this hook is a no-op to avoid warnings.
 * @type {typeof useLayoutEffect | (() => void)}
 */
export const useBrowserLayoutEffect = isBrowser ? useLayoutEffect : noop;
