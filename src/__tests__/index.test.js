// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import matchMediaMock from "match-media-mock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
});

describe("window.matchMedia is supported", () => {
  let useMatchMedia;

  beforeEach(async () => {
    window.matchMedia = matchMediaMock.create();
    window.matchMedia.setConfig({ type: "screen", width: 1200 });
    useMatchMedia = (await import("..")).default;
  });

  afterEach(() => {
    delete window.matchMedia;
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
      window.matchMedia.setConfig({ type: "screen", width: 1600 });
    });

    expect(result.current).toBe(false);
  });
});

describe("window.matchMedia is not supported", () => {
  let useMatchMedia;

  beforeEach(async () => {
    useMatchMedia = (await import("..")).default;
  });

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
