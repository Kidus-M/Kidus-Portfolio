import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { experience } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(rowsRef.current.filter(Boolean), {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-shell experience-section">
      <aside className="section-sticky">
        <span className="section-number">02</span>
        <span className="section-kicker">Experience</span>
        <span className="section-rule" />
      </aside>

      <div className="experience-list">
        {experience.map((item, index) => (
          <article key={item.company} className="experience-row" ref={(node) => (rowsRef.current[index] = node)}>
            <div className="experience-index">{String(index + 1).padStart(2, "0")}</div>

            <div className="experience-body">
              <div className="experience-top">
                <div>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer" data-cursor="view">
                      {item.company}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <h3>{item.company}</h3>
                  )}
                  <h4>{item.role}</h4>
                </div>
                <div className="experience-meta">
                  <time>{item.duration}</time>
                  {item.location && (
                    <span>
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              <p>{item.description}</p>

              <ul className="experience-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
