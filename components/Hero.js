import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import Magnetic from "@/components/motion/Magnetic";
import { useIntroReady } from "@/components/Layout";
import { profile } from "@/data/site";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

const WORDMARK = `${profile.first} ${profile.last}`.toUpperCase();

export default function Hero() {
  const ready = useIntroReady();
  const sectionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const lenis = useLenis();

  /* Entrance — held back until the preloader lifts. */
  useEffect(() => {
    if (!ready) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(sectionRef.current?.querySelectorAll(".hero-anim") ?? [], { clearProps: "all" });
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      timeline
        .fromTo(".hero-label", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 })
        .fromTo(
          ".hero-line-inner",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.35, stagger: 0.11 },
          "-=0.62"
        )
        .fromTo(".hero-aside > *", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.95")
        .fromTo(
          ".hero-letter",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.035 },
          "-=1.05"
        )
        .fromTo(".hero-base > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 }, "-=0.85")
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.1 }, "-=1.1");
    }, sectionRef);

    return () => context.revert();
  }, [ready]);

  /* Wordmark: letters lean toward the pointer, whole mark drifts on scroll. */
  useEffect(() => {
    const mark = wordmarkRef.current;
    const section = sectionRef.current;
    if (!mark || !section || prefersReducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.to(mark, {
        yPercent: 26,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(".hero-veil", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    if (!window.matchMedia("(pointer: fine)").matches) return () => context.revert();

    const letters = Array.from(mark.querySelectorAll(".hero-letter-inner"));
    const setters = letters.map((letter) => ({
      y: gsap.quickTo(letter, "y", { duration: 0.75, ease: "power3.out" }),
      scale: gsap.quickTo(letter, "scaleY", { duration: 0.75, ease: "power3.out" }),
    }));

    const onMove = (event) => {
      letters.forEach((letter, index) => {
        const bounds = letter.getBoundingClientRect();
        const distance = Math.abs(event.clientX - (bounds.left + bounds.width / 2));
        const pull = Math.max(0, 1 - distance / 320);
        setters[index].y(-pull * 26);
        setters[index].scale(1 + pull * 0.14);
      });
    };

    const onLeave = () => {
      setters.forEach((setter) => {
        setter.y(0);
        setter.scale(1);
      });
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      context.revert();
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, []);

  const jump = (event, href) => {
    event.preventDefault();
    lenis?.scrollTo(href, { duration: 1.5 });
  };

  return (
    <section id="index" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-body">
        <div className="hero-lead">
          <span className="hero-label label">(01) &mdash; Portfolio</span>
          <h1 id="hero-title" className="hero-statement">
            <span className="hero-line">
              <span className="hero-line-inner">Product systems,</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">
                end to <em>end.</em>
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-aside">
          <p className="hero-blurb">{profile.statement}</p>
          <div className="hero-actions">
            <Magnetic>
              <a className="button is-primary" href="#work" onClick={(event) => jump(event, "#work")}>
                Selected work
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="button is-ghost" href="#contact" onClick={(event) => jump(event, "#contact")}>
                Start a conversation
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-rule" aria-hidden="true" />

      <div className="hero-wordmark" ref={wordmarkRef} aria-hidden="true">
        {WORDMARK.split("").map((character, index) => (
          <span className="hero-letter" key={character + index}>
            <span className="hero-letter-inner">{character === " " ? " " : character}</span>
          </span>
        ))}
      </div>

      <div className="hero-base">
        <span className="hero-availability">
          <i aria-hidden="true" />
          Available for ambitious work
        </span>
        <span className="label hero-role">Web &middot; Mobile &middot; Backend &middot; Applied AI</span>
        <a className="hero-scroll" href="#index-manifesto" onClick={(event) => jump(event, "#index-manifesto")}>
          <span className="label">Scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
