import { beforeEach, expect, test, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  delete global.window;
});

test("returns `true` when in browser environment with `window.matchMedia`", async () => {
  global.window = { matchMedia: () => {} };
  vi.doMock("../isBrowser", () => ({ isBrowser: true }));
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(true);
});

test("returns `false` when in browser environment without `window.matchMedia`", async () => {
  global.window = { matchMedia: undefined };
  vi.doMock("../isBrowser", () => ({ isBrowser: true }));
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(false);
});

test("returns `false` when not in browser environment", async () => {
  vi.doMock("../isBrowser", () => ({ isBrowser: false }));
  const { canUseMatchMedia } = await import("../canUseMatchMedia");
  expect(canUseMatchMedia).toBe(false);
});
