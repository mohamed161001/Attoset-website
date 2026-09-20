import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SolutionCards } from "./solution-cards";

export function UseCases() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <Eyebrow>Solutions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold tracking-display text-balance text-white sm:text-4xl lg:text-5xl">
              Built around the work you run
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/55">
              One platform, shaped to the job in front of you. Every process
              below is built from the same blocks, so nothing has to be stitched
              together afterwards.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <SolutionCards />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
