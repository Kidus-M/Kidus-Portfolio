import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export default function Projects() {
  const projectThemes = [
    { backgroundColor: "#0b0b0b", color: "#f0ede8" },
    { backgroundColor: "#c8f135", color: "#080808" },
    { backgroundColor: "#151515", color: "#f0ede8" },
    { backgroundColor: "#f0ede8", color: "#080808" },
  ];

  return (
    <section id="projects" className="projects-section">
      <FlowArt aria-label="Project story scroll" className="project-flow">
        {projects.map((project, index) => {
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
                <span className="section-number">{index === 0 ? "04" : project.id}</span>
                <span className="section-kicker">{index === 0 ? "Projects" : project.type}</span>
              </div>

              <article className={`project-flow-card ${index % 2 ? "is-reversed" : ""}`}>
                <div className="project-flow-media" data-cursor="view">
                  <span className="project-watermark">{project.id}</span>
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 900px) 100vw, 56vw"
                    priority={index === 0}
                  />
                </div>

                <div className="project-info project-flow-info">
                  <span className="project-number">{project.id}</span>
                  <h3>{project.title}</h3>
                  <span className="project-type">{project.type}</span>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tech.map((tag) => (
                      <span className={`tech-tag ${isLight ? "is-light" : ""}`} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        Live Demo <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}
