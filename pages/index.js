// app/page.js or pages/index.js
"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero3D = () => {
    const meshRef = useRef();
    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.getElapsedTime() / 6;
        meshRef.current.rotation.y = state.clock.getElapsedTime() / 3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1.4, 64, 64]} ref={meshRef}>
                <MeshDistortMaterial color="#3B82F6" distort={0.3} speed={2.5} roughness={0.1} />
            </Sphere>
            <Environment preset="studio" />
        </Float>
    );
};

export default function Home() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <main className="bg-background text-white snap-y snap-mandatory h-[500vh] overflow-y-scroll">
            {/* HERO */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center snap-start">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Hero3D />
                    </Suspense>
                </Canvas>
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-7xl font-satoshi font-bold leading-tight">
                        Building digital worlds <br /> that move with you.
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-lg mx-auto">
                        Full-stack developer crafting cinematic, interactive experiences.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-10 bg-accent px-6 py-3 rounded-full font-medium text-white shadow-lg"
                    >
                        See My Work
                    </motion.button>
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 text-accent/70"
                    >
                        <ArrowDown size={28} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ABOUT */}
            <section className="h-screen w-full flex items-center justify-center snap-start relative overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-surface to-background opacity-60"
                />
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-4xl px-6 text-center"
                >
                    <h2 className="text-5xl font-satoshi font-bold mb-6">Who I Am</h2>
                    <p className="text-slate-400 leading-relaxed">
                        I'm Kidus Mesfin — a developer passionate about building futuristic
                        interfaces that blend code, design, and animation. From scalable
                        backend systems to cinematic frontends, I craft experiences that feel alive.
                    </p>
                </motion.div>
            </section>

            {/* PROJECTS */}
            <section className="h-screen w-full flex flex-col justify-center items-center snap-start">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-5xl font-satoshi font-bold mb-12"
                >
                    Featured Work
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-6">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, rotateY: 10 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="bg-surface/70 p-6 rounded-3xl shadow-xl backdrop-blur-sm border border-white/10"
                        >
                            <h3 className="text-2xl font-semibold mb-2">Project {i}</h3>
                            <p className="text-slate-400 mb-4">Interactive web experience with smooth animations and 3D visuals.</p>
                            <button className="text-accent font-medium hover:underline">View Live →</button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SKILLS */}
            <section className="h-screen w-full flex flex-col justify-center items-center snap-start">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-5xl font-satoshi font-bold mb-8"
                >
                    Tools & Tech
                </motion.h2>
                <motion.div
                    className="flex flex-wrap justify-center gap-6 text-slate-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {["Next.js", "Tailwind", "Framer Motion", "Three.js", "Firebase", "Node.js"].map((tool) => (
                        <motion.span
                            key={tool}
                            whileHover={{ scale: 1.2, color: "#3B82F6" }}
                            className="text-lg font-medium"
                        >
                            {tool}
                        </motion.span>
                    ))}
                </motion.div>
            </section>

            {/* CONTACT */}
            <section className="h-screen w-full flex flex-col justify-center items-center snap-start">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-5xl font-satoshi font-bold mb-8"
                >
                    Let’s Build Together
                </motion.h2>
                <motion.form
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4 w-80 text-black"
                >
                    <input className="rounded-xl px-4 py-2" placeholder="Name" />
                    <input className="rounded-xl px-4 py-2" placeholder="Email" />
                    <textarea className="rounded-xl px-4 py-2" placeholder="Message" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-accent text-white py-2 rounded-xl font-medium"
                    >
                        Send Message
                    </motion.button>
                </motion.form>
                <p className="mt-8 text-slate-500 text-sm">“I usually reply faster than your build finishes.”</p>
            </section>
        </main>
    );
}
