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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const techRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero parallax on scroll
            gsap.to(heroRef.current, {
                yPercent: 30,
                opacity: 0,
                filter: "blur(6px)",
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Sections reveal
            const sections = [techRef.current, projectsRef.current, contactRef.current];
            sections.forEach((section) => {
                if (!section) return;
                gsap.fromTo(section,
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            end: "top 60%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <Layout>
            <Head>
                <title>Kidus Mesfin | Software Engineer</title>
                <meta name="description" content="Portfolio of Kidus Mesfin — Full Stack Engineer building scalable, high-performance web applications." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div ref={mainRef} style={{ overflow: 'hidden', position: 'relative' }}>
                {/* Hero — Parallax wrapper */}
                <div ref={heroRef} style={{ position: 'relative', zIndex: 0, willChange: 'transform, opacity' }}>
                    <Hero />
                </div>

                {/* Content — Slides over hero */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div ref={techRef} style={{ willChange: 'transform' }}>
                        <TechStack />
                    </div>
                    <div ref={projectsRef} style={{ willChange: 'transform' }}>
                        <Projects />
                    </div>
                    <div ref={contactRef} style={{ willChange: 'transform' }}>
                        <Contact />
                    </div>
                </div>
            </div>
        </Layout>
    );
}