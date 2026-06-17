"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Table2, KanbanSquare, Calendar, GanttChartSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TableView } from "@/components/mockups/table-view";
import { KanbanView } from "@/components/mockups/kanban-view";
import { CalendarView } from "@/components/mockups/calendar-view";
import { GanttView } from "@/components/mockups/gantt-view";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Table", icon: Table2, view: <TableView /> },
  { label: "Kanban", icon: KanbanSquare, view: <KanbanView /> },
  { label: "Calendar", icon: Calendar, view: <CalendarView /> },
  { label: "Gantt", icon: GanttChartSquare, view: <GanttView /> },
] as const;

export function ViewsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="overflow-hidden py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Multiple views"
          title="See your work the way that fits"
          description="The same data, instantly reshaped. Switch between Table, Kanban, Calendar, and Gantt without rebuilding a thing."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-white p-1 shadow-card">
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === i ? "text-white" : "text-muted hover:text-ink"
                  )}
                >
                  {active === i && (
                    <m.span
                      layoutId="view-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <t.icon className="relative size-4" strokeWidth={1.75} />
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-12 max-w-4xl">
            {/* soft glow */}
            <div className="glow-peach pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10" />

            {/* frameless view surface with a fade-out */}
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-float">
              <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
              <div className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[520px]">
                <AnimatePresence mode="wait">
                  <m.div
                    key={active}
                    className="absolute inset-0 overflow-x-auto overflow-y-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* keep the desktop UI readable on phones — swipe horizontally */}
                    <div className="h-full min-w-[680px] sm:min-w-0">
                      {tabs[active].view}
                    </div>
                  </m.div>
                </AnimatePresence>
                {/* fade the detail out toward the bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
