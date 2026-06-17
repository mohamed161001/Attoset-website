import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { AttoSection } from "@/components/sections/atto-section";
import { AutoForge } from "@/components/sections/auto-forge";
import { ViewsSection } from "@/components/sections/views-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { SecuritySection } from "@/components/sections/security-section";
import { CTA } from "@/components/sections/cta";
import { ctaHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Atto AI assistant, autonomous agents, flexible tables, automation, multiple views, and enterprise security — all in one Work OS.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        title={
          <>
            One Work OS.{" "}
            <span className="grad-text">Endless</span> possibilities.
          </>
        }
        description="Everything your organization needs to build, manage, automate, and scale operations — unified in a single, AI-powered platform."
      >
        <Button href={ctaHref} variant="accent" size="lg">
          Start building free
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHeader>

      <AttoSection />
      <AutoForge />
      <ViewsSection />
      <FeatureGrid
        eyebrow="Capabilities"
        title="Built to do it all"
        description="Customizable building blocks that adapt to any business function."
      />
      <SecuritySection />
      <CTA />
    </>
  );
}
