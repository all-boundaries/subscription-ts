export function Error({ error }: { error: string }) {
  return (
    <section>
      <h2>Something went wrong</h2>

      <pre>{error}</pre>
    </section>
  );
}
