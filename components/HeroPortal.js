"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Sphere,
    MeshDistortMaterial,
    Environment,
    PerspectiveCamera,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/* ===== Portal Scene (3D Background) ===== */
function PortalScene({ mouse, scrollY }) {
    const sphere = useRef();
    const { camera } = useThree();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Animate distortion + subtle color pulse
        sphere.current.material.distort = 0.35 + Math.sin(t * 1.5) * 0.05;
        sphere.current.material.speed = 2;
        sphere.current.material.emissiveIntensity =
            0.3 + Math.sin(t * 2) * 0.1;

        // Mouse parallax
        const x = (mouse.current.x - 0.5) * 0.7;
        const y = (mouse.current.y - 0.5) * 0.7;
        camera.position.x += (x - camera.position.x) * 0.05;
        camera.position.y += (-y - camera.position.y) * 0.05;

        // Scroll-based zoom
        const zoom = 5 - scrollY.current * 3;
        camera.position.z += (zoom - camera.position.z) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={0.7} />
            <pointLight position={[2, 3, 4]} intensity={2} color="#60A5FA" />
            <Sphere args={[1.5, 128, 128]} ref={sphere}>
                <MeshDistortMaterial
                    color="#2563EB"
                    emissive="#60A5FA"
                    emissiveIntensity={0.4}
                    roughness={0.3}
                    metalness={0.5}
                    speed={2.5}
                />
            </Sphere>
            <Environment preset="city" />
        </>
    );
}

/* ===== Hero Section ===== */
export default function HeroSection() {
    const mouse = useRef(new THREE.Vector2(0.5, 0.5));
    const scrollY = useRef(0);

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);
    const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current.x = e.clientX / window.innerWidth;
            mouse.current.y = e.clientY / window.innerHeight;
        };
        const onScroll = () => (scrollY.current = window.scrollY / window.innerHeight);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <section className="relative min-h-[200vh] flex flex-col justify-center items-center overflow-hidden bg-[var(--color-background)]">
            {/* ===== 3D Scene ===== */}
            <motion.div
                style={{ scale, opacity }}
                className="fixed inset-0 pointer-events-none z-0"
            >
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <PortalScene mouse={mouse} scrollY={scrollY} />
                </Canvas>
            </motion.div>

            {/* ===== Glass Overlay ===== */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[var(--color-background)] backdrop-blur-sm z-1" />

            {/* ===== Hero Text ===== */}
            <motion.div
                style={{ opacity }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-center px-6 mt-[30vh]"
            >
                <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-3">
                    KIDUS MESFIN
                </h1>
                <h2 className="text-2xl md:text-3xl text-cyan-400 font-heading mb-4">
                    Full-Stack Developer
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg font-body max-w-lg mx-auto mb-8">
                    Building digital experiences that{" "}
                    <span className="text-[var(--color-primary)] font-semibold">
            feel alive
          </span>.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[var(--color-primary)] text-white font-semibold px-8 py-3 rounded-[var(--radius-md)] shadow-lg"
                    onClick={() =>
                        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                    }
                >
                    Let’s Build Something →
                </motion.button>
            </motion.div>

            {/* ===== Scroll Cue ===== */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 text-[var(--color-text-secondary)] text-sm font-body z-10"
            >
                Scroll to explore ↓
            </motion.div>

            {/* ===== Next Section (About) ===== */}
            <motion.section
                style={{ opacity: aboutOpacity }}
                className="absolute top-[100vh] w-full min-h-screen flex flex-col items-center justify-center bg-[var(--color-surface)] z-10 px-6"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6 text-[var(--color-text-primary)]">
                    About Me
                </h2>
                <p className="max-w-2xl text-center text-[var(--color-text-secondary)] text-lg font-body leading-relaxed">
                    I’m a passionate Full-Stack Developer focused on creating performant,
                    aesthetic, and human-centered digital products. I merge clean design,
                    strong engineering, and intuitive UX to craft solutions that inspire
                    interaction and deliver impact.
                </p>
            </motion.section>

            {/* ===== Ambient Glow ===== */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{ duration: 1.5 }}
                className="absolute w-[600px] h-[600px] rounded-full bg-[var(--color-accent-gradient)] blur-[150px] opacity-40"
            />
        </section>
    );
}
