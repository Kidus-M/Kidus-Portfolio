import StreamSynx from "@/assets/StreamSynx.png";
import AndroWebsite from "@/assets/AndroWebsite.png";
import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import OpalLuxe from "@/assets/OPAL LUXE .png";

export const projects = [
  {
    id: "01",
    title: "StreamSynx",
    type: "Full-Stack App",
    description:
      "A synchronized watch-party platform for movies and live sports, built around real-time rooms, shared playback, and low-friction invites.",
    image: StreamSynx,
    tech: ["Next.js", "Firebase", "Tailwind", "TMDB API"],
    github: "https://github.com/kidus-m/streamsync",
    live: "https://streamsynx.vercel.app",
    featured: true,
  },
  {
    id: "02",
    title: "Andro Solutions",
    type: "Corporate Platform",
    description:
      "A conversion-focused digital identity for a tech consultancy, with crisp motion, responsive layouts, and SEO-minded structure.",
    image: AndroWebsite,
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    live: "https://andro-solutions.vercel.app",
    featured: true,
  },
  {
    id: "03",
    title: "OpalLuxe",
    type: "E-Commerce",
    description:
      "A luxury retail experience with product management, API-driven flows, and a polished customer-facing storefront.",
    image: OpalLuxe,
    tech: ["Laravel", "React", "Tailwind CSS"],
    github: "https://github.com/marXus-3D/opalluxe",
    live: "https://opalluxe.vercel.app/",
    featured: true,
  },
  {
    id: "04",
    title: "Spawn Point",
    type: "Desktop Simulation",
    description: "A hospital management simulator for patient flow, staffing, and resource allocation.",
    image: SpawnPoint,
    tech: ["C#", "Guna UI", "SQL"],
    featured: false,
  },
  {
    id: "05",
    title: "Homely",
    type: "Marketplace",
    description: "A service marketplace connecting households with vetted local providers.",
    image: Homely,
    tech: ["Next.js", "Firebase", "Node.js"],
    github: "https://github.com/example/homely",
    featured: false,
  },
  {
    id: "06",
    title: "FPL Bot",
    type: "AI / Automation",
    description: "A Telegram assistant that analyzes Fantasy Premier League squads and transfer decisions.",
    image: FPL,
    tech: ["Python", "Telegram API", "Automation"],
    github: "https://github.com/Kidus-M/FPLbot",
    live: "https://t.me/FPL_personal_AI_bot",
    featured: false,
  },
  {
    id: "07",
    title: "Wolfden Cigar",
    type: "Luxury E-Commerce",
    description: "A refined web experience for curated cigar collections, events, and memberships.",
    image: CL,
    tech: ["Next.js", "Firebase", "Node.js"],
    live: "https://wolfdenaddis.com",
    featured: false,
  },
  {
    id: "08",
    title: "Pharma-Link",
    type: "Enterprise System",
    description: "Inventory and billing software for pharmaceutical stock workflows.",
    image: PharmaLink,
    tech: ["C#", ".NET", "SQL Server"],
    featured: false,
  },
];
