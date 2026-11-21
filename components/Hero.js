import { useEffect, useRef } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import Magnetic from "@/components/motion/Magnetic";
import HeroGlyph from "@/components/HeroGlyph";
import { useIntroReady } from "@/components/Layout";
import { profile } from "@/data/site";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

/** Ge'ez fidel the letters cycle through before settling on their Latin form. */
const FIDEL = "ሀለሐመሠረሰሸቀበተቸነኘአከወዐዘየደጀገጠጨጰጸፈፐቅዱስፍንሪኑኪሙ";
const randomGlyph = () => FIDEL[Math.floor(Math.random() * FIDEL.length)];

/**
 * Transliteration effect: every letter of `word` flickers through Ge'ez
 * glyphs, then resolves to its Latin letter, left to right. The glyph is drawn
 * by CSS from `data-glyph`, so the Latin text (and the layout) never changes.
 * Returns a cancel function.
 */
function transliterate(word, { duration = 900, delay = 0 } = {}) {
  const letters = Array.from(word.querySelectorAll(".hero-char"));
  let frame = 0;
  let start;
  let lastSwap = 0;

  const tick = (now) => {
    if (start === undefined) start = now;
    const elapsed = now - start;
    const swap = now - lastSwap > 60;
    if (swap) lastSwap = now;

    let pending = false;
    letters.forEach((letter, index) => {
      const settlesAt = delay + (duration * (index + 1)) / letters.length;
      if (elapsed >= settlesAt) {
        delete letter.dataset.glyph;
      } else {
        pending = true;
        if (swap || !letter.dataset.glyph) letter.dataset.glyph = randomGlyph();
      }
    });

    if (pending) frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    letters.forEach((letter) => delete letter.dataset.glyph);
  };
}

function NameWord({ part, minor = false }) {
  return (
    /* The Ge'ez caption is drawn by CSS from data-geez so the heading's text
       stays "Kidus Mesfin Teferi" for search engines and screen readers. */
    <span className={clsx("hero-word", minor && "is-minor")} data-name-word data-geez={part.geez}>
      <span className="hero-word-mask">
        <span className="hero-word-inner">
          {part.latin.split("").map((character, letterIndex) => (
            <span className="hero-char" key={character + letterIndex}>
              {character}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

export default function Hero() {
  const ready = useIntroReady();
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const lenis = useLenis();
  const [given, father, grandfather] = profile.names;

  /* Entrance — held back until the preloader lifts. The name rises in Ge'ez
     and transliterates itself into Latin as it lands. */
  useEffect(() => {
    if (!ready) return undefined;
    const section = sectionRef.current;

    if (prefersReducedMotion()) {
      section?.classList.add("is-in");
      return undefined;
    }

    const cancels = [];
    const words = Array.from(section.querySelectorAll("[data-name-word]"));

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      timeline
        .add(() => {
          words.forEach((word, index) => {
            cancels.push(transliterate(word, { duration: 950, delay: 260 + index * 220 }));
          });
        }, 0)
        .fromTo(
          ".hero-word-inner",
          { yPercent: 112 },
          { yPercent: 0, duration: 1.4, stagger: 0.13 },
          "<"
        )
        .add(() => section.classList.add("is-in"), 0.5)
        .fromTo(".hero-glyph", { opacity: 0 }, { opacity: 1, duration: 2.2, ease: "power2.out" }, 0.2)
        .fromTo(".hero-tagline", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=1.1")
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.1 }, "-=0.9")
        .fromTo(".hero-base > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 }, "-=0.95");
    }, sectionRef);

    return () => {
      cancels.forEach((cancel) => cancel());
      section.classList.remove("is-in");
      context.revert();
    };
  }, [ready]);

  /* Hovering a word re-runs the transliteration; letters lift toward the
     pointer; the two name rows shear apart on scroll. */
  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    if (!section || !name || prefersReducedMotion()) return undefined;

    const context = gsap.context(() => {
      const scrub = { trigger: section, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-name-row.is-first", { xPercent: -7, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-name-row.is-second", { xPercent: 6, ease: "none", scrollTrigger: scrub });
      gsap.to(name, { opacity: 0.2, yPercent: 12, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-veil", { yPercent: 14, ease: "none", scrollTrigger: scrub });
    }, sectionRef);

    if (!window.matchMedia("(pointer: fine)").matches) return () => context.revert();

    const running = new Map();
    const words = Array.from(name.querySelectorAll("[data-name-word]"));
    const onEnter = (event) => {
      const word = event.currentTarget;
      if (running.has(word)) return;
      const cancel = transliterate(word, { duration: 620 });
      running.set(word, cancel);
      window.setTimeout(() => running.delete(word), 700);
    };
    words.forEach((word) => word.addEventListener("pointerenter", onEnter));

    const letters = Array.from(name.querySelectorAll(".hero-char"));
    const setters = letters.map((letter) => gsap.quickTo(letter, "y", { duration: 0.7, ease: "power3.out" }));

    const onMove = (event) => {
      letters.forEach((letter, index) => {
        const bounds = letter.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const pull = Math.max(0, 1 - Math.hypot(dx, dy * 1.6) / 360);
        setters[index](-pull * 18);
      });
    };
    const onLeave = () => setters.forEach((setter) => setter(0));

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      words.forEach((word) => word.removeEventListener("pointerenter", onEnter));
      running.forEach((cancel) => cancel());
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
      <HeroGlyph />

      <div className="hero-stage">
        <h1 id="hero-title" className="hero-name" ref={nameRef}>
          <span className="hero-name-row is-first">
            <NameWord part={given} />
          </span>{" "}
          <span className="hero-name-row is-second">
            <NameWord part={father} />{" "}
            <NameWord part={grandfather} minor />
          </span>
          <span className="hero-tagline">
            <span className="sr-only">&mdash; </span>
            {profile.role} &middot; product systems, end to end
          </span>
        </h1>
      </div>

      <div className="hero-rule" aria-hidden="true" />

      <div className="hero-base">
        <div className="hero-intro">
          <span className="hero-availability">
            <i aria-hidden="true" />
            {profile.available ? "Available for ambitious work" : "Currently booked"}
          </span>
          <p className="hero-blurb">{profile.statement}</p>
        </div>
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
    </section>
  );
}
