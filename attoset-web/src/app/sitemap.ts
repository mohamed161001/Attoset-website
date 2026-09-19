import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Stable per-route last-modified dates. Bump the relevant entry when a page's
 * content meaningfully changes. Using fixed dates (rather than `new Date()`)
 * keeps <lastmod> honest — crawlers distrust sitemaps whose dates change on
 * every build.
 */
type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string; // ISO date
};

/**
 * Canonical, indexable routes only. Add new public pages here so the
 * sitemap stays a generated artifact of the route model — not a stale file.
 */
const routes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: "2026-06-29" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-06-29" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-09-18" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-06-29" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly", lastModified: "2026-06-29" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-09-07" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }));
}
