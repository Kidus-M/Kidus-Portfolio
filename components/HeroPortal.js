// components/HeroPortal.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls, Float, Sparkles, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function PortalScene() {
    const meshRef = useRef();
    const textRef = useRef();
    const sparklesRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
            meshRef.current.rotation.y += 0.005;
        }
        if (textRef.current) {
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FFFF" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#B08D57" />

            {/* Portal Ring */}
            <mesh ref={meshRef} rotation={[0, 0, 0]}>
                <torusGeometry args={[3, 0.2, 16, 100]} />
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
            </mesh>

            {/* Floating Particles */}
            <Sparkles ref={sparklesRef} count={100} scale={8} size={2} speed={0.3} color="#00FFFF" />
            <Sparkles count={50} scale={6} size={3} speed={0.2} color="#B08D57" />

            {/* 3D Text */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text3D
                    ref={textRef}
                    font="/fonts/Space Grotesk_Bold.json"
                    scale={0.8}
                    position={[0, 0, 0]}
                    curveSegments={32}
                    bevelEnabled
                    bevelSize={0.02}
                    bevelThickness={0.1}
                    height={0.2}
                    lineHeight={0.8}
                    letterSpacing={0.05}
                >
                    KIDUS MESFIN
                    <meshStandardMaterial
                        color="#FFFFFF"
                        emissive="#00FFFF"
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Text3D>
            </Float>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

export default function HeroPortal() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={containerRef} className="relative h-screen bg-[#0D0D10] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D10] via-[#1A1A2E] to-[#16213E]" />

            {/* 3D Canvas */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <PortalScene />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
                <motion.div
                    className="text-center px-4"
                    style={{ opacity, scale, y }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl font-light text-cyan-400 mb-4 tracking-widest"
                    >
                        WEB DEVELOPER
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        Crafting digital experiences that feel alive
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 1 }}
                        onClick={scrollToAbout}
                        className="px-8 py-4 border border-cyan-400/50 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore my work
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
                    <motion.div
                        className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}