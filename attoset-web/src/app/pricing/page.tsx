import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

// Hidden from nav + sitemap while pricing is not public — keep it out of the
// index too, so the page can't be discovered and indexed via a direct link.
export const metadata: Metadata = pageMeta({
  title: "Pricing",
  description:
    "Simple, transparent pricing for teams of every size. Start free and scale as you grow.",
  path: "/pricing",
  index: false,
});

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
