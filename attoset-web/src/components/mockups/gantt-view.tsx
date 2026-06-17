import { cn } from "@/lib/utils";

type Bar = { nameW: number; start: number; span: number; color: string };

const bars: Bar[] = [
  { nameW: 70, start: 0, span: 3, color: "bg-orange" },
  { nameW: 90, start: 2, span: 4, color: "bg-sky-500" },
  { nameW: 60, start: 4, span: 3, color: "bg-violet-500" },
  { nameW: 80, start: 5, span: 4, color: "bg-emerald-500" },
  { nameW: 50, start: 8, span: 2, color: "bg-orange" },
  { nameW: 75, start: 1, span: 3, color: "bg-amber-500" },
  { nameW: 65, start: 6, span: 3, color: "bg-indigo-500" },
  { nameW: 85, start: 3, span: 4, color: "bg-sky-500" },
  { nameW: 55, start: 7, span: 3, color: "bg-rose-500" },
  { nameW: 78, start: 0, span: 2, color: "bg-emerald-500" },
  { nameW: 68, start: 5, span: 3, color: "bg-violet-500" },
];

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"];

export function GanttView({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col p-5", className)}>
      <div className="grid grid-cols-[130px_1fr] items-center border-b border-line pb-2">
        <span className="text-[11px] font-medium text-muted">Task</span>
        <div className="grid grid-cols-10 gap-1">
          {weeks.map((w) => (
            <span key={w} className="text-center text-[10px] text-muted">{w}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between py-4">
        {bars.map((b, i) => (
          <div key={i} className="grid grid-cols-[130px_1fr] items-center gap-2">
            <span className="skeleton block h-2.5" style={{ width: `${b.nameW}%` }} />
            <div className="relative h-7">
              <div className="absolute inset-0 grid grid-cols-10 gap-1">
                {weeks.map((w) => (
                  <span key={w} className="rounded bg-warm/60" />
                ))}
              </div>
              <div
                className={cn("absolute top-0 h-7 rounded-md shadow-sm", b.color)}
                style={{ left: `${(b.start / 10) * 100}%`, width: `${(b.span / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
