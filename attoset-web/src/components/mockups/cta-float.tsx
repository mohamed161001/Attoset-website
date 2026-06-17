"use client";

import { m, useReducedMotion } from "framer-motion";
import { Table2, Workflow, PieChart, FormInput, Bot, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Chip = { icon: LucideIcon; pos: React.CSSProperties; size: number; dur: number; delay: number };

// Building-block "assets" drifting around the CTA, kept to the edges so the copy stays clear.
const chips: Chip[] = [
  { icon: Table2, pos: { left: "5%", top: "16%" }, size: 48, dur: 6, delay: 0 },
  { icon: Workflow, pos: { right: "7%", top: "12%" }, size: 52, dur: 7, delay: 0.6 },
  { icon: FormInput, pos: { left: "3%", top: "58%" }, size: 44, dur: 6.5, delay: 1.2 },
  { icon: PieChart, pos: { right: "4%", top: "52%" }, size: 50, dur: 7.5, delay: 0.3 },
  { icon: Bot, pos: { left: "13%", bottom: "12%" }, size: 46, dur: 6.2, delay: 0.9 },
  { icon: CalendarDays, pos: { right: "13%", bottom: "14%" }, size: 44, dur: 7.2, delay: 1.5 },
];

/** Floating glass chips that animate the CTA's background. Decorative only. */
export function CtaFloat() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden="true">
      {chips.map((c, i) => (
        <m.span
          key={i}
          className="absolute flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur-sm"
          style={{ ...c.pos, width: c.size, height: c.size }}
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: c.delay }
          }
        >
          <c.icon className="size-5" strokeWidth={1.75} />
        </m.span>
      ))}
    </div>
  );
}
