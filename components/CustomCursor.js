import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power2.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power2.out" });

    const move = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const enterLink = () => document.body.classList.add("cursor--hover");
    const leaveLink = () => document.body.classList.remove("cursor--hover");
    const enterView = () => document.body.classList.add("cursor--view");
    const leaveView = () => document.body.classList.remove("cursor--view");
    const bound = new WeakSet();
    const click = () => {
      gsap.fromTo(ringRef.current, { scale: 0.7 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
      gsap.fromTo(dotRef.current, { scale: 0.55 }, { scale: 1, duration: 0.35, ease: "power3.out" });
    };

    const bind = () => {
      document.querySelectorAll("a, button, input, textarea, [data-cursor='hover']").forEach((element) => {
        if (bound.has(element)) return;
        bound.add(element);
        element.addEventListener("mouseenter", enterLink);
        element.addEventListener("mouseleave", leaveLink);
      });
      document.querySelectorAll("[data-cursor='view']").forEach((element) => {
        if (bound.has(element)) {
          element.addEventListener("mouseenter", enterView);
          element.addEventListener("mouseleave", leaveView);
          return;
        }
        bound.add(element);
        element.addEventListener("mouseenter", enterView);
        element.addEventListener("mouseleave", leaveView);
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });
    bind();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      observer.disconnect();
      document.body.classList.remove("cursor--hover", "cursor--view");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={textRef}>VIEW</span>
      </div>
    </>
  );
}
