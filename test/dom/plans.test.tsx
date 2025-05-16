/// <reference lib="dom" />

import { describe, expect, it } from "bun:test";
import { screen, within } from "@testing-library/dom";
import { Plans } from "../../src/web/plans";
import type { Plan } from "../../src/gateway/product-catalog-gateway";
import { faker } from "@faker-js/faker";
import { render } from "../_setup/render";

describe("web: plans", () => {
  it("displays the plan information for subscription with action to subscribe", () => {
    const plan1 = planBuilder();
    const plan2 = planBuilder();
    const plans = [plan1, plan2];

    const component = Plans({ plans });
    render(component);

    const renderedPlans = screen.getAllByRole("article");

    for (const plan of renderedPlans) {
      const name = within(plan).getByRole("heading");
      const form = within(plan).getByRole("form", { name: "subscribe" });
      const description = within(plan).getByRole("paragraph");
      const button = within(plan).getByRole("button");
      const [planId, userId] = within(plan).getAllByRole("textbox", {
        hidden: true,
      });

      const source = [plan1, plan2].find((a) => a.name === name.textContent)!;

      expect(name.textContent).toEqual(source.name);
      expect(description.textContent).toEqual(source.description);
      expect(button.textContent).toEqual("Subscribe");
      expect(form.getAttribute("hx-post")).toEqual("/subscriptions");
      expect(form.getAttribute("hx-push-url")).toEqual("/subscriptions");
      expect(form.getAttribute("hx-target")).toEqual("body");
      expect(planId?.getAttribute("value")).toEqual(source.id);
      expect(userId?.getAttribute("value")).toEqual("usr-lksajfd");
    }
  });
});

function planBuilder(overwrites?: Partial<Plan>): Plan {
  return {
    id: faker.helpers.fromRegExp("[a-d0-6]{5,10}"),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    status: faker.helpers.arrayElement(["active", "inactive"]),
    specs: [],
    tags: [],
    ...overwrites,
  };
}
