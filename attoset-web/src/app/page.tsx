import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeatureCards } from "@/components/sections/feature-cards";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { AutoForge } from "@/components/sections/auto-forge";
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
    "Attoset is the intelligent Work Platform to build, manage, automate, and scale operations in one unified system — with Atto, a built-in AI assistant, and autonomous agents on the way.",
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <Hero />
      {/*
       * How it works sits directly under the hero: the three-step story is the
       * orientation a first-time visitor needs before any capability detail.
       * AttoForge follows the product showcase — scale comes after you have seen
       * the platform itself. Note this puts AutoForge and UseCases, both dark,
       * back to back.
       */}
      <HowItWorks />
      <FeatureCards />
      <ProductShowcase />
      <AutoForge />
      <UseCases />
      <SecuritySection />
      <FAQ />
      <CTA />
    </>
  );
}
