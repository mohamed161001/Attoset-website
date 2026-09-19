"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  Layers, Cog, BarChart3, Check, ArrowRight, Bot,
  Table2, FormInput, Workflow, PieChart, ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ctaHref } from "@/lib/content";
import { Avatar, people } from "@/components/mockups/avatar";

const ease = [0.16, 1, 0.3, 1] as const;

const points = [
  "Build a template once",
  "AttoForge clones it into as many instances as you need",
  "Every instance rolls up into one portfolio dashboard",
];

// The building blocks every template carries into each instance.
const assets: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "Tables", icon: Table2, color: "#FF512A" },
  { label: "Forms", icon: FormInput, color: "#A21CE0" },
  { label: "Automations", icon: Workflow, color: "#3B82F6" },
  { label: "Dashboards", icon: PieChart, color: "#16A34A" },
  { label: "Permissions", icon: ShieldCheck, color: "#94A3B8" },
];

// A few managed instances, each a full copy of the blueprint, that roll up into the portfolio.
// `agents` = AI agents working the instance alongside the human team.
const instances: { name: string; team: (keyof typeof people)[]; agents: number; status: string }[] = [
  { name: "Site A", team: ["maya", "david"], agents: 1, status: "On track" },
  { name: "Site B", team: ["david"], agents: 2, status: "On track" },
  { name: "Site C", team: ["sara", "maya"], agents: 1, status: "Active" },
];

const portfolioBars = [58, 82, 46, 94, 70, 88];

/** Compact progress ring for the portfolio roll-up. */
function Donut({ value, reduce }: { value: number; reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 36 36" className="size-10 -rotate-90">
      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
      <m.circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="#FF512A"
        strokeWidth="4"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: value / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center">
      <div className="grad-text text-base font-bold">{value}</div>
      <div className="text-[9.5px] font-medium text-white/45">{label}</div>
    </div>
  );
}

function Connector({ reduce, badge }: { reduce: boolean | null; badge?: React.ReactNode }) {
  return (
    <div className="relative flex h-7 w-full items-center justify-center">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15" />
      {!reduce && !badge && (
        <m.span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-orange shadow-orange"
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
      )}
      {badge}
    </div>
  );
}

/** Dark-glass card surface, tuned for the black section. */
function Glass({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm " +
        "shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] " + (className ?? "")
      }
    >
      {children}
    </div>
  );
}

function AutoForgeFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-[330px] flex-col items-center">
      {/* Template — carries every building block */}
      <m.div
        className="w-full"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <Glass className="p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-orange text-white">
                <Layers className="size-3.5" strokeWidth={1.9} />
              </span>
              <span className="text-[12.5px] font-semibold text-white">Template</span>
            </div>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9.5px] font-medium tracking-wide text-white/50">
              Blueprint
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {assets.map((a, i) => (
              <m.span
                key={a.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-2 py-1"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.12 + i * 0.05, ease }}
              >
                <span
                  className="flex size-4 items-center justify-center rounded"
                  style={{ background: `${a.color}24` }}
                >
                  <a.icon className="size-2.5" strokeWidth={2} style={{ color: a.color }} />
                </span>
                <span className="text-[10.5px] font-medium text-white/80">{a.label}</span>
              </m.span>
            ))}
          </div>
        </Glass>
      </m.div>

      {/* AttoForge clones it */}
      <Connector
        reduce={reduce}
        badge={
          <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 backdrop-blur-sm">
            {reduce ? (
              <Cog className="size-3.5 text-orange" strokeWidth={2} />
            ) : (
              <m.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Cog className="size-3.5 text-orange" strokeWidth={2} />
              </m.span>
            )}
            <span className="text-[11px] font-semibold text-orange">AttoForge</span>
          </span>
        }
      />

      {/* Instances — each a full, managed copy of the blueprint */}
      <m.div
        className="w-full"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <Glass className="p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[12.5px] font-semibold text-white">Instances</span>
            <span className="rounded-full bg-orange/15 px-2 py-0.5 text-[10px] font-bold text-orange">100+ live</span>
          </div>
          <div className="space-y-1.5">
            {instances.map((row, i) => (
              <m.div
                key={row.name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5"
                initial={reduce ? false : { opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease }}
              >
                <span className="text-[11.5px] font-medium text-white/85">{row.name}</span>
                {/* human teammates + AI agents working the instance together */}
                <div className="flex -space-x-1.5">
                  {row.team.map((key) => (
                    <Avatar
                      key={key}
                      name={people[key].name}
                      color={people[key].color}
                      size={16}
                      className="border border-ink"
                    />
                  ))}
                  {Array.from({ length: row.agents }).map((_, a) => (
                    <span
                      key={`agent-${a}`}
                      title="AI agent"
                      className="flex size-4 items-center justify-center rounded-full border border-ink bg-orange text-white shadow-orange"
                    >
                      <Bot className="size-2.5" strokeWidth={2.2} />
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {row.status}
                </span>
              </m.div>
            ))}
          </div>
          <div className="mt-2 text-center text-[10.5px] font-medium text-white/40">
            + 100 more instances
          </div>
        </Glass>
      </m.div>

      <Connector reduce={reduce} />

      {/* Portfolio — every instance rolls up here */}
      <m.div
        className="w-full"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <Glass className="p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-white/10 text-white">
                <BarChart3 className="size-3.5" strokeWidth={1.9} />
              </span>
              <span className="text-[12.5px] font-semibold text-white">Portfolio</span>
            </div>
            <span className="text-[11px] font-medium text-white/50">Rolled up</span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            {/* On track — progress ring */}
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
              <Donut value={94} reduce={reduce} />
              <div>
                <div className="text-[15px] font-bold text-white">94%</div>
                <div className="text-[10px] text-white/45">On track</div>
              </div>
            </div>
            {/* Projects status — bars */}
            <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
              <div className="flex h-8 items-end gap-1">
                {portfolioBars.map((h, i) => (
                  <m.span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-orange/40 to-orange"
                    initial={reduce ? false : { height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                  />
                ))}
              </div>
              <div className="mt-1.5 text-[10px] text-white/45">Projects status</div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2.5">
            <Stat value="98%" label="SLA met" />
            <Stat value="100+" label="Projects" />
          </div>
        </Glass>
      </m.div>
    </div>
  );
}

export function AutoForge() {
  return (
    <section id="autoforge" className="relative scroll-mt-24 overflow-hidden bg-ink py-16 text-white sm:py-20">
      {/* Atmosphere — masked grid + soft white glow */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="pointer-events-none absolute left-1/2 top-[-140px] h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>AttoForge</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-display text-balance sm:text-[2.75rem] sm:leading-[1.05]">
                Repeatable work, <span className="grad-text">at scale</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/60">
                Run the same process across dozens of clients, teams, or locations. Build one
                template, and AttoForge clones it into managed instances that all roll up into a
                single portfolio view.
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-3.5">
              {points.map((p, i) => (
                <Reveal as="li" key={p} delay={0.12 + i * 0.06}>
                  <span className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] text-white/75">{p}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <a
                href={ctaHref}
                target="_blank"
                rel="noreferrer"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Scale with AttoForge
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <AutoForgeFlow />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
