"use client";

import { Fragment } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Zap, ShieldCheck, Bell, Workflow, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Step = {
  kind: "trigger" | "action";
  icon: LucideIcon;
  tag: string;
  title: string;
  sub: string;
};

const steps: Step[] = [
  { kind: "trigger", icon: Zap, tag: "Trigger", title: "On form submission", sub: "New student registration" },
  { kind: "action", icon: ShieldCheck, tag: "Do this", title: "Request approval", sub: "Route to the program lead" },
  { kind: "action", icon: Bell, tag: "Then", title: "Notify & update record", sub: "Set status → Approved" },
];

function Connector({ index, reduce }: { index: number; reduce: boolean | null }) {
  return (
    <div className="relative h-12 w-full">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-strong" />
      {!reduce && (
        <m.span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-orange shadow-orange"
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.9,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        />
      )}
      <span className="absolute left-1/2 top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-faint">
        <Plus className="size-3" />
      </span>
    </div>
  );
}

/** A small, code-built automation flow: trigger → action → action. */
export function WorkflowFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      {/* Builder header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md text-white" style={{ background: "#3B82F6" }}>
            <Workflow className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-ink">Approval workflow</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-softpulse" />
          Active
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-[280px] flex-1 flex-col items-stretch justify-center">
        {steps.map((s, i) => (
          <Fragment key={i}>
            <m.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.18, ease }}
              className="rounded-xl border border-line bg-white shadow-card"
            >
              <div
                className={
                  "flex items-center gap-2 rounded-t-xl px-3 py-1.5 " +
                  (s.kind === "trigger" ? "bg-peach-soft" : "bg-warm-2")
                }
              >
                <s.icon
                  className={s.kind === "trigger" ? "size-3.5 text-orange" : "size-3.5 text-ink-soft"}
                  strokeWidth={1.9}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {s.tag}
                </span>
              </div>
              <div className="px-3.5 py-3">
                <p className="text-[13px] font-semibold text-ink">{s.title}</p>
                <p className="mt-0.5 text-[12px] text-muted">{s.sub}</p>
              </div>
            </m.div>
            {i < steps.length - 1 && <Connector index={i} reduce={reduce} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
