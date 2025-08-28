import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { err } from "neverthrow";
import { bootstrapDb } from "../../../src/plumbling/db";
import * as sdb from "../../../src/subscription/subscription-db";
import {
  type NewSubscription,
  subscribe,
  SubscriptionErrors,
} from "../../../src/subscription/subscription";

/**
 * Ensures the rules of subscriptions behaves as expected.
 *
 * Application architecture concept:
 *  - `DomainFn -> [DomainFn] -> Dependencies`
 *
 * Test boundary implementation:
 *  - `subscribe -> db -> Database`
 *  - `subscribe -> db(mock)`
 *
 * 1. The domain logic is the focus.
 * 2. A real database may be used.
 * 3. A mock for the database client may be used.
 */
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
