import { useState } from "react";
import { canUseMatchMedia } from "./canUseMatchMedia";
import { useBrowserLayoutEffect } from "./useBrowserLayoutEffect";

const useMatchMedia = (mediaQueryString, initialState = false) => {
  const [matches, setMatches] = useState(() => {
    if (!canUseMatchMedia) return initialState;
    return window.matchMedia(mediaQueryString).matches;
  });

  useBrowserLayoutEffect(() => {
    if (!canUseMatchMedia) return;

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
