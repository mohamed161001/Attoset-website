import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="bg-warm py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From idea to running system in minutes"
          description="No migrations, no rebuilds. Describe what you need and shape it as you go."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" />
          {howItWorks.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="relative flex flex-col gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-line bg-white font-display text-lg font-bold text-orange shadow-card">
                  {step.n}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-pretty text-[15px] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
