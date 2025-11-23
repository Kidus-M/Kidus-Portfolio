"use client";
import { useEffect, useRef } from "react";
import Head from "next/head";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
    // References for our specific sections to animate
    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const techRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        // 1. Register GSAP Plugin
        gsap.registerPlugin(ScrollTrigger);

        // Context makes sure we clean up animations when the component unmounts
        let ctx = gsap.context(() => {

            // --- ANIMATION 1: HERO PARALLAX ---
            // The hero moves down slower than the scroll (yPercent: 50)
            // and fades out/blurs. This creates depth.
            gsap.to(heroRef.current, {
                yPercent: 50,
                opacity: 0,
                filter: "blur(10px)",
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true, // Links animation directly to scrollbar (no duration)
                },
            });

            // --- ANIMATION 2: SECTIONS FLOATING UP (The "Awwwards" Reveal) ---
            // We utilize a loop or specific targets to give them a "heavy" float effect
            const sections = [techRef.current, projectsRef.current, contactRef.current];

            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power3.out", // Strong ease out for luxury feel
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%", // Starts when top of section hits 85% of viewport
                            end: "top 60%",
                            toggleActions: "play none none reverse", // Plays on enter, reverses on leave
                        },
                    }
                );
            });

            // --- OPTIONAL: BACKGROUND COLOR SHIFT ---
            // Changes background color subtly as you hit the Projects section
            // Note: This assumes your Layout accepts className or you have global CSS.
            // If not, this part just won't run visually but won't break anything.
            gsap.to("body", {
                backgroundColor: "#0a0a0a", // Darkens background
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play reverse play reverse",
                }
            });

        }, mainRef);

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        <Layout>
            <Head>
                <title>Kidus Mesfin | Software Engineer</title>
                <meta
                    name="description"
                    content="Portfolio of Kidus Mesfin - Full Stack Engineer"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            {/* Main Wrapper for GSAP Context */}
            <div ref={mainRef} className="overflow-hidden relative">

                {/* HERO WRAPPER */}
                <div ref={heroRef} className="relative z-0">
                    <Hero />
                </div>

                {/* CONTENT WRAPPER (Higher Z-Index to slide over hero) */}
                <div className="relative z-10 bg-inherit">

                    {/* TECH STACK */}
                    <div ref={techRef} className="will-change-transform">
                        <TechStack />
                    </div>

                    {/* PROJECTS */}
                    {/*<div ref={projectsRef} className="will-change-transform">*/}
                        <Projects />
                    {/*</div>*/}

                    {/* CONTACT */}
                    <div ref={contactRef} className="will-change-transform ">
                        <Contact />
                    </div>
                </div>

            </div>
        </Layout>
    );
}