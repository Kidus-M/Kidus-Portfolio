import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const capabilities = [
  { index: "01", label: "Interface", detail: "React / Flutter", className: "node-interface" },
  { index: "02", label: "Services", detail: "Node / FastAPI", className: "node-services" },
  { index: "03", label: "Data", detail: "Postgres / Realtime", className: "node-data" },
  { index: "04", label: "Applied AI", detail: "Context / Models", className: "node-ai" },
  { index: "05", label: "Delivery", detail: "CI/CD / Cloud", className: "node-delivery" },
];

const metrics = [
  { value: "3+", label: "Years building" },
  { value: "06", label: "Featured systems" },
  { value: "04", label: "Product surfaces" },
  { value: "1690", label: "CF peak rating" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .from(".hero-meta-item", { y: -18, opacity: 0, duration: 0.8, stagger: 0.08 })
        .from(".hero-word-inner", { yPercent: 115, duration: 1.15, stagger: 0.12 }, "-=0.48")
        .from(".hero-role", { y: 24, opacity: 0, duration: 0.85 }, "-=0.7")
        .from(".hero-actions", { y: 18, opacity: 0, duration: 0.75 }, "-=0.58")
        .from(".topology-scene", { scale: 0.88, opacity: 0, duration: 1.25 }, "-=1.05")
        .from(".topology-node", { scale: 0.7, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.7")
        .from(".hero-footer", { y: 18, opacity: 0, duration: 0.7 }, "-=0.42");

      if (!reducedMotion) {
        gsap.to(".topology-orbit.is-outer", { rotation: 360, duration: 44, repeat: -1, ease: "none" });
        gsap.to(".topology-orbit.is-inner", { rotation: -360, duration: 30, repeat: -1, ease: "none" });
        gsap.to(".topology-node", {
          y: -7,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.23,
          ease: "sine.inOut",
        });
      }
    }, section);

    let rotateX;
    let rotateY;

    if (!reducedMotion && section && scene) {
      rotateX = gsap.quickTo(scene, "rotationX", { duration: 0.75, ease: "power3.out" });
      rotateY = gsap.quickTo(scene, "rotationY", { duration: 0.75, ease: "power3.out" });
    }

    const handlePointerMove = (event) => {
      const bounds = section.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      section.style.setProperty("--hero-x", x * 100 + "%");
      section.style.setProperty("--hero-y", y * 100 + "%");

      if (rotateX && rotateY) {
        rotateY((x - 0.5) * 9);
        rotateX((0.5 - y) * 8);
      }
    };

    const resetScene = () => {
      if (rotateX && rotateY) {
        rotateX(0);
        rotateY(0);
      }
    };

    section?.addEventListener("pointermove", handlePointerMove);
    section?.addEventListener("pointerleave", resetScene);

    return () => {
      section?.removeEventListener("pointermove", handlePointerMove);
      section?.removeEventListener("pointerleave", resetScene);
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-shell">
        <header className="hero-meta">
          <div className="hero-meta-item hero-identity">
            <span className="meta-index">KM / 01</span>
            <strong>Kidus Mesfin</strong>
            <span>Software Engineer</span>
          </div>
          <div className="hero-meta-item hero-location">
            <span className="meta-label">Based in</span>
            <strong>Addis Ababa</strong>
            <span>UTC +03:00</span>
          </div>
          <div className="hero-meta-item hero-availability">
            <i aria-hidden="true" />
            <span>Available for ambitious work</span>
          </div>
        </header>

        <div className="hero-stage">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-meta-item">
              Product systems <span>/</span> end to end
            </p>
            <h1 id="hero-title" className="hero-statement" aria-label="I build whole systems.">
              <span className="hero-word is-sans"><span className="hero-word-inner">I build</span></span>
              <span className="hero-word is-display"><span className="hero-word-inner">whole systems.</span></span>
            </h1>
            <p className="hero-role">
              I turn complex ideas into products people can actually use - shaping the interface,
              architecture, intelligence, and delivery as one connected system.
            </p>
            <div className="hero-actions">
              <a className="hero-cta is-primary" href="#projects">
                Explore selected systems <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="hero-cta is-secondary" href="#contact">
                Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Interactive map of Kidus Mesfin's engineering capabilities">
            <div ref={sceneRef} className="topology-scene">
              <div className="topology-grid" aria-hidden="true" />
              <div className="topology-scan" aria-hidden="true" />
              <div className="topology-orbit is-outer" aria-hidden="true"><span /><span /><span /></div>
              <div className="topology-orbit is-inner" aria-hidden="true"><span /><span /></div>
              <svg className="topology-links" viewBox="0 0 600 600" aria-hidden="true">
                <path d="M300 300 L110 100" />
                <path d="M300 300 L500 125" />
                <path d="M300 300 L510 435" />
                <path d="M300 300 L160 520" />
                <path d="M300 300 L65 330" />
              </svg>
              <div className="topology-core">
                <span>KM / Engineering</span>
                <strong>Product<br />Systems</strong>
                <small>End to end</small>
              </div>
              {capabilities.map((capability) => (
                <div key={capability.label} className={"topology-node " + capability.className}>
                  <span>{capability.index}</span>
                  <strong>{capability.label}</strong>
                  <small>{capability.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="hero-footer">
          <div className="hero-metrics">
            {metrics.map((metric) => (
              <div className="hero-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <a className="hero-scroll" href="#experience">
            <span>Scroll to enter</span>
            <i aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
