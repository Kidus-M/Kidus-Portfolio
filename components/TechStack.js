import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { techCategories, techMarquee } from "@/data/tech";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current.filter(Boolean), {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.045,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  let itemIndex = 0;

  return (
    <section id="stack" ref={sectionRef} className="section-shell stack-section">
      <div className="section-heading">
        <span className="section-number">03</span>
        <span className="section-kicker">Tech Stack</span>
      </div>

      <div className="stack-grid">
        {techCategories.map((category) => (
          <div className="stack-column" key={category.label}>
            <h3>{category.label}</h3>
            <ul>
              {category.items.map((item) => {
                const index = itemIndex++;
                return (
                  <li key={item} ref={(node) => (itemsRef.current[index] = node)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="tech-icon-marquee" aria-label="Technology icons">
        <div className="tech-icon-track">
          {[0, 1].map((copy) => (
            <div className="tech-icon-set" key={copy}>
              {techMarquee.map((tech) => (
                <div className="tech-icon-item" key={`${copy}-${tech.name}`}>
                  <img src={`https://skillicons.dev/icons?i=${tech.icon}`} alt="" loading="lazy" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
