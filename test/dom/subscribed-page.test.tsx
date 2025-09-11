/// <reference lib="dom" />

import { describe, expect, it } from "bun:test";
import { screen } from "@testing-library/dom";
import { render } from "../_setup/render";
import { aSubscription } from "../builders";
import { Subscribed } from "../../src/subscription/web/subscribed-page";

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
describe("component: subscribed page", () => {
  it("renders the newly created subscription", () => {
    const subscription = aSubscription({
      startDate: new Date(2023, 2, 3),
      renewOn: new Date(2024, 2, 3),
    });

    const component = Subscribed({ subscription });
    render(component);

    expect(screen.getByRole("heading").textContent).toEqual(
      "Congratulations, you're subscribed",
    );
    expect(
      screen.getByText(`${subscription.planId}`, {
        exact: false,
      }),
    ).toBeVisible();
    expect(screen.getByText(`Starting: 03/03/2023`)).toBeVisible();
    expect(screen.getByText(`Renewing on: 03/03/2024`)).toBeVisible();
  });
});
