"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  Table2, Plus, Filter, ArrowUpDown, Check, ChevronDown,
  Type, Hash, Timer, ListOrdered,
  CircleDot, ListChecks, SquareCheck, Star,
  Calendar, CalendarClock,
  Link2, Search, Sigma,
  Calculator,
  Images, Contact,
  Clock, RefreshCw, UserPlus, UserCog,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

// Live collaborators in the table — signature brand colors.
const team = [
  { name: "Maya", color: "#FF512A", from: "#FFB59E", to: "#FF512A", img: "/images/avatars/p1.jpg" },
  { name: "David", color: "#3B82F6", from: "#93BBFF", to: "#3B82F6", img: "/images/avatars/p2.jpg" },
  { name: "Sara", color: "#A21CE0", from: "#D29BF2", to: "#A21CE0", img: "/images/avatars/p3.jpg" },
];

// Every field (column) type AttoSet supports, grouped by category.
const fieldGroups: { group: string; types: { name: string; icon: LucideIcon }[] }[] = [
  {
    group: "Text & numbers",
    types: [
      { name: "Text", icon: Type },
      { name: "Number", icon: Hash },
      { name: "Duration", icon: Timer },
      { name: "Auto number", icon: ListOrdered },
    ],
  },
  {
    group: "Choice",
    types: [
      { name: "Select", icon: CircleDot },
      { name: "Multi-select", icon: ListChecks },
      { name: "Checkbox", icon: SquareCheck },
      { name: "Rating", icon: Star },
    ],
  },
  {
    group: "Date & time",
    types: [
      { name: "Date", icon: Calendar },
      { name: "Date & time", icon: CalendarClock },
    ],
  },
  {
    group: "Relations",
    types: [
      { name: "Linked record", icon: Link2 },
      { name: "Lookup", icon: Search },
      { name: "Rollup", icon: Sigma },
    ],
  },
  {
    group: "Computed",
    types: [{ name: "Formula", icon: Calculator }],
  },
  {
    group: "Media & contact",
    types: [
      { name: "Images", icon: Images },
      { name: "Contact", icon: Contact },
    ],
  },
  {
    group: "Auto-tracked",
    types: [
      { name: "Created time", icon: Clock },
      { name: "Updated time", icon: RefreshCw },
      { name: "Created by", icon: UserPlus },
      { name: "Updated by", icon: UserCog },
    ],
  },
];

const fieldCount = fieldGroups.reduce((n, g) => n + g.types.length, 0);

function CursorPointer({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 2.5 L19 11.5 L12.2 12.8 L8.7 19.5 Z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/** A light-gray placeholder avatar for the table rows (no real data). */
function GrayAvatar({ className }: { className?: string }) {
  return <span className={cn("inline-block size-5 shrink-0 rounded-full bg-[#E4E1DC]", className)} />;
}

/** A row-selection checkbox. */
function Checkbox({ checked }: { checked?: boolean }) {
  return checked ? (
    <span className="flex size-4 items-center justify-center rounded-[5px]" style={{ background: "#3B82F6" }}>
      <Check className="size-3 text-white" strokeWidth={3} />
    </span>
  ) : (
    <span className="block size-4 rounded-[5px] border-[1.5px] border-line-strong" />
  );
}

/** A placeholder data bar — the cell "content" without revealing any real data. */
function Bar({ w, tone = "#E7E2DB" }: { w: number | string; tone?: string }) {
  return <span className="block h-2 rounded-full" style={{ width: typeof w === "number" ? `${w}%` : w, background: tone }} />;
}

/** A status chip — colored, label-free, so it reads as data without being data. */
function Pill({ color }: { color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1"
      style={{ background: `${color}1A` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      <span className="block h-1.5 w-7 rounded-full" style={{ background: color, opacity: 0.35 }} />
    </span>
  );
}

const cols = "grid grid-cols-[auto_1.6fr_1fr_0.5fr]";
const vline = "border-r border-line"; // vertical gridline between columns

type Row = { name: number; status: string; done?: boolean };

const rows: Row[] = [
  { name: 62, status: "#3B82F6" },
  { name: 48, status: "#16A34A", done: true },
  { name: 74, status: "#F59E0B" }, // this row's status changes live
  { name: 40, status: "#A21CE0", done: true },
  { name: 56, status: "#16A34A" },
];

/** A customizable table with people online editing data together, in real time. */
export function TableCollab() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md text-white" style={{ background: "#FF512A" }}>
            <Table2 className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-ink">Projects table</span>
        </div>

        {/* presence — people online right now */}
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            {team.map((m) => (
              <span key={m.name} className="relative">
                <Image
                  src={m.img}
                  alt={m.name}
                  width={28}
                  height={28}
                  className="size-6 rounded-full object-cover ring-2 ring-white"
                />
                <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-white bg-emerald-500" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-warm/50 px-2.5 py-1 text-[11px] font-medium text-muted">
            <Filter className="size-3" />
            Filter
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-warm/50 px-2.5 py-1 text-[11px] font-medium text-muted">
            <ArrowUpDown className="size-3" />
            Sort
          </span>
        </div>

        {/* New column → opens the field-type catalog */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-peach px-2.5 py-1 text-[11px] font-medium text-orange transition-colors hover:bg-orange/15"
          >
            <Plus className="size-3" />
            New column
            <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
          </button>

          <AnimatePresence>
            {open && (
              <m.div
                className="absolute right-0 top-full z-40 mt-1.5 w-[212px] origin-top-right rounded-lg border border-line bg-white p-2 shadow-float"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.18, ease }}
              >
                <div className="mb-1.5 flex items-center justify-between px-0.5">
                  <span className="text-[10.5px] font-semibold text-ink">Column types</span>
                  <span className="text-[9px] text-faint">{fieldCount} types</span>
                </div>
                <div className="max-h-[220px] space-y-1.5 overflow-y-auto pr-0.5">
                  {fieldGroups.map((g) => (
                    <div key={g.group}>
                      <p className="mb-0.5 px-1 text-[9px] font-semibold text-muted">{g.group}</p>
                      <div className="grid grid-cols-2 gap-px">
                        {g.types.map((t) => (
                          <span
                            key={t.name}
                            className="flex items-center gap-1.5 rounded-md px-1 py-1 transition-colors hover:bg-warm"
                          >
                            <span className="flex size-4 shrink-0 items-center justify-center rounded bg-warm-2 text-ink-soft">
                              <t.icon className="size-2.5" strokeWidth={1.75} />
                            </span>
                            <span className="truncate text-[10px] font-medium text-ink">{t.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* column header */}
      <div className={cn(cols, "border-y border-line bg-warm/40")}>
        <span className={cn("flex items-center py-2 pl-4 pr-3 sm:pl-5", vline)}>
          <span className="block size-4 rounded-[5px] border-[1.5px] border-line-strong" />
        </span>
        <span className={cn("flex items-center px-3 py-2", vline)}>
          <Bar w={50} tone="#D8D2C9" />
        </span>
        <span className={cn("flex items-center px-3 py-2", vline)}>
          <Bar w="70%" tone="#D8D2C9" />
        </span>
        <span className="flex items-center px-3 py-2 pr-4 sm:pr-5">
          <Bar w={56} tone="#D8D2C9" />
        </span>
      </div>

      {/* rows */}
      <div className="flex flex-1 flex-col divide-y divide-line">
        {rows.map((r, i) => {
          const editing = i === 0; // Maya is typing in this row's name cell
          const live = i === 2; // this row's status flips, showing data changing
          return (
            <m.div
              key={i}
              className={cn(cols, "flex-1")}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease }}
            >
              {/* select checkbox */}
              <div className={cn("flex items-center pl-4 pr-3 sm:pl-5", vline)}>
                <Checkbox checked={r.done} />
              </div>

              {/* name cell (+ live edit) */}
              <div className={cn("flex items-center gap-2 px-3", vline)}>
                <GrayAvatar />
                <div
                  className={cn(
                    "relative flex min-w-0 flex-1 items-center rounded-md px-1.5 py-1",
                    editing && "ring-2 ring-orange/70"
                  )}
                >
                  {editing && !reduce ? (
                    <m.span
                      className="block h-2 rounded-full"
                      style={{ background: "#C9C3BA" }}
                      animate={{ width: ["28%", "82%", "82%", "28%"] }}
                      transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.1, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                    />
                  ) : (
                    <Bar w={r.name} tone="#C9C3BA" />
                  )}
                  {/* blinking caret while editing */}
                  {editing && !reduce && (
                    <m.span
                      className="ml-0.5 inline-block h-3.5 w-px shrink-0"
                      style={{ background: "#FF512A" }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </div>

              {/* status cell (+ live change) */}
              <div className={cn("flex items-center px-3", vline)}>
                {live && !reduce ? (
                  <m.span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-1"
                    animate={{ backgroundColor: ["#F59E0B1A", "#F59E0B1A", "#16A34A1A", "#16A34A1A"] }}
                    transition={{ duration: 5, repeat: Infinity, times: [0, 0.45, 0.55, 1], ease: "easeInOut" }}
                  >
                    <m.span
                      className="size-1.5 rounded-full"
                      animate={{ backgroundColor: ["#F59E0B", "#F59E0B", "#16A34A", "#16A34A"] }}
                      transition={{ duration: 5, repeat: Infinity, times: [0, 0.45, 0.55, 1], ease: "easeInOut" }}
                    />
                    <m.span
                      className="block h-1.5 w-7 rounded-full"
                      animate={{ backgroundColor: ["#F59E0B", "#F59E0B", "#16A34A", "#16A34A"] }}
                      style={{ opacity: 0.4 }}
                      transition={{ duration: 5, repeat: Infinity, times: [0, 0.45, 0.55, 1], ease: "easeInOut" }}
                    />
                  </m.span>
                ) : (
                  <Pill color={r.status} />
                )}
              </div>

              {/* owner cell */}
              <div className="flex items-center justify-center px-3 pr-4 sm:pr-5">
                <GrayAvatar />
              </div>
            </m.div>
          );
        })}
      </div>

      {/* click-away to close the field menu */}
      {open && (
        <button
          type="button"
          aria-label="Close field types"
          className="absolute inset-0 z-[35] cursor-default"
          onClick={() => setOpen(false)}
        />
      )}

      {/* live collaborator cursors */}
      {!reduce && (
        <>
          {/* Maya — parked on the cell she's editing */}
          <m.div
            className="pointer-events-none absolute z-30"
            initial={{ left: "30%", top: "44%" }}
            animate={{ left: ["30%", "33%", "30%"], top: ["44%", "46%", "44%"] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
          >
            <CursorPointer color="#FF512A" />
            <span className="ml-3 inline-block rounded-full bg-orange px-2 py-0.5 text-[10px] font-medium text-white shadow-card">Maya</span>
          </m.div>

          {/* David — moving across the table */}
          <m.div
            className="pointer-events-none absolute z-30"
            initial={{ left: "70%", top: "58%" }}
            animate={{ left: ["70%", "48%", "62%", "70%"], top: ["58%", "72%", "64%", "58%"], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <CursorPointer color="#3B82F6" />
            <span className="ml-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-card" style={{ background: "#3B82F6" }}>David</span>
          </m.div>
        </>
      )}
    </div>
  );
}
