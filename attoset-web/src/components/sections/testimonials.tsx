import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const avatarColors = ["bg-orange", "bg-emerald-500", "bg-violet-500", "bg-sky-500"];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Loved by operators"
          title="Teams run their work on Attoset"
          description="From operations to compliance, organizations consolidate their tools and move faster with Attoset."
        />

        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-2 [&>*]:mb-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="break-inside-avoid rounded-3xl border border-line bg-white p-7 shadow-card">
                <blockquote className="text-pretty text-[17px] leading-relaxed text-ink-soft">
                  <span className="font-display text-2xl leading-none text-orange">“</span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white",
                      avatarColors[i % avatarColors.length]
                    )}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-[13px] text-muted">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
