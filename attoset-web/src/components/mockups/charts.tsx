import { cn } from "@/lib/utils";

/** Small area/line chart card. */
export function MiniAreaChart({
  className,
  title = "Throughput",
  value = "1,284",
  delta = "+18%",
}: {
  className?: string;
  title?: string;
  value?: string;
  delta?: string;
}) {
  // smooth-ish path
  const path =
    "M0 46 C 18 40, 30 30, 48 33 C 66 36, 78 18, 96 16 C 114 14, 128 24, 146 18 C 164 12, 178 6, 200 4";
  return (
    <div className={cn("rounded-2xl border border-line bg-white p-4 shadow-float", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-faint">{title}</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">{value}</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
          {delta}
        </span>
      </div>
      <svg viewBox="0 0 200 52" className="mt-3 h-14 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF512A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF512A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L200 52 L0 52 Z`} fill="url(#areaFill)" />
        <path d={path} fill="none" stroke="#FF512A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Donut breakdown card. */
export function MiniDonut({ className }: { className?: string }) {
  const segments = [
    { color: "#FF512A", value: 42 },
    { color: "#0A0A0A", value: 28 },
    { color: "#E3DED8", value: 30 },
  ];
  const r = 26;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className={cn("rounded-2xl border border-line bg-white p-4 shadow-float", className)}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-faint">By type</p>
      <div className="mt-2 flex items-center gap-4">
        <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#F6F3EF" strokeWidth="10" />
          {segments.map((s, i) => {
            const len = (s.value / 100) * c;
            const el = (
              <circle
                key={i}
                cx="32"
                cy="32"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="10"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="flex flex-col gap-1.5 text-[11px]">
          {[
            { label: "Operations", color: "#FF512A", v: "42%" },
            { label: "Sales", color: "#0A0A0A", v: "28%" },
            { label: "Other", color: "#E3DED8", v: "30%" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: l.color }} />
              <span className="text-ink-soft">{l.label}</span>
              <span className="ml-auto font-mono text-faint">{l.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Bar chart card. */
export function MiniBars({ className }: { className?: string }) {
  const bars = [40, 64, 52, 80, 58, 92, 72];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={cn("rounded-2xl border border-line bg-white p-4 shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-faint">Automations run</p>
        <p className="font-display text-sm font-semibold text-ink">3,902</p>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                "w-full rounded-t-[3px]",
                i === 5 ? "bg-orange" : "bg-warm-2"
              )}
              style={{ height: `${h}%` }}
            />
            <span className="font-mono text-[9px] text-faint">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
