import { describe, test } from "bun:test";

describe("subscription", () => {
  test.todo("creates new subscription", () => {});

  test.todo(
    "returns error when trying to subscribe with an active subscription",
    () => {},
  );

  test.todo(
    "returns error when trying to subscribe with a cancelled active subscription",
    () => {},
  );

  test.todo("cancels subscription when active", () => {});

  test.todo(
    "returns error when cancelling already cancelled subscription",
    () => {},
  );

  test.todo(
    "returns error when cancelling already ended subscription ",
    () => {},
  );
});
