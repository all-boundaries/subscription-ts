import { err, type Result } from "neverthrow";
import { id } from "../plumbling/id-creation";
import { findActiveByUserId, save } from "./subscription-db";

export type NewSubscription = {
  userId: string;
  planId: string;
  startDate: Date;
};

export type Subscription = NewSubscription & {
  id: string;
  renewOn: Date;
  status: "active" | "cancelled" | "ended";
};

type NoSubscription = {
  status: "dontexist";
};
function noSubscription(): NoSubscription {
  return { status: "dontexist" };
}

export type CreateSubscription = { type: "subscribe"; data: NewSubscription };
export type CancelSubscription = { type: "cancel"; data: CancelSubscription };
export type SubscriptionAction = CreateSubscription | CancelSubscription;

export type SubscriptionError = {
  code: string;
  message: string;
  details?: string;
};
export const SubscriptionErrors = {
  AlreadySubscribed: { code: "sub-1", message: "already subscribed" },
  NoActiveSubscription: {
    code: "sub-2",
    message: "user does not have active subscription",
  },
  UnableToSubscribe: { code: "sub-3", message: "unabled create subscription" },
};

function transition(
  subscription: Subscription | NoSubscription,
  action: SubscriptionAction,
): Result<Subscription, SubscriptionError> {
  switch (subscription.status) {
    case "dontexist":
      switch (action.type) {
        case "subscribe":
          return createSubscription(action);
      }
  }
  return err({ code: "imp-1", message: "not implemented" });
}

function createSubscription(
  action: CreateSubscription,
): Result<Subscription, SubscriptionError> {
  const naiveRenewOn = new Date(action.data.startDate);
  naiveRenewOn.setFullYear(naiveRenewOn.getFullYear() + 1);

  const subscription: Subscription = {
    ...action.data,
    id: id("sub"),
    renewOn: naiveRenewOn,
    status: "active",
  };

  return save(subscription).mapErr((e) => {
    return { ...SubscriptionErrors.UnableToSubscribe, details: e.details };
  });
}

export function subscribe(
  newSubscription: NewSubscription,
): Result<Subscription, SubscriptionError> {
  const subscription = findActiveByUserId(newSubscription.userId).match(
    (s) => s,
    () => {
      return noSubscription();
    },
  );

  return transition(subscription, { type: "subscribe", data: newSubscription });
}
