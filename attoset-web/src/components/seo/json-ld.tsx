/**
 * Renders a JSON-LD structured-data block. Server component — no client JS.
 * Google reads the script tag directly from the server-rendered HTML.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject here; the data is fully controlled.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
