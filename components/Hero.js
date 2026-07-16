import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const badgeRef = useRef(null);
  const marqueeRef = useRef(null);
  const indicatorRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.from(".hero-name-line", { yPercent: 120, duration: 1.05, ease: "expo.out", stagger: 0.08 })
        .from(roleRef.current, { opacity: 0, y: 22, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(badgeRef.current, { opacity: 0, scale: 0.86, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .from(marqueeRef.current, { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .from(indicatorRef.current, { opacity: 0, y: -10, duration: 0.45, ease: "power2.out" }, "-=0.1");

      gsap.to(orbRef.current, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <div ref={badgeRef} className="status-badge">
            <span /> Available for opportunities
          </div>

          <h1 ref={nameRef} className="hero-name" aria-label="Kidus Mesfin">
            <span className="line-mask">
              <span className="hero-name-line">kidus</span>
            </span>
            <span className="line-mask offset">
              <span className="hero-name-line">mesfin</span>
            </span>
          </h1>

          <div ref={marqueeRef} className="hero-marquee" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <span key={copy}>Software Engineer - Product Systems - Web / Mobile / AI - Addis Ababa -</span>
              ))}
            </div>
          </div>

          <p ref={roleRef} className="hero-role">
            Software engineer building end-to-end products across web, mobile, backend,
            and applied AI for teams that care about the details.
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div ref={orbRef} className="type-orb">
            <span>systems</span>
            <span>interfaces</span>
            <span>motion</span>
            <span>shipping</span>
          </div>
        </div>
      </div>

      <div ref={indicatorRef} className="scroll-indicator" aria-hidden="true">
        <span className="scroll-line">
          <span />
        </span>
        <small>scroll</small>
      </div>
    </section>
  );
}
