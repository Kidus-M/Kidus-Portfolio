import { useEffect, useRef } from "react";
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
        y: 48,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
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
            <div className="experience-top">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.company}
                </a>
              ) : (
                <h3>{item.company}</h3>
              )}
              <time>{item.duration}</time>
            </div>
            <h4>{item.role}</h4>
            <p>{item.description}</p>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag} className="tech-tag">
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
