import { Star, Flag, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  w: number; // name placeholder width %
  statusDot: string;
  statusBg: string;
  statusW: number;
  tag: string;
  tagW: number;
  rating: number; // 0-5 stars
  flagged: boolean;
};

const rows: Row[] = [
  { w: 82, statusDot: "bg-sky-500", statusBg: "bg-sky-500/10", statusW: 40, tag: "bg-orange/15", tagW: 30, rating: 4, flagged: false },
  { w: 64, statusDot: "bg-stone-400", statusBg: "bg-stone-400/15", statusW: 34, tag: "bg-violet-500/15", tagW: 44, rating: 3, flagged: true },
  { w: 90, statusDot: "bg-emerald-500", statusBg: "bg-emerald-500/10", statusW: 30, tag: "bg-emerald-500/15", tagW: 24, rating: 5, flagged: false },
  { w: 72, statusDot: "bg-rose-500", statusBg: "bg-rose-500/10", statusW: 38, tag: "bg-sky-500/15", tagW: 34, rating: 2, flagged: true },
  { w: 86, statusDot: "bg-sky-500", statusBg: "bg-sky-500/10", statusW: 40, tag: "bg-amber-500/15", tagW: 28, rating: 4, flagged: false },
  { w: 58, statusDot: "bg-stone-400", statusBg: "bg-stone-400/15", statusW: 34, tag: "bg-indigo-500/15", tagW: 40, rating: 1, flagged: true },
  { w: 78, statusDot: "bg-emerald-500", statusBg: "bg-emerald-500/10", statusW: 30, tag: "bg-orange/15", tagW: 32, rating: 5, flagged: false },
  { w: 68, statusDot: "bg-sky-500", statusBg: "bg-sky-500/10", statusW: 40, tag: "bg-rose-500/15", tagW: 26, rating: 3, flagged: false },
  { w: 92, statusDot: "bg-rose-500", statusBg: "bg-rose-500/10", statusW: 38, tag: "bg-emerald-500/15", tagW: 38, rating: 2, flagged: true },
  { w: 60, statusDot: "bg-emerald-500", statusBg: "bg-emerald-500/10", statusW: 30, tag: "bg-violet-500/15", tagW: 44, rating: 4, flagged: false },
  { w: 80, statusDot: "bg-sky-500", statusBg: "bg-sky-500/10", statusW: 40, tag: "bg-amber-500/15", tagW: 30, rating: 3, flagged: false },
  { w: 70, statusDot: "bg-stone-400", statusBg: "bg-stone-400/15", statusW: 34, tag: "bg-sky-500/15", tagW: 36, rating: 5, flagged: true },
];

const cols = "grid-cols-[1.7fr_0.62fr_1.05fr_0.78fr_0.78fr_1fr_0.7fr_0.42fr]";
const vline = "border-r border-line"; // vertical gridline between columns

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <Star
          key={s}
          className={cn("size-3", s < value ? "fill-amber-400 text-amber-400" : "fill-none text-line-strong")}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

function FlagCell({ flagged }: { flagged: boolean }) {
  return (
    <Flag
      className={cn("size-4", flagged ? "fill-red-500 text-red-500" : "fill-none text-line-strong")}
      strokeWidth={1.75}
    />
  );
}

export function TableView({ className }: { className?: string }) {
  return (
    <div className={cn("text-[12px]", className)}>
      {/* Header */}
      <div className={cn("grid items-center border-b border-line bg-warm text-[11px] font-medium text-muted", cols)}>
        <span className={cn("px-3 py-2.5", vline)}>Task</span>
        <span className={cn("px-3 py-2.5", vline)}>Owner</span>
        <span className={cn("px-3 py-2.5", vline)}>Status</span>
        <span className={cn("px-3 py-2.5", vline)}>Type</span>
        <span className={cn("px-3 py-2.5", vline)}>Date</span>
        <span className={cn("px-3 py-2.5", vline)}>Rating</span>
        <span className={cn("px-3 py-2.5", vline)}>Flagged</span>
        {/* add-column affordance */}
        <span className="flex items-center justify-center px-3 py-2.5 text-line-strong">
          <Plus className="size-3.5" strokeWidth={2} />
        </span>
      </div>

      {rows.map((r, i) => (
        <div
          key={i}
          className={cn("grid items-center", cols, i !== rows.length - 1 && "border-b border-line")}
        >
          {/* Task */}
          <div className={cn("flex items-center gap-2.5 px-3 py-3", vline)}>
            <span className="size-3 shrink-0 rounded-[4px] border border-line-strong" />
            <span className="skeleton block h-2.5" style={{ width: `${r.w}%` }} />
          </div>
          {/* Owner — neutral grey placeholder */}
          <div className={cn("px-3 py-3", vline)}>
            <span className="block size-6 rounded-full bg-[#E4E1DC]" />
          </div>
          {/* Status */}
          <div className={cn("px-3 py-3", vline)}>
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-1", r.statusBg)}>
              <span className={cn("size-1.5 shrink-0 rounded-full", r.statusDot)} />
              <span className="block h-2 rounded bg-ink/15" style={{ width: r.statusW }} />
            </span>
          </div>
          {/* Type tag */}
          <div className={cn("px-3 py-3", vline)}>
            <span className={cn("block h-5 rounded-md", r.tag)} style={{ width: r.tagW }} />
          </div>
          {/* Date */}
          <div className={cn("px-3 py-3", vline)}>
            <span className="skeleton block h-2.5 w-14" />
          </div>
          {/* Rating */}
          <div className={cn("px-3 py-3", vline)}>
            <Stars value={r.rating} />
          </div>
          {/* Flagged */}
          <div className={cn("px-3 py-3", vline)}>
            <FlagCell flagged={r.flagged} />
          </div>
          {/* Add-column column — intentionally empty */}
          <div className="px-3 py-3" />
        </div>
      ))}
    </div>
  );
}
