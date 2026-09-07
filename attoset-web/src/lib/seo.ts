import type { Metadata } from "next";

/**
 * Per-page metadata builder. Keeps title / description / canonical and the
 * social-card (Open Graph + Twitter) tags in sync so every route shares a
 * consistent, page-specific preview instead of inheriting the homepage's.
 *
 * The root layout sets the site-wide defaults (metadataBase, type, siteName).
 * NOTE: defining `openGraph` on a page replaces — not deep-merges — the parent
 * segment's `openGraph`, which drops the root file-based opengraph-image /
 * twitter-image. So we re-supply the social images here explicitly.
 */
export const SITE_URL = "https://attoset.com";

const OG_ALT = "Attoset — The AI-powered Work Operating System";

export function pageMeta({
  title,
  description,
  path,
  index = true,
}: {
  /** Page title without the "· Attoset" suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Absolute path, e.g. "/features". */
  path: string;
  /** Set false to keep the page out of search indexes (still followed). */
  index?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = `${title} · Attoset`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Attoset",
      title: socialTitle,
      description,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: "/twitter-image", alt: OG_ALT }],
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
