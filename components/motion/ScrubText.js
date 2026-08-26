import { useRef } from "react";
import { gsap, useGsapScope } from "@/lib/motion";

/**
 * Reads a passage aloud as you scroll it: each word lifts out of the dim
 * baseline in sequence, tied to scroll position rather than a timer.
 */
export default function ScrubText({ text, className = "", as: Tag = "p" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useGsapScope(
    () => {
      gsap.to(".scrub-word", {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          end: "bottom 62%",
          scrub: 0.5,
        },
      });
    },
    ref,
    []
  );

  return (
    <Tag ref={ref} className={"scrub-text " + className}>
      {words.map((word, index) => (
        <span className="scrub-word" key={word + index}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
