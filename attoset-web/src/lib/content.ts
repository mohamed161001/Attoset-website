/**
 * Central content store for the Attoset marketing site.
 * Placeholder-but-realistic copy & data — edit here to update the whole site.
 */

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Sparkles,
  LayoutGrid,
  Workflow,
  FormInput,
  LayoutDashboard,
  Database,
  Users,
  ShieldCheck,
  Boxes,
  KanbanSquare,
  Calendar,
  GanttChartSquare,
  Lock,
  ScrollText,
  KeyRound,
  Server,
  Zap,
  GitBranch,
  Plug,
} from "lucide-react";

export const site = {
  name: "Attoset",
  domain: "attoset.com",
  tagline: "Intelligent work, from data to done.",
  description:
    "Build, manage, automate, and scale your operations in one unified platform.",
};

// Where the "Start building free" / "Get started" CTAs send the user.
export const ctaHref =
  "https://dev.attoset.com/forms/submission/43fd4a22-8ae5-439d-9b78-21aa2cea160b";

export const nav = [
  { label: "Features", href: "/#features" },
  { label: "AttoForge", href: "/#autoforge" },
  { label: "Security", href: "/#security" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  id?: string;
  comingSoon?: boolean;
};

/** Primary capability set (Home + Features). */
export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Atto, your AI assistant",
    description:
      "A built-in AI partner that helps you design, build, and improve workflows and systems — just describe what you need.",
  },
  {
    icon: Bot,
    title: "Custom AI agents",
    description:
      "Coming soon: proactive agents that will execute tasks, automate processes, monitor systems, and take action on behalf of your teams.",
    id: "agents",
    comingSoon: true,
  },
  {
    icon: Boxes,
    title: "Custom workspaces",
    description:
      "Shape Attoset around how your organization actually works — no rigid templates, no forced workflows.",
  },
  {
    icon: Database,
    title: "Flexible tables",
    description:
      "Model anything with relational tables, custom fields, and linked records that stay in sync across the platform.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Replace manual busywork with triggers, conditions, and actions that run reliably in the background.",
  },
  {
    icon: FormInput,
    title: "Forms & data collection",
    description:
      "Capture structured data from your team, customers, and partners — flowing straight into your tables.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & analytics",
    description:
      "Turn live operational data into dashboards and reports that surface what matters, in real time.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Comments, mentions, assignments, and shared context keep everyone aligned inside one source of truth.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise security & permissions",
    description:
      "Role-based access control, granular permissions, and audit trails built for organizational scale.",
  },
];

export type ViewType = {
  icon: LucideIcon;
  label: string;
  blurb: string;
};

export const views: ViewType[] = [
  { icon: LayoutGrid, label: "Grid", blurb: "Spreadsheet-grade control over every record." },
  { icon: KanbanSquare, label: "Kanban", blurb: "Move work across stages at a glance." },
  { icon: Calendar, label: "Calendar", blurb: "See deadlines and schedules in context." },
  { icon: GanttChartSquare, label: "Gantt", blurb: "Plan timelines and dependencies." },
];

export const useCases = [
  "Project management",
  "CRM",
  "Operations",
  "HR",
  "Customer onboarding",
  "Compliance",
];

export type Step = { n: string; title: string; description: string };

export const howItWorks: Step[] = [
  {
    n: "01",
    title: "Build your workspace",
    description:
      "Start blank or from a template, then create the tables, fields, and views your process needs.",
  },
  {
    n: "02",
    title: "Shape & automate",
    description:
      "Add forms, dashboards, and no-code automations that handle the repetitive work.",
  },
  {
    n: "03",
    title: "Run & scale",
    description:
      "Run your team in one system that bends to fit — no migrations, no tool sprawl.",
  },
];

export const security = [
  { icon: KeyRound, title: "Role-based access control", description: "Define exactly who can see and do what, down to the field." },
  { icon: Lock, title: "Strict permissions", description: "Granular, inheritable permissions across workspaces and records." },
  { icon: ScrollText, title: "Audit trails", description: "A complete, tamper-evident history of every change and action." },
  { icon: Server, title: "Secure data handling", description: "Encryption in transit and at rest, designed for enterprise use." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced four disconnected tools with one Attoset workspace. Atto built the first version of our ops system in an afternoon.",
    name: "Maya Hernández",
    role: "Head of Operations",
    company: "Northwind Labs",
  },
  {
    quote:
      "Our automations chase approvals, update records, and flag risks without anyone touching them. It feels like adding teammates.",
    name: "David Okonkwo",
    role: "VP of Engineering",
    company: "Cartesian",
  },
  {
    quote:
      "Finally a platform that bends to our processes instead of the other way around. Our compliance workflows live entirely in Attoset.",
    name: "Lena Park",
    role: "Chief of Staff",
    company: "Helio Health",
  },
  {
    quote:
      "Enterprise-grade permissions and audit trails were non-negotiable for us. Attoset checked every box our security team had.",
    name: "Tomás Rivera",
    role: "Director of IT",
    company: "Meridian Group",
  },
];

/** Placeholder customer logos (wordmarks rendered as text). */
export const customers = [
  "Northwind",
  "Cartesian",
  "Helio",
  "Meridian",
  "Quanta",
  "Lumen",
  "Vela",
  "Arco",
];

export const stats = [
  { value: "1", label: "unified platform", suffix: "" },
  { value: "60", label: "less tool sprawl", suffix: "%" },
  { value: "10", label: "faster to launch", suffix: "x" },
  { value: "24/7", label: "Atto at your side", suffix: "" },
];

export const integrations = [
  "Slack",
  "Gmail",
  "Notion",
  "Drive",
  "GitHub",
  "Stripe",
  "Zapier",
  "HubSpot",
];

/** Whether the page prints figures at all. */
export const showPrices = true;

/**
 * The figures are published but not yet contractual: they are confirmed with
 * the public beta in January 2027. Flip this off then and the notice below the
 * plans disappears; nothing else has to change.
 */
export const pricesProvisional = true;

/** What the platform costs — the limits, security and machine work it covers. */
export type CapacityBand = {
  name: string;
  /** Hides the figure and takes the plan out of the estimator until it ships. */
  comingSoon?: boolean;
  /** Monthly USD. Formatted for display and summed by the estimator. */
  amount: number;
  cadence: string;
  blurb: string;
  limits: { label: string; value: string }[];
  tag?: string;
  featured?: boolean;
};

export const capacityBands: CapacityBand[] = [
  {
    name: "Starter",
    amount: 39,
    cadence: "/ month",
    blurb: "For a first team running real work.",
    tag: "30-day trial",
    limits: [
      { label: "Rows per table", value: "10,000" },
      { label: "Storage", value: "10 GB" },
      { label: "Automation runs", value: "2,000 / mo" },
      { label: "Change history", value: "12 months" },
      { label: "SSO and audit export", value: "Yes" },
      { label: "AttoForge blueprints", value: "No" },
    ],
  },
  {
    name: "Growth",
    amount: 149,
    cadence: "/ month",
    blurb: "For an organization running several processes.",
    tag: "Most teams",
    featured: true,
    limits: [
      { label: "Rows per table", value: "30,000" },
      { label: "Storage", value: "250 GB" },
      { label: "Automation runs", value: "25,000 / mo" },
      { label: "Change history", value: "3 years" },
      { label: "SSO and audit export", value: "Yes" },
      { label: "AttoForge blueprints", value: "Add-on" },
    ],
  },
  {
    name: "Scale",
    comingSoon: true,
    amount: 500,
    cadence: "/ month",
    blurb: "The advanced tier, for portfolios run across many teams or sites.",
    limits: [
      { label: "Rows per table", value: "100,000" },
      { label: "Storage", value: "1 TB" },
      { label: "Automation runs", value: "100,000 / mo" },
      { label: "Change history", value: "Unlimited" },
      { label: "SSO and audit export", value: "Yes" },
      { label: "AttoForge blueprints", value: "1" },
    ],
  },
];

/**
 * Yearly is two months free, so the monthly rate is the yearly rate times 1.2.
 * Stored amounts are the yearly rate expressed per month.
 */
export const MONTHLY_MULTIPLIER = 1.2;
export const monthlyRate = (yearly: number) => Math.round(yearly * MONTHLY_MULTIPLIER);

/**
 * Where a quote request goes: the Attoset form that feeds the quote-requests
 * table, whose automation emails the official quote. Paste that form's
 * submission URL here. Until it is set, the page falls back to a prefilled
 * mail to quoteEmail, so a request is never silently dropped.
 */
export const quoteEndpoint = "";
export const quoteEmail = "contact@attoset.com";

/** What people cost — the same rate on every plan. */
export type SeatType = {
  name: string;
  /** Monthly USD per user. */
  amount: number;
  cadence?: string;
  desc: string;
  free?: boolean;
  /** Estimator defaults: where the stepper starts, its floor, and its increment. */
  defaultCount: number;
  minCount: number;
  stepBy: number;
};

export const seatTypes: SeatType[] = [
  {
    name: "Full seat",
    amount: 19,
    cadence: "/ user / mo",
    desc: "Builds the system, manages people and permissions, and works with Atto.",
    defaultCount: 3,
    minCount: 1,
    stepBy: 1,
  },
  {
    name: "Operator",
    amount: 7.5,
    cadence: "/ user / mo",
    desc: "Updates records, answers approvals and automated requests, and works with Atto on a smaller allowance.",
    defaultCount: 12,
    minCount: 0,
    stepBy: 5,
  },
  {
    name: "Visitor",
    amount: 0,
    desc: "Views, comments and submits forms. Unlimited on every plan.",
    free: true,
    defaultCount: 25,
    minCount: 0,
    stepBy: 5,
  },
  {
    name: "External operator",
    amount: 0,
    desc: "Clients, suppliers and contractors get the same access as an operator, at no charge.",
    free: true,
    defaultCount: 5,
    minCount: 0,
    stepBy: 5,
  },
];

/** The things we deliberately don't do. */
export const pricingRules = [
  "No minimum users, no bundles or seat packs. Add or remove one person at a time",
  "Seat rates are the same on every plan, so growing never reprices the people you already have",
  "Visitors and external operators are free on every plan, with no cap on either",
  "Rows and storage are soft limits. You get a warning, not a locked workspace",
];

export const faqs = [
  {
    q: "What exactly is a Work OS?",
    a: "A Work Operating System is a single platform where you build the tools your organization runs on — tables, workflows, dashboards, and apps — instead of stitching together separate point solutions.",
  },
  {
    q: "How is Attoset different from project management tools?",
    a: "Traditional tools force teams into predefined workflows. Attoset lets you create fully customized solutions for your unique processes — and adds AI that can build and execute work for you.",
  },
  {
    q: "What can Atto do — and what about AI agents?",
    a: "Atto is available today: describe what you need and it designs, builds, and improves your workflows and systems. Custom AI agents — which will proactively execute tasks, automate processes, and monitor systems on their own — are coming soon.",
  },
  {
    q: "Is Attoset secure enough for enterprise use?",
    a: "Yes. Attoset is built for enterprise-level security with role-based access control, strict permissions, audit trails, and secure data handling designed for organizational use cases.",
  },
  {
    q: "Can Attoset replace the tools we already use?",
    a: "Most teams consolidate project management, CRM, operations, HR, onboarding, and compliance into Attoset — replacing several fragmented tools with one unified system.",
  },
  {
    q: "How long does it take to get started?",
    a: "Minutes. Describe what you need to Atto and it drafts your first workspace, tables, and views. You refine from there — no migrations or rebuilds required. Attoset is in closed beta today; signup opens with the public beta in January 2027, and we onboard from the waitlist until then.",
  },
];

export const valueProps = [
  { icon: Zap, title: "One platform", description: "End tool sprawl. Build everything in a single, connected system." },
  { icon: GitBranch, title: "Truly customizable", description: "Adapt Attoset to your processes — not the other way around." },
  { icon: Plug, title: "Connected", description: "Integrates with the tools your teams already rely on." },
];
