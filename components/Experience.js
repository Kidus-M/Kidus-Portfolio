import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";
import { RevealLine } from "@/components/motion/Reveal";
import { experience, organisations } from "@/data/experience";
import { prefersReducedMotion } from "@/lib/motion";

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

/**
 * Sticky deck: every role pins under the one before it, and the card beneath
 * recedes as the next slides over it — the stack reads as a timeline you push
 * down through.
 *
 * The recede is measured from live geometry rather than driven by ScrollTrigger:
 * the cards are `position: sticky`, and a sticky element's offset moves as you
 * scroll, so ScrollTrigger resolves its start/end against a position that no
 * longer holds and every card lands on its end state immediately.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const progressRef = useRef(null);
  const updateRef = useRef(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || prefersReducedMotion()) return undefined;

    const cards = Array.from(deck.querySelectorAll(".path-card"));
    let frame = 0;

    const update = () => {
      frame = 0;

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;

        // How far the next card has closed on this one, as a fraction of a card.
        const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
        const progress = 1 - clamp01(gap / card.offsetHeight);

        // Darken via an overlay rather than the card's own opacity: fading the
        // card itself makes it translucent, and the roles underneath show
        // straight through the one on top.
        card.style.transform = `scale(${1 - progress * 0.06})`;
        card.style.setProperty("--recede", (progress * 0.66).toFixed(3));
      });

      const bar = progressRef.current;
      if (bar) {
        const bounds = deck.getBoundingClientRect();
        const travelled = clamp01(
          (window.innerHeight * 0.6 - bounds.top) / Math.max(bounds.height * 0.8, 1)
        );
        bar.style.transform = `scaleY(${travelled})`;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    updateRef.current = schedule;
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      updateRef.current = null;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.removeProperty("--recede");
      });
    };
  }, []);

  /* Lenis drives the scroll, so tick the same update from its callback. */
  useLenis(() => updateRef.current?.());

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
            <span ref={progressRef} />
          </div>

          <div className="path-deck" ref={deckRef}>
            {experience.map((item, index) => (
              <article
                className="path-card"
                key={item.company}
                style={{ top: `calc(7rem + ${index * 1.4}rem)`, zIndex: index + 1 }}
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

        <div className="path-orgs">
          <span className="label">Organisations</span>
          {organisations.map((org) => (
            <article className="path-org" key={org.name}>
              <div>
                {org.url ? (
                  <a href={org.url} target="_blank" rel="noreferrer">
                    {org.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <strong>{org.name}</strong>
                )}
                <p>{org.description}</p>
              </div>
              <div className="path-org-meta">
                <span>{org.role}</span>
                <time>{org.duration}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
