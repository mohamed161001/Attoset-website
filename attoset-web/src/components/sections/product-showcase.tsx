import { Workflow, BarChart3, Table2 } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TableCollab } from "@/components/mockups/table-collab";
import { WorkflowFlow } from "@/components/mockups/workflow-flow";
import { DashboardCustomize } from "@/components/mockups/dashboard-customize";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Shot = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  visual: ReactNode;
};

const shots: Shot[] = [
  {
    icon: Table2,
    eyebrow: "Customizable data",
    title: "Shape your data, together in real time",
    description:
      "Build tables that fit exactly how your team works — your own fields, views, and structure. See who's online and watch edits land live as your team collaborates in the same place.",
    visual: <TableCollab />,
  },
  {
    icon: Workflow,
    eyebrow: "Workflow automation",
    title: "Automate the busywork",
    description:
      "Design automations on a visual canvas — triggers, conditions, and actions that run reliably in the background, from a form submission to a multi-step approval.",
    visual: <WorkflowFlow />,
  },
  {
    icon: BarChart3,
    eyebrow: "Data & analytics",
    title: "Dashboards built from your own data",
    description:
      "Drag widgets onto a canvas, shape them from your live operational data, and build the view your team needs — together, in real time.",
    visual: <DashboardCustomize />,
  },
];

export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Atmosphere — like the hero */}
      <div className="glow-peach pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" />
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-96 rounded-full bg-orange/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 -z-10 size-96 rounded-full bg-orange/[0.05] blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Inside Attoset"
          title="See the platform in action"
          description="Build, automate, and analyze your operations in one connected system."
        />

        <div className="mt-16 flex flex-col gap-20 sm:gap-24">
          {shots.map((shot, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={shot.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
              >
                <Reveal className={cn(flip && "lg:order-last")}>
                  <div className="relative h-[480px]">
                    <div className="glow-peach absolute -inset-6 -z-10 rounded-[3rem]" />
                    {shot.visual}
                  </div>
                </Reveal>

                <div>
                  <Reveal>
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 py-1 pl-1.5 pr-3.5 text-[12.5px] font-semibold text-orange ring-1 ring-inset ring-orange/15">
                      <span className="flex size-6 items-center justify-center rounded-full bg-white text-orange shadow-card">
                        <shot.icon className="size-3.5" strokeWidth={1.75} />
                      </span>
                      {shot.eyebrow}
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-display text-balance sm:text-4xl">
                      {shot.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                      {shot.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
