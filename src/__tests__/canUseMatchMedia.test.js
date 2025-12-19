import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete global.window;
});

test("is `true` when in browser environment with `window.matchMedia`", async () => {
  global.window = { matchMedia: () => {} };
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(true);
});

test("is `false` when in browser environment without `window.matchMedia`", async () => {
  global.window = { matchMedia: undefined };
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(false);
});

test("is `false` when not in browser environment", async () => {
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(false);
});
