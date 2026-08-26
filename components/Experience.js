import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { RevealLine } from "@/components/motion/Reveal";
import { experience } from "@/data/experience";
import { gsap, useGsapScope } from "@/lib/motion";

/**
 * Sticky deck: every role pins under the one before it, and the card beneath
 * recedes as the next slides over — the stack reads as a timeline you push down.
 */
export default function Experience() {
  const sectionRef = useRef(null);

  useGsapScope(
    () => {
      const cards = gsap.utils.toArray(".path-card");

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.93,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".path-progress span",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".path-deck",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    },
    sectionRef,
    []
  );

  return (
    <section id="path" className="path" ref={sectionRef}>
      <div className="shell">
        <div className="section-head">
          <span className="label">(05) &mdash; Path</span>
          <h2 className="section-title">
            <RevealLine>Where I&rsquo;ve</RevealLine>
            <RevealLine delay={0.08}>
              <em>built.</em>
            </RevealLine>
          </h2>
        </div>

        <div className="path-layout">
          <div className="path-progress" aria-hidden="true">
            <span />
          </div>

          <div className="path-deck">
            {experience.map((item, index) => (
              <article
                className="path-card"
                key={item.company}
                style={{ top: `calc(7.5rem + ${index * 1.35}rem)`, zIndex: index + 1 }}
              >
                <div className="path-card-head">
                  <span className="path-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="path-titles">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer" className="path-company">
                        {item.company}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <h3 className="path-company">{item.company}</h3>
                    )}
                    <p className="path-role">{item.role}</p>
                  </div>
                  <div className="path-meta">
                    <time>{item.duration}</time>
                    {item.location && (
                      <span>
                        <MapPin size={13} aria-hidden="true" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="path-summary">{item.description}</p>

                <ul className="path-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="chip-row">
                  {item.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
