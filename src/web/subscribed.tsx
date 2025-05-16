import type { Subscription } from "../subscription/subscription";

export function Subscribed({ subscription }: { subscription: Subscription }) {
  return (
    <section>
      <h2>Congratulations, you're subscribed</h2>

      <p>#{subscription.planId}</p>
      <p>Starting: {subscription.startDate}</p>
      <p>Renewing on: {subscription.renewOn}</p>
    </section>
  );
}
