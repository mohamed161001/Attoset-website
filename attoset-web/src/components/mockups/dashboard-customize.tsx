"use client";

import { m, useReducedMotion } from "framer-motion";
import { Plus, GripVertical, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function CursorPointer({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 2.5 L19 11.5 L12.2 12.8 L8.7 19.5 Z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WidgetShell({
  title,
  className,
  children,
  grabbing,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  grabbing?: boolean;
}) {
  return (
    <div className={cn("flex h-full flex-col rounded-xl border border-line bg-white p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-ink">{title}</span>
        <GripVertical className={cn("size-3.5", grabbing ? "text-orange" : "text-line-strong")} />
      </div>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

function Sparkline() {
  return (
    <>
      <p className="font-display text-2xl font-semibold leading-none text-ink">$48.2k</p>
      <svg viewBox="0 0 120 40" className="mt-3 h-12 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF512A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FF512A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 32 C 16 28, 26 14, 40 16 C 56 18, 64 6, 82 8 C 98 10, 108 14, 120 5 L120 40 L0 40 Z" fill="url(#dcArea)" />
        <path d="M0 32 C 16 28, 26 14, 40 16 C 56 18, 64 6, 82 8 C 98 10, 108 14, 120 5" fill="none" stroke="#FF512A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </>
  );
}

function Donut() {
  const segs = [
    { c: "#FF512A", v: 38 },
    { c: "#38BDF8", v: 26 },
    { c: "#8B5CF6", v: 20 },
    { c: "#E3DED8", v: 16 },
  ];
  const r = 16;
  const circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 44 44" className="size-16 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#F6F3EF" strokeWidth="7" />
        {segs.map((s, i) => {
          const len = (s.v / 100) * circ;
          const el = (
            <circle key={i} cx="22" cy="22" r={r} fill="none" stroke={s.c} strokeWidth="7" strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} />
          );
          off += len;
          return el;
        })}
      </svg>
      <div className="flex flex-col gap-1.5">
        {segs.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: s.c }} />
            <span className="block h-1.5 rounded" style={{ width: 34 + i * 6, background: s.c, opacity: 0.3 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Bars() {
  const bars = [44, 66, 52, 82, 60, 92, 70];
  const colors = ["#FFB59E", "#FF8A6B", "#38BDF8", "#8B5CF6", "#34D399", "#FF512A", "#FBBF24"];
  return (
    <div className="flex h-20 items-end gap-1.5">
      {bars.map((h, i) => (
        <m.div
          key={i}
          className="flex-1 rounded-t-[3px]"
          style={{ background: colors[i] }}
          initial={{ height: "16%" }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.05, ease }}
        />
      ))}
    </div>
  );
}

/** An interactive, customizable dashboard — widgets you drag, live collaborators. */
export function DashboardCustomize() {
  const reduce = useReducedMotion();

  const dragLoop = reduce
    ? {}
    : {
        animate: {
          y: [0, -10, -10, 0],
          scale: [1, 1.03, 1.03, 1],
          rotate: [0, -1.2, -1.2, 0],
        },
        transition: {
          duration: 3.4,
          times: [0, 0.18, 0.82, 1],
          repeat: Infinity,
          repeatDelay: 1.1,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-line bg-warm/30 p-4 sm:p-5">
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md text-white" style={{ background: "#16A34A" }}>
            <PieChart className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-ink">Operations dashboard</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-3">
        <WidgetShell title="Revenue">
          <Sparkline />
        </WidgetShell>

        {/* The widget being dragged / rearranged */}
        <m.div {...dragLoop} className="relative z-10 h-full">
          <WidgetShell title="Deals by stage" grabbing className="shadow-float">
            <Donut />
          </WidgetShell>
        </m.div>

        <WidgetShell title="Tasks completed">
          <Bars />
        </WidgetShell>

        {/* Add-widget affordance → customizable */}
        <button className="flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong bg-white/40 text-faint transition-colors hover:border-orange/40 hover:text-orange">
          <Plus className="size-5" />
          <span className="text-[11px] font-medium">Add widget</span>
        </button>
      </div>

      {/* collaborator cursors */}
      {!reduce && (
        <>
          <m.div
            className="absolute z-30"
            initial={{ left: "62%", top: "30%" }}
            animate={{ left: ["62%", "66%", "62%"], top: ["30%", "26%", "30%"] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
          >
            <CursorPointer color="#FF512A" />
            <span className="ml-3 inline-block rounded-full bg-orange px-2 py-0.5 text-[10px] font-medium text-white shadow-card">Maya</span>
          </m.div>
          <m.div
            className="absolute z-30"
            initial={{ left: "22%", top: "72%" }}
            animate={{ left: ["22%", "44%", "22%"], top: ["72%", "58%", "72%"], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <CursorPointer color="#0A0A0A" />
            <span className="ml-3 inline-block rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white shadow-card">David</span>
          </m.div>
        </>
      )}
    </div>
  );
}
