import { Sparkles, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AttoPanel } from "@/components/mockups/atto-panel";

const points = [
  "Describe what you need in plain language",
  "Atto drafts workspaces, tables & views",
  "Get suggestions to improve any workflow",
  "Generate forms, automations and reports",
];

export function AttoSection() {
  return (
    <section id="atto" className="scroll-mt-24 py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Atto · AI assistant</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.75rem] sm:leading-[1.05]">
                Your AI partner for{" "}
                <span className="grad-text">building anything</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                Atto is built into every workspace. Tell it what you want to
                build or improve, and it designs the system for you — no
                templates, no setup, no learning curve.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3.5">
              {points.map((p, i) => (
                <Reveal as="li" key={p} delay={0.12 + i * 0.06}>
                  <span className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] text-ink-soft">{p}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <div className="mt-9">
                <Button href="/features#atto" variant="primary">
                  Explore Atto
                  <Sparkles className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="glow-peach absolute -inset-8 -z-10 rounded-[3rem]" />
              <div className="absolute -right-3 -top-3 -z-10 size-40 rounded-full bg-orange/10 blur-3xl" />
              <AttoPanel />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
