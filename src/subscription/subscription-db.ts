import { err, ok, Result } from "neverthrow";
import { db } from "../plumbling/db";
import {
  SubscriptionErrors,
  type Subscription,
  type SubscriptionError,
} from "../subscription/subscription";

type DbError = { code: string; details: string };

function findActiveByUserId(
  id: string,
): Result<Subscription, SubscriptionError> {
  const query = db.prepare(
    "select id from subscription where user_id = $userId and status in ('active', 'cancelled')",
  );

  const subscription = query.get({ userId: id });

  if (subscription) {
    return ok(subscription as Subscription);
  } else {
    return err(SubscriptionErrors.NoActiveSubscription);
  }
}

function save(subscription: Subscription): Result<Subscription, DbError> {
  const stmt = db.query(
    "insert into subscription values ($id, $planId, $userId, $startDate, $renewOn, $status)",
  );

  try {
    stmt.run({
      id: subscription.id,
      planId: subscription.planId,
      userId: subscription.userId,
      startDate: subscription.startDate.toUTCString(),
      renewOn: subscription.renewOn.toUTCString(),
      status: subscription.status,
    });
    return ok(subscription);
  } catch (e) {
    return err({ code: "db-1", details: String(e) });
  }
}

export { save, findActiveByUserId };
