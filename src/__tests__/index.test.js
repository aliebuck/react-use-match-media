// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { cleanup, matchMedia, setMedia } from "mock-match-media";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import useMatchMedia from "..";

describe("window.matchMedia is supported", () => {
  beforeEach(async () => {
    window.matchMedia = matchMedia;
    setMedia({ type: "screen", width: 1200 });
  });

  afterEach(() => {
    delete window.matchMedia;
    cleanup();
  });

  test("returns true if mediaQueryString matches", () => {
    const { result } = renderHook(() => useMatchMedia("(max-width: 1280px)"));
    expect(result.current).toBe(true);
  });

  test("returns false if mediaQueryString does not match and initialState is set", () => {
    const { result } = renderHook(() =>
      useMatchMedia("(max-width: 1024px)", true),
    );
    expect(result.current).toBe(false);
  });

  test("handles mediaQueryString change", () => {
    const { rerender, result } = renderHook(
      ({ mediaQueryString }) => useMatchMedia(mediaQueryString),
      { initialProps: { mediaQueryString: "(max-width: 1280px)" } },
    );
    expect(result.current).toBe(true);
    rerender({ mediaQueryString: "(max-width: 1024px)" });
    expect(result.current).toBe(false);
  });

  test("listens to MediaQueryList changes", () => {
    const { result } = renderHook(() => useMatchMedia("(max-width: 1280px)"));
    expect(result.current).toBe(true);
    act(() => {
      setMedia({ type: "screen", width: 1600 });
    });
    expect(result.current).toBe(false);
  });

  test("listens to MediaQueryList changes with legacy addListener", () => {
    window.matchMedia = (query) => {
      const mediaQueryList = matchMedia(query);
      delete mediaQueryList.addEventListener;
      delete mediaQueryList.removeEventListener;
      return mediaQueryList;
    };
    const { result } = renderHook(() => useMatchMedia("(max-width: 1280px)"));
    expect(result.current).toBe(true);
    act(() => {
      setMedia({ type: "screen", width: 1600 });
    });
    expect(result.current).toBe(false);
  });
});

describe("window.matchMedia is not supported", () => {
  test("returns false", () => {
    const { result } = renderHook(() => useMatchMedia("(max-width: 1280px)"));
    expect(result.current).toBe(false);
  });

  test("returns initialState if set", () => {
    const { result } = renderHook(() =>
      useMatchMedia("(max-width: 1280px)", true),
    );
    expect(result.current).toBe(true);
  });
});
