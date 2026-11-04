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
    "A platform fee for your workspace, plus a price per seat. You only pay for what each seat can do. AI agents, visitors and external operators are free.",
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
            Seats and <span className="grad-text">platform</span>
          </>
        }
        description="Add your seats, pick your platform, and request an official quote."
      />
      <PricingSection />
      <FAQ
        items={pricingFaqs}
        title="Questions"
        description="AI agents, seats, Atto and API calls."
      />
      <CTA />
    </>
  );
}
