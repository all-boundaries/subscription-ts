/// <reference lib="dom" />

import { describe, expect, it } from "bun:test";
import { screen, within } from "@testing-library/dom";
import { render } from "../_setup/render";
import { Plans } from "../../src/subscription/web/plans-page";
import { planBuilder } from "../builders";

/**
 * Ensures the plans page has the expected information
 *
 * Application architecture concept:
 *   - `Browser -> Page`
 *
 * Test boundary implementation:
 *   - `Expected Data -> RenderFn -> Page`
 *
 * 1. The page structure is the focus.
 * 2. The expected data is provided.
 * 3. Render the page with the data provided.
 * 4. Assertions check if the data is displayed in the appropriate place.
 */
describe("web: plans", () => {
  it("renders the plan information for subscription with action to subscribe", () => {
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
