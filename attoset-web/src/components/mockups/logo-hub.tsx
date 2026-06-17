"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { Table2, FormInput, Workflow, PieChart, Bot, Users, GanttChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

const ease = [0.16, 1, 0.3, 1] as const;
const R = 37; // asset orbit radius in 0–100 space

const baseNodes: { label: string; icon: LucideIcon; color: string; light?: boolean }[] = [
  { label: "Tables", icon: Table2, color: "#FF512A" },
  { label: "AI Agents", icon: Bot, color: "#0A0A0A" },
  { label: "Forms", icon: FormInput, color: "#A21CE0" },
  { label: "Scheduling", icon: GanttChart, color: "#F59E0B" },
  { label: "Dashboards", icon: PieChart, color: "#16A34A" },
  { label: "Automations", icon: Workflow, color: "#3B82F6" },
  { label: "Workspaces", icon: Users, color: "#E4E4E7", light: true },
];

// distribute chips evenly around the orbit, starting at the top
const nodes = baseNodes.map((n, i) => {
  const angle = -90 + (360 / baseNodes.length) * i;
  const rad = (angle * Math.PI) / 180;
  return { ...n, angle, x: 50 + R * Math.cos(rad), y: 50 + R * Math.sin(rad) };
});

// collaborators floating around the ecosystem (in the gaps between assets)
const people = [
  { src: "/images/avatars/p1.jpg", x: 97, y: 46 },
  { src: "/images/avatars/p2.jpg", x: 20, y: 94 },
  { src: "/images/avatars/p3.jpg", x: 18, y: 6 },
];

export function LogoHub() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* soft center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />

      {/* orbit ring + the orange pulse travelling along it */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e7e2db" strokeWidth="0.4" strokeDasharray="0.8 2.6" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="#efe9e2" strokeWidth="0.3" strokeDasharray="0.5 2.4" />
        {!reduce && (
          <m.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#FF512A"
            strokeWidth="0.9"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.16 0.84"
            style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>

      {/* center mark — no spokes */}
      <m.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="relative flex size-[92px] items-center justify-center rounded-[1.6rem] border border-line bg-white shadow-float">
          {!reduce && (
            <m.span
              className="absolute inset-0 rounded-[1.6rem] ring-1 ring-orange/25"
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <LogoMark className="h-6 w-auto" />
        </div>
      </m.div>

      {/* asset chips */}
      {nodes.map((n, i) => (
        <m.div
          key={i}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
        >
          <m.span
            className="flex items-center gap-2 whitespace-nowrap rounded-2xl border border-line bg-white px-3 py-2 shadow-card"
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 4.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex size-6 items-center justify-center rounded-lg" style={{ background: n.color }}>
              <n.icon className={`size-3.5 ${n.light ? "text-ink" : "text-white"}`} strokeWidth={2} />
            </span>
            <span className="text-[12px] font-medium text-ink">{n.label}</span>
          </m.span>
        </m.div>
      ))}

      {/* collaborators floating around */}
      {people.map((p, i) => (
        <m.div
          key={i}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 + i * 0.15, ease }}
        >
          <m.div
            className="relative"
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 3.6 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={p.src}
              alt=""
              width={44}
              height={44}
              className="size-10 rounded-full border-2 border-white object-cover shadow-float"
            />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-emerald-500" />
          </m.div>
        </m.div>
      ))}
    </div>
  );
}
