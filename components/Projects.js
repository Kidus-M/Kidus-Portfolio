import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const cardsRef = useRef([]);
  const featured = projects.filter((project) => project.featured);
  const compact = projects.filter((project) => !project.featured);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      rowsRef.current.filter(Boolean).forEach((row) => {
        const image = row.querySelector(".project-image-wrap");
        const info = row.querySelectorAll(".project-info > *");
        gsap.from(image, {
          xPercent: row.classList.contains("is-reversed") ? 8 : -8,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 75%" },
        });
        gsap.from(info, {
          y: 36,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: row, start: "top 72%" },
        });
        gsap.to(image.querySelector("img"), {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".project-grid", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-shell projects-section">
      <div className="section-heading">
        <span className="section-number">04</span>
        <span className="section-kicker">Projects</span>
      </div>

      <div className="featured-projects">
        {featured.map((project, index) => (
          <article
            key={project.id}
            className={`featured-project ${index % 2 ? "is-reversed" : ""}`}
            ref={(node) => (rowsRef.current[index] = node)}
          >
            <div className="project-image-wrap" data-cursor="view">
              <span className="project-watermark">{project.id}</span>
              <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 900px) 100vw, 55vw" />
            </div>

            <div className="project-info">
              <span className="project-number">{project.id}</span>
              <h3>{project.title}</h3>
              <span className="project-type">{project.type}</span>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tech.map((tag) => (
                  <span className="tech-tag" key={tag}>
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
        ))}
      </div>

      <div className="project-grid">
        {compact.map((project, index) => (
          <article className="project-card" key={project.id} ref={(node) => (cardsRef.current[index] = node)}>
            <div className="project-card-image" data-cursor="view">
              <Image src={project.image} alt={`${project.title} thumbnail`} fill sizes="(max-width: 900px) 100vw, 33vw" />
            </div>
            <div className="project-card-head">
              <h3>{project.title}</h3>
              <ArrowUpRight size={18} />
            </div>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tech.slice(0, 3).map((tag) => (
                <span className="tech-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
