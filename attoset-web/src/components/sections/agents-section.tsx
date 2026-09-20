import { Zap, Repeat, Radar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { AgentsBoard } from "@/components/mockups/agents";

const capabilities = [
  {
    title: "Execute tasks",
    icon: Zap,
    desc: "Agents take real actions across your workspaces — not just reminders.",
  },
  {
    title: "Automate processes",
    icon: Repeat,
    desc: "Hand off repetitive, multi-step work and let agents run it end to end.",
  },
  {
    title: "Monitor systems",
    icon: Radar,
    desc: "Watch records, thresholds, and deadlines, then act the moment something changes.",
  },
];

export function AgentsSection() {
  return (
    <section
      id="agents"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white sm:py-28"
    >
      {/* Atmosphere — hero-style, tuned for the dark section */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-24 top-8 size-96 rounded-full bg-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 size-[30rem] rounded-full bg-orange/10 blur-3xl" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual first on large screens */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="absolute -left-6 -top-6 -z-0 size-32 rounded-full bg-orange/30 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Active agents
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/60">
                    <span className="size-1.5 rounded-full bg-orange animate-softpulse" />
                    4 running
                  </span>
                </div>
                <AgentsBoard />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Custom AI agents</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.75rem] sm:leading-[1.05]">
                Agents that actually{" "}
                <span className="text-orange">do the work</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/65">
                Go beyond automation. Create proactive AI agents that execute
                tasks, run processes, monitor systems, and take action on behalf
                of your team — 24/7.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={0.12 + i * 0.08}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange">
                      <c.icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-white/55">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <a
                href="/product#agents"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Build your first agent
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
