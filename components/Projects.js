import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode, FaPaintBrush } from 'react-icons/fa';
import { useLenis } from 'lenis/react'

// --- ASSET IMPORTS (As requested) ---
// Note: Ensure these files exist in your project or the build will fail.
// If you don't have them yet, comment these out and use the placeholder logic below.

import StreamSynx from "@/assets/StreamSynx.png"; // Example path
import AndroWebsite from "@/assets/AndroWebsite.png";
import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import hmk from "@/assets/HMK.jpg"
import PharmaLink from "@/assets/PHARMALINK.png";
import Altium from "@/assets/Altium Logo.svg"
import OpalLuxe from "@/assets/OPAL LUXE .png"
// Design Assets
import AndroLogo from "@/assets/Andro/Logo-1.png"
import AndroPrimary from "@/assets/Andro/primary.png"
import Androicons from "@/assets/Andro/icons.png"
import Androfont1 from "@/assets/Andro/font1.png"
import Androfont2 from "@/assets/Andro/font2.png"
import Androcolors from "@/assets/Andro/colors.png"
import Androbc1 from "@/assets/Andro/bc1.png"
import Androbc2 from "@/assets/Andro/bc2.png"

import MissLogo from "@/assets/MissSummers/logos-01.png"
import Missprimary from "@/assets/MissSummers/primary.png"
import Missicons from "@/assets/MissSummers/icons.png"
import Missfont1 from "@/assets/MissSummers/font1.png"
import Missfont2 from "@/assets/MissSummers/font2.png"
import Misscolors from "@/assets/MissSummers/colors.png"
import MissSummers from "@/assets/MissSummers/summers.png"

import CigarLogo from "@/assets/cigar-lounge/Logo.png";
import CigarLounge1 from "@/assets/cigar-lounge/Jazz Night.jpg";
import CigarLounge2 from "@/assets/cigar-lounge/New Years Cigar Lounge.jpg";
import CigarLounge3 from "@/assets/cigar-lounge/WD ad1.jpg";
import CigarLounge4 from "@/assets/cigar-lounge/WD ad2.jpg";
import CigarLounge5 from "@/assets/cigar-lounge/WD ad10.jpg";

import RomanPrimary from "@/assets/Romans/primary.png"
import RomanSecondary from "@/assets/Romans/secondary.png"


// --- DATA CONFIGURATION ---

// Placeholder image function in case imports fail or are missing
const placeholderImg = AndroPrimary

const engineeringProjects = [
    {
        id: "01",
        title: "StreamSynx",
        category: "Real-Time Streaming",
        description: "A synchronized streaming platform for couples and groups to enjoy movies or sports together remotely.",
        image: StreamSynx, // Replace with StreamSynx variable
        liveDemo: "https://streamsynx.vercel.app",
        github: "https://github.com/kidus-m/streamsync",
        technologies: ["Next.js", "Firebase", "Tailwind", "TMDB API"],
        details: "StreamSynx allows real-time video synchronization between users in different locations. It includes room management, playback controls, and low-latency communication to simulate a shared watching experience.",
        year: "2024"
    },
    {
        id: "02",
        title: "Andro Solutions",
        category: "Corporate Web",
        description: "Modern company website showcasing Andro Solutions services, portfolio, and contact information.",
        image: AndroWebsite, // Replace with AndroWebsite
        liveDemo: "https://andro-solutions.vercel.app",
        github: "",
        technologies: ["Next.js", "Tailwind", "Framer Motion"],
        details: "The official Andro Solutions website designed with a clean aesthetic. Features responsive layouts, smooth animations, and optimized SEO structure.",
        year: "2024"
    },
    {
        id: "03",
        title: "Spawn Point",
        category: "Health Care / Simulation",
        description: "Simulation and management project centered around hospital systems and patient care design.",
        image: SpawnPoint, // Replace with SpawnPoint
        liveDemo: "",
        github: "",
        technologies: ["C#", "Guna UI", "SQL"],
        details: "Spawn Point Hospital Management lets players build, manage, and optimize a hospital. It includes patient AI, staff scheduling, and resource allocation challenges.",
        year: "2023"
    },
    {
        id: "04",
        title: "Homely",
        category: "Marketplace Platform",
        description: "A platform connecting clients with trusted household service providers.",
        image: Homely, // Replace with AboutHero
        liveDemo: "",
        github: "https://github.com/example/homely",
        technologies: ["Next.js", "Firebase", "Node.js"],
        details: "Homely is a service marketplace for household work. Clients can hire, track, and rate providers, while providers manage schedules and payments within the platform.",
        year: "2023"
    },
    {
        id: "05",
        title: "FPL Bot",
        category: "AI Automation",
        description: "Intelligent Fantasy Premier League assistant running on Telegram.",
        image: FPL, // Replace with FPL
        liveDemo: "https://t.me/FPL_personal_AI_bot",
        github: "https://github.com/Kidus-M/FPLbot",
        technologies: ["Python", "PTB", "Telegram API"],
        details: "The FPL Bot analyzes your squad, budget, and performance to offer smart transfer suggestions. It integrates real-time player data to provide insights via a chat interface.",
        year: "2024"
    },
    {
        id: "06",
        title: "Wolfden Cigar Lounge",
        category: "Luxury Lifestyle",
        description: "Gateway to the ultimate cigar experience with booking and e-commerce features.",
        image: CL, // Replace with CL
        liveDemo: "wolfdenaddis.com",
        github: "",
        technologies: ["Next.js", "Firebase", "Node.js"],
        details: "Showcases curated cigar collections, membership options, and event booking. Features a refined design reflecting the lounge's sophistication.",
        year: "2023"
    },
    {
        id: "07",
        title: "Altium",
        category: "Social Network",
        description: "A social media app designed to connect people through seamless sharing.",
        image: Altium,
        liveDemo: "",
        github: "",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        details: "Connects people through seamless sharing of posts, photos, and real-time interactions using a MERN stack architecture.",
        year: "2023"
    },
    {
        id: "08",
        title: "HMK Pharmacy",
        category: "Desktop Software",
        description: "A pharmacy management system to streamline inventory and prescriptions.",
        image: hmk,
        liveDemo: "",
        github: "",
        technologies: ["Java", "AWT", "Swing", "SQL Server"],
        details: "Legacy desktop application for local pharmacy management handling large inventory datasets.",
        year: "2022"
    },
    {
        id: "09",
        title: "Pharma-Link",
        category: "Enterprise System",
        description: "Inventory management, prescription tracking, and billing features.",
        image: PharmaLink,
        liveDemo: "",
        github: "",
        technologies: ["C#", ".NET", "WinForms", "SQL Server"],
        details: "A robust .NET solution for pharmaceutical inventory tracking and billing cycles.",
        year: "2022"
    },
    {
        id: "10",
        title: "StreamSynx",
        category: "Real-Time Streaming Mobile App",
        description: "A synchronized streaming platform for couples and groups to enjoy movies or sports together remotely.",
        image: StreamSynx, // Replace with StreamSynx variable
        liveDemo: "https://streamsynx.vercel.app/download",
        github: "https://github.com/kidus-m/streamsynx-app",
        technologies: ["Flutter", "Firebase", "TMDB API"],
        details: "StreamSynx allows real-time video synchronization between users in different locations. It includes room management, playback controls, and low-latency communication to simulate a shared watching experience.",
        year: "2024"
    },
    {
        id: "11",
        title: "OpalLuxe",
        category: "E-Commerce Web App",
        description: "A stylish online storefront built for luxury goods, combining a modern backend and frontend for a seamless shopping experience.",
        image: OpalLuxe, // placeholder for your image variable
        liveDemo: "https://opalluxe.vercel.app/",
        github: "https://github.com/marXus-3D/opalluxe",
        technologies: ["Laravel", "React", "Tailwind CSS"],
        details: "OpalLuxe is a full-stack ecommerce application. The backend is powered by Laravel, providing REST APIs, product management, user authentication, and order processing. The frontend is built with React and styled using Tailwind CSS to deliver a fast and responsive UI. It includes shopping cart functionality, product listings, secure checkout, and an admin dashboard for managing inventory and orders.",
        year: "2024"
    }

];

const designProjects = [
    {
        id: "g-01",
        title: "Andro Logo",
        category: "Branding",
        description: "Complete brand identity for Andro Solutions.",
        images: [AndroLogo,AndroPrimary, Androbc1, Androbc2, Androfont1, Androfont2, Androcolors, Androicons],
    },
    {
        id: "g-02",
        title: "Wolf Den Cigar Lounge",
        category: "Social Media",
        description: "High-end social media banners and post designs.",
        images: [CigarLogo,CigarLounge1, CigarLounge2, CigarLounge3, CigarLounge4, CigarLounge5],
    },
    {
        id: "g-03",
        title: "Miss Summers",
        category: "Visual Identity",
        description: "Soft, vibrant branding for a lifestyle brand.",
        images: [MissLogo,MissSummers, Missprimary, Misscolors, Missicons, Missfont1, Missfont2],
    },
    {
        id: "g-04",
        title: "Romans",
        category: "Logo Design",
        description: "Strong, classical logo design concepts.",
        images: [RomanPrimary, RomanSecondary],
    },
];

// Handle missing design imports gracefully for the demo
// In production, remove this and use the real arrays above
const safeDesignProjects = designProjects.map(p => ({
    ...p,
    images: p.images.filter(img => img !== undefined) // filter out missing imports
}));


// --- COMPONENTS ---

const ProjectModal = ({ project, isOpen, onClose, type }) => {
    const lenis = useLenis();

    useEffect(() => {
        if (isOpen) {
            // 1. Lock the body
            document.body.style.overflow = "hidden";
            // 2. Stop the main smooth scroll
            lenis?.stop();
        } else {
            // Restore
            document.body.style.overflow = "";
            lenis?.start();
        }

        // Cleanup function to ensure scroll returns if component unmounts
        return () => {
            document.body.style.overflow = "";
            lenis?.start();
        };
    }, [isOpen, lenis]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        // FIXED: Removed 'pointer-events-none' so clicking here actually closes the modal
                        className="fixed inset-0 bg-black/90 z-[50] backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        // CRITICAL FIX: This attribute tells Lenis to ignore this div, enabling native scroll
                        data-lenis-prevent
                        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-[#0f0f0f] border-l border-white/10 z-[70] overflow-y-auto p-8 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/50 hover:text-white p-2 z-50 bg-black/20 rounded-full"
                        >
                            <FaTimes size={24} />
                        </button>

                        <div className="mt-12 pb-20"> {/* Added pb-20 for bottom spacing */}
                            <span className="font-mono text-accent text-xs tracking-widest uppercase mb-2 block">
                // {type === 'eng' ? 'CASE STUDY' : 'VISUAL GALLERY'}
              </span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {project.title}
                            </h2>

                            {/* Engineering Content */}
                            {type === 'eng' && (
                                <div className="space-y-8">
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                    </div>

                                    <div className="flex gap-4">
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} target="_blank" rel="noreferrer" className="flex-1 bg-white text-black py-3 rounded-md font-mono text-center font-bold hover:bg-[#22c55e] hover:text-white transition-colors flex items-center justify-center gap-2">
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 border border-white/20 text-white py-3 rounded-md font-mono text-center hover:border-white transition-colors flex items-center justify-center gap-2">
                                                <FaGithub /> Source Code
                                            </a>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="font-mono text-secondary text-sm mb-3 border-b border-white/10 pb-2">PROJECT DETAILS</h4>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {project.details}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-mono text-secondary text-sm mb-3 border-b border-white/10 pb-2">TECH STACK</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(tech => (
                                                <span key={tech} className="px-3 py-1 bg-white/5 rounded text-xs text-accent font-mono border border-white/5">
                          {tech}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Design Content */}
                            {type === 'design' && (
                                <div className="space-y-8">
                                    <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                                    <div className="grid gap-8">
                                        {project.images && project.images.map((img, idx) => (
                                            <div key={idx} className="relative w-full h-auto rounded-sm overflow-hidden border border-white/5 shadow-lg">
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} shot ${idx}`}
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const Projects = () => {
    const [activeTab, setActiveTab] = useState('engineering');
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="work" className="py-32 px-6 md:px-20 bg-background relative">

            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <h2 className="font-heading text-4xl md:text-6xl mb-4">Selected<br/>Work</h2>
                    <p className="font-mono text-secondary text-sm">// ARCHIVE 2022 - 2025</p>
                </div>

                <div className="flex gap-2 bg-surface p-1 rounded-lg border border-white/10">
                    <button
                        onClick={() => setActiveTab('engineering')}
                        className={`px-6 py-2 rounded-md font-mono text-xs transition-all ${activeTab === 'engineering' ? 'bg-white text-black shadow-lg' : 'text-secondary hover:text-white'}`}
                    >
                        <span className="flex items-center gap-2"><FaCode /> ENGINEERING</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('design')}
                        className={`px-6 py-2 rounded-md font-mono text-xs transition-all ${activeTab === 'design' ? 'bg-white text-black shadow-lg' : 'text-secondary hover:text-white'}`}
                    >
                        <span className="flex items-center gap-2"><FaPaintBrush /> DESIGN LAB</span>
                    </button>
                </div>
            </div>

            {/* Engineering View (List Style) */}
            {activeTab === 'engineering' && (
                <div className="flex flex-col border-t border-white/10">
                    {engineeringProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedProject({ data: project, type: 'eng' })}
                            className="group relative py-8 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors duration-300 px-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-1 font-mono text-xs text-secondary">/{project.id}</div>

                                <div className="md:col-span-5">
                                    <h3 className="font-heading text-2xl md:text-4xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="md:col-span-3 hidden md:block">
                            <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                                {project.category}
                            </span>
                                </div>

                                <div className="md:col-span-3 flex justify-end items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="font-mono text-xs text-white">VIEW CASE STUDY</span>
                                    <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center pb-2">
                                        →
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Design View (Grid Style) */}
            {activeTab === 'design' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {safeDesignProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setSelectedProject({ data: project, type: 'design' })}
                            className="group relative aspect-[4/5] bg-[#111] border border-white/10 overflow-hidden cursor-pointer"
                        >
                            {/* Cover Image - using first image as thumbnail */}
                            {project.images[0] && (
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="font-mono text-xs text-gray-300 mb-2 block">{project.category}</span>
                                <h3 className="font-heading text-2xl text-white">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            <ProjectModal
                isOpen={!!selectedProject}
                project={selectedProject?.data}
                type={selectedProject?.type}
                onClose={() => setSelectedProject(null)}
            />

        </section>
    );
};

export default Projects;