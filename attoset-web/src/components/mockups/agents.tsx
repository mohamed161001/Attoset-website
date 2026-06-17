import { Eye, UserPlus, ShieldCheck, FileText, CheckCircle2, Activity, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Agent = {
  name: string;
  task: string;
  icon: LucideIcon;
  status: "Running" | "Completed" | "Scheduled";
  meta: string;
};

const agents: Agent[] = [
  { name: "Renewal Watcher", task: "Flagging contracts expiring in 30 days", icon: Eye, status: "Running", meta: "live" },
  { name: "Onboarding Agent", task: "Provisioning access for 3 new accounts", icon: UserPlus, status: "Running", meta: "now" },
  { name: "Compliance Auditor", task: "Reviewed 128 records for policy gaps", icon: ShieldCheck, status: "Completed", meta: "2m ago" },
  { name: "Digest Builder", task: "Weekly ops summary to leadership", icon: FileText, status: "Scheduled", meta: "Mon 9:00" },
];

const statusConf: Record<
  Agent["status"],
  { icon: LucideIcon; cls: string; dot: string }
> = {
  Running: { icon: Activity, cls: "bg-orange/10 text-orange-700", dot: "bg-orange" },
  Completed: { icon: CheckCircle2, cls: "bg-emerald-500/10 text-emerald-700", dot: "bg-emerald-500" },
  Scheduled: { icon: Clock, cls: "bg-sky-500/10 text-sky-700", dot: "bg-sky-500" },
};

export function AgentsBoard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {agents.map((a) => {
        const s = statusConf[a.status];
        return (
          <div
            key={a.name}
            className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
              <a.icon className="size-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-ink">{a.name}</p>
                {a.status === "Running" && (
                  <span className="size-1.5 rounded-full bg-orange animate-softpulse" />
                )}
              </div>
              <p className="truncate text-[13px] text-muted">{a.task}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  s.cls
                )}
              >
                <s.icon className="size-3" />
                {a.status}
              </span>
              <span className="font-mono text-[10px] text-faint">{a.meta}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
