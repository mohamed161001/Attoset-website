import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  compact,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Trims the masthead so the page's own content starts above the fold. */
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact ? "pt-20 pb-6 sm:pt-24 sm:pb-6" : "pt-28 pb-12 sm:pt-44 sm:pb-20"
      )}
    >
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className={cn(
                "mt-4 font-display font-bold leading-[1.02] tracking-display text-balance",
                compact
                  ? "text-[clamp(2.25rem,4.5vw,2.75rem)]"
                  : "text-[clamp(2.5rem,5.5vw,4.25rem)]"
              )}
            >
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p
                className={cn(
                  "max-w-xl text-pretty leading-relaxed text-muted",
                  compact ? "mt-4 text-[16.5px]" : "mt-6 text-lg"
                )}
              >
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
