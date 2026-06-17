import { cn } from "@/lib/utils";

type Card = { lines: number[]; tag: string; tagW: number };

const columns: { name: string; accent: string; cards: Card[] }[] = [
  {
    name: "Backlog",
    accent: "bg-stone-400",
    cards: [
      { lines: [90, 60], tag: "bg-amber-500/15", tagW: 28 },
      { lines: [70], tag: "bg-violet-500/15", tagW: 40 },
      { lines: [85, 50], tag: "bg-sky-500/15", tagW: 32 },
      { lines: [76, 58], tag: "bg-orange/15", tagW: 30 },
      { lines: [64], tag: "bg-indigo-500/15", tagW: 36 },
      { lines: [88, 52], tag: "bg-rose-500/15", tagW: 26 },
    ],
  },
  {
    name: "In progress",
    accent: "bg-sky-500",
    cards: [
      { lines: [80, 64], tag: "bg-orange/15", tagW: 30 },
      { lines: [66], tag: "bg-amber-500/15", tagW: 26 },
      { lines: [92, 58], tag: "bg-indigo-500/15", tagW: 38 },
      { lines: [72, 48], tag: "bg-emerald-500/15", tagW: 34 },
      { lines: [84], tag: "bg-violet-500/15", tagW: 28 },
    ],
  },
  {
    name: "Review",
    accent: "bg-orange",
    cards: [
      { lines: [74, 48], tag: "bg-indigo-500/15", tagW: 36 },
      { lines: [88], tag: "bg-rose-500/15", tagW: 24 },
      { lines: [62, 54], tag: "bg-sky-500/15", tagW: 40 },
      { lines: [80], tag: "bg-orange/15", tagW: 30 },
      { lines: [70, 46], tag: "bg-amber-500/15", tagW: 32 },
    ],
  },
  {
    name: "Done",
    accent: "bg-emerald-500",
    cards: [
      { lines: [82, 56], tag: "bg-emerald-500/15", tagW: 30 },
      { lines: [64], tag: "bg-orange/15", tagW: 34 },
      { lines: [90, 50], tag: "bg-sky-500/15", tagW: 28 },
      { lines: [72], tag: "bg-violet-500/15", tagW: 38 },
      { lines: [86, 60], tag: "bg-indigo-500/15", tagW: 26 },
    ],
  },
];

export function KanbanView({ className }: { className?: string }) {
  return (
    <div className={cn("grid h-full grid-cols-2 gap-3 p-5 sm:grid-cols-4", className)}>
      {columns.map((col) => (
        <div key={col.name} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 px-1">
            <span className={cn("size-2 rounded-full", col.accent)} />
            <span className="text-[11px] font-semibold text-ink">{col.name}</span>
            <span className="font-mono text-[10px] text-faint">{col.cards.length}</span>
          </div>
          {col.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-line bg-white p-3 shadow-card">
              <div className="mb-3 flex flex-col gap-1.5">
                {card.lines.map((w, j) => (
                  <span key={j} className="skeleton block h-2" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className={cn("block h-4 rounded-md", card.tag)} style={{ width: card.tagW }} />
                {/* assignee — neutral grey placeholder */}
                <span className="block size-5 rounded-full bg-[#E4E1DC]" />
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-line py-2 text-center text-[11px] text-faint">
            + Add
          </div>
        </div>
      ))}
    </div>
  );
}
