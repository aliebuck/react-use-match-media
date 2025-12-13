import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete global.window;
});

test("returns `true` when `window` global is defined", async () => {
  global.window = {};
  const { isBrowser } = await import("../isBrowser");
  expect(isBrowser).toBe(true);
});

test("returns `false` when `window` global is undefined", async () => {
  expect(global.window).toBeUndefined();
  const { isBrowser } = await import("../isBrowser");
  expect(isBrowser).toBe(false);
});
