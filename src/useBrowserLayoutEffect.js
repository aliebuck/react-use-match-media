import { useLayoutEffect } from "react";
import { isBrowser } from "./isBrowser";

export const useBrowserLayoutEffect = isBrowser ? useLayoutEffect : () => {};
