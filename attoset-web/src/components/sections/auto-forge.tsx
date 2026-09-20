"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  Layers,
  Boxes,
  BarChart3,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Plus,
  Table2,
  Workflow,
  Zap,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ctaHref } from "@/lib/content";
import { Avatar, people } from "@/components/mockups/avatar";
import { AttoAvatar } from "@/components/mockups/atto-avatar";

const ease = [0.16, 1, 0.3, 1] as const;

// The building blocks every blueprint carries into each instance.
const blueprint: { label: string; icon: LucideIcon }[] = [
  { label: "Processes", icon: Workflow },
  { label: "Databases", icon: Table2 },
  { label: "Automations", icon: Zap },
  { label: "Dashboards", icon: PieChart },
  { label: "Rules & guardrails", icon: ShieldCheck },
];

/**
 * The flow plays once, unhurried: instances are forged one at a time — a new
 * one every couple of seconds — while the portfolio fills in behind them. The
 * list itself stays still; the first two instances are fixed and only the last
 * row swaps, so the eye follows the counter rather than a strobing table.
 */
const CLIMB_MS = 24000;
const STEP_MS = 250;
/** One new instance every 2s. Slow on purpose — it should read, not race. */
const INSTANCE_MS = 2000;
const START_INSTANCES = 24;
const MAX_INSTANCES = 100;
/** Once the hundredth instance lands the whole thing settles and stops. */
const DONE_MS = (MAX_INSTANCES - START_INSTANCES) * INSTANCE_MS;

// Human avatars stay off brand-orange here so orange reads as "AI" in this diagram.
const teamFor = (n: number): (keyof typeof people)[] =>
  n % 3 === 0
    ? ["david", "sara"]
    : n % 3 === 1
      ? ["lena", "david"]
      : ["sara", "lena"];

/** People working the instance — the avatars are the first two of them. */
const teamSizeFor = (n: number) => 9 + ((n * 5) % 12);

const instanceName = (n: number) => `Project ${String(n).padStart(2, "0")}`;

/** Custom agents an instance runs on top of Atto, who is always there. */
const agentsFor = (n: number) => (n % 2 === 0 ? 2 : 1);

// Column track shared by the instances header row and every instance row so
// the Team / Agents columns stay aligned.
const instanceCols =
  "grid grid-cols-[minmax(0,1fr)_62px_62px] items-center gap-x-2";
const instanceRow = `${instanceCols} h-[30px] rounded-lg border border-white/5 bg-white/[0.03] px-2.5`;

/** How the portfolio splits by status — the pie behind the second chart card. */
const statusSlices = (() => {
  const raw = [
    { label: "On track", value: 64, color: "#FF512A" },
    { label: "At risk", value: 24, color: "rgba(255,255,255,0.45)" },
    { label: "Blocked", value: 12, color: "rgba(255,255,255,0.18)" },
  ];
  let offset = 0;
  return raw.map((slice) => {
    const start = offset;
    offset += slice.value;
    return { ...slice, start };
  });
})();

/** Quarterly split behind the portfolio chart — completed vs still running. */
const chartGroups = [
  { label: "Q1", done: 38, active: 22 },
  { label: "Q2", done: 56, active: 30 },
  { label: "Q3", done: 74, active: 26 },
  { label: "Q4", done: 96, active: 34 },
];

/** One instance row. Identical markup for the fixed rows and the newest one. */
function InstanceRow({ n }: { n: number }) {
  return (
    <>
      <span className="truncate text-[11.5px] font-medium text-white/85">
        {instanceName(n)}
      </span>
      {/* human teammates, with the rest of the instance's people as a count */}
      <span className="flex items-center justify-center -space-x-1.5">
        {teamFor(n).map((key) => (
          <Avatar
            key={key}
            name={people[key].name}
            color={people[key].color}
            size={16}
            className="border border-ink"
          />
        ))}
        <span className="flex h-4 items-center rounded-full border border-ink bg-white/12 px-1 text-[8.5px] font-semibold tabular-nums text-white/70">
          +{teamSizeFor(n) - 2}
        </span>
      </span>
      {/* Atto ships inside every instance; custom agents are added on top */}
      <span className="flex items-center justify-center gap-1">
        <span
          title="Atto"
          className="flex size-[18px] items-center justify-center rounded-full bg-white/12"
        >
          <AttoAvatar size={11} />
        </span>
        {Array.from({ length: agentsFor(n) }).map((_, i) => (
          <span
            key={`agent-${i}`}
            title="Custom agent"
            className="flex size-[15px] items-center justify-center rounded-full bg-orange text-white shadow-orange"
          >
            <Sparkles className="size-2.5" strokeWidth={2.2} />
          </span>
        ))}
      </span>
    </>
  );
}

/**
 * Section header inside the portfolio panel — mirrors the Metrics / Charts
 * rails of Attoset's own Insights sidebar, down to the count and the add button.
 */
function InsightsRail({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10.5px] font-semibold text-white/85">{title}</span>
      <span className="text-[9px] font-medium tabular-nums text-white/35">
        {count}
      </span>
      <span className="ml-auto flex size-4 items-center justify-center rounded-full border border-white/12 text-white/35">
        <Plus className="size-2.5" strokeWidth={2.4} />
      </span>
    </div>
  );
}

/** A key-metric card, styled after the Insights metric tiles. */
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
      <div className="truncate text-[9px] font-medium text-white/40">
        {label}
      </div>
      <div className="text-[15px] font-bold leading-tight tabular-nums text-white">
        {value}
      </div>
    </div>
  );
}

/** Donut chart card — the second shape Insights renders, with its dot legend. */
function PieCard({ title, eased }: { title: string; eased: number }) {
  const circumference = 2 * Math.PI * 14;
  return (
    <div className="flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
      <div className="text-[9.5px] font-medium text-white/70">{title}</div>
      <div className="flex flex-1 items-center justify-center gap-2 py-1">
        <svg viewBox="0 0 36 36" className="size-11 shrink-0 -rotate-90">
          {statusSlices.map((slice) => {
            const length = (slice.value / 100) * circumference * eased;
            const offset = -(slice.start / 100) * circumference * eased;
            return (
              <circle
                key={slice.label}
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke={slice.color}
                strokeWidth="6"
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        <div className="flex flex-col gap-1 text-[7.5px] leading-none text-white/45">
          {statusSlices.map((slice) => (
            <span key={slice.label} className="flex items-center gap-1">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: slice.color }}
              />
              {slice.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Grouped bar chart card — the shape Insights renders charts in. */
function ChartCard({ title, eased }: { title: string; eased: number }) {
  const grow = (peak: number) => 8 + (peak - 8) * eased;
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
      <div className="text-[9.5px] font-medium text-white/70">{title}</div>
      <div className="mt-2 flex gap-1.5">
        {/* y axis */}
        <div className="flex h-[42px] w-3.5 flex-col justify-between py-px text-right text-[7px] leading-none tabular-nums text-white/25">
          <span>60</span>
          <span>30</span>
          <span>0</span>
        </div>
        <div className="relative h-[42px] flex-1">
          {[0, 50, 100].map((top) => (
            <span
              key={top}
              className="absolute inset-x-0 h-px bg-white/8"
              style={{ top: `${top}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-end justify-between">
            {chartGroups.map((g) => (
              <div
                key={g.label}
                className="flex h-full flex-1 items-end justify-center gap-[3px]"
              >
                <m.span
                  className="w-[5px] rounded-[2px] bg-orange"
                  initial={false}
                  animate={{ height: `${grow(g.done)}%` }}
                  transition={{ duration: 0.6, ease }}
                />
                <m.span
                  className="w-[5px] rounded-[2px] bg-white/35"
                  initial={false}
                  animate={{ height: `${grow(g.active)}%` }}
                  transition={{ duration: 0.6, ease }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-1 flex pl-5 text-[7.5px] text-white/30">
        {chartGroups.map((g) => (
          <span key={g.label} className="flex-1 text-center">
            {g.label}
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-3 text-[8px] text-white/45">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-orange" />
          Completed
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-white/35" />
          Active
        </span>
      </div>
    </div>
  );
}
/** One stage of the flow: a dark-glass card plus a one-line caption beneath. */
function Stage({
  title,
  icon: Icon,
  caption,
  delay,
  reduce,
  badge,
  children,
}: {
  title: string;
  icon: LucideIcon;
  caption: string;
  delay: number;
  reduce: boolean | null;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <m.div
      className="flex flex-col"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Icon className="size-3.5 text-white/55" strokeWidth={1.9} />
          <span className="text-[12.5px] font-semibold tracking-tight text-white">
            {title}
          </span>
          {badge}
        </div>
        <div className="flex flex-1 flex-col justify-center">{children}</div>
      </div>
      <p className="mt-3 text-center text-[11px] font-medium text-white/35">
        {caption}
      </p>
    </m.div>
  );
}

/**
 * Dotted connector between stages — horizontal on desktop, vertical when the
 * flow stacks. The bottom margin on desktop keeps it centred on the cards
 * rather than on the cards + their captions.
 */
function Connector({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative mx-auto flex h-9 w-full items-center justify-center lg:h-auto lg:mb-[26px] lg:w-14 lg:self-center">
      {/* stacked: vertical dotted line */}
      <span className="h-full w-px bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28)_50%,transparent_0)] bg-[length:1px_6px] lg:hidden" />
      <ChevronDown
        className="absolute bottom-0 size-3 text-white/25 lg:hidden"
        strokeWidth={2}
      />
      {/* desktop: horizontal dotted line */}
      <span className="hidden h-px w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.28)_50%,transparent_0)] bg-[length:6px_1px] lg:block" />
      <ChevronRight
        className="absolute right-0 hidden size-3 text-white/25 lg:block"
        strokeWidth={2}
      />
      {!reduce && (
        <>
          <m.span
            className="absolute top-0 size-1.5 rounded-full bg-orange shadow-orange lg:hidden"
            animate={{ y: [0, 30], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
          />
          <m.span
            className="absolute left-0 hidden size-1.5 rounded-full bg-orange shadow-orange lg:block"
            animate={{ x: [0, 44], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
}

function AutoForgeFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(
      () => setElapsed((e) => (e >= DONE_MS ? e : e + STEP_MS)),
      STEP_MS,
    );
    return () => clearInterval(id);
  }, [inView, reduce]);

  // The portfolio fills on a smoothstep curve: slow to start, then compounding.
  const progress = (ms: number) => {
    const t = Math.min(ms / CLIMB_MS, 1);
    return t * t * (3 - 2 * t);
  };

  const eased = reduce ? 1 : progress(elapsed);
  // One instance at a time. The counter, the last row and the portfolio's
  // project metric all move on this single beat.
  const count = reduce
    ? MAX_INSTANCES
    : Math.min(
        MAX_INSTANCES,
        START_INSTANCES + Math.floor(elapsed / INSTANCE_MS),
      );

  const onTrack = reduce ? 94 : Math.round(72 + 22 * eased);

  return (
    <div
      ref={ref}
      className="mx-auto grid max-w-5xl items-stretch lg:grid-cols-[minmax(0,0.95fr)_auto_minmax(0,1.3fr)_auto_minmax(0,1.5fr)]"
    >
      {/* Blueprint — everything a process needs, defined once */}
      <Stage
        title="Blueprint"
        icon={Layers}
        caption="Built once"
        delay={0}
        reduce={reduce}
      >
        <div className="space-y-1.5">
          {blueprint.map((b, i) => (
            <m.div
              key={b.label}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease }}
            >
              <b.icon
                className="size-3 shrink-0 text-white/45"
                strokeWidth={2}
              />
              <span className="truncate text-[11.5px] font-medium text-white/80">
                {b.label}
              </span>
            </m.div>
          ))}
        </div>
      </Stage>

      <Connector reduce={reduce} />

      {/* Instances — each one a clone of the blueprint, with Atto inside every one */}
      <Stage
        title="Instances"
        icon={Boxes}
        caption="Cloned per project, client, or site"
        delay={0.12}
        reduce={reduce}
        badge={
          <span className="rounded-full bg-orange/15 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-orange">
            {count}
          </span>
        }
      >
        <div
          className={`${instanceCols} px-2.5 pb-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35`}
        >
          <span>Instance</span>
          <span className="text-center">Team</span>
          <span className="text-center">Agents</span>
        </div>
        <div className="space-y-1.5">
          {/* The first instances are settled work — they never move. */}
          <div className={instanceRow}>
            <InstanceRow n={1} />
          </div>
          <div className={instanceRow}>
            <InstanceRow n={2} />
          </div>
          {/* The instances between the first two and the newest, collapsed. */}
          <div className="py-0.5 text-center text-[10px] font-medium tabular-nums text-white/35">
            + {count - 3} more instances
          </div>
          {/* Only the last row changes, as each new instance is forged. */}
          <div className="relative h-[30px]">
            <AnimatePresence initial={false}>
              <m.div
                key={count}
                className={`${instanceRow} absolute inset-x-0 top-0`}
                initial={reduce ? false : { opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -9 }}
                transition={{ duration: 0.45, ease }}
              >
                <InstanceRow n={count} />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Stage>

      <Connector reduce={reduce} />

      {/* Portfolio — every instance rolls up into Insights: key metrics, then charts */}
      <Stage
        title="Portfolio"
        icon={BarChart3}
        caption="One rolled-up view"
        delay={0.24}
        reduce={reduce}
      >
        <InsightsRail title="Metrics" count="(2/15)" />
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <Metric label="# Projects" value={String(count)} />
          <Metric label="# On track" value={`${onTrack}%`} />
        </div>
        <div className="my-2 h-px bg-white/8" />
        <InsightsRail title="Charts" count="(2/15)" />
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <ChartCard title="By quarter" eased={eased} />
          <PieCard title="By status" eased={eased} />
        </div>
      </Stage>
    </div>
  );
}

export function AutoForge() {
  return (
    <section
      id="autoforge"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white sm:py-24"
    >
      {/* Atmosphere — masked grid + soft white glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="pointer-events-none absolute left-1/2 top-[-140px] h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>AttoForge</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.75rem] sm:leading-[1.05]">
              Repeatable work, <span className="grad-text">at scale</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-white/60">
              Run the same process across dozens of clients, teams, or
              locations. Build one blueprint, and AttoForge clones it into
              managed instances that all roll up into a single portfolio view.
              Operations is what teams run on Attoset today. AttoForge is where
              it scales to the portfolio.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16">
          <AutoForgeFlow />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Reveal>
            <p className="text-[15px] text-white/55">
              Your team defines the logic.{" "}
              <span className="text-white/85">Agents will execute it.</span>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <Sparkles className="size-3 text-orange" strokeWidth={2} />
              Agents coming soon
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Scale with AttoForge
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
