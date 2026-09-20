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
  Headset,
  FolderKanban,
  Factory,
  Target,
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

/**
 * Sign-in URL for the app. Blank while Attoset is in closed beta: there is no
 * public sign-in yet, so the waitlist CTA is the only way in. Set this when the
 * public beta opens and the header grows a Log in link on its own.
 */
export const loginHref = "";

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Overview", href: "/product" },
      { label: "Atto AI", href: "/product#atto" },
      { label: "AI agents", href: "/product#agents" },
      { label: "AttoForge", href: "/#autoforge" },
      { label: "Security", href: "/security" },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
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
  {
    icon: LayoutGrid,
    label: "Grid",
    blurb: "Spreadsheet-grade control over every record.",
  },
  {
    icon: KanbanSquare,
    label: "Kanban",
    blurb: "Move work across stages at a glance.",
  },
  {
    icon: Calendar,
    label: "Calendar",
    blurb: "See deadlines and schedules in context.",
  },
  {
    icon: GanttChartSquare,
    label: "Gantt",
    blurb: "Plan timelines and dependencies.",
  },
];

export type SolutionCase = {
  /** Also names the card's photograph. */
  id:
    | "operations"
    | "process"
    | "service"
    | "compliance"
    | "portfolio"
    | "strategy";
  icon: LucideIcon;
  title: string;
  desc: string;
};

/**
 * Grouped by the job being done, not by product area. Operations and process
 * are split deliberately: one is work in the physical world, the other is the
 * admin that surrounds it, and they are bought by different people. An industry
 * axis belongs here too, but only once there are named customers behind it.
 */
export const solutionCases: SolutionCase[] = [
  {
    id: "operations",
    icon: Factory,
    title: "Operations management",
    desc: "Sites, depots and field work kept moving. Track what is happening where, flag exceptions as they appear, and see status without chasing anyone.",
  },
  {
    id: "process",
    icon: Workflow,
    title: "Process management",
    desc: "The internal workflows HR, Finance, IT and Legal run on. Forms capture the request, automations route it, and dashboards show what is stuck.",
  },
  {
    id: "service",
    icon: Headset,
    title: "Service delivery",
    desc: "Every engagement run to the same standard. SLAs tracked, approvals routed, and a live view of where each request stands.",
  },
  {
    id: "compliance",
    icon: ScrollText,
    title: "Compliance & audit",
    desc: "Evidence on demand. Every change recorded, permissions enforced down to the field, and the event log exportable when someone asks.",
  },
  {
    id: "portfolio",
    icon: FolderKanban,
    title: "Project & portfolio management",
    desc: "One source of truth for schedules, budgets and risk. Every project rolls up into a portfolio view without rebuilding a spreadsheet to get there.",
  },
  {
    id: "strategy",
    icon: Target,
    title: "Strategic execution",
    desc: "Cross-team programs kept honest. Market entries and change initiatives tracked against owners, dates and dependencies in one place.",
  },
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
  {
    icon: KeyRound,
    title: "Role-based access control",
    description: "Define exactly who can see and do what, down to the field.",
  },
  {
    icon: Lock,
    title: "Strict permissions",
    description:
      "Granular, inheritable permissions across workspaces and records.",
  },
  {
    icon: ScrollText,
    title: "Audit trails",
    description:
      "A complete, tamper-evident history of every change and action.",
  },
  {
    icon: Server,
    title: "Secure data handling",
    description:
      "Encryption in transit and at rest, designed for enterprise use.",
  },
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
  /** Monthly USD. Formatted for display and summed by the estimator. */
  amount: number;
  cadence: string;
  blurb: string;
  limits: { label: string; value: string }[];
  tags?: string[];
  featured?: boolean;
};

export const capacityBands: CapacityBand[] = [
  {
    name: "Free",
    amount: 0,
    cadence: "/ month",
    blurb: "No platform fee. Pay only for the people who build.",
    limits: [
      { label: "Rows per table", value: "1,000" },
      { label: "Storage", value: "2 GB" },
      { label: "Automation runs", value: "100 / mo" },
      { label: "Record history", value: "Unlimited" },
      { label: "Event log", value: "Core events" },
      { label: "SSO and audit export", value: "No" },
      { label: "AttoForge blueprints", value: "No" },
    ],
  },
  {
    name: "Starter",
    amount: 39,
    cadence: "/ month",
    blurb: "For a first team running real work.",
    tags: ["Start here", "30-day trial"],
    featured: true,
    limits: [
      { label: "Rows per table", value: "20,000" },
      { label: "Storage", value: "100 GB" },
      { label: "Automation runs", value: "2,000 / mo" },
      { label: "Record history", value: "Unlimited" },
      { label: "Event log", value: "Core events" },
      { label: "SSO and audit export", value: "No" },
      { label: "AttoForge blueprints", value: "No" },
    ],
  },
  {
    name: "Growth",
    amount: 99,
    cadence: "/ month",
    blurb: "For an organization running several processes.",
    tags: ["Coming soon"],
    limits: [
      { label: "Rows per table", value: "50,000" },
      { label: "Storage", value: "1 TB" },
      { label: "Automation runs", value: "25,000 / mo" },
      { label: "Record history", value: "Unlimited" },
      { label: "Event log", value: "All events" },
      { label: "SSO and audit export", value: "Yes" },
      { label: "AttoForge blueprints", value: "Add-on" },
    ],
  },
  {
    name: "Scale",
    amount: 500,
    cadence: "/ month",
    blurb: "For advanced work requirements and full capacity.",
    tags: ["Coming soon"],
    limits: [
      { label: "Rows per table", value: "100,000" },
      { label: "Storage", value: "Unlimited" },
      { label: "Automation runs", value: "100,000 / mo" },
      { label: "Record history", value: "Unlimited" },
      { label: "Event log", value: "All events + analytics" },
      { label: "SSO and audit export", value: "Yes" },
      { label: "AttoForge blueprints", value: "Unlimited" },
    ],
  },
];

/**
 * Yearly is two months free, so the monthly rate is the yearly rate times 1.2.
 * Stored amounts are the yearly rate expressed per month.
 */
export const MONTHLY_MULTIPLIER = 1.2;
export const monthlyRate = (yearly: number) =>
  Math.round(yearly * MONTHLY_MULTIPLIER);

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
    amount: 17,
    cadence: "/ user / mo",
    desc: "Builds the system, manages people and permissions. Full Atto access.",
    defaultCount: 3,
    minCount: 1,
    stepBy: 1,
  },
  {
    name: "Operator",
    amount: 7.5,
    cadence: "/ user / mo",
    desc: "Updates records, answers automated requests. Smaller Atto allowance.",
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
    desc: "Operator access for clients, suppliers and contractors, at no charge.",
    free: true,
    defaultCount: 5,
    minCount: 0,
    stepBy: 5,
  },
];

/** How the two axes are meant to behave, stated as commitments. */
export const pricingRules = [
  "Capacity and seats are two separate lines. More capacity never forces more seats, and adding people never moves your capacity fee",
  "No minimums, no bundles, no seat packs, no hidden fees. Every figure is on this page, so you can quote yourself in seconds",
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
  {
    icon: Zap,
    title: "One platform",
    description:
      "End tool sprawl. Build everything in a single, connected system.",
  },
  {
    icon: GitBranch,
    title: "Truly customizable",
    description: "Adapt Attoset to your processes — not the other way around.",
  },
  {
    icon: Plug,
    title: "Connected",
    description: "Integrates with the tools your teams already rely on.",
  },
];
