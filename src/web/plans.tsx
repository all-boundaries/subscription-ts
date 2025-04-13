import type { Plan } from "../gateway/product-catalog-gateway";

export function Plans({ plans }: { plans: Array<Plan> }) {
  return <section class="grid">{plans.map((p) => PlanCard(p))}</section>;
}

function PlanCard(plan: Plan) {
  return (
    <article>
      <h4>{plan.name}</h4>
      {plan.description}
      <footer>
        <button class="secondary w-100">Subscribe</button>
      </footer>
    </article>
  );
}
