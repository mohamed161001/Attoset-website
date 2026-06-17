import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { PlatformHub } from "@/components/sections/platform-hub";
// import { FeatureGrid } from "@/components/sections/feature-grid";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { AutoForge } from "@/components/sections/auto-forge";
import { ViewsSection } from "@/components/sections/views-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { SecuritySection } from "@/components/sections/security-section";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Attoset is the AI-powered Work OS to build, manage, automate, and scale operations in one unified platform — with Atto, a built-in AI assistant, and autonomous agents that execute work.",
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <Hero />
      <FeatureCards />
      <PlatformHub />
      {/* Everything in one place — commented out for now */}
      {/* <FeatureGrid /> */}
      <ProductShowcase />
      <AutoForge />
      <ViewsSection />
      <HowItWorks />
      <UseCases />
      <SecuritySection />
      <FAQ />
      <CTA />
    </>
  );
}
