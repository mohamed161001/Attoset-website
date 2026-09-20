import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { pricingFaqs } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Pricing",
  description:
    "Pick your capacity, add your seats, get an instant quote. Capacity and seats are priced separately, and visitors and external operators are free on every plan.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <PageHeader
        compact
        eyebrow="Pricing"
        title={
          <>
            Capacity and <span className="grad-text">seats</span>
          </>
        }
        description="Pick your capacity, add your seats, get an instant quote."
      />
      <PricingSection />
      <FAQ
        items={pricingFaqs}
        title="Pricing, answered"
        description="How the two axes behave, who pays for what, and what happens at a limit."
      />
      <CTA />
    </>
  );
}
