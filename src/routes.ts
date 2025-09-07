import { Layout } from "./web/layout";
import { allPlans } from "./subscription/plans";
import { Plans } from "./subscription/web/plans-page";
import { subscribeToPlan } from "./subscription/web/subscribe-route";

export const serverDefinition = {
  hostname: "localhost",
  port: 0,
  routes: {
    "/": displayAllPlans,
    "/subscriptions": { POST: subscribeToPlan },
    "/static/app.css": styles,
  },
};

async function styles() {
  return new Response(await Bun.file("./src/web/app.css").bytes(), {
    headers: {
      "content-type": "text/css",
    },
  });
}

async function displayAllPlans() {
  const plans = allPlans();
  return new Response(Layout({ children: Plans({ plans }) }), {
    headers: {
      "content-type": "text/html",
    },
  });
}
