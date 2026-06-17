"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";
import { AttoAvatar } from "./atto-avatar";
import { cn } from "@/lib/utils";

const builds = ["Accounts table", "Kanban · 5 stages", "Auto-assign owner"];

/** Minimal Atto panel — featured avatar, one prompt, a short live build. */
export function AttoPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? builds.length : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setN((c) => (c >= builds.length ? 0 : c + 1)), 1200);
    return () => clearInterval(id);
  }, [reduce]);

  const building = !reduce && n < builds.length;

  return (
    <div className={cn("flex min-h-[440px] w-full flex-col rounded-3xl border border-line bg-white p-6 shadow-float", className)}>
      {/* Atto — featured avatar */}
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-ink shadow-[0_6px_18px_-6px_rgba(10,10,10,0.4)]">
          <AttoAvatar size={30} thinking={building} />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-ink">Atto</p>
          <p className="flex items-center gap-1.5 text-[12px] text-muted">
            <span className={cn("size-1.5 rounded-full", building ? "bg-orange animate-softpulse" : "bg-emerald-500")} />
            {building ? "Building your workspace…" : "Workspace ready"}
          </p>
        </div>
      </div>

      {/* prompt */}
      <div className="ml-auto mt-7 w-fit max-w-[82%] rounded-2xl rounded-tr-md bg-ink px-4 py-2.5 text-[13.5px] leading-relaxed text-white">
        Build me a customer onboarding tracker.
      </div>

      {/* live build */}
      <div className="mt-5 flex flex-1 flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {builds.slice(0, n).map((b) => (
            <m.div
              key={b}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-warm/60 px-3.5 py-2.5 text-[13px] text-ink-soft"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-orange/10 text-orange">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {b}
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      {/* input */}
      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-line bg-warm px-3.5 py-2.5">
        <span className="flex-1 text-[12.5px] text-faint">
          Ask Atto to build anything
          {!reduce && (
            <m.span
              className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-orange"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </span>
        <span className="flex size-7 items-center justify-center rounded-xl bg-orange text-white">
          <ArrowUp className="size-3.5" />
        </span>
      </div>
    </div>
  );
}
