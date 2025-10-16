"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Layers, Zap, Github, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Logo from "@/public/Logo-2.png";

/* ----------------- Scroll Reveal Hook ----------------- */
const Reveal = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
      <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, delay }}
      >
        {children}
      </motion.div>
  );
};

/* ----------------- Main Page ----------------- */
export default function Home() {
  return (
      <ParallaxProvider>
        <main className="relative bg-[var(--color-background)] text-[var(--color-text-primary)] overflow-hidden">
          <Navbar />

          {/* ===== HERO SECTION ===== */}
          <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            <ParallaxBanner
                layers={[
                  {
                    image: "/hero-bg.jpg", // optional background image
                    speed: -20,
                  },
                  {
                    children: (
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white/80 to-white" />
                    ),
                  },
                ]}
                className="absolute inset-0 -z-10"
            />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 max-w-5xl mx-auto px-6"
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6">
                Bold. Efficient. <span className="text-[var(--color-primary)]">Reliable.</span>
              </h1>
              <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto mb-8">
                I build high-performance apps and interfaces that don’t just look good — they
                sprint. Powered by Next.js, Flutter, and Node.js.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    href="/projects"
                    className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg font-heading shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                >
                  Explore My Work <ArrowRight size={18} />
                </Link>
                <Link
                    href="/contact"
                    className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-heading hover:bg-[var(--color-primary)] hover:text-white transition-all"
                >
                  Let’s Collaborate
                </Link>
              </div>
            </motion.div>

            {/* Floating shapes */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute w-[600px] h-[600px] bg-[var(--color-accent-gradient)] rounded-full blur-[150px] opacity-30 -z-10"
            />
          </section>

          {/* ===== ABOUT / INTRO ===== */}
          <section className="relative py-32 container mx-auto px-6">
            <Reveal>
              <h2 className="text-4xl font-heading font-semibold text-center mb-12">
                Crafting seamless digital experiences
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="max-w-4xl mx-auto text-center text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  I combine strategy, design, and technology to build fast and scalable
                  products. From modern UIs to powerful backends, my process is about
                  delivering quality — efficiently.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: <Code2 size={28} />,
                  title: "Full-Stack Engineering",
                  desc: "End-to-end apps built with performance and scalability in mind.",
                },
                {
                  icon: <Layers size={28} />,
                  title: "UI / UX Systems",
                  desc: "Clean, accessible, and visually balanced interfaces that engage.",
                },
                {
                  icon: <Zap size={28} />,
                  title: "Automation & Optimization",
                  desc: "Delivering speed and precision through modern dev pipelines.",
                },
              ].map((s, i) => (
                  <Reveal key={s.title} delay={0.3 + i * 0.15}>
                    <div className="card bg-white/80 backdrop-blur-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-lg">
                        {s.icon}
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {s.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
              ))}
            </div>
          </section>

          {/* ===== PROJECTS ===== */}
          <section className="py-32 bg-[var(--color-surface)] relative overflow-hidden">
            <Reveal>
              <h2 className="text-4xl font-heading font-semibold text-center mb-12">
                Featured Projects
              </h2>
            </Reveal>
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, idx) => (
                  <Reveal delay={0.15 * idx} key={idx}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="card overflow-hidden relative group"
                    >
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg mb-4" />
                      <h4 className="font-heading font-semibold text-lg mb-2">
                        Project Title {idx + 1}
                      </h4>
                      <p className="text-[var(--color-text-secondary)] mb-3 text-sm">
                        Modern and efficient web app that delivers delightful user experience.
                      </p>
                      <Link
                          href="#"
                          className="text-[var(--color-primary)] font-medium flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        View Project <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </Reveal>
              ))}
            </div>

            {/* Parallax accent gradient */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 0.3, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-accent-gradient)] blur-[180px] opacity-20 -z-10"
            />
          </section>

          {/* ===== CTA ===== */}
          <section className="py-32 text-center container mx-auto px-6 relative">
            <Reveal>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-12 relative overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-accent-gradient)] blur-[120px] opacity-20"
                />
                <h3 className="text-3xl font-heading font-semibold mb-6">
                  Let’s build something <span className="text-[var(--color-primary)]">bold</span>.
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
                  Have a project, product idea, or just want to collaborate? Let’s create
                  something that stands out.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                      href="/contact"
                      className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-heading rounded-lg shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    Start a Project <ArrowRight size={18} />
                  </Link>
                  <a
                      href="mailto:hello@yourdomain.com"
                      className="font-heading text-[var(--color-primary)] hover:underline inline-flex items-center justify-center gap-2"
                  >
                    hello@yourdomain.com
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="py-10 border-t border-slate-200 bg-white/70 backdrop-blur-lg">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Image src={Logo} alt="Logo" width={36} height={36} />
                <div>
                  <h4 className="font-heading font-semibold">Kidus Mesfin</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Full-stack Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
                <a href="https://github.com/" className="hover:text-[var(--color-primary)]">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/" className="hover:text-[var(--color-primary)]">
                  <Linkedin size={18} />
                </a>
                <span className="text-sm">
                © {new Date().getFullYear()} Kidus — Crafted with precision ⚙️
              </span>
              </div>
            </div>
          </footer>
        </main>
      </ParallaxProvider>
  );
}
