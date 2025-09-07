import type { BunRequest } from "bun";
import { ResultAsync } from "neverthrow";
import z from "zod/v3";
import { subscribe } from "../subscription";
import { Layout } from "../../web/layout";
import { Subscribed } from "./subscribed-page";
import { Error } from "../../web/error";

const subscriptionRequestSchema = z.object({
  planId: z.string(),
  userId: z.string(),
});

export async function subscribeToPlan(req: BunRequest<"/subscriptions">) {
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
          status: 201,
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
}
