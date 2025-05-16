export function Layout({ children }: { children: string }) {
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
          <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        </head>
        <body>
          <header class="container">
            <hgroup>
              <h1>Subscription</h1>
              <p>Something clever about coffee subscription</p>
            </hgroup>
          </header>
          <main class="container">{children}</main>
          <footer class="container text-center">
            <hr />
            <small>2025</small>
          </footer>
        </body>
      </html>
    )
  );
}
