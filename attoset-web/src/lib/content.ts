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

// Where the "Start building free" / "Get started" CTAs send the user.
export const ctaHref =
  "https://dev.attoset.com/forms/submission/43fd4a22-8ae5-439d-9b78-21aa2cea160b";

/**
 * Sign-in URL for the app. Blank while Attoset is in closed beta: there is no
 * public sign-in yet, so the waitlist CTA is the only way in. Set this when the
 * public beta opens and the header grows a Log in link on its own.
 */
export const loginHref = "";

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
  { name: "Universal", src: "/images/logos/universal.png", w: 403, h: 276, displayH: 48 },
  { name: "Palliser Produits Chimiques", src: "/images/logos/palliser.png", w: 431, h: 90, displayH: 30 },
  { name: "Prestige Projects Group", src: "/images/logos/prestige.png", w: 600, h: 171, displayH: 27 },
  { name: "Swift Logistics", src: "/images/logos/swift.png", w: 209, h: 112, displayH: 42 },
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
    desc: "Reshape the same data into Grid, Kanban, Calendar or Gantt, and link records across tables so one change lands everywhere.",
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
    desc: "Live operational data becomes the charts and reports you analyse and decide from. That is done.",
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
    tags: ["Forever"],
    blurb: "Free for good. For a solo user or a small team that will not outgrow it — just buy the seats you need.",
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
    blurb: "No capacity fee for 12 months. You pay only for the people who build.",
    tags: ["Start here", "12 months free"],
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
    blurb: "Full capabilities and capacity, including unlimited AttoForge blueprints.",
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

/** Pricing-page questions: the two axes, seat types, limits and billing. */
export const pricingFaqs = [
  {
    q: "Why price capacity and seats separately?",
    a: "Capacity covers what the platform holds and runs for you — rows, storage, automation runs, history, security. Seat rates cover the people doing the work. Adding a colleague never moves your limits, and reaching a limit never costs you a seat.",
  },
  {
    q: "Are external operators really free?",
    a: "Yes, on every plan. External operator access is for people in a genuinely separate organization — clients, suppliers, contractors — and we verify that before it is granted.",
  },
  {
    q: "What counts as a full seat?",
    a: "Anyone who creates or changes structure: tables, fields, forms, automations, dashboards, blueprints and permissions. Someone who only reads and edits records is an operator, not a full seat.",
  },
  {
    q: "Can we change seat counts mid-month?",
    a: "Yes, one seat at a time, reflected on your next invoice. No minimum, no seat packs, no end-of-term reconciliation.",
  },
  {
    q: "What happens if we pass a limit?",
    a: "Rows and storage are soft limits — you get a warning, never a lockout and never deletion. Automation runs pause at the cap until the next cycle or until you move up a band.",
  },
  {
    q: "Free or Starter — which one am I?",
    a: "Free never ends. It fits a solo user or a small team that will stay inside 1,000 rows, and you simply buy the seats you need. Starter waives the capacity fee for twelve months and then bills it, and gives you twenty times the rows and storage in the meantime. Seats are priced the same on both, so the only question is whether you expect to grow.",
  },
  {
    q: "What does the first 12 months free actually cover?",
    a: "The Starter capacity fee — what the platform holds and runs for you: rows, storage and automation runs — is waived for your first twelve months. Seats are billed from the start, so you pay for the people who build from day one. At twelve months you choose: stay on Starter and the capacity fee begins, or move down to Free if you do not need that much capacity. Nothing is deleted either way — rows and storage are soft limits.",
  },
  {
    q: "Do you adjust prices by region?",
    a: "Yes. Regional pricing is available on request — tell us where your team sits and we will quote accordingly.",
  },
  {
    q: "Do you bill monthly or annually?",
    a: "Both. Yearly billing is the lower effective rate — two months free against the monthly rate — and the toggle above the plans shows either figure.",
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
    a: "Atto is available today: describe what you need and it designs, builds, and improves your workflows and systems. Custom AI agents — which will proactively execute tasks, automate processes, and monitor systems on their own — are coming soon.",
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
