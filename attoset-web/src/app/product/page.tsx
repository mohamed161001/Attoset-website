import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { AttoSection } from "@/components/sections/atto-section";
import { DataToDone } from "@/components/sections/data-to-done";
import { AutoForge } from "@/components/sections/auto-forge";
import { ViewsSection } from "@/components/sections/views-section";
import { LinkedRecords } from "@/components/sections/linked-records";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTA } from "@/components/sections/cta";
import { ctaHref } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Product",
  description:
    "Tables, views and linked records, forms, workflow automation, dashboards, the Atto AI assistant and enterprise security — all in one intelligent Work Platform. Custom AI agents coming soon.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        title={
          <>
            One intelligent <span className="grad-text">Work Platform</span>
          </>
        }
        description="Everything your organization needs to build, manage, automate, and scale operations — from the data your work runs on to the decisions it drives."
      >
        <Button href={ctaHref} variant="accent" size="lg">
          Start building free
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHeader>

      <AttoSection />
      <DataToDone />
      <ViewsSection />
      <LinkedRecords />
      <FeatureGrid
        className="bg-bg"
        eyebrow="Capabilities"
        title="Built to do it all"
        description="Customizable building blocks that adapt to any business function."
      />
      <AutoForge />
      <CTA />
    </>
  );
}
