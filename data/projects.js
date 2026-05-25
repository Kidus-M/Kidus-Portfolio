import StreamSynx from "@/assets/StreamSynx.png";
import AndroWebsite from "@/assets/AndroWebsite.png";
import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import OpalLuxe from "@/assets/OPAL LUXE .png";
import Prepx from "@/assets/prepx.jpg"; // add Prepx image (place the image at this path)

export const projects = [
  {
    id: "01",
    title: "StreamSynx",
    type: "Full-Stack App",
    description:
      "A synchronized watch-party platform for movies and live sports — real-time rooms, shared playback controls, and frictionless invites built for social viewing.",
    image: StreamSynx,
    preview: "website",
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
      "A conversion-focused website for a tech consultancy featuring polished motion, responsive design, and SEO-friendly structure to drive leads.",
    image: AndroWebsite,
    preview: "website",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    live: "https://andro-solutions.vercel.app",
    featured: true,
  },
  {
    id: "03",
    title: "OpalLuxe",
    type: "E-Commerce",
    description:
      "A luxury retail storefront with product management, API-driven order flows, and a polished customer-facing shopping experience.",
    image: OpalLuxe,
    preview: "logo",
    tech: ["Laravel", "React", "Tailwind CSS"],
    github: "https://github.com/marXus-3D/opalluxe",
    live: "https://opalluxe.vercel.app/",
    featured: true,
  },
  {
    id: "04",
    title: "Spawn Point",
    type: "Desktop Simulation",
    description: "A desktop simulation modeling hospital patient flow, staffing, and resource allocation with realistic operational constraints.",
    image: SpawnPoint,
    preview: "desktop",
    tech: ["C#", "Guna UI", "SQL"],
    featured: false,
  },
  {
    id: "05",
    title: "Homely",
    type: "Marketplace",
    description: "A service marketplace connecting households with vetted local providers — bookings, provider profiles, and review flows to build trust.",
    image: Homely,
    preview: "mobile",
    tech: ["Next.js", "Firebase", "Node.js"],
    github: "https://github.com/example/homely",
    featured: false,
  },
  {
    id: "06",
    title: "FPL Bot",
    type: "AI / Automation",
    description: "A Telegram assistant that analyzes Fantasy Premier League squads, recommends transfers, and automates routine team management tasks.",
    image: FPL,
    preview: "logo",
    tech: ["Python", "Telegram API", "Automation"],
    github: "https://github.com/Kidus-M/FPLbot",
    live: "https://t.me/FPL_personal_AI_bot",
    featured: false,
  },
  {
    id: "07",
    title: "Wolfden Cigar",
    type: "Luxury E-Commerce",
    description: "A refined e-commerce experience for curated cigar collections, events, and membership management with tasteful UI and commerce flows.",
    image: CL,
    preview: "website",
    tech: ["Next.js", "Firebase", "Node.js"],
    live: "https://wolfdenaddis.com",
    featured: false,
  },
  {
    id: "08",
    title: "Pharma-Link",
    type: "Enterprise System",
    description: "An enterprise inventory and billing system for pharmaceutical workflows, with stock tracking, invoicing, and regulatory-aware reporting.",
    image: PharmaLink,
    preview: "logo",
    tech: ["C#", ".NET", "SQL Server"],
    featured: false,
  },
  {
    id: "09",
    title: "Prepx",
    type: "Education App",
    description:
      "A mobile-first learning app for university entrance prep — curated subjects, past exam papers (UEE), and a chat-based tutor for personalized study and practice.",
    image: Prepx,
    preview: "mobile",
    tech: ["React Native", "Firebase", "AI Chatbot"],
    featured: true,
  },
];
