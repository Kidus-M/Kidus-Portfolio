/**
 * The stack, grouped for the orbit console.
 *
 * Every entry is backed by shipped work — the projects in `data/projects.js`,
 * the roles in `data/experience.js`, or a public repository. `icon` maps to a
 * lucide component in components/Stack.js.
 */
export const techGroups = [
  {
    label: "Languages",
    icon: "code",
    summary:
      "Core languages I write day to day, plus the ones behind older desktop and systems work.",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Dart", "C#", "Java", "C++"],
  },
  {
    label: "Frontend",
    icon: "layers",
    summary:
      "Interface work across web and mobile — component architecture, layout systems, and motion.",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Flutter",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Figma",
    ],
  },
  {
    label: "Backend",
    icon: "server",
    summary:
      "Services, APIs, queues, and caches — the layer that has to stay up when traffic arrives.",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Laravel",
      ".NET",
      "Redis",
      "RabbitMQ",
      "REST APIs",
    ],
  },
  {
    label: "Data",
    icon: "database",
    summary:
      "Relational and realtime storage, typed schemas, and access rules that hold under multi-tenant load.",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Neon",
      "Drizzle",
      "SQL Server",
      "Row-Level Security",
    ],
  },
  {
    label: "Cloud & DevOps",
    icon: "cloud",
    summary: "Build, ship, and run — containers, pipelines, and the platforms I deploy onto.",
    items: ["Docker", "AWS", "Vercel", "Railway", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    label: "Applied AI",
    icon: "brain",
    summary:
      "Model plumbing I have actually shipped: context pipelines, provider fallbacks, and verification you can audit.",
    items: ["MCP", "OpenRouter", "Model Fallbacks", "Context Pipelines", "AI Verification"],
  },
  {
    label: "Quality & Craft",
    icon: "shield",
    summary:
      "The checks that decide whether a release ships — tests, scanners, accessibility, and discoverability.",
    items: ["Vitest", "Playwright", "Semgrep", "Gitleaks", "Accessibility", "SEO", "Motion Systems"],
  },
  {
    label: "Integrations",
    icon: "plug",
    summary:
      "Third-party surfaces I have wired into products: payments, identity, bots, and living-room clients.",
    items: ["Stripe", "Better Auth", "Telegram Bots", "TMDB", "Android TV", "Real-time"],
  },
];

/** Ticker strip under the stack console. */
export const techMarquee = [
  "TypeScript",
  "Go",
  "Python",
  "Dart",
  "React",
  "Next.js",
  "Flutter",
  "React Native",
  "Node.js",
  "FastAPI",
  "Redis",
  "RabbitMQ",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Drizzle",
  "Docker",
  "AWS",
  "Vercel",
  "GitHub Actions",
  "Stripe",
  "MCP",
  "Playwright",
  "Figma",
].map((name) => ({ name }));
