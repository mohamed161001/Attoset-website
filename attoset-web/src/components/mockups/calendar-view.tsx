import { cn } from "@/lib/utils";

// day index (0-34) -> event chips (color + width%)
const events: Record<number, { color: string; w: number }[]> = {
  4: [{ color: "bg-orange/70", w: 70 }],
  6: [{ color: "bg-sky-500/70", w: 55 }],
  9: [{ color: "bg-violet-500/70", w: 80 }, { color: "bg-emerald-500/60", w: 50 }],
  12: [{ color: "bg-orange/70", w: 60 }],
  15: [{ color: "bg-emerald-500/70", w: 75 }],
  17: [{ color: "bg-sky-500/70", w: 45 }],
  20: [{ color: "bg-amber-500/70", w: 65 }],
  23: [{ color: "bg-orange/70", w: 50 }, { color: "bg-indigo-500/60", w: 70 }],
  27: [{ color: "bg-violet-500/70", w: 60 }],
  30: [{ color: "bg-emerald-500/70", w: 55 }],
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarView({ className }: { className?: string }) {
  const cells = Array.from({ length: 35 }, (_, i) => i - 2 + 1);

  return (
    <div className={cn("h-full p-5", className)}>
      <div className="grid h-full grid-cols-7 grid-rows-[auto_repeat(5,minmax(0,1fr))] gap-1.5">
        {days.map((d) => (
          <div key={d} className="pb-1 text-center text-[11px] font-medium text-muted">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const valid = day >= 1 && day <= 31;
          const evs = valid ? events[i] : undefined;
          return (
            <div
              key={i}
              className={cn(
                "flex min-h-0 flex-col gap-1 rounded-lg border border-line p-1.5",
                valid ? "bg-white" : "bg-warm/40"
              )}
            >
              {valid && <span className="text-[10px] font-medium text-faint">{day}</span>}
              {evs?.map((e, j) => (
                <span key={j} className={cn("h-2.5 rounded", e.color)} style={{ width: `${e.w}%` }} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
