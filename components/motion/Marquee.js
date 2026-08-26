import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { wrap } from "@/lib/motion";

/**
 * A looping ribbon that speeds up — and flips direction — with the scroll.
 * `children` is rendered `repeat` times to make the loop seamless.
 */
export default function Marquee({
  children,
  className = "",
  baseSpeed = 3.2,
  direction = 1,
  repeat = 4,
}) {
  const baseX = useMotionValue(0);
  const velocity = useRef(0);
  const heading = useRef(direction);

  useLenis((lenis) => {
    velocity.current = lenis.velocity;
    if (lenis.velocity > 0.2) heading.current = direction;
    else if (lenis.velocity < -0.2) heading.current = -direction;
  });

  const span = 100 / repeat;
  const x = useTransform(baseX, (value) => `${wrap(-span, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    const boost = Math.min(Math.abs(velocity.current) * 0.55, 26);
    const step = (baseSpeed + boost) * (delta / 1000) * heading.current;
    baseX.set(baseX.get() - step);
  });

  return (
    <div className={"marquee " + className}>
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: repeat }, (_, index) => (
          <div className="marquee-group" key={index} aria-hidden={index > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
