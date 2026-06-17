"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  Bot, Boxes, Users, Database, LayoutDashboard, Zap, Check, ArrowRight,
  Table2, KanbanSquare, Calendar, GanttChartSquare, ShieldCheck,
  Sparkles, Layers, BarChart3, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AttoAvatar } from "@/components/mockups/atto-avatar";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const Bar = ({ w = 60, c = "bg-ink/10" }: { w?: number; c?: string }) => (
  <span className={cn("block h-1.5 rounded", c)} style={{ width: `${w}%` }} />
);

function CursorPointer({ className, color = "#0a0a0a" }: { className?: string; color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 2.5 L19 11.5 L12.2 12.8 L8.7 19.5 Z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function FloatingCursor({ name, color, path, delay }: { name: string; color: string; path: { x: number; y: number }[]; delay: number }) {
  return (
    <m.div
      className="absolute z-20"
      initial={{ left: `${path[0].x}%`, top: `${path[0].y}%` }}
      animate={{ left: path.map((p) => `${p.x}%`), top: path.map((p) => `${p.y}%`) }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <CursorPointer color={color} />
      <span className="ml-2.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium text-white shadow-card" style={{ background: color }}>
        {name}
      </span>
    </m.div>
  );
}

/** Visual stage with the Chatbase-style faint dotted orbit backdrop. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 text-line-strong"
      >
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="0.5 7" strokeLinecap="round" opacity="0.7" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="0.5 7" strokeLinecap="round" opacity="0.4" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ---------- visuals --------------------------------------------------- */

function AttoVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-ink shadow-[0_6px_18px_-6px_rgba(10,10,10,0.4)]">
        <AttoAvatar size={28} />
      </span>
      <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] text-muted shadow-card">
        Ask Atto to build anything…
      </span>
    </div>
  );
}

function AgentsVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="w-[214px] space-y-2">
      {[{ dot: "bg-orange", pulse: true }, { dot: "bg-ink/20" }].map((r, i) => (
        <m.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.18, ease }}
          className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-2.5 py-2 shadow-card"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-ink text-white">
            <Bot className="size-3.5" strokeWidth={1.9} />
          </span>
          <span className="flex-1 space-y-1.5">
            <span className="skeleton block h-1.5 w-3/4" />
            <span className="skeleton block h-1.5 w-2/5" />
          </span>
          <span className={cn("size-1.5 rounded-full", r.dot, r.pulse && "animate-softpulse")} />
        </m.div>
      ))}
    </div>
  );
}

function WorkflowVisual() {
  const reduce = useReducedMotion();
  const Node = ({ icon: Icon, accent }: { icon: LucideIcon; accent?: boolean }) => (
    <span className="flex size-9 items-center justify-center rounded-xl border border-line bg-white shadow-card">
      <Icon className={cn("size-4", accent ? "text-orange" : "text-ink-soft")} strokeWidth={1.9} />
    </span>
  );
  return (
    <div className="relative flex items-center gap-1.5">
      <Node icon={Zap} accent />
      <span className="h-px w-5 bg-line-strong" />
      <Node icon={Check} />
      <span className="h-px w-5 bg-line-strong" />
      <Node icon={ArrowRight} />
      {!reduce && (
        <m.span
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-orange shadow-orange"
          initial={{ left: 20, opacity: 0 }}
          animate={{ left: [20, 152], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function WorkspacesVisual() {
  const reduce = useReducedMotion();
  const tiles: { i: LucideIcon; accent?: boolean }[] = [
    { i: Boxes, accent: true }, { i: Users }, { i: Database }, { i: LayoutDashboard },
  ];
  return (
    <div className="grid w-[150px] grid-cols-2 gap-2.5">
      {tiles.map((t, i) => (
        <m.span
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08, ease }}
          className={cn("flex aspect-square items-center justify-center rounded-xl border border-line bg-white", t.accent && "bg-orange/10")}
        >
          <t.i className={cn("size-5", t.accent ? "text-orange" : "text-ink/40")} strokeWidth={1.75} />
        </m.span>
      ))}
    </div>
  );
}

function DatabaseVisual() {
  const reduce = useReducedMotion();
  const [cols, setCols] = useState(reduce ? 4 : 3);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setCols((c) => (c === 3 ? 4 : 3)), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const HeaderCell = ({ accent }: { accent?: boolean }) => (
    <div className="flex h-5 w-[44px] shrink-0 items-center bg-warm px-1.5">
      <span className={cn("block h-1.5 w-[68%] rounded", accent ? "bg-orange/40" : "bg-ink/25")} />
    </div>
  );
  const DataCell = ({ accent, shimmer }: { accent?: boolean; shimmer?: boolean }) => (
    <div className="flex h-6 w-[44px] shrink-0 items-center px-1.5">
      <span className={cn("block h-1.5 w-[62%] rounded", shimmer ? "skeleton" : accent ? "bg-orange/30" : "bg-ink/10")} />
    </div>
  );
  const NewCol = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
    <m.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 44, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.4, delay, ease }}
      className="overflow-hidden border-l border-line"
    >
      {children}
    </m.div>
  );

  const rows = [0, 1, 2];
  return (
    <div className="relative w-[200px]">
      <div className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
        {/* header */}
        <div className="flex divide-x divide-line border-b border-line">
          <HeaderCell />
          <HeaderCell />
          <HeaderCell accent />
          <AnimatePresence>{cols === 4 && <NewCol key="h"><HeaderCell /></NewCol>}</AnimatePresence>
        </div>
        {/* data rows */}
        {rows.map((r) => (
          <div key={r} className={cn("flex divide-x divide-line", r !== rows.length - 1 && "border-b border-line")}>
            <DataCell />
            <DataCell shimmer={r === 1} />
            <DataCell accent />
            <AnimatePresence>{cols === 4 && <NewCol key="c" delay={0.04 * r}><DataCell /></NewCol>}</AnimatePresence>
          </div>
        ))}
      </div>

      {/* collaborators */}
      {!reduce && (
        <>
          <FloatingCursor name="Maya" color="#FF512A" path={[{ x: 18, y: 22 }, { x: 60, y: 64 }, { x: 18, y: 22 }]} delay={0} />
          <FloatingCursor name="David" color="#0A0A0A" path={[{ x: 72, y: 70 }, { x: 38, y: 28 }, { x: 72, y: 70 }]} delay={1.6} />
        </>
      )}
    </div>
  );
}

function ViewsVisual() {
  const icons = [Table2, KanbanSquare, Calendar, GanttChartSquare];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex gap-1 rounded-full border border-line bg-white p-1 shadow-card">
        {icons.map((Icon, i) => (
          <span key={i} className={cn("flex size-7 items-center justify-center rounded-full", i === 0 ? "bg-ink text-white" : "text-faint")}>
            <Icon className="size-3.5" strokeWidth={1.75} />
          </span>
        ))}
      </div>
      <div className="w-[170px] space-y-1.5 rounded-xl border border-line bg-white p-2.5 shadow-card">
        <Bar w={80} /><Bar w={60} /><Bar w={70} />
      </div>
    </div>
  );
}

function DashboardVisual() {
  const reduce = useReducedMotion();
  const bars = [44, 70, 54, 88, 62, 76];
  return (
    <div className="w-[190px] rounded-xl border border-line bg-white p-3.5 shadow-card">
      <p className="text-[10px] text-muted">Revenue</p>
      <p className="text-[18px] font-bold text-ink">$48.2k</p>
      <div className="mt-3 flex h-12 items-end gap-1.5">
        {bars.map((h, i) => (
          <m.span
            key={i}
            className={cn("flex-1 rounded-t-[2px]", i === 3 ? "bg-orange" : "bg-ink/10")}
            initial={reduce ? false : { height: "14%" }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease }}
          />
        ))}
      </div>
    </div>
  );
}

function FormVisual() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 1);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s >= 3 ? 1 : s + 1)), 1100);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative w-[182px] rounded-xl border border-line bg-white p-3.5 shadow-card">
      <Bar w={40} c="bg-ink/15" />
      <div className="mt-3 min-h-[68px] space-y-2">
        <AnimatePresence>
          {step >= 1 && (
            <m.div key="f1" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="rounded-md border border-line px-2 py-2">
              <Bar w={70} c="bg-ink/8" />
            </m.div>
          )}
          {step >= 2 && (
            <m.div key="f2" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="rounded-md border border-line px-2 py-2">
              <Bar w={55} c="bg-ink/8" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <m.div
        animate={step === 3 ? { scale: 0.94 } : { scale: 1 }}
        transition={{ duration: 0.15 }}
        className="mt-3 flex h-6 items-center justify-center rounded-md bg-orange text-[10px] font-semibold text-white"
      >
        Submit
      </m.div>
      {!reduce && (
        <m.div
          className="pointer-events-none absolute"
          initial={{ opacity: 0, left: 118, top: 92 }}
          animate={step === 3 ? { opacity: 1, left: 116, top: 120 } : { opacity: 0, left: 118, top: 96 }}
          transition={{ duration: 0.4, ease }}
        >
          <CursorPointer />
        </m.div>
      )}
    </div>
  );
}

function LinkedVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-[126px] w-[232px]">
      {/* connector from the linked cell → the record it points to */}
      <svg viewBox="0 0 232 126" className="absolute inset-0 size-full" aria-hidden="true">
        <m.path
          d="M96 35 C 116 35, 116 56, 134 56"
          fill="none" stroke="#ddd9d4" strokeWidth="1.5" strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        />
      </svg>
      {!reduce && (
        <m.span
          className="absolute z-30 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-orange"
          initial={{ left: 96, top: 35, opacity: 0 }}
          animate={{ left: [96, 134], top: [35, 56], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.1, delay: 1, ease: "easeInOut" }}
        />
      )}

      {/* Table A — Deals (has a linked "Company" cell) */}
      <div className="absolute left-0 top-2 z-10 w-[104px] overflow-hidden rounded-lg border border-line bg-white shadow-card">
        <div className="border-b border-line bg-warm px-2 py-1 text-[8.5px] font-semibold text-muted">Deals</div>
        <div className="flex items-center gap-1.5 border-b border-line px-2 py-1.5">
          <span className="size-1.5 shrink-0 rounded-full bg-ink/20" />
          <span className="rounded bg-orange/15 px-1.5 py-0.5 text-[8.5px] font-semibold text-orange">Acme</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <span className="size-1.5 shrink-0 rounded-full bg-ink/20" />
          <span className="rounded bg-ink/[0.06] px-1.5 py-0.5 text-[8.5px] font-medium text-muted">Globex</span>
        </div>
      </div>

      {/* Table B — Companies (the linked record lives here) */}
      <div className="absolute right-0 top-7 z-10 w-[104px] overflow-hidden rounded-lg border border-line bg-white shadow-card">
        <div className="border-b border-line bg-warm px-2 py-1 text-[8.5px] font-semibold text-muted">Companies</div>
        <div className="flex items-center gap-1.5 border-b border-line bg-orange/[0.06] px-2 py-1.5 ring-1 ring-inset ring-orange/30">
          <span className="size-1.5 shrink-0 rounded-full bg-orange" />
          <span className="text-[8.5px] font-semibold text-ink">Acme</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <span className="size-1.5 shrink-0 rounded-full bg-ink/20" />
          <Bar w={52} />
        </div>
      </div>
    </div>
  );
}

function TypingDots({ dark }: { dark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-1 px-3 py-2.5 shadow-card", dark ? "rounded-2xl rounded-br-sm bg-ink" : "rounded-2xl rounded-bl-sm border border-line bg-white")}>
      {[0, 1, 2].map((d) => (
        <m.span
          key={d}
          className={cn("block size-1.5 rounded-full", dark ? "bg-white/60" : "bg-faint")}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// step 0: Maya typing · 1: Maya message · 2: + David typing · 3: + David message (final, holds)
const COLLAB_SEQ = [1100, 1700, 1200];

function CollabVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce || !inView || step >= 3) return;
    const t = setTimeout(() => setStep((s) => s + 1), COLLAB_SEQ[step]);
    return () => clearTimeout(t);
  }, [reduce, inView, step]);

  return (
    <div ref={ref} className="flex min-h-[96px] w-[232px] flex-col justify-center gap-2.5">
      {/* Maya */}
      <div className="flex items-end gap-2">
        <Image src="/images/avatars/p1.jpg" alt="" width={28} height={28} className="size-7 shrink-0 rounded-full object-cover" />
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 ? (
            <m.div key="mt" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <TypingDots />
            </m.div>
          ) : (
            <m.div
              key="mm"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              className="max-w-[172px] rounded-2xl rounded-bl-sm border border-line bg-white px-3 py-2 text-[11px] leading-snug text-ink-soft shadow-card"
            >
              Can you review the Q3 onboarding doc?
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* David */}
      <div className="flex min-h-[34px] flex-row-reverse items-end gap-2">
        <AnimatePresence>
          {step >= 2 && (
            <m.div key="dav" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Image src="/images/avatars/p2.jpg" alt="" width={28} height={28} className="size-7 shrink-0 rounded-full object-cover" />
            </m.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          {step === 2 && (
            <m.div key="dt" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <TypingDots dark />
            </m.div>
          )}
          {step === 3 && (
            <m.div
              key="dm"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              className="max-w-[182px] rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-[11px] font-medium leading-snug text-white shadow-card"
            >
              <span className="text-orange">@Lena</span> can you add the compliance step?
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={cn("flex h-3.5 w-6 items-center rounded-full px-0.5", on ? "bg-ink" : "bg-line-strong")}>
      <span className={cn("size-2.5 rounded-full bg-white", on && "ml-auto")} />
    </span>
  );
}

function SecurityVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-white">
        <ShieldCheck className="size-6" strokeWidth={1.75} />
      </span>
      <div className="w-[180px] space-y-1.5">
        {[true, true, false].map((on, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 shadow-card">
            <Bar w={55} />
            <span className="ml-auto"><Toggle on={on} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- cards ----------------------------------------------------- */

type Card = { title: string; desc: string; visual: ReactNode };
type Group = { id: string; label: string; blurb: string; icon: LucideIcon; cards: Card[] };

const groups: Group[] = [
  {
    id: "ai",
    label: "AI & Automation",
    blurb: "Assistance and agents that build and run the work.",
    icon: Sparkles,
    cards: [
      { title: "Atto, your AI assistant", desc: "Describe what you need and Atto designs the system for you.", visual: <AttoVisual /> },
      { title: "Custom AI agents", desc: "Proactive agents that execute tasks and run processes 24/7.", visual: <AgentsVisual /> },
      { title: "Workflow automation", desc: "Triggers, conditions, and actions that run in the background.", visual: <WorkflowVisual /> },
    ],
  },
  {
    id: "build",
    label: "Build & organize",
    blurb: "Shape workspaces, tables, and the links between them.",
    icon: Layers,
    cards: [
      { title: "Custom workspaces", desc: "Shape Attoset around how your team actually works.", visual: <WorkspacesVisual /> },
      { title: "Flexible tables", desc: "Build tables your way — add fields and edit them together in real time.", visual: <DatabaseVisual /> },
      { title: "Linked records", desc: "Link records across tables — connect each deal to the company it belongs to.", visual: <LinkedVisual /> },
    ],
  },
  {
    id: "visualize",
    label: "Capture & visualize",
    blurb: "Collect data, reshape it, and turn it into insight.",
    icon: BarChart3,
    cards: [
      { title: "Forms & data collection", desc: "Build a form by adding fields, then collect data straight into your tables.", visual: <FormVisual /> },
      { title: "Multiple views", desc: "Table, Kanban, Calendar, Gantt — the same data, reshaped.", visual: <ViewsVisual /> },
      { title: "Dashboards & analytics", desc: "Turn live data into dashboards and reports, in real time.", visual: <DashboardVisual /> },
    ],
  },
  {
    id: "secure",
    label: "Collaborate & secure",
    blurb: "Work together with enterprise-grade control.",
    icon: Shield,
    cards: [
      { title: "Team collaboration", desc: "Comments, mentions, and assignments in one shared space.", visual: <CollabVisual /> },
      { title: "Enterprise security", desc: "Role-based access, granular permissions, and audit trails.", visual: <SecurityVisual /> },
    ],
  },
];

function FeatureCard({ card }: { card: Card }) {
  return (
    <m.article
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
      className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-line-strong hover:shadow-float"
    >
      <Stage>{card.visual}</Stage>
      <div className="px-6 pb-6 pt-1">
        <h3 className="font-display text-[16px] font-semibold tracking-tight text-ink">{card.title}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{card.desc}</p>
      </div>
    </m.article>
  );
}

/* ---------- living background ---------------------------------------- */

type FloaterDef = {
  icon: LucideIcon;
  className: string; // position
  size: number;
  drift: number;
  dur: number;
  delay: number;
  rotate: number;
  accent?: boolean;
};

// Soft product "tokens" that drift in the gutters — they frame the content
// without crowding it. Icons match the ones used in the feature cards.
// Hidden on small screens where there are no gutters.
const FLOATERS: FloaterDef[] = [
  { icon: Zap, className: "left-[3%] top-[16%]", size: 54, drift: 22, dur: 13, delay: 0, rotate: -8, accent: true },
  { icon: Database, className: "left-[6%] top-[56%]", size: 50, drift: 18, dur: 15, delay: 1.2, rotate: 7 },
  { icon: Table2, className: "left-[2%] top-[83%]", size: 44, drift: 26, dur: 12, delay: 0.6, rotate: 6 },
  { icon: LayoutDashboard, className: "right-[4%] top-[14%]", size: 50, drift: 20, dur: 14, delay: 0.4, rotate: 9, accent: true },
  { icon: KanbanSquare, className: "right-[2.5%] top-[48%]", size: 46, drift: 24, dur: 16, delay: 1.6, rotate: -6 },
  { icon: Users, className: "right-[6%] top-[82%]", size: 42, drift: 18, dur: 13, delay: 0.9, rotate: 8 },
];

function Floater({ def }: { def: FloaterDef }) {
  const Icon = def.icon;
  return (
    <m.div
      className={cn("absolute", def.className)}
      initial={{ y: 0, rotate: def.rotate }}
      animate={{ y: [0, -def.drift, 0], rotate: [def.rotate, -def.rotate, def.rotate] }}
      transition={{ duration: def.dur, delay: def.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <span
        className="flex items-center justify-center rounded-[28%] border border-line bg-white/55 shadow-card backdrop-blur-sm"
        style={{ width: def.size, height: def.size }}
      >
        <Icon
          className={cn(def.accent ? "text-orange/70" : "text-ink/20")}
          style={{ width: def.size * 0.42, height: def.size * 0.42 }}
          strokeWidth={1.75}
        />
      </span>
    </m.div>
  );
}

function LivingBackdrop() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base atmosphere */}
      <div className="glow-peach absolute inset-x-0 top-0 h-[620px]" />
      <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[460px] opacity-40" />

      {/* slow-drifting aurora — gives the whole panel quiet motion */}
      <m.div
        className="absolute -left-48 top-1/4 size-[34rem] rounded-full bg-orange/[0.07] blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="absolute -right-48 bottom-1/4 size-[32rem] rounded-full bg-[#ff8a3d]/[0.06] blur-3xl"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <m.div
        className="absolute left-1/2 top-1/3 size-[24rem] -translate-x-1/2 rounded-full bg-peach/40 blur-3xl"
        animate={reduce ? undefined : { y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* floating product tokens (only where there are gutters) */}
      {!reduce && (
        <div className="absolute inset-0 hidden lg:block">
          {FLOATERS.map((def, i) => (
            <Floater key={i} def={def} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- top tab switcher ----------------------------------------- */

function GroupTab({ group, active, onSelect }: { group: Group; active: boolean; onSelect: () => void }) {
  const Icon = group.icon;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "relative shrink-0 rounded-full px-4 py-2.5 text-[13.5px] font-medium transition-colors duration-200 sm:px-5",
        active ? "text-white" : "text-ink-soft hover:text-ink",
      )}
    >
      {active && (
        <m.span
          layoutId="feature-tab-pill"
          className="absolute inset-0 rounded-full bg-ink shadow-float"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        <Icon className={cn("size-4 transition-colors", active ? "text-orange" : "text-faint")} strokeWidth={2} />
        <span className="font-display tracking-tight">{group.label}</span>
      </span>
    </button>
  );
}

export function FeatureCards() {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const single = group.cards.length < 3;

  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden border-b border-line bg-warm py-24 sm:py-28">
      <LivingBackdrop />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Everything you need"
          title="One platform, every capability"
          description="From AI and automation to data, views, and security — everything your organization runs on, in one connected system."
        />

        {/* Top group switcher */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label="Feature groups"
              className="-mx-4 flex max-w-full gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:overflow-visible sm:rounded-full sm:border sm:border-line sm:bg-white/70 sm:p-1.5 sm:shadow-card sm:backdrop-blur-md"
            >
              {groups.map((g, i) => (
                <GroupTab key={g.id} group={g} active={i === active} onSelect={() => setActive(i)} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Active group blurb */}
        <div className="mt-5 flex h-5 items-center justify-center">
          <AnimatePresence mode="wait">
            <m.p
              key={group.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-center text-[13.5px] text-muted"
            >
              {group.blurb}
            </m.p>
          </AnimatePresence>
        </div>

        {/* Active group's cards */}
        <AnimatePresence mode="wait">
          <m.div
            key={group.id}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className={cn(
              "mt-10 grid gap-5 sm:grid-cols-2",
              single ? "lg:mx-auto lg:max-w-3xl" : "lg:grid-cols-3",
            )}
          >
            {group.cards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </m.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
