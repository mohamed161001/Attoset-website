import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { valueProps } from "@/lib/content";

export function ValueProps() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-7">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-warm-2 text-ink">
                  <v.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="text-pretty text-[15px] leading-relaxed text-muted">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
