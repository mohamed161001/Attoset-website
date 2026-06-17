import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { pricing } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section className="pb-8">
      <Container>
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7",
                  tier.featured
                    ? "border-orange/30 bg-ink text-white shadow-float"
                    : "border-line bg-white"
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-orange">
                    Most popular
                  </span>
                )}

                <h3
                  className={cn(
                    "font-display text-lg font-semibold",
                    tier.featured ? "text-white" : "text-ink"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 text-sm",
                    tier.featured ? "text-white/60" : "text-muted"
                  )}
                >
                  {tier.blurb}
                </p>

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-bold tracking-display">
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span
                      className={cn(
                        "pb-1 text-[13px]",
                        tier.featured ? "text-white/50" : "text-faint"
                      )}
                    >
                      {tier.cadence}
                    </span>
                  )}
                </div>

                <a
                  href={tier.href}
                  className={cn(
                    "group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-all hover:-translate-y-0.5",
                    tier.featured
                      ? "bg-orange text-white shadow-orange hover:bg-orange-600"
                      : "bg-ink text-white hover:bg-black"
                  )}
                >
                  {tier.cta}
                </a>

                <div
                  className={cn(
                    "my-6 h-px",
                    tier.featured ? "bg-white/10" : "bg-line"
                  )}
                />

                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                          tier.featured ? "bg-orange/20 text-orange" : "bg-orange/10 text-orange"
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span
                        className={cn(
                          "text-[14px]",
                          tier.featured ? "text-white/80" : "text-ink-soft"
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-faint">
          All plans include unlimited workspaces. Prices in USD. Cancel anytime.
        </p>
      </Container>
    </section>
  );
}
