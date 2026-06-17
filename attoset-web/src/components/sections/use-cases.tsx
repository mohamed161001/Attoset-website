import { Headset, FolderKanban, Network, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type UseCase = { icon: LucideIcon; title: string; desc: string };

const cases: UseCase[] = [
  {
    icon: Headset,
    title: "Service Delivery Management",
    desc: "End-to-end service execution with SLA tracking, accountability, and real-time reporting.",
  },
  {
    icon: FolderKanban,
    title: "Project & Portfolio Management",
    desc: "A single source of truth for schedules, data, financial forecasts, and risk.",
  },
  {
    icon: Network,
    title: "Operations & Process Management",
    desc: "Custom-built workflows across HR, Finance, IT, and Compliance.",
  },
  {
    icon: Target,
    title: "Strategic Execution",
    desc: "Cross-team initiatives such as market expansion and enterprise change programs.",
  },
];

function Card({ c, n }: { c: UseCase; n: number }) {
  return (
    <article className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-orange/40 hover:bg-white/[0.05] sm:w-[340px]">
      {/* top hairline accent */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
      {/* corner glow on hover */}
      <span className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-orange/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl bg-orange/15 text-orange ring-1 ring-inset ring-orange/25 transition-transform duration-300 group-hover:scale-105">
          <c.icon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="font-display text-sm font-semibold tabular-nums text-white/25">
          {String(n).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 min-h-[2.75em] font-display text-lg font-semibold leading-snug tracking-tight text-white">
        {c.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-white/55">{c.desc}</p>
    </article>
  );
}

export function UseCases() {
  // duplicated for a seamless marquee loop
  const loop = [...cases, ...cases];

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      {/* atmosphere — masked grid + soft glow (matches the other dark sections) */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold tracking-display text-balance text-white sm:text-4xl lg:text-5xl">
              Built for orchestrating complex work
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/55">
              From service delivery to strategic execution — teams run their most demanding work on Attoset.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* auto-scrolling card rail (pauses on hover) */}
      <Reveal delay={0.15}>
        <div className="mask-fade-x relative z-10 mt-14 overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee items-stretch gap-5">
            {loop.map((c, i) => (
              <Card key={i} c={c} n={(i % cases.length) + 1} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
