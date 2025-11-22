"use client"
import Head from 'next/head';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

// --- Reusable Component for 3D Section Reveal ---
// This creates that "tilting up" effect seen on Awwwards sites
function SectionReveal({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 30, scale: 0.9 }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 1.5 // Slow, cinematic duration
                }
            }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ perspective: 1000 }} // Adds the 3D depth
        >
            {children}
        </motion.div>
    );
}

export default function Home() {
    // 1. Setup Scroll Hooks for the Hero Parallax
    const { scrollY } = useScroll();

    // 2. Create "Smooth" values so it doesn't jitter
    const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // 3. Hero Transformations based on scroll position
    // As you scroll 0px to 500px:
    // - y moves down slowly (parallax)
    // - opacity fades out
    // - scale shrinks slightly (depth)
    // - blur increases
    const heroY = useTransform(scrollYSpring, [0, 500], [0, 200]);
    const heroOpacity = useTransform(scrollYSpring, [0, 400], [1, 0]);
    const heroScale = useTransform(scrollYSpring, [0, 500], [1, 0.9]);
    const heroBlur = useTransform(scrollYSpring, [0, 500], ["0px", "10px"]);

    return (
        <Layout>
            <Head>
                <title>Kidus Mesfin | Software Engineer</title>
                <meta name="description" content="Portfolio of Kidus Mesfin - Full Stack Engineer"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>

            {/* HERO SECTION: Parallax & Blur Effect */}
            {/* We wrap it in a relative div to contain the absolute positioning effects if needed,
                but here we apply transforms directly */}
            <motion.div
                style={{
                    y: heroY,
                    opacity: heroOpacity,
                    scale: heroScale,
                    filter: heroBlur,
                    zIndex: 0,
                    position: 'relative'
                }}
            >
                <Hero/>
            </motion.div>

            {/* CONTENT SECTIONS: Need a higher z-index to scroll OVER the fading hero */}
            <div className="relative z-10 bg-inherit">

                {/* TECH STACK: 3D Tilt Reveal */}
                <SectionReveal>
                    <TechStack/>
                </SectionReveal>

                {/* PROJECTS: 3D Tilt Reveal */}
                <SectionReveal>
                    <Projects/>
                </SectionReveal>

                {/* CONTACT: Simple elegant rise */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } // Custom Bezier for "luxury" feel
                    }}
                    viewport={{ once: true }}
                >
                    <Contact/>
                </motion.div>
            </div>

        </Layout>
    );
}