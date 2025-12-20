import { useState } from "react";
import { useBrowserLayoutEffect } from "./useBrowserLayoutEffect";

/**
 * React hook that subscribes to a CSS media query using the
 * `window.matchMedia()` API.
 * @param {string} mediaQueryString - A valid CSS media query string.
 * @param {boolean} [initialState] - Fallback value used for SSR. Defaults to `false`.
 * @returns {boolean} `true` if the media query matches, otherwise `false`.
 * @example
 * const isMedium = useMatchMedia("(max-width: 768px)");
 */
const useMatchMedia = (mediaQueryString, initialState = false) => {
  const [matches, setMatches] = useState(initialState);

  useBrowserLayoutEffect(() => {
    if (!window.matchMedia) return;

    const mediaQueryList = window.matchMedia(mediaQueryString);

    const update = () => setMatches(mediaQueryList.matches);
    update();

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", update);
      return () => mediaQueryList.removeEventListener("change", update);
    } else {
      mediaQueryList.addListener(update);
      return () => mediaQueryList.removeListener(update);
    }
  }, [mediaQueryString]);

  return matches;
};

export default useMatchMedia;
