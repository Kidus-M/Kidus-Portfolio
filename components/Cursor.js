import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Two-part cursor. The ring lags the dot, grows over interactive elements and
 * can carry a short label supplied by `data-cursor-label`.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    document.body.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onDown = () => document.body.classList.add("cursor--down");
    const onUp = () => document.body.classList.remove("cursor--down");

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest("[data-cursor-label]");
      const interactive = target?.closest("a, button, input, textarea, [data-cursor]");

      document.body.classList.toggle("cursor--active", Boolean(interactive));
      document.body.classList.toggle("cursor--labelled", Boolean(labelled));

      if (labelRef.current) {
        labelRef.current.textContent = labelled?.getAttribute("data-cursor-label") ?? "";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.body.classList.remove(
        "has-custom-cursor",
        "cursor--active",
        "cursor--labelled",
        "cursor--down"
      );
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
