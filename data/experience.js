/**
 * @typedef {Object} Experience
 * @property {string} company
 * @property {string} role
 * @property {string} duration
 * @property {string} [location]
 * @property {string} description
 * @property {string[]} highlights
 * @property {string[]} tags
 * @property {string} [url]
 */

export const experience = [
  {
    company: "Andro Solutions",
    role: "Senior Software Developer",
    duration: "03/2025 - Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Leading scalable client web platforms across frontend, backend, deployment, and engineering mentorship.",
    highlights: [
      "Led a cross-functional team to develop scalable web platforms using Next.js, Node.js, and MongoDB.",
      "Optimized backend performance and implemented CI/CD pipelines, reducing deployment times by 40%.",
      "Mentored junior developers on software architecture, version control, and maintainable delivery practices.",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "CI/CD", "Architecture"],
    url: "https://andro-solutions.vercel.app",
  },
  {
    company: "Oz Kitchen",
    role: "Lead Systems & Platform Engineer",
    duration: "04/2026",
    location: "Addis Ababa",
    description:
      "Architected and maintained an end-to-end operational platform for food production, customer ordering, kitchen workflows, and delivery logistics.",
    highlights: [
      "Built a unified real-time system connecting ordering, kitchen operations, administration, and delivery logistics.",
      "Developed responsive frontend applications, backend services, APIs, authentication, and database architecture.",
      "Engineered Telegram bot automation for coordination, notifications, and internal process management.",
      "Owned system architecture, deployment workflows, debugging, optimization, and feature delivery across the lifecycle.",
    ],
    tags: ["React", "PostgreSQL", "Supabase", "APIs", "Automation"],
    url: "https://oz-kitchen-blue.vercel.app/",
  },
  {
    company: "A2SV",
    role: "Head of Education",
    duration: "01/2026 - 05/2026",
    location: "Addis Ababa",
    description:
      "Led education programming for software engineering students with a focus on DSA, interview readiness, and problem-solving consistency.",
    highlights: [
      "Designed and delivered Data Structures and Algorithms training programs for software engineering students.",
      "Conducted structured lectures, problem-solving sessions, and technical reviews.",
      "Mentored students through competitive programming and real-world problem decomposition.",
      "Contributed to curriculum planning, learning standards, and academic direction across cohorts.",
    ],
    tags: ["DSA", "Mentorship", "Curriculum", "Competitive Programming"],
    url: "https://a2sv.org",
  },
  {
    company: "Temaribet",
    role: "Full Stack Developer",
    duration: "12/2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built production systems for an education technology platform serving Ethiopian high school students preparing for national exit examinations.",
    highlights: [
      "Developed moderator dashboards and backend infrastructure for a large-scale education platform.",
      "Built scalable FastAPI services with Redis caching and RabbitMQ asynchronous task processing.",
      "Designed APIs and background workers for content moderation, analytics, and reliability.",
      "Contributed React Native mobile features and Next.js web applications in the TypeScript ecosystem.",
    ],
    tags: ["FastAPI", "Python", "Redis", "RabbitMQ", "Next.js", "React Native"],
    url: "https://www.linkedin.com/company/temaribet/",
  },
  {
    company: "The Idea Vault",
    role: "Junior Software Developer",
    duration: "2022 - 01/2024",
    location: "Kenya-Ethiopia",
    description:
      "Supported web, brand, and campaign work across company websites and cross-border digital communication.",
    highlights: [
      "Designed and maintained company websites and visual assets, improving user engagement by 25%.",
      "Managed brand consistency across digital touchpoints.",
      "Led cross-border social media campaigns across Kenya and Ethiopia.",
    ],
    tags: ["React", "Web Design", "Branding", "Social Media"],
  },
];

export const organisations = [
  {
    name: "A2SV (Africa to Silicon Valley)",
    role: "Member",
    duration: "05/2025 - Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Engaged in high-level algorithmic training and collaborative software projects with top African engineers. Gained mentorship from global tech professionals and contributed to real-world solutions.",
    url: "https://a2sv.org",
  },
];
