import { beforeEach, describe, expect, it } from "bun:test";
import {
  findActiveByUserId,
  save,
} from "../../../src/subscription/subscription-db";
import { id } from "../../../src/plumbling/id-creation";
import { bootstrapDb } from "../../../src/plumbling/db";
import { SubscriptionErrors } from "../../../src/subscription/subscription";

/**
 * Ensures the queries returns what's expected.
 *
 * Application architecture concept:
 *   - `QueryFn -> StorageClient -> Storage System`
 *
 * Test boundary implementation:
 *   - `findActiveByUserId -> db -> database`
 *
 * 1. A real database is used (only for the tests).
 * 2. Data is added to simulate the desired scenario.
 * 3. The query function is executed against the database.
 */
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
