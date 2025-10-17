// components/ProjectsGallery.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "StreamSync",
        description: "A social streaming platform where users can watch together, track favorites, and discover new shows. Built with real-time synchronization and social features.",
        tech: ["Next.js", "Firebase", "TypeScript", "Tailwind"],
        image: "/projects/streamsync.jpg",
        liveUrl: "https://streamsync.vercel.app",
        githubUrl: "https://github.com/kidus/streamsync",
        accent: "cyan"
    },
    {
        title: "Cravings",
        description: "An elegant restaurant landing page designed for appetite and conversion. Features smooth animations, responsive design, and mouth-watering visuals.",
        tech: ["React", "Framer Motion", "GSAP", "CSS"],
        image: "/projects/cravings.jpg",
        liveUrl: "https://cravings.vercel.app",
        githubUrl: "https://github.com/kidus/cravings",
        accent: "gold"
    },
    {
        title: "Nebula UI",
        description: "A comprehensive design system and component library for modern web applications. Includes 50+ accessible components with dark mode support.",
        tech: ["React", "TypeScript", "Storybook", "Jest"],
        image: "/projects/nebula.jpg",
        liveUrl: "https://nebula-ui.vercel.app",
        githubUrl: "https://github.com/kidus/nebula-ui",
        accent: "cyan"
    }
];

export default function ProjectsGallery() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, -100]);

    return (
        <section id="projects" ref={containerRef} className="relative min-h-screen bg-[#0D0D10] text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D10] via-[#1A1A2E] to-[#0D0D10]" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    style={{ opacity, y }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-gold-400 bg-clip-text text-transparent"
                    >
                        Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Where design meets logic — each project is a story told through motion, detail, and precision.
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}
        >
            {/* Image */}
            <div className="w-full md:w-1/2 relative">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/10 to-gold-400/5 border border-white/10 group-hover:border-cyan-400/30 transition-all duration-500"
                >
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-gold-400 bg-clip-text text-transparent">
                            {project.title}
                        </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-6">
                        <div className="flex gap-3">
                            <motion.a
                                href={project.liveUrl}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={project.githubUrl}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 backdrop-blur-sm transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
                <motion.h3
                    className="text-4xl md:text-5xl font-bold group-hover:text-cyan-400 transition-colors duration-300"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    className="text-lg text-gray-400 leading-relaxed"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ delay: index * 0.2 + 0.4, duration: 0.8 }}
                >
                    {project.description}
                </motion.p>

                <motion.div
                    className="flex flex-wrap gap-3"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                >
                    {project.tech.map((tech: string) => (
                        <span
                            key={tech}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-default"
                        >
              {tech}
            </span>
                    ))}
                </motion.div>

                <motion.div
                    className="flex gap-4"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                >
                    <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-cyan-400 text-black rounded-full font-semibold hover:bg-cyan-300 transition-colors flex items-center gap-2"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Visit Live Site
                    </motion.a>
                    <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center gap-2"
                    >
                        <Github className="w-4 h-4" />
                        View Code
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    );
}