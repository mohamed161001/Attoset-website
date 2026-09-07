import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LogoMark } from "@/components/layout/logo";
import { CtaFloat } from "@/components/mockups/cta-float";
import { ctaHref } from "@/lib/content";

export function CTA() {
  return (
    <section className="pb-20 pt-4">
      <Container>
        <Reveal>
          <div className="grad-orange relative overflow-hidden rounded-[2rem] px-8 py-12 text-center shadow-orange sm:px-10 sm:py-14">
            {/* texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background:radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_70%,#fff_0,transparent_35%)]" />
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />

            {/* floating asset chips */}
            <CtaFloat />

            <div className="relative mx-auto flex max-w-xl flex-col items-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <LogoMark tone="white" className="h-6 w-auto" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-display text-balance text-white sm:text-4xl">
                Let Attoset take the busywork off your team&apos;s plate
              </h2>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/85">
                Bring your operations into one flexible system, built exactly
                the way you work.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5"
                >
                  Get started
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
