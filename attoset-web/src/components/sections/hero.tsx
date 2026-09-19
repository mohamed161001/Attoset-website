import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroStage } from "@/components/mockups/hero-stage";
import { ctaHref } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-warm pt-28 sm:pt-32">
      {/* Atmosphere */}
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[820px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[640px] opacity-50" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* LCP element — translate-only entrance (full opacity) so the
              largest paint is detected immediately. */}
          <h1
            className="anim-rise-solid mt-6 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-[1.02] tracking-display text-balance"
            style={{ ["--anim-delay" as string]: "0.05s" }}
          >
            The work platform that scales your operations{" "}
            <span className="grad-text">from data to done</span>
          </h1>

          <p
            className="anim-rise mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted"
            style={{ ["--anim-delay" as string]: "0.16s" }}
          >
            Not an ERP. Not a CRM — Attoset is where the work itself gets done.
            Build, manage, automate and scale your operations in one platform,
            with Atto, a built-in AI assistant.
          </p>

          <div
            className="anim-rise mt-8 flex flex-col items-center gap-3 sm:flex-row"
            style={{ ["--anim-delay" as string]: "0.24s" }}
          >
            <Button
              href={ctaHref}
              variant="primary"
              size="md"
              className="relative overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white/10" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Join our waitlist
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
            <Button href="/features" variant="secondary" size="md">
              <Play className="size-3.5 fill-ink text-ink" />
              See how it works
            </Button>
          </div>
        </div>

        {/* Collaborative product stage */}
        <div
          className="anim-rise relative mx-auto mt-12 max-w-5xl pb-10 sm:mt-14 sm:pb-28 lg:max-w-6xl xl:max-w-7xl"
          style={{ ["--anim-delay" as string]: "0.4s" }}
        >
          <HeroStage />
        </div>
      </Container>
    </section>
  );
}
