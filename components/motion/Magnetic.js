import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pulls its single child toward the pointer while the pointer is inside the
 * wrapper, then springs it home. Used on the primary calls to action.
 */
export default function Magnetic({ children, strength = 0.32, className = "" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const target = wrap?.firstElementChild;
    if (!wrap || !target) return undefined;
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined;

    const moveX = gsap.quickTo(target, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(target, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (event) => {
      const bounds = wrap.getBoundingClientRect();
      moveX((event.clientX - (bounds.left + bounds.width / 2)) * strength);
      moveY((event.clientY - (bounds.top + bounds.height / 2)) * strength);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(target);
    };
  }, [strength]);

  return (
    <span ref={wrapRef} className={"magnetic " + className}>
      {children}
    </span>
  );
}
