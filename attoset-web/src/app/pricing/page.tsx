import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for teams of every size. Start free and scale as you grow.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Pricing that scales{" "}
            <span className="grad-text">with you</span>
          </>
        }
        description="Start free. Upgrade when you need automation, AI agents, and enterprise controls. No surprises."
      />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
