import { describe, expect, test, vi } from "vitest";
import {
  deepMerge,
  greeting,
  loadConfig,
  getCurrentTime,
  warnLater,
} from "../src/index";

vi.mock("node:fs", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("node:fs");
  return {
    ...actual,
    readFileSync() {
      return '{"name": "mocked"}';
    },
    existsSync() {
      return true;
    },
  };
});
vi.useFakeTimers();

describe("Deep Merge", () => {
  test("shallow merge", () => {
    const a = { name: "todd" };
    const b = { github: "begin" };
    const expected = { name: "todd", github: "begin" };

    expect(deepMerge(a, b)).toEqual(expected);
  });
  test("shallow merge with overlap", () => {
    const a = { name: "todd", github: "sam" };
    const b = { github: "begin" };
    const expected = { name: "todd", github: "begin" };

    expect(deepMerge(a, b)).toEqual(expected);
  });
  test("shallow merge with arrays", () => {
    const a = ["vue", "react"];
    const b = ["dog", "cat"];
    const expected = [...a, ...b];

    expect(deepMerge(a, b)).toEqual(expected);
  });
  test("deep merge with overlaps", () => {
    const a = {
      name: "todd",
      accounts: { github: "unknown" },
      languages: ["javascript"],
    };
    const b = {
      accounts: { twitter: "abc" },
      languages: ["typescript", "vue"],
    };

    expect(deepMerge(a, b)).toMatchInlineSnapshot(`
          {
            "accounts": {
              "github": "unknown",
              "twitter": "abc",
            },
            "languages": [
              "javascript",
              "typescript",
              "vue",
            ],
            "name": "todd",
          }
        `);
  });
  test("throws an error on merging two different types", () => {
    const a = ["foo", "bar"];
    const b = { foo: "bar" };

    expect(() => deepMerge(a, b)).toThrowError(
      "Can not merge two different types"
    );
  });
});
describe("greeting", () => {
  test("greeting", () => {
    const spy = vi.spyOn(console, "log");

    greeting("world");
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("Hello, world");

    spy.mockReset();
    greeting("todd");
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("Hello, todd");

    expect(spy).toMatchInlineSnapshot(`
          [MockFunction log] {
            "calls": [
              [
                "Hello, todd",
              ],
            ],
            "results": [
              {
                "type": "return",
                "value": undefined,
              },
            ],
          }
        `);
  });
});
describe("loadConfig", () => {
  test("load file", async () => {
    const result = await loadConfig();

    expect(result).toEqual({ name: "mocked" });
  });
  test("load file", async () => {
    const result = await loadConfig();

    expect(result).toEqual({ name: "mocked" });
  });
});
describe("getCurrentTime", () => {
  test("time", () => {
    vi.setSystemTime(new Date("2021-08-01 14:13"));
    expect(getCurrentTime()).toBe("14:13");
  });
});
describe("warnLater", () => {
  test("warnLater", () => {
    const spy = vi.spyOn(console, "log");
    warnLater("hello");

    expect(spy).not.toBeCalled();

    vi.advanceTimersByTime(2_000);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("hello");
  });
});
