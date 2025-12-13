import { useLayoutEffect } from "react";
import { beforeEach, expect, test, vi } from "vitest";

vi.mock("react", () => ({
  useLayoutEffect: vi.fn(),
}));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  delete global.window;
});

test("is useLayoutEffect in when `window` global is defined", async () => {
  global.window = {};
  const { default: useBrowserLayoutEffect } =
    await import("../useBrowserLayoutEffect");
  expect(useBrowserLayoutEffect).toBe(useLayoutEffect);
});

test("is noop in when `window` global is undefined", async () => {
  expect(global.window).toBeUndefined();
  const { default: useBrowserLayoutEffect } =
    await import("../useBrowserLayoutEffect");
  expect(useBrowserLayoutEffect).not.toBe(useLayoutEffect);
  useBrowserLayoutEffect(() => {});
  expect(useLayoutEffect).not.toHaveBeenCalled();
});
