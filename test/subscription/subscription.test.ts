import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { bootstrapDb } from "../../src/plumbling/db";
import * as sdb from "../../src/subscription/subscription-db.ts";
import {
  subscribe,
  SubscriptionErrors,
  type NewSubscription,
} from "../../src/subscription/subscription";
import { err } from "neverthrow";

describe("subscription", () => {
  beforeEach(() => bootstrapDb());

  it("creates new subscription", () => {
    const newSubscription: NewSubscription = {
      userId: "usr-blah",
      planId: "pln-blah",
      startDate: new Date(),
    };

    const subscription = subscribe(newSubscription);

    expect(subscription.isOk()).toBeTrue();
    expect(subscription._unsafeUnwrap()).toMatchObject({
      userId: "usr-blah",
      planId: "pln-blah",
      startDate: new Date(),
      id: expect.any(String),
      renewOn: expect.any(Date),
      status: "active",
    });
  });

  it("returns error when creating the subscription fails", () => {
    spyOn(sdb, "save").mockReturnValueOnce(
      err({ code: "db-1", details: "ops" }),
    );

    const newSubscription: NewSubscription = {
      userId: "usr-blah",
      planId: "pln-blah",
      startDate: new Date(),
    };

    const subscription = subscribe(newSubscription);

    expect(subscription.isErr()).toBeTrue();
    expect(subscription._unsafeUnwrapErr()).toEqual({
      ...SubscriptionErrors.UnableToSubscribe,
      details: "ops",
    });
  });

  it.todo(
    "returns error when trying to subscribe with an active subscription",
    () => {},
  );

  it.todo(
    "returns error when trying to subscribe with a cancelled active subscription",
    () => {},
  );

  it.todo("cancels subscription when active", () => {});

  it.todo(
    "returns error when cancelling already cancelled subscription",
    () => {},
  );

  it.todo(
    "returns error when cancelling already ended subscription ",
    () => {},
  );
});
