import type { Metadata } from "next";
import { Compass, Sparkles, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { Stats } from "@/components/sections/stats";
import { CTA } from "@/components/sections/cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Attoset is on a mission to help organizations turn ideas, processes, and operations into scalable systems — powered by AI.",
  path: "/about",
});

const values = [
  {
    icon: Compass,
    title: "Adapt to people, not the reverse",
    desc: "Software should bend to how an organization works. We build for flexibility first.",
  },
  {
    icon: Sparkles,
    title: "AI that does, not just suggests",
    desc: "Intelligence is only useful when it takes action. Atto and agents execute real work.",
  },
  {
    icon: ShieldCheck,
    title: "Earn enterprise trust",
    desc: "Security, permissions, and auditability are foundations — never afterthoughts.",
  },
  {
    icon: Rocket,
    title: "Move at the speed of thought",
    desc: "From idea to running system in minutes. We obsess over removing friction.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Attoset"
        title={
          <>
            Turning ideas into{" "}
            <span className="grad-text">scalable systems</span>
          </>
        }
        description="We believe every organization should be able to build the exact software it needs — and let AI do the heavy lifting."
      />

      {/* Mission */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-balance text-center font-display text-2xl font-medium leading-snug text-ink sm:text-[2rem] sm:leading-[1.3]">
                Traditional tools force teams into someone else&apos;s workflow.
                Attoset flips that — a unified, AI-powered Work OS where you
                build, automate, and scale operations{" "}
                <span className="text-orange">your way</span>.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Values */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="The principles behind the product"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 rounded-3xl border border-line bg-white p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warm-2 text-ink">
                    <v.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Careers */}
      <section id="careers" className="scroll-mt-24 pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-line bg-warm p-8 sm:flex-row sm:items-center sm:p-12">
              <div>
                <Eyebrow>Careers</Eyebrow>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-display text-ink sm:text-3xl">
                  Build the future of work with us
                </h3>
                <p className="mt-2 max-w-md text-pretty text-muted">
                  We&apos;re a small, ambitious team. If you want to shape an
                  AI-powered Work OS, we&apos;d love to hear from you.
                </p>
              </div>
              <a
                href="/contact"
                className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-black"
              >
                View open roles
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}
