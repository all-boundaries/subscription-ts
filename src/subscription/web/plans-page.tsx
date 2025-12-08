import { allProducts } from "../../gateway/product-catalog-gateway";
import type { Plan } from "../plans";

export async function Plans({ plans }: { plans: Array<Plan> }) {
  const plansWithProducts = (await Promise.allSettled(plans.map(PlanCard)))
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  return <section class="grid">{plansWithProducts}</section>;
}

async function PlanCard(plan: Plan) {
  return (
    <article>
      <form
        aria-label="subscribe"
        hx-post="/subscriptions"
        hx-push-url="/subscriptions"
        hx-target="body"
      >
        <input
          type="text"
          aria-hidden="true"
          aria-label="planId"
          name="planId"
          value={plan.id}
          hidden
        />
        <input type="text" name="userId" value="usr-lksajfd" hidden />
        <h4>{plan.name}</h4>
        <p>{plan.description}</p>
        <footer>
          <button class="secondary w-100">Subscribe</button>
        </footer>
      </form>
    </article>
  );
}
