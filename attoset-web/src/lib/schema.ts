/**
 * JSON-LD structured-data builders. Centralized so schema stays in sync
 * with site content. Consumed by the <JsonLd /> server component.
 */
import { faqs } from "@/lib/content";

const SITE_URL = "https://attoset.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Attoset",
  url: SITE_URL,
  logo: `${SITE_URL}/attoset-logo.png`,
  description:
    "The intelligent Work Platform that lets organizations build, manage, automate, and scale operations in one unified system.",
  email: "contact@attoset.com",
  sameAs: ["https://www.linkedin.com/company/attoset"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Attoset",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Attoset" },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Attoset",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "The intelligent Work Platform for building, managing, automating, and scaling operations — with a built-in AI assistant.",
  url: SITE_URL,
  // No `offers` until the price list publishes with the public beta — otherwise
  // figures we haven't announced end up in search results.
};

/** FAQPage for whichever question set a page renders. */
export const makeFaqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const faqSchema = makeFaqSchema(faqs);
