import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { RevealLine } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { ScrollTrigger } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1];

/** Per-project accent, so moving down the list visibly changes the stage. */
const ACCENTS = {
  maru: "#c8f135",
  orit: "#e8b44a",
  oz: "#ff7a52",
  prospect: "#7cc6fe",
  stream: "#b79cff",
  lendloop: "#ff9ec4",
  recruit: "#ff6b6b",
  quant: "#ffd166",
  prepx: "#6ee7b7",
  andro: "#ede8de",
};

/** What a visitor is looking for, not how the projects were built. */
const FILTERS = [
  { key: "selected", label: "Selected", match: (project) => project.featured },
  { key: "web", label: "Web", match: (project) => project.areas.includes("web") },
  { key: "mobile", label: "Mobile", match: (project) => project.areas.includes("mobile") },
  { key: "ai", label: "AI & data", match: (project) => project.areas.includes("ai") },
  { key: "desktop", label: "Desktop & games", match: (project) => project.areas.includes("desktop") },
  { key: "all", label: "All", match: () => true },
];

const accentOf = (project) => ACCENTS[project.visual?.theme] ?? "#c8f135";
const repoOf = (project) => project.links?.find((link) => link.kind === "github");
const liveOf = (project) => project.links?.find((link) => link.kind === "live");

/** Live links carry longer labels in the case study; rows only have room for one word. */
const shortLabel = (link) => (/live|web/i.test(link.label) ? "Live" : link.label);

export default function Work() {
  const [filter, setFilter] = useState("selected");
  const [activeId, setActiveId] = useState(projects[0].id);
  const [openProject, setOpenProject] = useState(null);
  const sectionRef = useRef(null);
  const lenis = useLenis();

  const visible = useMemo(
    () => projects.filter(FILTERS.find((item) => item.key === filter).match),
    [filter]
  );
  const active = visible.find((project) => project.id === activeId);

  const chooseFilter = (key) => {
    setFilter(key);
    setActiveId(projects.find(FILTERS.find((item) => item.key === key).match).id);
  };

  /* Sections below use ScrollTrigger, so their offsets move when this one changes height. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let timer;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
    });
    observer.observe(section);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

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
    <section id="work" className="work" ref={sectionRef}>
      <div className="shell">
        <div className="work-head">
          <span className="label">(03) &mdash; Work</span>
          <h2 className="section-title">
            <RevealLine>Systems I</RevealLine>
            <RevealLine delay={0.08}>
              <em>shipped.</em>
            </RevealLine>
          </h2>
          <p className="section-lede">
            Ten picks from {projects.length} projects, with the code or the live site one click away.
          </p>
        </div>

        <div className="work-filters" role="group" aria-label="Filter projects by kind of work">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.key}
              className="work-filter"
              aria-pressed={filter === item.key}
              onClick={() => chooseFilter(item.key)}
            >
              {item.label}
              <span>{projects.filter(item.match).length}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} projects
        </p>

        <div className="index">
          <div>
            <ul className="index-list" key={filter}>
              {visible.map((project) => (
                <IndexRow
                  key={project.id}
                  project={project}
                  isActive={project.id === active?.id}
                  onActivate={() => setActiveId(project.id)}
                  onToggle={() => setActiveId(project.id === active?.id ? null : project.id)}
                  onOpen={() => setOpenProject(project)}
                />
              ))}
            </ul>

            {filter !== "all" && (
              <button type="button" className="link-button index-more" onClick={() => chooseFilter("all")}>
                See all {projects.length} projects
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          <Stage active={active ?? visible[0]} onOpen={setOpenProject} />
        </div>
      </div>

      <AnimatePresence>
        {openProject && <CaseOverlay project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}

function IndexRow({ project, isActive, onActivate, onToggle, onOpen }) {
  const repo = repoOf(project);
  const live = liveOf(project);

  /* Wide layouts preview on hover and open on click; touch layouts expand the row in place. */
  const onClick = () => {
    if (window.matchMedia("(min-width: 1000px)").matches) onOpen();
    else onToggle();
  };

  return (
    <li
      className={clsx("index-row", isActive && "is-active")}
      style={{ "--card-accent": accentOf(project) }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate();
      }}
    >
      <button
        type="button"
        className="index-row-main"
        onClick={onClick}
        onFocus={(event) => {
          if (event.target.matches(":focus-visible")) onActivate();
        }}
        data-cursor-label="Open case"
      >
        <span className="index-title">{project.title}</span>
        <span className="index-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </span>
      </button>

      {(live || repo) && (
        <div className="index-links">
          {live && (
            <a href={live.href} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${live.label}`}>
              <ArrowUpRight size={14} aria-hidden="true" />
              {shortLabel(live)}
            </a>
          )}
          {repo && (
            <a href={repo.href} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}>
              <Github size={14} aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      )}

      {isActive && (
        <div className="index-inline">
          <div className="stage-frame">
            <div className="stage-layer is-current">
              <StageVisual project={project} sizes="100vw" />
            </div>
          </div>
          <StageCaption project={project} onOpen={onOpen} />
        </div>
      )}
    </li>
  );
}

/** Stays in view beside the list on wide layouts. Hidden below 1000px, where rows expand instead. */
function Stage({ active, onOpen }) {
  return (
    <aside className="stage" style={{ "--card-accent": accentOf(active) }} aria-label={`${active.title} preview`}>
      <div className="stage-frame">
        {projects.map((project) => (
          <div
            key={project.id}
            className={clsx("stage-layer", project.id === active.id && "is-current")}
            aria-hidden={project.id !== active.id}
          >
            <StageVisual project={project} sizes="(max-width: 1000px) 1px, 48vw" />
          </div>
        ))}
      </div>
      <StageCaption project={active} onOpen={() => onOpen(active)} />
    </aside>
  );
}

function StageVisual({ project, sizes }) {
  if (project.image) {
    const contained = project.preview === "logo" || project.preview === "mobile";
    return (
      <Image
        src={project.image}
        alt=""
        sizes={sizes}
        className={clsx("stage-image", contained && "is-contained")}
      />
    );
  }

  if (project.visual) return <SystemPreview project={project} />;

  return (
    <div className="stage-tile">
      <span className="label">{project.type}</span>
      <strong>{project.title}</strong>
    </div>
  );
}

function StageCaption({ project, onOpen }) {
  return (
    <div className="stage-caption">
      <p>{project.description}</p>
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
  );
}

function SystemPreview({ project }) {
  const { visual, title } = project;

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

function CaseOverlay({ project, onClose }) {
  const contained = project.preview === "logo" || project.preview === "mobile";

  return (
    <motion.div
      className="case"
      style={{ "--card-accent": accentOf(project) }}
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
              {project.type} &middot; {project.year}
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
            <div className={clsx("case-shot", contained && "is-contained")}>
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
