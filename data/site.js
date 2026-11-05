import { projects } from "@/data/projects";

export const profile = {
  first: "Kidus",
  last: "Mesfin",
  role: "Software Engineer",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  utc: "UTC+03:00",
  email: "kidusmesfinteferi@gmail.com",
  available: true,
  statement:
    "I design, build, and ship the whole thing — interface, services, data, and delivery.",
  intro:
    "Systems-minded engineer working end to end across web, mobile, backend, and applied AI.",
};

export const socials = [
  { href: "https://github.com/Kidus-M", label: "GitHub", handle: "Kidus-M", icon: "github" },
  { href: "https://www.linkedin.com/in/kidus-m", label: "LinkedIn", handle: "kidus-m", icon: "linkedin" },
  { href: "https://codeforces.com/profile/KidusMesfin", label: "Codeforces", handle: "KidusMesfin", icon: "codeforces" },
  { href: "https://leetcode.com/u/Kidus_Mesfin/", label: "LeetCode", handle: "Kidus_Mesfin", icon: "leetcode" },
  { href: "https://t.me/kidus_mesfin", label: "Telegram", handle: "kidus_mesfin", icon: "telegram" },
  { href: "https://www.instagram.com/kidus._.m", label: "Instagram", handle: "kidus._.m", icon: "instagram" },
];

/** Read aloud, one word at a time, as the section scrubs past. */
export const manifesto =
  "Most products break at the seams — where the interface meets the service, where the service meets the data, where the whole thing meets production. I work across those seams. I build systems that hold together end to end, and I stay with them until they ship.";

export const capabilities = [
  {
    index: "01",
    title: "Product Engineering",
    detail:
      "I take a product from idea to launch across the interface, backend, data, and deployment, so one person can own the whole build.",
    tools: ["React", "Next.js", "TypeScript", "Node.js"],
    work: ["MaruCheck", "StreamSynx", "Oz Kitchen", "LendLoop", "DevApps"],
  },
  {
    index: "02",
    title: "Mobile Apps",
    detail:
      "I build Flutter and React Native apps for customers and staff, with accounts, payments, and push notifications that work in real use.",
    tools: ["Flutter", "React Native", "Firebase", "Stripe"],
    work: ["Orit Tej", "StreamSynx", "Prepx", "Blue Cloud"],
  },
  {
    index: "03",
    title: "Systems Architecture",
    detail:
      "I design the data models, APIs, and real-time systems that keep customers, staff, and partners working from the same live information.",
    tools: ["FastAPI", "PostgreSQL", "Supabase", "Convex", "Redis"],
    work: ["Oz Kitchen", "Prepx", "Orit Tej", "Series Streaming Platform"],
  },
  {
    index: "04",
    title: "Applied AI",
    detail:
      "I add AI to products in ways you can check, from research and outreach tools to independent testing of code written by AI agents.",
    tools: ["MCP", "OpenRouter", "Context Pipelines", "Evaluation"],
    work: ["MaruCheck", "ProspectAI", "FPL Bot"],
  },
  {
    index: "05",
    title: "Data & Machine Learning",
    detail:
      "I train models and build research tools on messy real data, then test them on data they have not seen so you know what a result is worth.",
    tools: ["PyTorch", "TensorFlow", "scikit-learn", "pandas", "DuckDB"],
    work: ["Recruit Intel", "XAU/USD Backtester", "Road Crash Severity Model"],
  },
  {
    index: "06",
    title: "Automation & Integrations",
    detail:
      "I connect payments, sign-in, messaging, and internal tools so routine work like reminders, notifications, and handoffs runs on its own.",
    tools: ["n8n", "Stripe", "Chapa", "Clerk", "Telegram Bots"],
    work: ["LendLoop", "Oz Kitchen", "Orit Tej", "FPL Bot"],
  },
  {
    index: "07",
    title: "Security & Quality",
    detail:
      "I enforce access on the server, sign and verify what systems send each other, and add the automated tests that catch problems before release.",
    tools: ["Playwright", "pytest", "Semgrep", "Row-Level Security"],
    work: ["MaruCheck", "LendLoop", "Orit Tej", "XAU/USD Backtester"],
  },
  {
    index: "08",
    title: "Delivery & Team Leadership",
    detail:
      "I set up CI/CD and cloud deployments, lead the work through release, and mentor developers along the way. At Andro Solutions this cut deployment time by 40%.",
    tools: ["Docker", "AWS", "Vercel", "GitHub Actions"],
    work: ["Andro Solutions", "Oz Kitchen", "MaruCheck"],
  },
];

export const metrics = [
  { value: 4, suffix: "+", label: "Years building" },
  { value: projects.length, suffix: "", label: "Projects built" },
  { value: 1000, suffix: "+", label: "Problems solved" },
  { value: 1726, suffix: "", label: "Codeforces peak" },
];

export const proof = {
  headline: "Algorithmic thinking, proven under pressure.",
  body: "Beyond product work, I keep the fundamentals sharp through contests and high-volume algorithm practice — decomposition, implementation speed, and holding a solution in your head under a clock.",
  profiles: [
    {
      platform: "Codeforces",
      handle: "KidusMesfin",
      rank: "Expert",
      value: 1726,
      valueLabel: "Peak rating",
      secondary: "234 problems solved · 8 rated contests",
      href: "https://codeforces.com/profile/KidusMesfin",
      icon: "codeforces",
    },
    {
      platform: "LeetCode",
      handle: "Kidus_Mesfin",
      rank: "Consistent",
      value: 1000,
      suffix: "+",
      valueLabel: "Problems solved",
      secondary: "156 hard · 573 medium · 272 easy",
      href: "https://leetcode.com/u/Kidus_Mesfin/",
      icon: "leetcode",
    },
  ],
  strengths: ["Data structures", "Algorithms", "Contests", "Optimization", "Decomposition"],
};

export const navLinks = [
  { href: "#index", label: "Index" },
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#stack", label: "Stack" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Contact" },
];
