import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { dataToDone } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The platform spine, stated before any single capability gets a deep dive.
 * Rendered as a chain — hairline connectors run tile to tile — so the order
 * reads as a dependency, not as five interchangeable features.
 */
export function DataToDone() {
  return (
    <section id="data-to-done" className="scroll-mt-24 bg-warm py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="From data to done"
          title="How a process gets built here"
          description="Attoset starts with the data your work runs on and carries it all the way to a decision. Each layer builds on the one before it — and Atto can draft any of them for you."
        />

        <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {dataToDone.map((stage, i) => {
            const last = i === dataToDone.length - 1;
            return (
              <Reveal
                as="li"
                key={stage.title}
                delay={i * 0.06}
                className="group relative flex gap-5 md:flex-col md:gap-5"
              >
                {/* connector to the next stage — vertical on phones, horizontal on desktop */}
                {!last && (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-10 left-6 top-14 w-px bg-line-strong md:hidden"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-12 top-6 hidden h-px w-full bg-line-strong md:block"
                    />
                  </>
                )}

                <span
                  className={cn(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border shadow-card transition-colors",
                    last
                      ? "border-orange/25 bg-peach text-orange"
                      : "border-line bg-white text-ink group-hover:border-orange/30 group-hover:bg-peach group-hover:text-orange"
                  )}
                >
                  <stage.icon className="size-5" strokeWidth={1.75} />
                </span>

                <div className="relative z-10">
                  <span className="font-display text-[11px] font-bold tracking-[0.14em] text-faint">
                    {stage.n}
                  </span>
                  <h3 className="mt-1.5 font-display text-[17px] font-semibold text-ink">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted">
                    {stage.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
