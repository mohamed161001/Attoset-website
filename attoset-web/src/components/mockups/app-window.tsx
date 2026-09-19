import {
  Search,
  Bell,
  Plus,
  Table2,
  LayoutGrid,
  KanbanSquare,
  Calendar,
  GanttChartSquare,
  LayoutDashboard,
  Database,
  Workflow,
  Settings,
  Sparkles,
} from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, active: false },
  { icon: Table2, active: true },
  { icon: Database, active: false },
  { icon: Workflow, active: false },
  { icon: Calendar, active: false },
  { icon: Settings, active: false },
];

/**
 * The Attoset product "window" chrome: rounded frame, sidebar rail, top bar.
 * Children render inside the workspace canvas.
 */
export function AppWindow({
  children,
  title = "Operations",
  tab = "Grid",
  className,
}: {
  children: React.ReactNode;
  title?: string;
  tab?: string;
  className?: string;
}) {
  const tabs = [
    { label: "Grid", icon: LayoutGrid },
    { label: "Kanban", icon: KanbanSquare },
    { label: "Calendar", icon: Calendar },
    { label: "Gantt", icon: GanttChartSquare },
  ];

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden rounded-2xl border border-line bg-white shadow-float",
        className
      )}
    >
      {/* Sidebar rail */}
      <div className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-warm py-4 sm:flex">
        <div className="mb-3 text-ink">
          <LogoMark className="h-[18px] w-auto" />
        </div>
        {navItems.map(({ icon: Icon, active }, i) => (
          <div
            key={i}
            className={cn(
              "flex size-9 items-center justify-center rounded-xl transition-colors",
              active ? "bg-ink text-white" : "text-faint"
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </div>
        ))}
        <div className="mt-auto flex size-9 items-center justify-center rounded-xl bg-peach text-orange">
          <Sparkles className="size-[18px]" strokeWidth={1.75} />
        </div>
      </div>

      {/* Main column */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate font-display text-sm font-semibold text-ink">
              {title}
            </span>
            <span className="rounded-md bg-warm-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">
              workspace
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border border-line bg-warm px-2.5 py-1.5 text-faint sm:flex">
              <Search className="size-3.5" />
              <span className="text-[11px]">Search…</span>
            </div>
            <div className="flex size-7 items-center justify-center rounded-lg border border-line text-faint">
              <Bell className="size-3.5" />
            </div>
            <div className="flex h-7 items-center gap-1 rounded-lg bg-orange px-2 text-[11px] font-medium text-white">
              <Plus className="size-3.5" /> New
            </div>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex items-center gap-1 border-b border-line px-4 py-2">
          {tabs.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                label === tab
                  ? "bg-warm-2 text-ink"
                  : "text-faint"
              )}
            >
              <Icon className="size-3.5" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
}
