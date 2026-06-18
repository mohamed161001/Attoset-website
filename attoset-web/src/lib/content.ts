/**
 * Central content store for the Attoset marketing site.
 * Placeholder-but-realistic copy & data — edit here to update the whole site.
 */

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Sparkles,
  Table2,
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
  // { label: "Pricing", href: "/pricing" }, // hidden for now
  { label: "About", href: "/about" },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
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
      "Create proactive agents that execute tasks, automate processes, monitor systems, and take action on behalf of your teams.",
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
  { icon: Table2, label: "Table", blurb: "Spreadsheet-grade control over every record." },
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
      "The AI agents actually do the work — chasing approvals, updating records, flagging risks. It feels like adding teammates.",
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
  { value: "24/7", label: "agents on the job", suffix: "" },
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

export type PricingTier = {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/ user / mo",
    blurb: "For small teams getting their operations into one place.",
    cta: "Get started",
    href: "/contact",
    features: [
      "Up to 10 members",
      "Unlimited workspaces & tables",
      "Table, Kanban & Calendar views",
      "Basic automations",
      "Atto AI assistant (limited)",
      "Community support",
    ],
  },
  {
    name: "Business",
    price: "$24",
    cadence: "/ user / mo",
    blurb: "For growing organizations that run on automation and AI.",
    cta: "Start free trial",
    href: "/contact",
    featured: true,
    features: [
      "Everything in Starter",
      "Unlimited members",
      "All views incl. Gantt",
      "Advanced automations",
      "Custom AI agents",
      "Dashboards & analytics",
      "Role-based permissions",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For enterprises with advanced security and scale needs.",
    cta: "Talk to sales",
    href: "/contact",
    features: [
      "Everything in Business",
      "SSO & SCIM provisioning",
      "Advanced audit trails",
      "Granular data residency",
      "Dedicated success manager",
      "SLA & premium support",
    ],
  },
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
    q: "What can Atto and the AI agents actually do?",
    a: "Atto helps you design and improve workflows from a description. Custom agents go further — they proactively execute tasks, automate processes, monitor systems, and take action on behalf of your team.",
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
    a: "Minutes. Describe what you need to Atto and it drafts your first workspace, tables, and views. You refine from there — no migrations or rebuilds required.",
  },
];

export const valueProps = [
  { icon: Zap, title: "One platform", description: "End tool sprawl. Build everything in a single, connected system." },
  { icon: GitBranch, title: "Truly customizable", description: "Adapt Attoset to your processes — not the other way around." },
  { icon: Plug, title: "Connected", description: "Integrates with the tools your teams already rely on." },
];
