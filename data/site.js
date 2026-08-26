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
    detail: "Interfaces that survive production — React, Next.js, Flutter, React Native.",
    tools: ["React", "Next.js", "Flutter", "TypeScript"],
  },
  {
    index: "02",
    title: "Systems Architecture",
    detail: "Data models, APIs, real-time surfaces, and the boundaries between them.",
    tools: ["Node.js", "FastAPI", "PostgreSQL", "Supabase"],
  },
  {
    index: "03",
    title: "Applied AI",
    detail: "Context pipelines, model fallbacks, and verification you can actually audit.",
    tools: ["MCP", "OpenRouter", "Drizzle", "Evaluation"],
  },
  {
    index: "04",
    title: "Delivery",
    detail: "CI/CD, cloud, observability, and engineers who get better on the way through.",
    tools: ["Docker", "AWS", "Vercel", "GitHub Actions"],
  },
];

export const metrics = [
  { value: 4, suffix: "+", label: "Years building" },
  { value: 13, suffix: "", label: "Shipped systems" },
  { value: 850, suffix: "+", label: "Problems solved" },
  { value: 1690, suffix: "", label: "Codeforces peak" },
];

export const proof = {
  headline: "Algorithmic thinking, proven under pressure.",
  body: "Beyond product work, I keep the fundamentals sharp through contests and high-volume algorithm practice — decomposition, implementation speed, and holding a solution in your head under a clock.",
  profiles: [
    {
      platform: "Codeforces",
      handle: "KidusMesfin",
      rank: "Expert",
      value: 1690,
      valueLabel: "Peak rating",
      secondary: "234 problems solved",
      href: "https://codeforces.com/profile/KidusMesfin",
      icon: "codeforces",
    },
    {
      platform: "LeetCode",
      handle: "Kidus_Mesfin",
      rank: "Consistent",
      value: 850,
      suffix: "+",
      valueLabel: "Problems solved",
      secondary: "Data structures, DP, interviews",
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
