import { useState } from "react";
import { canUseMatchMedia } from "./canUseMatchMedia";
import { useBrowserLayoutEffect } from "./useBrowserLayoutEffect";

const useMatchMedia = (mediaQueryString, initialState = false) => {
  const [state, setState] = useState(() =>
    canUseMatchMedia
      ? window.matchMedia(mediaQueryString).matches
      : initialState,
  );

  useBrowserLayoutEffect(() => {
    if (canUseMatchMedia) {
      const mediaQueryList = window.matchMedia(mediaQueryString);

      const updateState = () => setState(mediaQueryList.matches);
      updateState();

      mediaQueryList.addListener(updateState);
      return () => mediaQueryList.removeListener(updateState);
    }
  }, [mediaQueryString]);

  return state;
};

export default useMatchMedia;
