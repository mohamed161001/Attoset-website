import type { ComponentType } from "react";
import * as meetAtto from "@/content/updates/meet-atto";

/**
 * Updates — Attoset's product news, release notes and articles.
 *
 * Each post is one file in `src/content/updates/<slug>.tsx` that exports a
 * `meta` object and a default `Body` component. To publish a new post:
 *   1. copy an existing post file and rename it to the new slug,
 *   2. edit its `meta` and body,
 *   3. import it below and add it to `modules`.
 * Everything else (list page, article page, sitemap, SEO) picks it up.
 *
 * Zoho Campaigns emails should link to `https://attoset.com/updates/<slug>`.
 */

export type UpdateCategory = "Release" | "Product" | "Guide" | "Company";

export type UpdateMeta = {
  /** URL segment: /updates/<slug>. Lowercase, hyphenated, never change once live. */
  slug: string;
  title: string;
  /** One or two sentences. Used on the list card, in search results and social cards. */
  summary: string;
  category: UpdateCategory;
  /** ISO date, e.g. "2026-09-23". */
  date: string;
  author: string;
  /** Rough reading time in minutes. */
  minutes: number;
};

export type Update = UpdateMeta & { Body: ComponentType };

type PostModule = { meta: UpdateMeta; default: ComponentType };

const modules: PostModule[] = [meetAtto];

/** All posts, newest first. */
export const updates: Update[] = modules
  .map((m) => ({ ...m.meta, Body: m.default }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getUpdate = (slug: string) => updates.find((u) => u.slug === slug);

export const formatUpdateDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
