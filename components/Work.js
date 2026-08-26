import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { RevealLine } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { gsap, prefersReducedMotion, ScrollTrigger, useGsapScope, useMediaQuery } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1];

/** Per-project accent, so the rail reads as a spectrum rather than one colour. */
const ACCENTS = {
  maru: "#c8f135",
  orit: "#e8b44a",
  oz: "#ff7a52",
  prospect: "#7cc6fe",
  stream: "#b79cff",
  prepx: "#6ee7b7",
  andro: "#ede8de",
};

const featured = projects.filter((project) => project.featured);
const archive = projects.filter((project) => !project.featured);

export default function Work() {
  const [openProject, setOpenProject] = useState(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const isWide = useMediaQuery("(min-width: 1000px)");
  const lenis = useLenis();

  /* Pinned horizontal rail: vertical scroll drives the track sideways. */
  useGsapScope(
    () => {
      const track = trackRef.current;
      if (!track || !isWide) return;

      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const rail = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: railRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Each preview drifts inside its frame as the rail carries it past. */
      gsap.utils.toArray(".work-card-visual").forEach((frame) => {
        gsap.fromTo(
          frame.querySelector(".work-card-inner"),
          { xPercent: -3.5 },
          {
            xPercent: 3.5,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: rail,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    },
    railRef,
    [isWide]
  );

  useEffect(() => {
    if (!lenis) return undefined;
    if (openProject) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [openProject, lenis]);

  useEffect(() => {
    if (!openProject) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpenProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProject]);

  return (
    <section id="work" className="work">
      <div className="shell work-head">
        <span className="label">(03) &mdash; Selected work</span>
        <h2 className="section-title">
          <RevealLine>Systems I</RevealLine>
          <RevealLine delay={0.08}>
            <em>shipped.</em>
          </RevealLine>
        </h2>
        <p className="section-lede">
          Seven builds where I owned the architecture, the interface, and the release.
          {isWide ? " Scroll to move sideways." : ""}
        </p>
      </div>

      <div className="work-rail" ref={railRef}>
        <div className="work-track" ref={trackRef}>
          {featured.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              total={featured.length}
              onOpen={() => setOpenProject(project)}
            />
          ))}

          <div className="work-end">
            <span className="label">End of rail</span>
            <p>
              More in the <a href="#work-archive">archive</a>.
            </p>
          </div>
        </div>
      </div>

      <Archive onOpen={setOpenProject} />

      <AnimatePresence>
        {openProject && <CaseOverlay project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}

function WorkCard({ project, index, total, onOpen }) {
  const accent = ACCENTS[project.visual?.theme] ?? "#c8f135";

  return (
    <article className="work-card" style={{ "--card-accent": accent }}>
      <button
        type="button"
        className="work-card-visual"
        onClick={onOpen}
        data-cursor-label="Open case"
        aria-label={`Open case study: ${project.title}`}
      >
        <span className="work-card-inner">
          <SystemPreview project={project} />
        </span>
      </button>

      <div className="work-card-meta">
        <div className="work-card-top">
          <span className="work-card-index">
            {project.id} <i>/ {String(total).padStart(2, "0")}</i>
          </span>
          <span className="label">{project.year}</span>
        </div>

        <h3 className="work-card-title">{project.title}</h3>
        <span className="work-card-type">{project.type}</span>
        <p className="work-card-body">{project.description}</p>
        {project.role && <p className="work-card-role">{project.role}</p>}

        <div className="chip-row">
          {project.tech.slice(0, 4).map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>

        <button type="button" className="link-button" onClick={onOpen}>
          Read the case
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function SystemPreview({ project }) {
  const { visual, title } = project;
  if (!visual) return null;

  return (
    <div className="preview">
      <div className="preview-top">
        <span>{visual.label}</span>
        <span className="preview-status">
          <i aria-hidden="true" />
          {visual.status}
        </span>
      </div>

      <p className="preview-headline">{visual.headline}</p>

      <div className="preview-flow" aria-label={`${title} flow`}>
        {visual.steps.map((step, index) => (
          <Fragment key={step}>
            <span>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {step}
            </span>
            {index < visual.steps.length - 1 && <i aria-hidden="true" />}
          </Fragment>
        ))}
      </div>

      <div className="preview-modules">
        {visual.modules.map((module) => (
          <div key={module.label}>
            <span>{module.label}</span>
            <strong>{module.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Text index whose hovered row throws a preview image at the cursor. */
function Archive({ onOpen }) {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const preview = previewRef.current;
    const list = listRef.current;
    if (!preview || !list) return undefined;
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined;

    const moveX = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const moveY = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="shell archive" id="work-archive">
      <div className="archive-head">
        <span className="label">(04) &mdash; Archive</span>
        <p>Earlier builds, side projects, and systems that still run.</p>
      </div>

      <div className="archive-list" ref={listRef} onMouseLeave={() => setHovered(null)}>
        {archive.map((project) => (
          <button
            type="button"
            className="archive-row"
            key={project.id}
            onMouseEnter={() => setHovered(project)}
            onFocus={() => setHovered(project)}
            onBlur={() => setHovered(null)}
            onClick={() => onOpen(project)}
            data-cursor-label="Open"
          >
            <span className="archive-index">{project.id}</span>
            <span className="archive-title">{project.title}</span>
            <span className="archive-type">{project.type}</span>
            <span className="archive-year">{project.year}</span>
            <span className="archive-arrow" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>

      <div className={"archive-preview" + (hovered ? " is-visible" : "")} ref={previewRef} aria-hidden="true">
        <div className="archive-preview-inner">
          {archive.map((project) => (
            <Image
              key={project.id}
              src={project.image}
              alt=""
              className={hovered?.id === project.id ? "is-current" : undefined}
              sizes="280px"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseOverlay({ project, onClose }) {
  const accent = ACCENTS[project.visual?.theme] ?? "#c8f135";

  return (
    <motion.div
      className="case"
      style={{ "--card-accent": accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button type="button" className="case-scrim" onClick={onClose} aria-label="Close case study" />

      <motion.div
        className="case-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ y: "6%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "4%", opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <header className="case-head">
          <div>
            <span className="label">
              {project.id} &mdash; {project.type} &middot; {project.year}
            </span>
            <h3 id="case-title">{project.title}</h3>
            {project.role && <p className="case-role">{project.role}</p>}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close case study">
            <X size={18} />
          </button>
        </header>

        <div className="case-body">
          {project.image && (
            <div className="case-shot">
              <Image src={project.image} alt={`${project.title} preview`} sizes="(max-width: 960px) 100vw, 860px" />
            </div>
          )}

          <p className="case-lede">{project.description}</p>

          {project.highlights && (
            <ol className="case-highlights">
              {project.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {highlight}
                </li>
              ))}
            </ol>
          )}

          <div className="case-meta">
            <div>
              <span className="label">Stack</span>
              <div className="chip-row">
                {project.tech.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {project.links?.length > 0 && (
              <div>
                <span className="label">Links</span>
                <div className="case-links">
                  {project.links.map((link) => (
                    <a key={link.label + link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.kind === "github" ? <Github size={15} /> : <ArrowUpRight size={15} />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
