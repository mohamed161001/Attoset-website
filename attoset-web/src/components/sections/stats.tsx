import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="border-y border-line bg-white py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-display text-4xl font-bold tracking-display text-ink sm:text-5xl">
                  {s.value}
                  <span className="text-orange">{s.suffix}</span>
                </p>
                <p className="mt-1.5 text-[13px] text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
