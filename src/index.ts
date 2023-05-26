/**
 * Deep merges two objects to create a new object
 * @param {object|array} a
 * @param {object|array} b
 * @return {object|array}
 */
export const deepMerge = (
  a: object | Array<unknown>,
  b: object | Array<unknown>
): object | Array<unknown> => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }

  if (typeof a !== "object" || typeof b !== "object") {
    throw new Error("Can not merge two different types");
  }

  const merged = { ...a };
  for (const key of Object.keys(b)) {
    if (typeof a[key] === "object" || Array.isArray(a)) {
      merged[key] = deepMerge(a[key], b[key]);
    } else {
      merged[key] = b[key];
    }
  }
  return merged;
};

export const greeting = (name: string) => {
  console.log(`Hello, ${name}`);
};

import { readFileSync, existsSync } from "node:fs";

export const loadConfig = () => {
  if (!existsSync("./config.json")) return undefined;
  return JSON.parse(readFileSync("./config.json", "utf8"));
};

export const getCurrentTime = () => {
  return new Date().toTimeString().slice(0, 5);
};

export const warnLater = (message: string) => {
  setTimeout(() => {
    console.log(message);
  }, 2_000);
};
