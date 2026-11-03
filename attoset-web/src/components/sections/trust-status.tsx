import { Activity, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { statusHref, trustCenter, trustCenterHref } from "@/lib/content";

/**
 * Security page band that sends visitors to the two hosted proof points:
 * the Probo trust center and the public status page.
 */
export function TrustStatus() {
  return (
    <section className="pb-24 sm:pb-28">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <a
              href={trustCenterHref}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-10"
            >
              <div>
                <Eyebrow>Trust Center</Eyebrow>
                <h2 className="mt-5 max-w-md font-display text-3xl font-semibold tracking-display text-balance sm:text-4xl">
                  {trustCenter.title}
                </h2>
                <p className="mt-4 max-w-md text-pretty leading-relaxed text-white/60">
                  {trustCenter.description}
                </p>
              </div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <ul className="flex flex-wrap gap-2">
                  {trustCenter.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[13px] text-white/80"
                    >
                      <BadgeCheck
                        className="size-3.5 text-orange"
                        strokeWidth={1.75}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-orange-600">
                  Visit Trust Center
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={statusHref}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-white p-8 transition-colors hover:border-ink/20 sm:p-10"
            >
              <div>
                <span className="flex size-11 items-center justify-center rounded-xl bg-peach-soft text-orange">
                  <Activity className="size-5" strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-display text-ink">
                  System status
                </h2>
                <p className="mt-3 text-pretty leading-relaxed text-muted">
                  Live uptime, incident history and scheduled maintenance for
                  every part of Attoset.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-orange">
                status.attoset.com
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
