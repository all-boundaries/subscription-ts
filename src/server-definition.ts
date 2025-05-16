import type { BunRequest, Serve } from "bun";
import { allProducts } from "./gateway/product-catalog-gateway";
import { Layout } from "./web/layout";
import { z } from "zod";
import { ResultAsync } from "neverthrow";
import { subscribe } from "./subscription/subscription";
import { Subscribed } from "./web/subscribed";
import { Error } from "./web/error";
import { Plans } from "./web/plans";

const subscriptionRequestSchema = z.object({
  planId: z.string(),
  userId: z.string(),
});

export const serverDefinition: Serve<unknown> = {
  hostname: "localhost",
  port: 0,
  routes: {
    "/": async () => {
      const plans = await allProducts();
      return new Response(Layout({ children: Plans({ plans }) }), {
        headers: {
          "content-type": "text/html",
        },
      });
    },
    "/subscriptions": async (req: BunRequest<"/subscriptions">) => {
      return ResultAsync.fromPromise(
        req
          .formData()
          .then((data) =>
            subscriptionRequestSchema.parse(Object.fromEntries(data)),
          ),
        (e) => e,
      )
        .andThen((subscriptionRequest) => {
          return subscribe({
            ...subscriptionRequest,
            startDate: new Date(),
          });
        })
        .match(
          (subscription) =>
            new Response(Layout({ children: Subscribed({ subscription }) }), {
              headers: { "content-type": "text/html" },
            }),
          (error) =>
            new Response(
              Layout({ children: Error({ error: JSON.stringify(error) }) }),
              {
                headers: { "content-type": "text/html" },
              },
            ),
        );
    },
    "/static/app.css": async () =>
      new Response(await Bun.file("./src/web/app.css").bytes(), {
        headers: {
          "content-type": "text/css",
        },
      }),
  },
};
