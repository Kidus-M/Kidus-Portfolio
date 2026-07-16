import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import OpalLuxe from "@/assets/OPAL LUXE .png";
import OritTej from "@/assets/OritTej.png";
import Oz from "@/assets/Oz.png";

export const projects = [
  {
    id: "01",
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
      { label: "Mobile app", href: "https://github.com/Kidus-M/Orit-Tej-Mobile", kind: "github" },
      { label: "Backend", href: "https://github.com/Kidus-M/Orit-Backend", kind: "github" },
    ],
    featured: true,
  },
  {
    id: "02",
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
    id: "03",
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
      { label: "Explore code", href: "https://github.com/Kidus-M/ProspectAI", kind: "github" },
    ],
    featured: true,
  },
  {
    id: "04",
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
      { label: "Repository", href: "https://github.com/Kidus-M/StreamSynx", kind: "github" },
      { label: "Live product", href: "https://streamsynx.vercel.app/", kind: "live" },
    ],
    featured: true,
  },
  {
    id: "05",
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
    id: "06",
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
    id: "07",
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
    id: "08",
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
    id: "09",
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
    id: "10",
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
    id: "11",
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
    id: "12",
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
];
