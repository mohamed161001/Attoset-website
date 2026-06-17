import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-44 sm:pb-20">
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1.02] tracking-display text-balance">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {description}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.16}>
              <div className="mt-9">{children}</div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
