import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

const EASE = [0.76, 0, 0.24, 1];
const SESSION_KEY = "km-intro-shown";

/**
 * Count-in curtain. Runs once per browser session, then lifts to hand the
 * viewport to the hero.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [hidden, setHidden] = useState(true);
  const finished = useRef(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_KEY);
    if (seen || prefersReducedMotion()) {
      onDone?.();
      return undefined;
    }

    setHidden(false);
    document.body.classList.add("is-loading");

    const duration = 1900;
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!finished.current) {
        finished.current = true;
        setLifting(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const release = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    document.body.classList.remove("is-loading");
    setHidden(true);
    onDone?.();
  };

  if (hidden) return null;

  return (
    <AnimatePresence onExitComplete={release}>
      {!lifting && (
        <motion.div
          className="preloader"
          exit={{ y: "-101%" }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <div className="preloader-inner">
            <div className="preloader-name">
              <span>{profile.first}</span>
              <em>{profile.last}</em>
            </div>

            <div className="preloader-meta">
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </div>

            <div className="preloader-count" aria-hidden="true">
              {String(count).padStart(3, "0")}
            </div>

            <div className="preloader-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>

          <span className="sr-only" role="status">
            Loading portfolio, {count} percent
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
