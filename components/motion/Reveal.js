import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-10% 0px" };

/**
 * A line of type that slides up from behind its own mask.
 *
 * The viewport trigger lives on the outer element on purpose: the inner span
 * starts translated fully outside the mask's `overflow: hidden` box, which
 * clips it out of every IntersectionObserver rect and would stop it ever
 * being reported as visible.
 */
export function RevealLine({ children, delay = 0, className = "", duration = 1.05 }) {
  return (
    <motion.span
      className={"reveal-line " + className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.span
        className="reveal-line-inner"
        variants={{ hidden: { y: "115%" }, visible: { y: "0%" } }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Generic rise-and-fade for blocks of content. */
export function Reveal({ children, delay = 0, y = 26, className = "", as = "div" }) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggers its children through the rise-and-fade above. */
export function RevealGroup({ children, className = "", stagger = 0.08, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealChild = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
