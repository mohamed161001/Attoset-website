import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { MotionProvider } from "@/components/providers/motion-provider";

// Body / UI — the same typeface Chatbase uses.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / headings — clean, modern, premium with conventional letterforms.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Mono — signature eyebrow / label element. Only used for small labels (never
// the LCP element), so skip preload to free bandwidth for the display font.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const SITE_URL = "https://attoset.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Attoset — Intelligent work, from data to done",
    template: "%s · Attoset",
  },
  description:
    "Attoset is the AI-powered Work OS that lets organizations build, manage, automate, and scale their operations in one unified platform — with Atto, a built-in AI assistant, and autonomous agents that execute work.",
  keywords: [
    "Work OS",
    "AI work operating system",
    "workflow automation",
    "AI agents",
    "no-code platform",
    "enterprise operations",
    "project management",
    "CRM",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Attoset — The AI-Powered Work Operating System",
    description:
      "Build, manage, automate, and scale your operations in one unified, AI-powered platform.",
    siteName: "Attoset",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attoset — The AI-Powered Work Operating System",
    description:
      "Build, manage, automate, and scale your operations in one unified, AI-powered platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-bg text-ink flex flex-col"
        suppressHydrationWarning
      >
        {/* Progressive enhancement: if JS is unavailable, scroll-reveal
            content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
