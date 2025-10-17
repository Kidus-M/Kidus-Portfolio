// components/AboutSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Globe, Zap, Heart } from 'lucide-react';

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const values = [
        { icon: Code2, title: 'Clean Code', desc: 'Maintainable, scalable architecture' },
        { icon: Zap, title: 'Performance', desc: 'Lightning-fast experiences' },
        { icon: Globe, title: 'Accessibility', desc: 'Inclusive design for all' },
        { icon: Heart, title: 'Passion', desc: 'Craft with care and attention' }
    ];

    return (
        <section id="about" ref={containerRef} className="relative min-h-screen bg-[#0D0D10] text-[#E0E0E5] overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D10] via-[#1A1A2E] to-[#0D0D10]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/5 via-transparent to-transparent" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-24">
                {/* Intro Text */}
                <motion.div
                    className="text-center mb-20"
                    style={{ opacity, y, scale }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-3xl font-light text-gray-300 italic mb-8"
                    >
                        "I build experiences that live and breathe."
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* 3D Visual Placeholder */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border border-cyan-400/20 backdrop-blur-sm">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-2 border-cyan-400/30 rounded-lg animate-spin-slow" />
                                <div className="absolute w-24 h-24 border-2 border-gold-400/30 rounded-lg animate-spin-slow-reverse" />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-sm rounded-lg">
                                <p className="text-cyan-400 text-sm font-mono">const passion = 'coding';</p>
                                <p className="text-gold-400 text-sm font-mono">let innovation = 'limitless';</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl md:text-6xl font-bold text-white"
                        >
                            About Me
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="space-y-4 text-lg text-gray-300 leading-relaxed"
                        >
                            <p>
                                I'm <span className="text-cyan-400 font-semibold">Kidus Mesfin</span>, a full-stack developer from Addis Ababa, crafting experiences where technology meets emotion.
                            </p>
                            <p>
                                I believe the web is more than code — it's an emotional medium. My goal is to craft interfaces that speak, move, and inspire.
                            </p>
                            <p>
                                I blend <span className="text-cyan-400">code</span>, <span className="text-cyan-400">motion</span>, and <span className="text-cyan-400">design</span> to create websites that feel alive — immersive, human, and meaningful.
                            </p>
                        </motion.div>

                        {/* Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap gap-3"
                        >
                            {["Next.js", "React", "TypeScript", "Three.js", "Framer Motion", "Tailwind", "Node.js", "Firebase"].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-default"
                                >
                  {skill}
                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Values Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
                >
                    {values.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.6 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300"
                        >
                            <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Floating Keywords */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-cyan-400/60 tracking-widest text-sm font-spacegrotesk"
                >
                    CREATIVITY • PRECISION • DEPTH • MOTION
                </motion.div>
            </div>
        </section>
    );
}