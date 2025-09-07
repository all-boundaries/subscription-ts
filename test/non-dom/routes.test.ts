import { describe, it, expect, beforeAll, afterAll, spyOn } from "bun:test";
import { fetch } from "bun";
import { serverDefinition } from "../../src/routes.ts";
import * as subscription from "../../src/subscription/subscription.ts";
import * as plan from "../../src/subscription/plans.ts";
import { err, ok } from "neverthrow";
import { parseHTML } from "linkedom";
import { aPlan, aSubscription } from "../builders.ts";

/**
 * Ensures the server returns the appropriate responses.
 *
 * Application architecture concept:
 *   - `User/Browser -> HttpServer -> Domain`
 *
 * Test boundary implementation:
 *   - `route -> mock(domain)`
 *
 * 1. A real call to the route.
 * 2. Mock return from the domain logic.
 * 3. Check if the HTTP server returns the expected output.
 */
describe("web: routes", () => {
  let server: Bun.Server;

  beforeAll(() => {
    server = Bun.serve({ ...serverDefinition });
  });

  afterAll(() => server.stop());

  it("displays available subscriptions plans", async () => {
    spyOn(plan, "allPlans").mockReturnValueOnce([aPlan(), aPlan()]);
    const response = await fetch(new URL("/", server.url));

    const body = await response.text();
    const { document } = parseHTML(body);

    expect(response.status).toEqual(200);
    expect(
      document.querySelectorAll("article").entries().toArray(),
    ).toHaveLength(2);
  });

  it("displays congratulations page after successful subscription", async () => {
    spyOn(subscription, "subscribe").mockReturnValueOnce(ok(aSubscription()));

    const form = new FormData();
    form.append("planId", "pln-example1");
    form.append("userId", "usr-example1");

    const response = await fetch(new URL("/subscriptions", server.url), {
      method: "POST",
      body: form,
    });

    const body = await response.text();
    const { document } = parseHTML(body);

    expect(response.status).toEqual(201);
    expect(document.querySelector("h2")?.textContent).toEqual(
      "Congratulations, you're subscribed",
    );
  });

  it("displays error page after non-successful subscription", async () => {
    const alreadySubscribedError =
      subscription.SubscriptionErrors.AlreadySubscribed;

    spyOn(subscription, "subscribe").mockReturnValueOnce(
      err(alreadySubscribedError),
    );

    const form = new FormData();
    form.append("planId", "pln-example1");
    form.append("userId", "usr-example1");

    const response = await fetch(new URL("/subscriptions", server.url), {
      method: "POST",
      body: form,
    });

    const body = await response.text();
    const { document } = parseHTML(body);

    expect(response.status).toEqual(200);
    expect(document.querySelector("h2")?.textContent).toEqual(
      "Something went wrong",
    );
    expect(document.querySelector("pre")?.textContent).toEqual(
      JSON.stringify(alreadySubscribedError),
    );
  });
});
