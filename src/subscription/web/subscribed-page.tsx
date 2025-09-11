import type { Subscription } from "../subscription";

export function Subscribed({ subscription }: { subscription: Subscription }) {
  const startDate = friendlyDate(subscription.startDate);
  const renewOn = friendlyDate(subscription.renewOn);

  return (
    <section>
      <h2>Congratulations, you're subscribed</h2>

      <p>#{subscription.planId}</p>
      <p>Starting: {startDate}</p>
      <p>Renewing on: {renewOn}</p>
    </section>
  );
}

function friendlyDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
  }).format(date);
}
