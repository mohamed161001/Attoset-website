import { Sparkles, Hammer, MessageCircleQuestion, BarChart3, TableProperties, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AttoPanel } from "@/components/mockups/atto-panel";

/** What Atto does today, and what is on the way. */
const abilities: { icon: LucideIcon; title: string; desc: string; soon?: boolean }[] = [
  {
    icon: Hammer,
    title: "Builds",
    desc: "Describe what you need and Atto drafts the tables, views, forms, automations and dashboards behind it.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Answers",
    desc: "Ask how something works and get an answer in context, instead of hunting through documentation and logs.",
  },
  {
    icon: BarChart3,
    title: "Reads your data",
    desc: "Summarise a record, a view or a whole process, and ask what the numbers are actually saying.",
  },
  {
    icon: TableProperties,
    title: "Fills columns",
    desc: "Atto Fill populates a column instead of a person: tagging, summarising, translating, extracting a value, assigning an owner or linking a record.",
    soon: true,
  },
  {
    icon: Bot,
    title: "Delegates to skilled agents",
    desc: "Hand work to an agent built for a specific job, with Atto deciding which one to pass it to.",
    soon: true,
  },
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
                Not just a chatbot.{" "}
                <span className="grad-text">A coworker.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                Atto is built into every table, dashboard and workspace. It builds what you
                describe, answers questions about our product and your data, and will delegate to
                skilled agents.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-5">
              {abilities.map((a, i) => (
                <Reveal as="li" key={a.title} delay={0.12 + i * 0.05}>
                  <span className="flex gap-3.5">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-peach-soft text-orange">
                      <a.icon className="size-4" strokeWidth={1.9} />
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-semibold text-ink">{a.title}</span>
                        {a.soon && (
                          <span className="rounded-full bg-warm px-2 py-0.5 text-[10px] font-semibold text-muted">
                            Coming soon
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-muted">
                        {a.desc}
                      </span>
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <div className="mt-9">
                <Button href="/product#atto" variant="primary">
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
