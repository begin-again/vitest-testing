import { expect, test } from "vitest";
import { getPostBody } from "../src/network";

test("getPostBody", async () => {
  const body = await getPostBody(1);

  expect(body).toMatchInlineSnapshot('"mocked for 1!"');
});
