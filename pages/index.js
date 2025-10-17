"use client";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Sphere,
    MeshDistortMaterial,
    Environment,
    PerspectiveCamera,
    Float,
} from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Code, Feather, Zap } from "lucide-react";
import * as THREE from "three";

/* ============================
   PORTAL SCENE (smooth parallax)
   ============================ */
function PortalScene({ scrollMV }) {
    // scrollMV is a Framer Motion value (motion value / spring)
    const sphereRef = useRef();
    const { camera, mouse } = useThree();

    // Derived transforms from the motion value
    const sphereScale = useTransform(scrollMV, [0, 0.35, 0.6], [1, 1.8, 45]); // strong scale when scrolling deeper
    const camZ = useTransform(scrollMV, [0, 0.5], [6, 1.2]); // camera moves in
    const emissiveIntensity = useTransform(scrollMV, [0, 0.35, 0.5], [0.6, 3.0, 0.4]);

    // Local refs for smooth lerping
    const camTarget = useRef(new THREE.Vector3(0, 0, 0));
    const pos = useRef(new THREE.Vector3(0, 0, 6));
    const lerpSpeed = 0.08; // adjust for smoother or snappier movement

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Make sphere subtly breathe / distort
        if (sphereRef.current) {
            const scaleVal = sphereScale.get();
            sphereRef.current.scale.set(scaleVal, scaleVal, scaleVal);

            // animate distort slightly
            const baseDistort = 0.25;
            sphereRef.current.material.distort = baseDistort + Math.sin(t * 1.2) * 0.04;
            sphereRef.current.material.emissiveIntensity = emissiveIntensity.get();
        }

        // Smooth camera movement: follow mouse a bit and use camZ
        const targetX = mouse.x * 0.8;
        const targetY = -mouse.y * 0.6;
        const targetZ = camZ.get();

        // lerp camera position towards target
        pos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), lerpSpeed);
        camera.position.copy(pos.current);

        // gentle lookAt center with small offset
        camTarget.current.lerp(new THREE.Vector3(0, 0, 0), lerpSpeed);
        camera.lookAt(camTarget.current);
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[0, 0, 8]} intensity={2.2} color={"#60A5FA"} />
            <Sphere ref={sphereRef} args={[1.6, 128, 128]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color={"#0ea5e9"} // cyan-blue that pops against dark
                    emissive={"#075985"}
                    emissiveIntensity={1}
                    roughness={0.12}
                    metalness={0.35}
                    speed={1.8}
                />
            </Sphere>
            <Environment preset="city" />
        </>
    );
}

/* ============================
   Tech Icons (interactive)
   ============================ */
function TechIconsScene() {
    const groupRef = useRef();
    const { mouse } = useThree();

    useFrame(() => {
        if (!groupRef.current) return;
        // Smooth rotate toward mouse; smaller multipliers for subtlety
        const rotYTarget = mouse.x * 0.35;
        const rotXTarget = -mouse.y * 0.25;
        groupRef.current.rotation.y += (rotYTarget - groupRef.current.rotation.y) * 0.06;
        groupRef.current.rotation.x += (rotXTarget - groupRef.current.rotation.x) * 0.06;
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6} >
                <mesh position={[-1, 0.5, 0]}>
                    <icosahedronGeometry args={[0.65, 0]} />
                    <meshStandardMaterial color={"#60A5FA"} roughness={0.1} metalness={0.85} />
                </mesh>
            </Float>

            <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.7} >
                <mesh position={[1, -0.3, 0]}>
                    <boxGeometry args={[0.95, 0.95, 0.95]} />
                    <meshStandardMaterial color={"#06b6d4"} roughness={0.08} metalness={0.5} />
                </mesh>
            </Float>

            <Float speed={1.9} rotationIntensity={1.1} floatIntensity={0.5} >
                <mesh position={[0, -0.6, -0.8]}>
                    <torusKnotGeometry args={[0.36, 0.12, 128, 16]} />
                    <meshStandardMaterial color={"#ffffff"} roughness={0.05} metalness={0.9} />
                </mesh>
            </Float>
        </group>
    );
}

/* ============================
   Main Page
   ============================ */
export default function HomePage() {
    // container to measure scroll range
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // spring for smoothness
    const scrollSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 22, restDelta: 0.0005 });

    // Hero transforms
    const heroOpacity = useTransform(scrollSpring, [0, 0.22], [1, 0]);
    const heroY = useTransform(scrollSpring, [0, 0.3], ["0%", "-35%"]);

    // About scene reveal
    const aboutOpacity = useTransform(scrollSpring, [0.38, 0.48, 0.62], [0, 0.8, 1]);
    const aboutY = useTransform(scrollSpring, [0.38, 0.6], ["8%", "0%"]);

    // Portal gets the spring motion value directly for internal transforms
    const portalMV = scrollSpring;

    // Stagger variants for about children
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const coreSkills = [
        { icon: <Zap size={18} />, text: "Performance" },
        { icon: <Code size={18} />, text: "Scalability" },
        { icon: <Feather size={18} />, text: "UX / UI" },
    ];

    // Ensure body / html don't show a conflicting background — we keep page sections self-contained
    useEffect(() => {
        // nothing destructive here, but you could set body background if needed
    }, []);

    return (
        <main ref={containerRef} className="relative w-full min-h-[300vh] bg-transparent overflow-x-hidden">
            {/* Fixed Canvas for Portal (visual layer) */}
            <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none">
                <Canvas gl={{ antialias: true }} linear>
                    {/* Camera controlled in PortalScene */}
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
                    <Suspense fallback={null}>
                        <PortalScene scrollMV={portalMV} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Sticky viewport that holds hero then about — both are screen-sized 'slides' */}
            <div className="sticky top-0 h-screen w-full z-20">
                {/* HERO */}
                <motion.section
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="h-full flex items-center justify-center text-center relative z-30"
                >
                    {/* subtle darkened overlay to let Portal pop */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-transparent pointer-events-none" />

                    <div className="relative px-6 max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100"
                        >
                            KIDUS MESFIN
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35 }}
                            className="text-2xl md:text-4xl mt-4 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400"
                        >
                            Full-Stack Developer
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.55 }}
                            className="mt-6 text-lg max-w-2xl mx-auto text-slate-300"
                        >
                            Building bold, efficient, and reliable digital experiences.
                        </motion.p>
                    </div>
                </motion.section>

                {/* ABOUT — dark, distinct environment, unfolds in */}
                <motion.section
                    style={{ opacity: aboutOpacity, y: aboutY }}
                    className="absolute inset-0 h-full z-40 flex items-center justify-center pointer-events-auto"
                >
                    {/* The dark panel that "slides in" to create the distinct environment */}
                    <motion.div
                        initial={{ x: "8%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-6xl mx-auto px-6 py-12 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                        >
                            {/* Left: interactive 3D visual */}
                            <motion.div variants={itemVariants} className="w-full h-80 md:h-96 lg:h-[520px] bg-transparent rounded-lg overflow-hidden">
                                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                                    <ambientLight intensity={0.9} />
                                    <directionalLight position={[5, 5, 5]} intensity={1.2} color={"#60A5FA"} />
                                    <Suspense fallback={null}>
                                        <TechIconsScene />
                                    </Suspense>
                                </Canvas>
                            </motion.div>

                            {/* Right: text content */}
                            <motion.div variants={itemVariants} className="text-left">
                                <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                                    I don't just build apps — I forge solutions.
                                </motion.h2>

                                <motion.p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    I'm a developer obsessed with performance and minimalist design. My goal is to create fast, scalable, and delightful products that blend futuristic aesthetics with rock-solid reliability.
                                </motion.p>

                                <motion.div className="grid grid-cols-3 gap-4 mb-8 text-slate-200">
                                    {coreSkills.map((s) => (
                                        <div key={s.text} className="flex flex-col items-center gap-2 p-3 bg-slate-800/40 rounded-lg border border-slate-700">
                                            {s.icon}
                                            <span className="font-medium text-sm">{s.text}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.a
                                    href="mailto:your.email@example.com"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
                                >
                                    Let's Collaborate <ArrowRight size={16} />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </div>

            {/* Spacer content so scrolling actually passes through both slides */}
            <div className="h-[120vh]" />
        </main>
    );
}
