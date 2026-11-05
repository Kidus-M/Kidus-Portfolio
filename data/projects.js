import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import OpalLuxe from "@/assets/OPAL LUXE .png";
import OritTej from "@/assets/OritTej.png";
import Oz from "@/assets/Oz.png";
import BlueCloud from "@/assets/BlueCloud.jpg";
import RoadCrash from "@/assets/RoadCrash.jpg";
import HMK from "@/assets/HMK.jpg";

const entries = [
  {
    title: "MaruCheck",
    type: "AI QA & Verification",
    year: "2026",
    role: "Creator · Open-source platform engineering",
    description:
      "An open-source, local-first QA and verification platform for AI-generated software that scores risk, enforces human-approved Quality Contracts, and produces the evidence behind every ship-or-block decision.",
    highlights: [
      "Analyzes code changes for risk, semantic drift, and remembered regressions, then verifies them against human-approved Quality Contracts.",
      "Ships a CLI, MCP integration for Codex, Claude Code, and Cursor, GitHub CI workflows, and a hosted evidence dashboard.",
      "Backed by Neon Postgres, typed Drizzle schemas, Better Auth OAuth, and a Semgrep, Gitleaks, Vitest, Playwright, and axe verification stack.",
    ],
    tech: ["TypeScript", "Next.js 16", "React 19", "Neon Postgres", "Drizzle", "MCP"],
    visual: {
      theme: "maru",
      label: "MARUCHECK / RELEASE VERIFICATION",
      headline: "Evidence that says whether a release ships or stops.",
      status: "OPEN-SOURCE PLATFORM",
      steps: ["Analyze", "Verify", "Decide"],
      modules: [
        { label: "Contracts", value: "Human-approved" },
        { label: "Memory", value: "Past defects" },
        { label: "Verdict", value: "Ship or block" },
      ],
    },
    links: [
      { label: "Live website", href: "https://marucheck.dev", kind: "live" },
      { label: "Documentation", href: "https://marucheck.dev/docs", kind: "live" },
      { label: "CLI repository", href: "https://github.com/Kidus-M/MaruCheck", kind: "github" },
      { label: "Web repository", href: "https://github.com/Kidus-M/MaruCheck-Web", kind: "github" },
      { label: "npm package", href: "https://www.npmjs.com/package/marucheck", kind: "live" },
    ],
    featured: true,
  },
  {
    title: "Orit Tej",
    type: "Membership Commerce",
    year: "2026",
    role: "Product engineering · Flutter + backend",
    description:
      "A mobile membership and pickup ecosystem that connects member onboarding, recurring payments, inventory, benefits, and secure in-store fulfillment.",
    highlights: [
      "Built Flutter experiences for members and store operators with secure, persistent device sessions.",
      "Designed Stripe-backed membership renewals, bottle orders, stock broadcasts, and complimentary benefits.",
      "Hardened one-time pickup QR flows with hashed tokens, service-code verification, rotation, and rate limits.",
    ],
    tech: ["Flutter", "Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Stripe"],
    mark: OritTej,
    visual: {
      theme: "orit",
      label: "ORIT TEJ / MEMBER ECOSYSTEM",
      headline: "Membership that moves from screen to pickup.",
      status: "END-TO-END SYSTEM",
      steps: ["Join", "Pay", "Collect"],
      modules: [
        { label: "Identity", value: "Secure PIN" },
        { label: "Payments", value: "Recurring" },
        { label: "Handoff", value: "One-time QR" },
      ],
    },
    links: [
      { label: "Website", href: "https://orit-backend.vercel.app/", kind: "live" },
      { label: "Mobile app", href: "https://github.com/Kidus-M/Orit-Tej-Mobile", kind: "github" },
      { label: "Backend", href: "https://github.com/Kidus-M/Orit-Backend", kind: "github" },
    ],
    featured: true,
  },
  {
    title: "Oz Kitchen",
    type: "Operations Platform",
    year: "2026",
    role: "Lead Systems & Platform Engineer",
    description:
      "A real-time operating system for a food business, unifying customer ordering, kitchen execution, administration, delivery logistics, and partner workflows.",
    highlights: [
      "Architected the product and data model across customer, kitchen, admin, and delivery surfaces.",
      "Used Supabase, PostgreSQL, real-time subscriptions, and row-level security for coordinated operations.",
      "Automated notifications, internal coordination, referrals, and payment workflows through APIs and Telegram.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Automation"],
    mark: Oz,
    visual: {
      theme: "oz",
      label: "OZ KITCHEN / LIVE OPERATIONS",
      headline: "One live order, four connected teams.",
      status: "REAL-TIME PLATFORM",
      steps: ["Order", "Prepare", "Deliver"],
      modules: [
        { label: "Customer", value: "Ordering" },
        { label: "Kitchen", value: "Live queue" },
        { label: "Dispatch", value: "Tracking" },
      ],
    },
    links: [
      { label: "Live product", href: "https://oz-kitchen-blue.vercel.app/", kind: "live" },
    ],
    featured: true,
  },
  {
    title: "ProspectAI",
    type: "Applied AI Workspace",
    year: "2026",
    role: "Full-stack product engineering",
    description:
      "A private outreach workspace that turns fragmented prospect sources into editable context, personalized messages, and managed follow-up conversations.",
    highlights: [
      "Extracts useful signals from websites, GitHub profiles, notes, and uploaded profile screenshots.",
      "Separates source material, synthesized context, and generated output for a more explainable AI workflow.",
      "Pairs configurable model fallbacks with Better Auth, typed Drizzle schemas, PostgreSQL, analytics, and cached reads.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Better Auth", "Drizzle", "OpenRouter"],
    visual: {
      theme: "prospect",
      label: "PROSPECTAI / RESEARCH WORKSPACE",
      headline: "Sources become context. Context becomes outreach.",
      status: "AI-ASSISTED WORKFLOW",
      steps: ["Research", "Synthesize", "Compose"],
      modules: [
        { label: "Sources", value: "Web + GitHub" },
        { label: "Context", value: "Structured" },
        { label: "Outreach", value: "Personalized" },
      ],
    },
    links: [
      { label: "Live app", href: "https://prospect-ai-ashen.vercel.app", kind: "live" },
      { label: "Explore code", href: "https://github.com/Kidus-M/ProspectAI", kind: "github" },
    ],
    featured: true,
  },
  {
    title: "StreamSynx",
    type: "Multi-Surface Media",
    year: "2025–2026",
    role: "Product architecture · Web + mobile + TV",
    description:
      "A social viewing and media-discovery ecosystem spanning a Next.js website, Flutter client, and native Android TV experience.",
    highlights: [
      "Built a shared TMDB-powered discovery layer for movies, series, seasons, episodes, and recommendations.",
      "Implemented Firebase identity, favorites, watch history, buddies, real-time watch-party rooms, and chat.",
      "Extended the product beyond web with Flutter and a remote-first native Android TV interface.",
    ],
    tech: ["Next.js", "Flutter", "Android TV", "Firebase", "TMDB", "Real-time"],
    visual: {
      theme: "stream",
      label: "STREAMSYNX / EVERY SCREEN",
      headline: "One media identity across web, mobile, and TV.",
      status: "MULTI-SURFACE PRODUCT",
      steps: ["Discover", "Connect", "Watch"],
      modules: [
        { label: "Web", value: "Next.js" },
        { label: "Mobile", value: "Flutter" },
        { label: "Living room", value: "Android TV" },
      ],
    },
    links: [
      { label: "Web repository", href: "https://github.com/Kidus-M/StreamSynx", kind: "github" },
      { label: "Mobile repository", href: "https://github.com/Kidus-M/streamsynx-app", kind: "github" },
      { label: "Live product", href: "https://streamsynx.vercel.app/", kind: "live" },
    ],
    featured: true,
  },
  {
    title: "LendLoop",
    type: "Community Lending",
    year: "2026",
    role: "Full-stack engineering · Security + automation",
    description:
      "A neighborhood tool-lending board where neighbors list tools, ask to borrow each other's, and get notifications and overdue reminders through automated workflows.",
    highlights: [
      "Built a workshop-style tool wall where an available tool hangs on its peg and a borrowed one leaves a dashed outline.",
      "Enforced roles on the server: every Convex function declares its access level, and lint rejects the raw builders that would skip the check.",
      "Connected Convex and n8n through HMAC-signed webhooks with retries, plus one overdue reminder per loan per day.",
    ],
    tech: ["Next.js 16", "TypeScript", "Convex", "Clerk", "n8n", "Tailwind CSS"],
    visual: {
      theme: "lendloop",
      label: "LENDLOOP / NEIGHBORHOOD TOOL WALL",
      headline: "Borrow what you need. Lend what you don't.",
      status: "SIGNED AUTOMATION",
      steps: ["List", "Request", "Return"],
      modules: [
        { label: "Access", value: "Server-enforced" },
        { label: "Webhooks", value: "HMAC-signed" },
        { label: "Reminders", value: "Daily n8n run" },
      ],
    },
    links: [
      { label: "Repository", href: "https://github.com/Kidus-M/lendloop", kind: "github" },
    ],
    featured: true,
  },
  {
    title: "Recruit Intel",
    type: "Football Analytics Platform",
    year: "2026",
    role: "Creator · Data + ML + product",
    description:
      "A club-agnostic recruitment platform that profiles a squad, finds the gaps against its tactical system, and searches the market for players who fill them.",
    highlights: [
      "Links FPL, Understat, ClubElo, Transfermarkt, and API-Football records to one canonical player identity in DuckDB.",
      "Ranks candidates with role fit, player embeddings, league translation, and defensive estimates that carry a likely range and a confidence score.",
      "Ships a CLI plus a FastAPI and Next.js dashboard with lineup, recruit, compare, similar-player, and tactics what-if views.",
    ],
    tech: ["Python", "FastAPI", "Next.js", "DuckDB", "D3", "Machine Learning"],
    visual: {
      theme: "recruit",
      label: "RECRUIT INTEL / SQUAD + MARKET",
      headline: "Find the gap. Then find the player who fills it.",
      status: "RESEARCH PLATFORM",
      steps: ["Profile", "Gaps", "Search"],
      modules: [
        { label: "Sources", value: "5 data feeds" },
        { label: "Models", value: "Embeddings" },
        { label: "Dashboard", value: "Next.js + D3" },
      ],
    },
    links: [
      { label: "Repository", href: "https://github.com/Kidus-M/Football-Manager", kind: "github" },
    ],
    featured: true,
  },
  {
    title: "XAU/USD Backtester",
    type: "Quant Research Engine",
    year: "2026",
    role: "Creator · Research engineering",
    description:
      "A research backtester for intraday spot gold, built to measure whether a strategy has real expectancy after costs and to make an honest no easy to reach.",
    highlights: [
      "Validates strategies on minute data from 2019 to 2026 with anchored walk-forward testing, a random-entry benchmark, and a deflated Sharpe ratio.",
      "Guards against lookahead with a suite of 260 tests, including truncation invariance and AST scans of the source.",
      "Stays research-only by design: the build fails if a broker execution endpoint appears, and Telegram paper signals leave every decision to a human.",
    ],
    tech: ["Python", "pandas", "Parquet", "pytest", "Telegram"],
    visual: {
      theme: "quant",
      label: "XAU/USD / BACKTESTING ENGINE",
      headline: "Built to give the honest answer, even when it's no.",
      status: "RESEARCH ONLY",
      steps: ["Backtest", "Walk forward", "Deflate"],
      modules: [
        { label: "Validation", value: "Walk-forward" },
        { label: "Benchmark", value: "Random entry" },
        { label: "Execution", value: "None by design" },
      ],
    },
    links: [
      { label: "Repository", href: "https://github.com/Kidus-M/Quant", kind: "github" },
    ],
    featured: true,
  },
  {
    title: "Prepx",
    type: "Education Infrastructure",
    year: "2025",
    role: "Full-stack engineering · Temaribet",
    description:
      "A mobile-first learning platform built for Ethiopian high-school students preparing for national exit examinations.",
    highlights: [
      "Developed moderator dashboards and backend services supporting structured learning content and analytics.",
      "Used FastAPI, Redis caching, RabbitMQ workers, and event-driven workflows for performance and reliability.",
      "Contributed React Native mobile features and Next.js web surfaces in a shared TypeScript ecosystem.",
    ],
    tech: ["FastAPI", "Python", "Redis", "RabbitMQ", "React Native", "Next.js"],
    visual: {
      theme: "prepx",
      label: "PREPX / EXAM READINESS",
      headline: "Learning infrastructure designed for focused preparation.",
      status: "EDTECH PLATFORM",
      steps: ["Learn", "Practice", "Review"],
      modules: [
        { label: "Mobile", value: "React Native" },
        { label: "Services", value: "FastAPI" },
        { label: "Workflows", value: "RabbitMQ" },
      ],
    },
    links: [
      { label: "Temaribet", href: "https://www.linkedin.com/company/temaribet/", kind: "live" },
    ],
    featured: true,
  },
  {
    title: "Andro Solutions",
    type: "Corporate Platform",
    year: "2025",
    role: "Technical lead · Product + delivery",
    description:
      "A conversion-focused digital platform for a technology consultancy, balancing technical credibility with strong visual direction.",
    highlights: [
      "Shaped the information architecture and responsive interface around services, proof, and lead generation.",
      "Used deliberate motion and interaction design to create polish without compromising clarity or performance.",
      "Connected the public-facing work to broader client delivery, CI/CD, architecture, and team mentorship.",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "SEO", "CI/CD"],
    visual: {
      theme: "andro",
      label: "ANDRO / TECHNICAL CONSULTANCY",
      headline: "Technical credibility, translated into a clear digital presence.",
      status: "BRAND + ENGINEERING",
      steps: ["Position", "Design", "Convert"],
      modules: [
        { label: "Experience", value: "Responsive" },
        { label: "Motion", value: "Purposeful" },
        { label: "Discovery", value: "SEO-ready" },
      ],
    },
    links: [
      { label: "Live website", href: "https://andro-solutions.vercel.app/", kind: "live" },
    ],
    featured: true,
  },
  {
    title: "Series Streaming Platform",
    type: "Subscription Streaming",
    year: "2026",
    description:
      "A bilingual Amharic and English streaming site for a series set in 1990s Ethiopia, with subscriptions, Chapa payments, and signed, time-limited video access.",
    tech: ["Next.js 16", "Prisma", "Better Auth", "Chapa", "next-intl"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/studious-palm-tree", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "Blue Cloud",
    type: "Incident Reporting App",
    year: "2026",
    description:
      "A command-staff notification app where approved users file structured incident reports and Firebase Cloud Functions push each new report to staff.",
    image: BlueCloud,
    preview: "logo",
    tech: ["Flutter", "Firebase", "Cloud Functions", "FCM"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/BlueCloud", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "Road Crash Severity Model",
    type: "Applied Machine Learning",
    year: "2026",
    description:
      "A neural network that predicts accident severity from 60,004 Addis Ababa crash records, using SMOTE for class imbalance and leaving out features only known after a crash.",
    image: RoadCrash,
    preview: "website",
    tech: ["Python", "TensorFlow", "Keras", "scikit-learn", "SMOTE"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/AI-car-crash-training-model", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "LL(1) Parser Visualizer",
    type: "Compiler Tooling",
    year: "2025",
    description:
      "A desktop compiler-design tool that removes left recursion, computes FIRST and FOLLOW sets, builds the parsing table, and draws the parse tree.",
    tech: ["Python", "Tkinter", "Compiler Design"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/LL-1-parsing", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "3D Air Hockey",
    type: "Graphics Game",
    year: "2025",
    description:
      "A 3D air hockey game with planar puck physics, an AI opponent, wall bounces, goal detection, and particle effects, written directly against OpenGL.",
    tech: ["Python", "OpenGL", "Pygame"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/Computer-graphics-Class", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "DevApps",
    type: "App Testing Marketplace",
    year: "2025",
    description:
      "A two-sided platform where developers upload apps and testers explore them and leave feedback, with dashboards, messaging, follows, and a developer blog.",
    tech: ["Next.js", "Firebase", "Supabase", "Tailwind CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/Dev-Apps", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "OpalLuxe",
    type: "Luxury E-Commerce",
    year: "2025",
    description:
      "A luxury retail storefront with product management, API-driven order flows, and a polished customer journey.",
    image: OpalLuxe,
    preview: "logo",
    tech: ["Laravel", "React", "Tailwind CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/marXus-3D/opalluxe", kind: "github" },
      { label: "Live", href: "https://opalluxe.vercel.app/", kind: "live" },
    ],
    featured: false,
  },
  {
    title: "Spawn Point",
    type: "Desktop Simulation",
    year: "2024",
    description:
      "A hospital operations simulation modeling patient flow, staffing, and resource allocation under realistic constraints.",
    image: SpawnPoint,
    preview: "desktop",
    tech: ["C#", "Guna UI", "SQL"],
    links: [],
    featured: false,
  },
  {
    title: "Homely",
    type: "Service Marketplace",
    year: "2024",
    description:
      "A service marketplace connecting households with local providers through profiles, booking flows, and trust signals.",
    image: Homely,
    preview: "mobile",
    tech: ["Next.js", "Firebase", "Node.js"],
    links: [],
    featured: false,
  },
  {
    title: "FPL Bot",
    type: "AI / Automation",
    year: "2025",
    description:
      "A Telegram assistant that reviews Fantasy Premier League squads, recommends transfers, and automates routine decisions.",
    image: FPL,
    preview: "logo",
    tech: ["Python", "Telegram API", "Automation"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/FPL", kind: "github" },
      { label: "Bot", href: "https://t.me/FPL_personal_AI_bot", kind: "live" },
    ],
    featured: false,
  },
  {
    title: "Wolfden Cigar",
    type: "Luxury Commerce",
    year: "2025",
    description:
      "A refined commerce experience for curated cigar collections, events, membership, and brand-led retail.",
    image: CL,
    preview: "website",
    tech: ["Next.js", "Firebase", "Node.js"],
    links: [
      { label: "Live", href: "https://wolfdenaddis.com", kind: "live" },
    ],
    featured: false,
  },
  {
    title: "Pharma-Link",
    type: "Enterprise System",
    year: "2024",
    description:
      "An inventory and billing system for pharmaceutical workflows, covering stock, invoicing, and reporting.",
    image: PharmaLink,
    preview: "logo",
    tech: ["C#", ".NET", "SQL Server"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/PharmaLInk", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "HMK Pharmacy",
    type: "Desktop System",
    year: "2024",
    description:
      "A desktop pharmacy management system covering stock, sales, and prescriptions, built with Java Swing and SQL Server.",
    image: HMK,
    preview: "logo",
    tech: ["Java", "Swing", "SQL Server"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/HMK-PHARMACY", kind: "github" },
    ],
    featured: false,
  },
  {
    title: "2048 in C++",
    type: "Desktop Game",
    year: "2024",
    description:
      "The 2048 puzzle built in C++ with SFML, with undo, saved games, and separate high scores for easy, normal, and hard modes.",
    tech: ["C++", "SFML"],
    links: [
      { label: "GitHub", href: "https://github.com/Kidus-M/2048-C-", kind: "github" },
    ],
    featured: false,
  },
];

/** Display numbers follow list order, so inserting a project never needs a renumber. */
export const projects = entries.map((project, index) => ({
  ...project,
  id: String(index + 1).padStart(2, "0"),
}));
