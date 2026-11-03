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
  Globe2,
  EyeOff,
  Zap,
  GitBranch,
  Plug,
  Paperclip,
  Stamp,
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

// Where the "Join our waitlist" CTAs send the user.
export const ctaHref =
  "https://dev.attoset.com/forms/submission/43fd4a22-8ae5-439d-9b78-21aa2cea160b";

/**
 * Sign-in URL for the app. Blank while Attoset is in closed beta: there is no
 * public sign-in yet, so the waitlist CTA is the only way in. Set this when the
 * public beta opens and the header grows a Log in link on its own.
 */
export const loginHref = "";

// Public trust center (hosted on Probo) and live system status page.
export const trustCenterHref =
  "https://trust.attoset.com/trust/attoset/overview";
export const statusHref = "https://status.attoset.com";

export const trustCenter = {
  title: "See how we protect your data",
  description:
    "Compliance documents, the subprocessors we work with, and security updates, kept current in one place.",
  items: ["Documents", "Subprocessors", "Updates"],
};

export type NavItem = {
  label: string;
  href: string;
  /** Shown only in the desktop Product menu, which renders icon + blurb per item. */
  icon?: LucideIcon;
  desc?: string;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      {
        label: "Overview",
        href: "/product",
        icon: LayoutGrid,
        desc: "The platform, end to end",
      },
      {
        label: "Atto AI",
        href: "/product#atto",
        icon: Sparkles,
        desc: "Built into every workspace",
      },
      {
        label: "AttoForge",
        href: "/#autoforge",
        icon: Stamp,
        desc: "A repeatable work engine",
      },
      {
        label: "Security",
        href: "/security",
        icon: ShieldCheck,
        desc: "Permissions and audit trails",
      },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
];

export type Client = {
  name: string;
  src: string;
  /** Intrinsic size of the asset, for next/image. */
  w: number;
  h: number;
  /**
   * Rendered height in px. Tuned per logo rather than shared: these marks have
   * very different proportions, so a single height makes the wide ones dominate
   * and the stacked ones vanish. Balance by eye, not by number.
   */
  displayH: number;
};

/** Organizations whose logos we are cleared to show. */
export const clients: Client[] = [
  {
    name: "Universal",
    src: "/images/logos/universal.png",
    w: 403,
    h: 276,
    displayH: 48,
  },
  {
    name: "Palliser Produits Chimiques",
    src: "/images/logos/palliser.png",
    w: 431,
    h: 90,
    displayH: 30,
  },
  {
    name: "Swift Logistics",
    src: "/images/logos/swift.png",
    w: 209,
    h: 112,
    displayH: 42,
  },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  id?: string;
  comingSoon?: string;
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
      "Proactive agents that will execute tasks, automate processes, monitor systems, and take action on behalf of your teams.",
    id: "agents",
    comingSoon: "Beta Q1 2027",
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
    icon: Paperclip,
    title: "Files & links",
    description:
      "Store the documents a process depends on and embed the links your team keeps going back to, alongside the records.",
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
      "Turn live operational data into dashboards that surface what matters. Open the records behind any number and act on them: assign, approve, escalate.",
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
      "Role-based access control, granular permissions, and every action traced, whether by a person or an AI agent.",
  },
  {
    icon: Plug,
    title: "MCP server & API",
    description:
      "Connect your own AI tools through our MCP server, and your ERP and CRM through our API. Both live today, on every plan.",
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
    blurb: "Plan timelines and dependencies. Beta in Q1 2027.",
  },
];

export type Stage = {
  icon: LucideIcon;
  n: string;
  title: string;
  desc: string;
};

/**
 * The spine of the product page: the order the platform is actually assembled
 * in. Every later stage depends on the one before it, so the list is a chain,
 * not a feature grid — keep it in this order.
 */
export const dataToDone: Stage[] = [
  {
    icon: Database,
    n: "01",
    title: "Tables",
    desc: "Start with the data the work runs on. Relational tables with your own fields, your own records, your own structure.",
  },
  {
    icon: LayoutGrid,
    n: "02",
    title: "Views & linked tables",
    desc: "Reshape the same data into Grid, Kanban or Calendar (Gantt joins in Q1 2027), and link records across tables so one change lands everywhere.",
  },
  {
    icon: FormInput,
    n: "03",
    title: "Forms",
    desc: "Collect what is missing from teams, customers and partners. Every submission arrives structured, in the right table.",
  },
  {
    icon: Workflow,
    n: "04",
    title: "Automations",
    desc: "Triggers, conditions and actions carry the work forward on their own — routing, approvals, updates and alerts.",
  },
  {
    icon: LayoutDashboard,
    n: "05",
    title: "Dashboards & insights",
    desc: "Live data becomes the charts you decide from. Open the records behind any number and act on them: assign, approve, escalate. That is done.",
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

/**
 * Three stages, in dependency order: build the structure, feed it and let it
 * act, then run on it. Keep them distinct — an earlier draft had 01 "build"
 * and 02 "shape" doing the same job, and put dashboards under automation.
 */
export const howItWorks: Step[] = [
  {
    n: "01",
    title: "Build your workspace",
    description:
      "Start blank or from a template, then create the tables, fields and views your process runs on — with the files and links it depends on kept beside the records.",
  },
  {
    n: "02",
    title: "Collect & automate",
    description:
      "Bring work in through forms, then let no-code automations route it, chase approvals and update records without anyone pushing them along.",
  },
  {
    n: "03",
    title: "Run & scale",
    description:
      "Watch the whole operation in live dashboards, add people and processes as you grow, and reshape any part of it without starting over.",
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
    title: "Every action traced",
    description:
      "Every cell keeps its history: who changed it, when and how, whether a person, Atto, an AI agent or a tool connected through MCP. On every plan.",
  },
  {
    icon: Server,
    title: "Secure data handling",
    description:
      "Encryption in transit and at rest, designed for enterprise use.",
  },
  {
    icon: Globe2,
    title: "Hosted in Europe",
    description:
      "Workspaces for EU and UK customers are hosted in Europe, so your data stays where your business is.",
  },
  {
    icon: EyeOff,
    title: "Your data stays yours",
    description:
      "Zero data retention by our AI providers, and we never train models on customer data.",
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

/** The two ways teams use Attoset. Each plan is tagged with the ones it supports. */
export type UseCase = "operations" | "ppm";

export const useCaseLabels: Record<UseCase, string> = {
  operations: "Operations",
  ppm: "Portfolio management",
};

/** What the workspace costs — one platform fee, which includes API and MCP usage. */
export type PlatformPlan = {
  name: string;
  useCases: UseCase[];
  /**
   * Monthly USD. Formatted for display and summed by the estimator.
   * null while a plan's price is still being set: the card reads "In the works"
   * and the estimator leaves the platform fee out of the total.
   */
  amount: number | null;
  cadence: string;
  /** Kept to two lines on the card. */
  blurb: string;
  /** Included API calls, as shown, e.g. "50,000 / mo". null while it is being set. */
  apiCalls: string | null;
  /** AttoForge access, shown as the last, highlighted limit: it is what the higher prices buy. */
  attoForge: string;
  /** Amounts that differ by plan. API calls are appended from apiCalls. */
  limits: { label: string; value: string }[];
  tags?: string[];
  featured?: boolean;
};

export const platformPlans: PlatformPlan[] = [
  {
    name: "Free",
    useCases: ["operations"],
    amount: 0,
    cadence: "/ mo",
    apiCalls: "1,000 / mo",
    blurb: "Free for good. For a solo user or a small team.",
    limits: [
      { label: "Rows per table", value: "5,000" },
      { label: "Storage", value: "10 GB" },
      { label: "Automation runs", value: "250 / mo" },
      { label: "Atto credits", value: "2,500 / mo" },
    ],
    attoForge: "No",
  },
  {
    name: "Starter",
    useCases: ["operations"],
    amount: 39,
    cadence: "/ mo",
    apiCalls: "50,000 / mo",
    tags: ["Start here"],
    featured: true,
    blurb: "More rows, storage and runs for a growing team.",
    limits: [
      { label: "Rows per table", value: "25,000" },
      { label: "Storage", value: "100 GB" },
      { label: "Automation runs", value: "2,500 / mo" },
      { label: "Atto credits", value: "20,000 / mo" },
    ],
    attoForge: "No",
  },
  {
    name: "Growth",
    useCases: ["operations"],
    amount: 149,
    cadence: "/ mo",
    apiCalls: "250,000 / mo",
    tags: ["Coming soon"],
    blurb: "SSO, audit export and room for many processes.",
    limits: [
      { label: "Rows per table", value: "50,000" },
      { label: "Storage", value: "1 TB" },
      { label: "Automation runs", value: "25,000 / mo" },
      { label: "Atto credits", value: "100,000 / mo" },
    ],
    attoForge: "Add-on",
  },
  {
    name: "Pro",
    useCases: ["operations", "ppm"],
    amount: 449,
    cadence: "/ mo",
    apiCalls: "500,000 / mo",
    tags: ["Coming soon"],
    blurb: "Run a portfolio, with AttoForge built in.",
    limits: [
      { label: "Rows per table", value: "75,000" },
      { label: "Storage", value: "5 TB" },
      { label: "Automation runs", value: "50,000 / mo" },
      { label: "Atto credits", value: "175,000 / mo" },
    ],
    attoForge: "1 blueprint",
  },
  {
    name: "Scale",
    useCases: ["operations", "ppm"],
    amount: 1000,
    cadence: "/ mo",
    apiCalls: "Unlimited",
    tags: ["Coming soon"],
    blurb: "Full capacity and every app, including AttoForge.",
    limits: [
      { label: "Rows per table", value: "250,000" },
      { label: "Storage", value: "Unlimited" },
      { label: "Automation runs", value: "Unlimited" },
      { label: "Atto credits", value: "250,000 / mo" },
    ],
    attoForge: "Unlimited",
  },
];

/**
 * Yearly is two months free, so the monthly rate is the yearly rate times 1.2.
 * Stored amounts are the yearly rate expressed per month.
 */
export const MONTHLY_MULTIPLIER = 1.2;
export const monthlyRate = (yearly: number) =>
  Math.round(yearly * MONTHLY_MULTIPLIER);

/** What every plan has, so it isn't repeated on each card. */
export const platformIncludes =
  "Every plan includes Atto, MCP and unlimited record history.";

/**
 * Where a quote request goes: the Attoset form that feeds the quote-requests
 * table, whose automation emails the official quote. Paste that form's
 * submission URL here. Until it is set, the page falls back to a prefilled
 * mail to quoteEmail, so a request is never silently dropped.
 */
export const quoteEndpoint = "";
export const quoteEmail = "contact@attoset.com";

// Job applications and CVs: kept out of contact@ so sales enquiries aren't buried.
export const careersEmail = "careers@attoset.com";

/** What each seat costs — the same rate on every plan. AI agents don't need one. */
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
    desc: "Builds the system, manages people and permissions.",
    defaultCount: 3,
    minCount: 1,
    stepBy: 1,
  },
  {
    name: "Operator",
    amount: 7.5,
    cadence: "/ user / mo",
    desc: "Updates records, answers automated requests.",
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

/** Pricing-page questions: agents, seats, Atto and API calls. */
export const pricingFaqs = [
  {
    q: "Do I pay for AI agents?",
    a: "No. Agents don't need a paid seat. They can have their own identity at no cost, and what they do counts toward your plan's API and MCP allowance.",
  },
  {
    q: "Is Atto included?",
    a: "Yes. Atto comes with every plan, with a monthly allowance of Atto credits that grows with your plan.",
  },
  {
    q: "Are API calls charged separately?",
    a: "No. Each plan includes an API and MCP allowance. If you go over, you can upgrade or pay for add-ons.",
  },
];

export const faqs = [
  {
    q: "Why not just build this ourselves with AI?",
    a: "AI makes the first build fast, and the first build is the easy part. What costs you is the next two years — keeping it running, patched, permissioned and in step with how the work actually changes. That upkeep is the part you hand to us.",
  },
  {
    q: "What do we get that a custom-built tool doesn't have?",
    a: "Full change history, real permissions, audit trails, and integrations we keep working as the tools on the other end change. A one-off build ships without most of that, and quietly loses the rest as it ages.",
  },
  {
    q: "Is our data usable, or is it locked into the app?",
    a: "It is yours. Everything feeding your systems is queryable, exportable and structured to make business sense — modelled around your operations, not around whatever a custom app needed to function.",
  },
  {
    q: "Our teams already build their own AI tools — what's the risk?",
    a: "Nobody governs them. There is usually no record of who changed what, no permission model, and no way to read the data outside the tool — so when the person who built it leaves, the only documentation leaves with them.",
  },
  {
    q: "Isn't building in-house cheaper?",
    a: "The build is cheap. The upkeep is not, and it is the part you cannot forecast — every fix, migration and handover lands on your team at the worst moment. A subscription turns that into one fixed, predictable line.",
  },
  {
    q: "Why one platform instead of several specialized tools?",
    a: "Because your data, workflows and reporting are connected. One system underneath means a change lands everywhere at once, and Atto — like your team — sees the whole picture rather than one slice of it. All-in-one is only a compromise when it is separate products bolted together; here there is nothing between the pieces to break.",
  },
  {
    q: "Does this replace our BI tool?",
    a: "For everyday operational reporting, yes: dashboards and analytics run on live data, with no export step in between. For advanced statistical work or research-grade analysis, you will still want a dedicated BI tool.",
  },
  {
    q: "We already use Power BI or Tableau — do we have to drop it?",
    a: "No, and most teams don't. Attoset becomes the system the numbers come from and the place day-to-day reporting lives; your BI tool keeps the deep modelling. Where you draw that line is your call, and plenty of teams move it over time.",
  },
  {
    q: "What can Atto do — and what about AI agents?",
    a: "Atto is available today: describe what you need and it designs, builds, and improves your workflows and systems. Custom AI agents — which will proactively execute tasks, automate processes, and monitor systems on their own — arrive in beta in Q1 2027.",
  },
  {
    q: "How long does it take to get started?",
    a: "Minutes. Describe what you need to Atto and it drafts your first workspace, tables, and views. You refine from there. Attoset is in closed beta today; signup opens with the public beta in January 2027, and we onboard from the waitlist until then.",
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

// Cookie consent banner. Analytics (Google Analytics, Apollo) stays off until
// the visitor accepts; the footer "Cookie settings" link reopens it.
export const cookieConsent = {
  title: "Cookies on attoset.com",
  body: "We use analytics cookies (Google Analytics and Apollo) to understand how the site is used and which companies visit. They stay off unless you accept.",
  accept: "Accept",
  reject: "Reject",
  policyLabel: "Privacy Policy",
  policyHref: "/privacy#cookies",
  settingsLabel: "Cookie settings",
};
