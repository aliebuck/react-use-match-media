import { useLayoutEffect } from "react";
import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
});

test("is `React.useLayoutEffect` when in browser environment", async () => {
  vi.doMock("../isBrowser", () => ({
    isBrowser: true,
  }));
  const { useBrowserLayoutEffect } = await import("../useBrowserLayoutEffect");
  expect(useBrowserLayoutEffect).toBe(useLayoutEffect);
});

test("is noop when not in browser environment", async () => {
  vi.doMock("../isBrowser", () => ({
    isBrowser: false,
  }));
  const { useBrowserLayoutEffect } = await import("../useBrowserLayoutEffect");
  expect(useBrowserLayoutEffect).not.toBe(useLayoutEffect);
  const setup = vi.fn();
  useBrowserLayoutEffect(setup);
  expect(setup).not.toHaveBeenCalled();
});
