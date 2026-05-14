import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import StreamSynx from "@/assets/StreamSynx.png";
import AndroWebsite from "@/assets/AndroWebsite.png";
import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import OpalLuxe from "@/assets/OPAL LUXE .png";

const projects = [
    {
        id: "01",
        title: "StreamSynx",
        category: "Streaming Platform",
        image: StreamSynx,
        live: "https://streamsynx.vercel.app",
        github: "https://github.com/kidus-m/streamsync",
        stack: ["Next.js", "Firebase", "Tailwind", "TMDB API"],
        summary: "Synchronized watch parties for films, sport, and shared real-time viewing.",
        details:
            "A room-based streaming companion with synchronized playback, invite flows, realtime state, and responsive product flows.",
    },
    {
        id: "02",
        title: "Andro Solutions",
        category: "Corporate Website",
        image: AndroWebsite,
        live: "https://andro-solutions.vercel.app",
        github: "",
        stack: ["Next.js", "Tailwind", "Framer Motion"],
        summary: "A precise digital identity for a technology consultancy built for conversion.",
        details:
            "Marketing pages, motion-led service storytelling, strong hierarchy, and SEO-minded architecture for a professional consulting presence.",
    },
    {
        id: "03",
        title: "OpalLuxe",
        category: "E-Commerce",
        image: OpalLuxe,
        live: "https://opalluxe.vercel.app/",
        github: "https://github.com/marXus-3D/opalluxe",
        stack: ["Laravel", "React", "Tailwind CSS"],
        summary: "A luxury retail experience with a full-stack commerce foundation.",
        details:
            "Product management, REST APIs, storefront flows, checkout foundations, and an admin surface composed for clarity.",
    },
    {
        id: "04",
        title: "FPL Bot",
        category: "AI Automation",
        image: FPL,
        live: "https://t.me/FPL_personal_AI_bot",
        github: "https://github.com/Kidus-M/FPLbot",
        stack: ["Python", "PTB", "Telegram API"],
        summary: "A Telegram assistant that helps Fantasy Premier League managers make better moves.",
        details:
            "Analyzes squads, budget pressure, form, and transfer options through a conversational Telegram workflow.",
    },
    {
        id: "05",
        title: "Homely",
        category: "Marketplace",
        image: Homely,
        live: "",
        github: "https://github.com/example/homely",
        stack: ["Next.js", "Firebase", "Node.js"],
        summary: "A service marketplace connecting households with vetted local providers.",
        details:
            "Client booking, provider profiles, scheduling, ratings, and discovery flows for home support tasks.",
    },
    {
        id: "06",
        title: "Spawn Point",
        category: "Healthcare Simulation",
        image: SpawnPoint,
        live: "",
        github: "",
        stack: ["C#", "Guna UI", "SQL"],
        summary: "A virtual hospital simulator for managing patients, staff, and resources.",
        details:
            "Desktop simulation software with patient behavior, staff scheduling, inventory pressure, and operational tradeoffs.",
    },
    {
        id: "07",
        title: "Wolfden Cigar",
        category: "Luxury E-Commerce",
        image: CL,
        live: "https://wolfdenaddis.com",
        github: "",
        stack: ["Next.js", "Firebase", "Node.js"],
        summary: "A refined digital experience for a cigar lounge and luxury retail brand.",
        details:
            "Curated product browsing, membership storytelling, event surfaces, and restrained visuals aligned with a premium venue.",
    },
    {
        id: "08",
        title: "Pharma-Link",
        category: "Enterprise System",
        image: PharmaLink,
        live: "",
        github: "",
        stack: ["C#", ".NET", "WinForms", "SQL Server"],
        summary: "An inventory and billing pipeline for pharmaceutical operations.",
        details:
            "A practical enterprise system for stock movement, billing cycles, and pharmacy-grade inventory visibility.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function Projects() {
    return (
        <section id="work" className="relative border-b border-[#eaeaea] bg-[#ffffff] text-[#0a0a0a] min-h-screen py-24 lg:py-32">
            <div className="mx-auto w-full max-w-[1600px] px-10 sm:px-16 lg:px-32">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#eaeaea] pb-12 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <p className="mb-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                            Projects
                        </p>
                        <h2 className="mb-8 font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[#0a0a0a]">
                            Selected
                            <br />
                            Projects
                        </h2>
                        <p className="text-[15px] leading-[1.6] text-zinc-600 font-medium tracking-tight">
                            A curated selection of platforms, tools, and digital experiences engineered for performance and scale.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="mt-12 lg:mt-0 flex gap-4"
                    >
                        <a
                            href="https://github.com/kidus-m"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] font-bold text-[#0a0a0a] hover:text-zinc-500 transition-colors"
                        >
                            View All Projects <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, idx) => {
                        // Let's make "StreamSynx" and "Wolfden Cigar" featured so they span 2 columns if desired, 
                        // or just follow a 1-2-1-2 flow. For now let's just make the first one featured.
                        const isFeatured = idx === 0 || idx === 4;
                        
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (idx % 3) * 0.1 }}
                                className={`group relative flex flex-col bg-[#f5f5f5] overflow-hidden ${
                                    isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                                }`}
                            >
                                <div className="p-8 flex flex-col z-10 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] text-zinc-500 font-bold">
                                            {project.id}
                                        </p>
                                        <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[#0a0a0a]">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="text-[14px] leading-[1.6] text-zinc-600 font-medium max-w-sm">
                                        {project.summary}
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-4 mt-auto">
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-[#0a0a0a] border border-[#0a0a0a]/10 px-4 py-2 hover:bg-[#0a0a0a] hover:text-white transition-colors">
                                                Live Demo <ArrowUpRight className="h-3 w-3" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-[#0a0a0a] border border-[#0a0a0a]/10 px-4 py-2 hover:bg-[#0a0a0a] hover:text-white transition-colors">
                                                GitHub <ArrowUpRight className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className={`relative w-full ${isFeatured ? "h-80 md:h-[400px]" : "h-60 md:h-72"} overflow-hidden mt-4`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
