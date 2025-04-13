import type { Serve } from "bun";
import { Layout } from "./web/layout";
import { allProducts } from "./gateway/product-catalog-gateway";

export const serverDefinition: Serve<unknown> = {
  hostname: "localhost",
  port: 0,
  routes: {
    "/": async () => {
      const plans = await allProducts();
      return new Response(Layout(plans), {
        headers: {
          "content-type": "text/html",
        },
      });
    },
    "/static/app.css": new Response(
      await Bun.file("./src/web/app.css").bytes(),
      {
        headers: {
          "content-type": "text/css",
        },
      },
    ),
  },
};
