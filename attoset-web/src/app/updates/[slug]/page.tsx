import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PostMeta } from "@/components/sections/post-meta";
import { SubscribeBox } from "@/components/sections/subscribe-box";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { getUpdate, updates } from "@/lib/updates";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getUpdate((await params).slug);
  if (!post) return {};
  const base = pageMeta({
    title: post.title,
    description: post.summary,
    path: `/updates/${post.slug}`,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/** Typography for post bodies — keeps the post files free of class names. */
const prose =
  "text-[17px] leading-[1.75] text-ink-soft " +
  "[&>p]:mt-5 [&>p:first-child]:mt-0 " +
  "[&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:leading-tight [&>h2]:tracking-display [&>h2]:text-ink [&>h2]:text-balance " +
  "[&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-ink " +
  "[&>ul]:mt-5 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2.5 [&>ul]:list-disc [&>ul]:pl-5 [&_li]:marker:text-orange " +
  "[&>ol]:mt-5 [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-2.5 [&>ol]:list-decimal [&>ol]:pl-5 " +
  "[&_strong]:font-semibold [&_strong]:text-ink " +
  "[&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-orange/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-orange";

export default async function UpdatePage({ params }: Props) {
  const post = getUpdate((await params).slug);
  if (!post) notFound();

  const index = updates.findIndex((u) => u.slug === post.slug);
  const older = updates[index + 1];
  const url = `${SITE_URL}/updates/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "Attoset", url: SITE_URL },
          mainEntityOfPage: url,
          url,
        }}
      />

      <article className="relative overflow-hidden pb-20 pt-24 sm:pt-32">
        <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <Container className="relative">
          <div className="mx-auto max-w-[720px]">
            <Link
              href="/updates"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              All updates
            </Link>

            <header className="mt-8 border-b border-line pb-10">
              <PostMeta category={post.category} date={post.date} minutes={post.minutes} />
              <h1 className="anim-rise-solid mt-5 text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-display text-ink">
                {post.title}
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                {post.summary}
              </p>
              <p className="mt-6 text-[14px] text-muted">
                By <span className="font-medium text-ink">{post.author}</span>
              </p>
            </header>

            <div className={`mt-10 ${prose}`}>
              <post.Body />
            </div>

            {older && (
              <Link
                href={`/updates/${older.slug}`}
                className="group mt-16 flex items-center justify-between gap-6 rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span>
                  <span className="block text-[13px] text-muted">Previous update</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-ink">
                    {older.title}
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-orange transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}

            <SubscribeBox className="mt-16" />
          </div>
        </Container>
      </article>

      <CTA />
    </>
  );
}
