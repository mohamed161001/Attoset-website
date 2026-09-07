"use client";

import { m, useReducedMotion } from "framer-motion";
import { Table2, FormInput, Workflow, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

const ease = [0.16, 1, 0.3, 1] as const;

type Block = { label: string; icon: LucideIcon; color: string; x: number; y: number };

const blocks: Block[] = [
  { label: "Tables", icon: Table2, color: "#FF512A", x: 15, y: 22 },
  { label: "Forms", icon: FormInput, color: "#A21CE0", x: 38, y: 22 },
  { label: "Automations", icon: Workflow, color: "#3B82F6", x: 15, y: 74 },
  { label: "Dashboards", icon: PieChart, color: "#16A34A", x: 38, y: 74 },
];

const SOL = { x: 77, y: 48 };

/** Lego-for-work: the building blocks snap together into a solution. */
export function BuildingBlocks() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl">
      {/* connectors block → solution */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {blocks.map((b, i) => (
          <m.line
            key={i}
            x1={b.x} y1={b.y} x2={SOL.x} y2={SOL.y}
            stroke="#ddd9d4" strokeWidth={0.4} strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease }}
          />
        ))}
      </svg>

      {/* pieces flowing into the solution */}
      {!reduce &&
        blocks.map((b, i) => (
          <m.span
            key={i}
            className="absolute z-[5] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: b.color }}
            initial={{ left: `${b.x}%`, top: `${b.y}%`, opacity: 0 }}
            animate={{ left: [`${b.x}%`, `${SOL.x}%`], top: [`${b.y}%`, `${SOL.y}%`], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, delay: 1 + i * 0.35, ease: "easeInOut" }}
          />
        ))}

      {/* building blocks */}
      {blocks.map((b, i) => (
        <m.div
          key={i}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.7, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease }}
        >
          <m.span
            className="flex size-14 items-center justify-center rounded-2xl shadow-float"
            style={{ background: b.color }}
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <b.icon className="size-7 text-white" strokeWidth={2} />
          </m.span>
          <span className="text-[12px] font-semibold text-ink">{b.label}</span>
        </m.div>
      ))}

      {/* assembled solution */}
      <m.div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${SOL.x}%`, top: `${SOL.y}%` }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease }}
      >
        <div className="relative w-[172px] rounded-2xl border border-line bg-white p-3.5 shadow-float">
          {!reduce && (
            <m.span
              className="absolute inset-0 rounded-2xl ring-1 ring-orange/25"
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="flex items-center gap-2">
            <LogoMark className="h-3.5 w-auto" />
            <span className="text-[12px] font-semibold text-ink">Sales CRM</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <span className="block h-1.5 w-full rounded bg-ink/10" />
            <span className="block h-1.5 w-4/5 rounded bg-ink/10" />
          </div>
          <div className="mt-2.5 flex gap-1.5">
            <span className="h-7 flex-1 rounded bg-warm-2" />
            <span className="h-7 flex-1 rounded bg-warm-2" />
            <span className="h-7 flex-1 rounded bg-orange/20" />
          </div>
        </div>
        <span className="mt-2 block text-center text-[11px] font-semibold text-muted">Your solution</span>
      </m.div>
    </div>
  );
}
