import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete global.window;
});

test("is `true` when `window` global is defined", async () => {
  global.window = {};
  const { isBrowser } = await import("../isBrowser");
  expect(isBrowser).toBe(true);
});

test("is `false` when `window` global is undefined", async () => {
  expect(global.window).toBeUndefined();
  const { isBrowser } = await import("../isBrowser");
  expect(isBrowser).toBe(false);
});
