import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { features, type Feature } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeatureGrid({
  items = features,
  eyebrow = "Everything in one place",
  title = "One platform for the entire organization",
  description = "Replace fragmented tools with a single, connected system you can shape to fit exactly how your teams work.",
  className,
}: {
  items?: Feature[];
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-warm py-24 sm:py-28", className)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <div id={f.id} className="group flex h-full scroll-mt-24 flex-col gap-4 bg-white p-7 transition-colors hover:bg-warm">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-line bg-warm text-ink transition-colors group-hover:border-orange/30 group-hover:bg-peach group-hover:text-orange">
                  <f.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[17px] font-semibold text-ink">
                    {f.title}
                  </h3>
                  {f.comingSoon && (
                    <span className="rounded-full bg-peach px-2 py-0.5 text-[11px] font-medium text-orange">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-pretty text-[14.5px] leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
