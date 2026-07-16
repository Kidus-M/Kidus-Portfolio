import { Fragment } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const projectThemes = [
  { backgroundColor: "#351014", color: "#f5eee8" },
  { backgroundColor: "#c8f135", color: "#080808" },
  { backgroundColor: "#0b0b0b", color: "#f0ede8" },
  { backgroundColor: "#151515", color: "#f0ede8" },
  { backgroundColor: "#f0ede8", color: "#080808" },
  { backgroundColor: "#c8f135", color: "#080808" },
];

function ProjectLinks({ links = [], compact = false }) {
  if (!links.length) return null;

  return (
    <div className={"project-links" + (compact ? " is-compact" : "")}>
      {links.map((link) => (
        <a key={link.label + link.href} href={link.href} target="_blank" rel="noreferrer">
          {link.kind === "github" && <Github size={16} />}
          {link.label}
          {link.kind !== "github" && <ArrowUpRight size={16} />}
        </a>
      ))}
    </div>
  );
}

function SystemPreview({ project }) {
  const { visual } = project;

  return (
    <div
      className={"project-system-preview theme-" + visual.theme + (project.mark ? " has-mark" : "")}
      aria-label={project.title + ": " + visual.headline}
    >
      {project.mark && (
        <div className="system-preview-mark" aria-hidden="true">
          <Image src={project.mark} alt="" fill sizes="140px" />
        </div>
      )}
      <div className="system-preview-top">
        <span>{visual.label}</span>
        <span className="system-preview-status"><i />{visual.status}</span>
      </div>

      <div className="system-preview-copy">
        <span>{project.id}</span>
        <h4>{visual.headline}</h4>
      </div>

      <div className="system-preview-flow" aria-label="Product flow">
        {visual.steps.map((step, index) => (
          <Fragment key={step}>
            <span><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>
            {index < visual.steps.length - 1 && <i aria-hidden="true" />}
          </Fragment>
        ))}
      </div>

      <div className="system-preview-modules">
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

function ArchiveCard({ project }) {
  return (
    <article className="archive-project-card">
      <div className={"archive-project-media is-" + (project.preview || "website")} data-cursor="view">
        <span>{project.id}</span>
        <Image
          src={project.image}
          alt={project.title + " project preview"}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>

      <div className="archive-project-meta">
        <span>{project.type}</span>
        <time>{project.year}</time>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.tech.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
      </div>
      <ProjectLinks links={project.links} compact />
    </article>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="projects-section">
      <FlowArt aria-label="Selected project case studies" className="project-flow">
        {featuredProjects.map((project, index) => {
          const theme = projectThemes[index % projectThemes.length];
          const isLight = theme.color === "#080808";

          return (
            <FlowSection
              key={project.id}
              aria-label={project.title}
              className="project-flow-section"
              style={theme}
            >
              <div className="project-flow-heading">
                <span className="section-number">{index === 0 ? "05" : project.id}</span>
                <span className="section-kicker">{index === 0 ? "Selected systems" : project.type}</span>
              </div>

              <article className={"project-flow-card" + (index % 2 ? " is-reversed" : "")}>
                <div className="project-flow-media has-system-preview" data-cursor="view">
                  <span className="project-watermark">{project.id}</span>
                  <SystemPreview project={project} />
                </div>

                <div className="project-info project-flow-info">
                  <span className="project-number">{project.id}</span>
                  <h3>{project.title}</h3>
                  <div className="project-case-meta">
                    <span>{project.role}</span>
                    <time>{project.year}</time>
                  </div>
                  <p>{project.description}</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="tag-row">
                    {project.tech.map((tag) => (
                      <span className={"tech-tag" + (isLight ? " is-light" : "")} key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ProjectLinks links={project.links} />
                </div>
              </article>
            </FlowSection>
          );
        })}
      </FlowArt>

      <section className="project-archive" aria-labelledby="project-archive-title">
        <div className="project-archive-heading">
          <div>
            <span className="section-kicker">Also shipped</span>
            <h2 id="project-archive-title">Earlier work, still part of the story.</h2>
          </div>
          <p>
            A wider range of commerce, simulation, marketplace, automation, and
            enterprise projects—kept concise so the strongest systems lead.
          </p>
        </div>
        <div className="project-archive-grid">
          {archiveProjects.map((project) => <ArchiveCard key={project.id} project={project} />)}
        </div>
      </section>
    </section>
  );
}
