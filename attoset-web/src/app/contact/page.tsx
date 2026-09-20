import type { Metadata } from "next";
import { Mail, MessageSquare, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { LinkedInIcon } from "@/components/ui/social-icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to the Attoset team. Get a demo, ask a question, or start building on the intelligent Work Platform.",
  path: "/contact",
});

const channels = [
  { icon: Sparkles, title: "Get a demo", desc: "See Attoset build a system live." },
  { icon: MessageSquare, title: "Ask a question", desc: "Product, pricing, or security — we're happy to help." },
  { icon: Building2, title: "Enterprise", desc: "Custom security, scale, and onboarding support." },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-44">
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[460px] opacity-40" />

      <Container className="relative">
        {/* Hero — email is the focal point */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-[1.03] tracking-display text-balance">
              Let&apos;s build your{" "}
              <span className="grad-text">Work Platform</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
              Tell us what you&apos;re working on and we&apos;ll show you how
              Attoset brings it all into one intelligent system. We&apos;re one
              email away.
            </p>
          </Reveal>

          {/* Highlighted email */}
          <Reveal delay={0.16}>
            <a
              href="mailto:contact@attoset.com"
              className="group mx-auto mt-10 inline-flex items-center gap-4 rounded-2xl border border-line bg-white px-6 py-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-orange/30 hover:shadow-float"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-orange text-white shadow-orange">
                <Mail className="size-5" strokeWidth={1.9} />
              </span>
              <span className="text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                  Email us
                </span>
                <span className="grad-text block text-lg font-bold sm:text-xl">
                  contact@attoset.com
                </span>
              </span>
              <ArrowRight className="size-5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-orange" />
            </a>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 text-sm text-muted">
              Prefer social?{" "}
              <a
                href="https://www.linkedin.com/company/attoset"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-ink underline-offset-4 transition-colors hover:text-orange hover:underline"
              >
                <LinkedInIcon className="size-3.5" />
                Connect on LinkedIn
              </a>
            </p>
          </Reveal>
        </div>

        {/* Supporting channels */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={0.12 + i * 0.07}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 transition-colors hover:border-line-strong">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-warm-2 text-ink">
                  <c.icon className="size-5" strokeWidth={1.75} />
                </span>
                <p className="mt-4 text-sm font-semibold text-ink">{c.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
