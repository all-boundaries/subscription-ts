import { beforeEach, describe, expect, it } from "bun:test";
import {
  findActiveByUserId,
  save,
} from "../../src/subscription/subscription-db";
import { id } from "../../src/plumbling/id-creation";
import { bootstrapDb } from "../../src/plumbling/db";
import { SubscriptionErrors } from "../../src/subscription/subscription";

describe("db: subscription", () => {
  beforeEach(() => bootstrapDb());

  describe("#findActiveByUserId", () => {
    it("returns active subscription when exist", () => {
      save({
        userId: "usr-blah",
        planId: "pln-blah",
        startDate: new Date(),
        id: id("sub"),
        renewOn: new Date(),
        status: "active",
      });

      expect(findActiveByUserId("usr-blah").isOk()).toBeTrue();
    });

    it("returns error when no active subscription exist", () => {
      const result = findActiveByUserId("usr-blah");

      expect(result.isErr()).toBeTrue();
      expect(result._unsafeUnwrapErr()).toEqual(
        SubscriptionErrors.NoActiveSubscription,
      );
    });
  });
});
