import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { SolutionCards } from "@/components/sections/solution-cards";
import { CTA } from "@/components/sections/cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Solutions",
  description:
    "Service delivery, project and portfolio management, operations and process management, and strategic execution — built on one platform.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            Built around the work <span className="grad-text">you run</span>
          </>
        }
        description="One platform, shaped to the job in front of you. Every process below is built from the same blocks, so nothing has to be stitched together afterwards."
      />

      <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000,transparent_78%)]" />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <SolutionCards />
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}
