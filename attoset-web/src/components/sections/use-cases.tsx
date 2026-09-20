import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SolutionCards } from "./solution-cards";

export function UseCases() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <Eyebrow>Solutions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold tracking-display text-balance text-white sm:text-[2.6rem] sm:leading-[1.05]">
              Built around the work you run
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <SolutionCards />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              See all solutions
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
