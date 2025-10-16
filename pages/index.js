"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Layers,
  Server,
  Download,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Logo from "@/public/Logo-2.png";

/* -------------------------
  Motion helpers / variants
   ------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

/* -------------------------
  Sample data (replace later)
   ------------------------- */
const services = [
  {
    title: "Full-Stack Development",
    copy: "Next.js, Node.js, Firebase — fast, maintainable production apps.",
    icon: <Code size={28} />,
  },
  {
    title: "UI / UX & Design Systems",
    copy: "Minimal, accessible interfaces with a consistent motion system.",
    icon: <Layers size={28} />,
  },
  {
    title: "Performance & Delivery",
    copy: "Optimized builds, CI-friendly, and observability-first development.",
    icon: <Server size={28} />,
  },
];

const projects = [
  {
    title: "StreamSynx (Flutter)",
    description: "A media streaming app with social sharing and recommendations.",
    href: "/projects/streamsynx",
  },
  {
    title: "Portfolio Revamp",
    description: "This very portfolio — Next + Tailwind + Framer Motion.",
    href: "/projects/portfolio",
  },
  {
    title: "TaskFlow",
    description: "Collaborative task manager with realtime sync.",
    href: "/projects/taskflow",
  },
];

/* -------------------------
  Page Component
   ------------------------- */
export default function HomePage() {
  return (
      <main className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 pt-20"
        >
          <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="z-10 max-w-4xl"
          >
            <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-spacegrotesk font-bold leading-tight mb-4"
            >
              Building <span className="glow-text">bold</span>, efficient, and
              <br />
              reliable digital experiences.
            </motion.h1>

            <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 font-inter"
            >
              I design and develop fast, scalable, and beautiful applications
              using Flutter, Next.js, Node.js, and Firebase — with focus on
              performance and delivery.
            </motion.p>

            <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/projects" className="btn inline-flex items-center gap-2">
                See my work <ArrowRight size={16} />
              </Link>

              <Link
                  href="/contact"
                  className="font-inter font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-all"
              >
                Let’s build together
              </Link>
            </motion.div>
          </motion.div>

          {/* Decorative floating panel / soft hero visual */}
          <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 0.45, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="pointer-events-none absolute -bottom-12 md:-bottom-20 w-[92%] max-w-3xl h-[260px] md:h-[340px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-[var(--shadow-soft)] blur-2xl"
          />
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 container">
          <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="section-title"
          >
            What I Do
          </motion.h2>

          <motion.div
              initial="hidden"
              whileInView="show"
              variants={stagger}
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mt-8"
          >
            {services.map((s, i) => (
                <motion.article
                    key={s.title}
                    variants={fadeUp}
                    className="card bg-[var(--color-surface)] p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-subtle)]">
                      <span className="text-[var(--color-primary)]">{s.icon}</span>
                    </div>
                    <h3 className="font-spacegrotesk font-semibold text-lg">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{s.copy}</p>
                </motion.article>
            ))}
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 container">
          <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="section-title"
          >
            Selected Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {projects.map((p, idx) => (
                <motion.div
                    key={p.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    className="card p-5 rounded-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-spacegrotesk font-semibold">{p.title}</h4>
                      <p className="text-[var(--color-text-secondary)] mt-2">
                        {p.description}
                      </p>
                    </div>
                    <Link
                        href={p.href}
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium"
                    >
                      View <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/projects" className="btn inline-flex items-center gap-2">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* QUICK RESUME / CTA */}
        <section id="resume" className="py-20">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="card p-6"
            >
              <h3 className="font-spacegrotesk font-semibold text-xl mb-2">
                Quick Resume
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Years building production apps with a strong focus on performance,
                UX and delivery.
              </p>
              <div className="flex gap-3">
                <a
                    href="/resume.pdf"
                    className="btn inline-flex items-center gap-2"
                    download
                >
                  Download Resume <Download size={16} />
                </a>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)]"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="p-6"
            >
              <ul className="grid grid-cols-2 gap-4">
                <li className="card p-4">
                  <div className="text-sm text-[var(--color-text-secondary)]">Years</div>
                  <div className="font-spacegrotesk font-semibold text-2xl">4+</div>
                </li>
                <li className="card p-4">
                  <div className="text-sm text-[var(--color-text-secondary)]">Projects</div>
                  <div className="font-spacegrotesk font-semibold text-2xl">12+</div>
                </li>
                <li className="card p-4">
                  <div className="text-sm text-[var(--color-text-secondary)]">Stack</div>
                  <div className="font-spacegrotesk font-semibold text-2xl">Next • Flutter</div>
                </li>
                <li className="card p-4">
                  <div className="text-sm text-[var(--color-text-secondary)]">Availability</div>
                  <div className="font-spacegrotesk font-semibold text-2xl">Open</div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="py-20 container">
          <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl bg-[var(--color-surface)] p-8 shadow-[var(--shadow-soft)] grid md:grid-cols-2 gap-6 items-center"
          >
            <div>
              <h3 className="font-spacegrotesk font-semibold text-2xl mb-2">
                Let’s build something fast and reliable.
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Tell me about your product idea, timeline, or the problem you want to solve.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Link
                  href="/contact"
                  className="btn inline-flex items-center gap-2"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <a
                  href="mailto:hello@yourdomain.com"
                  className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)]"
              >
                <Mail size={16} /> hello@yourdomain.com
              </a>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-8">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="logo" width={36} height={36} />
              <div>
                <div className="font-spacegrotesk font-semibold">Kidus Mesfin</div>
                <div className="text-[var(--color-text-secondary)] text-sm">Full-stack Developer</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/" aria-label="github" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/" aria-label="linkedin" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                <Linkedin size={18} />
              </a>
              <div className="text-sm text-[var(--color-text-secondary)]">
                © {new Date().getFullYear()} Kidus — I usually reply faster than your build finishes.
              </div>
            </div>
          </div>
        </footer>
      </main>
  );
}