import type { Plan } from "../gateway/product-catalog-gateway";
import { Plans } from "./plans";

export function Layout(plans: Array<Plan>) {
  return (
    "<!DOCTYPE html>" +
    (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Subscription</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
          <link rel="stylesheet" href="/static/app.css" />
        </head>
        <body>
          <header class="container">
            <hgroup>
              <h1>Subscription</h1>
              <p>Something clever about coffee subscription</p>
            </hgroup>
          </header>
          <main class="container">
            <Plans plans={plans} />
          </main>
          <footer class="container text-center">
            <hr />
            <small>2025</small>
          </footer>
        </body>
      </html>
    )
  );
}
