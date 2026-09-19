"use client";

import { m, useReducedMotion } from "framer-motion";
import { Building2, CircleDollarSign, SquareCheckBig, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

const ease = [0.16, 1, 0.3, 1] as const;

type Link = {
  x: number;
  y: number;
  title: string;
  sub: string;
  avatarColor?: string;
  icon?: LucideIcon;
  tint?: string; // icon square bg
  color?: string; // icon color
  status?: string; // small colored dot label
  statusColor?: string;
};

const links: Link[] = [
  { x: 17, y: 24, title: "Maya Hart", sub: "Primary contact", avatarColor: "#FF512A" },
  { x: 83, y: 24, title: "Q3 Renewal", sub: "$24,000", icon: CircleDollarSign, tint: "bg-emerald-500/10", color: "text-emerald-600" },
  { x: 17, y: 76, title: "Onboarding", sub: "In progress", icon: SquareCheckBig, tint: "bg-sky-500/10", color: "text-sky-600", status: "live", statusColor: "bg-sky-500" },
  { x: 83, y: 76, title: "INV-1042", sub: "Paid", icon: FileText, tint: "bg-violet-500/10", color: "text-violet-600" },
];

function LinkCard({ link }: { link: Link }) {
  return (
    <div className="flex w-[164px] items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 shadow-card">
      {link.avatarColor ? (
        <Avatar name={link.title} color={link.avatarColor} size={32} />
      ) : (
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", link.tint)}>
          {link.icon && <link.icon className={cn("size-4", link.color)} strokeWidth={1.9} />}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-semibold text-ink">{link.title}</p>
        <p className="truncate text-[11px] text-muted">{link.sub}</p>
      </div>
    </div>
  );
}

/** Animated relationship map: a record linked to its related records. */
export function RecordGraph() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-3xl sm:aspect-[16/9]">
      <div className="glow-peach pointer-events-none absolute inset-0 -z-10" />

      {/* connectors */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {links.map((l, i) => (
          <m.line
            key={i}
            x1={50}
            y1={50}
            x2={l.x}
            y2={l.y}
            stroke="#e3ded8"
            strokeWidth={0.35}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease }}
          />
        ))}
      </svg>

      {/* travelling pulses */}
      {!reduce &&
        links.map((l, i) => (
          <m.span
            key={i}
            className="absolute z-[5] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-orange"
            initial={{ left: "50%", top: "50%", opacity: 0 }}
            animate={{ left: [`50%`, `${l.x}%`], top: [`50%`, `${l.y}%`], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.4, delay: 1 + i * 0.4, ease: "easeInOut" }}
          />
        ))}

      {/* linked record cards */}
      {links.map((l, i) => (
        <m.div
          key={i}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4 + i * 0.12, ease }}
        >
          <m.div animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
            <LinkCard link={l} />
          </m.div>
        </m.div>
      ))}

      {/* central record */}
      <m.div
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="relative w-[196px] rounded-2xl border border-line bg-white p-4 shadow-float">
          {!reduce && (
            <m.span
              className="absolute inset-0 rounded-2xl ring-1 ring-orange/25"
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-white">
              <Building2 className="size-[18px]" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-ink">Acme Inc.</p>
              <p className="text-[11px] text-muted">Account</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-peach-soft px-2.5 py-1.5">
            <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-orange-700">
              <span className="size-1.5 rounded-full bg-orange animate-softpulse" />
              Pipeline
            </span>
            <span className="text-[12px] font-bold text-orange-700">$128k</span>
          </div>
        </div>
      </m.div>
    </div>
  );
}
