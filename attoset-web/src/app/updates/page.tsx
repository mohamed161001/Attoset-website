import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { SubscribeBox } from "@/components/sections/subscribe-box";
import { pageMeta } from "@/lib/seo";
import { PostMeta } from "@/components/sections/post-meta";
import { updates } from "@/lib/updates";

export const metadata: Metadata = pageMeta({
  title: "Updates",
  description:
    "Product news, release notes and articles from the Attoset team — what's new in the platform and in Atto.",
  path: "/updates",
});

export default function UpdatesPage() {
  const [latest, ...rest] = updates;

  return (
    <>
      <PageHeader
        compact
        eyebrow="Updates"
        title="What’s new at Attoset"
        description="Releases, product news and articles from the team building the platform."
      />

      <section className="pb-24 pt-8 sm:pt-12">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {latest && (
              <Reveal>
                <Link
                  href={`/updates/${latest.slug}`}
                  className="group block rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-0.5 hover:border-line-strong sm:p-10"
                >
                  <PostMeta category={latest.category} date={latest.date} minutes={latest.minutes} />
                  <h2 className="mt-4 text-balance font-display text-2xl font-bold leading-tight tracking-display text-ink sm:text-[2rem]">
                    {latest.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted sm:text-[17px]">
                    {latest.summary}
                  </p>
                  <ReadMore />
                </Link>
              </Reveal>
            )}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((u, i) => (
                  <Reveal key={u.slug} delay={(i % 2) * 0.06}>
                    <Link
                      href={`/updates/${u.slug}`}
                      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-line-strong"
                    >
                      <PostMeta category={u.category} date={u.date} minutes={u.minutes} />
                      <h2 className="mt-4 text-balance font-display text-xl font-semibold leading-snug tracking-display text-ink">
                        {u.title}
                      </h2>
                      <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-muted">
                        {u.summary}
                      </p>
                      <ReadMore />
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}

            <Reveal>
              <SubscribeBox className="mt-6" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function ReadMore() {
  return (
    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink">
      Read more
      <ArrowRight className="size-4 text-orange transition-transform group-hover:translate-x-0.5" />
    </span>
  );
}
