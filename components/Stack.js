import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers3,
  Plug,
  Server,
  ShieldCheck,
} from "lucide-react";
import Marquee from "@/components/motion/Marquee";
import { RevealLine } from "@/components/motion/Reveal";
import { techGroups, techMarquee } from "@/data/tech";

const ICONS = {
  code: Code2,
  layers: Layers3,
  server: Server,
  database: Database,
  cloud: Cloud,
  brain: BrainCircuit,
  shield: ShieldCheck,
  plug: Plug,
};

/* Orbit radii as a fraction of --orbit-outer. Groups larger than six spread
   over three rings so the chips never crowd each other. */
const TWO_RING = [1, 0.58];
const THREE_RING = [1, 0.74, 0.48];
const SPINS = [58, 44, 34];

const slug = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pad = (value) => String(value).padStart(2, "0");

export default function Stack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const railRef = useRef(null);

  const active = techGroups[activeIndex];
  const ActiveIcon = ICONS[active.icon] ?? Braces;

  /* Deal the group's items round-robin across the rings. */
  const { ratios, rings } = useMemo(() => {
    const chosen = active.items.length > 6 ? THREE_RING : TWO_RING;
    const buckets = chosen.map(() => []);
    active.items.forEach((item, index) => buckets[index % chosen.length].push(item));
    return { ratios: chosen, rings: buckets };
  }, [active]);

  const trackPointer = useCallback((event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    stage.style.setProperty("--py", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  const onRailKeyDown = useCallback((event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    setActiveIndex((current) => {
      const next = (current + step + techGroups.length) % techGroups.length;
      railRef.current?.querySelectorAll("button")[next]?.focus();
      return next;
    });
  }, []);

  return (
    <section id="stack" className="stack">
      <div className="shell">
        <div className="section-head">
          <span className="label">(06) &mdash; Stack</span>
          <h2 className="section-title">
            <RevealLine>What I</RevealLine>
            <RevealLine delay={0.08}>
              <em>build with.</em>
            </RevealLine>
          </h2>
        </div>

        <div className="stack-console-body">
          <div className="stack-rail">
            <div
              className="stack-rail-list"
              role="tablist"
              aria-label="Technology groups"
              ref={railRef}
              onKeyDown={onRailKeyDown}
            >
              {techGroups.map((group, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={group.label}
                    type="button"
                    role="tab"
                    id={`stack-tab-${slug(group.label)}`}
                    aria-selected={isActive}
                    aria-controls="stack-orbit-panel"
                    tabIndex={isActive ? 0 : -1}
                    className={"stack-rail-item" + (isActive ? " is-active" : "")}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                  >
                    <span className="stack-rail-index">{pad(index + 1)}</span>
                    <span className="stack-rail-label">{group.label}</span>
                    <span className="stack-rail-count">{pad(group.items.length)}</span>
                    <span className="stack-rail-glow" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="stack-rail-note">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.summary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="stack-stage"
            ref={stageRef}
            onPointerMove={trackPointer}
            role="tabpanel"
            id="stack-orbit-panel"
            aria-labelledby={`stack-tab-${slug(active.label)}`}
          >
            <div className="stack-stage-grid" aria-hidden="true" />
            <div className="stack-stage-spot" aria-hidden="true" />

            <div className="stack-orbit">
              <div className="stack-orbit-decor" aria-hidden="true">
                <span className="stack-orbit-circle is-far" style={{ "--ring-ratio": 1.36 }} />
                {ratios.map((ratio, index) => (
                  <span
                    key={ratio}
                    className={
                      "stack-orbit-circle" + (index === ratios.length - 1 ? " is-core-ring" : "")
                    }
                    style={{ "--ring-ratio": ratio }}
                  />
                ))}
                <span className="stack-orbit-sweep" />
              </div>

              <div className="stack-orbit-core">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.label}
                    className="stack-orbit-core-inner"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ActiveIcon size={24} strokeWidth={1.4} />
                    <strong>{active.label}</strong>
                    <span>{pad(active.items.length)} tools</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="stack-orbit-swarms">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active.label}
                    className="stack-orbit-swarm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {rings.map((items, index) => (
                      <OrbitRing
                        key={index}
                        items={items}
                        ratio={ratios[index]}
                        spin={SPINS[index] ?? 40}
                        reverse={index % 2 === 1}
                        offset={index * 26}
                        stagger={index}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="stack-stage-readout" aria-hidden="true">
              <span className="stack-stage-signal">
                <i />
                signal locked
              </span>
              <span>
                {pad(activeIndex + 1)} / {pad(techGroups.length)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Marquee className="ribbon is-quiet" baseSpeed={2} direction={-1} repeat={4}>
        {techMarquee.map((tech) => (
          <span className="ribbon-item" key={tech.name}>
            {tech.name}
            <i aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function OrbitRing({ items, ratio, spin, reverse, offset, stagger }) {
  if (!items.length) return null;

  return (
    <div
      className="stack-orbit-ring"
      data-spin={reverse ? "reverse" : "forward"}
      style={{
        "--orbit-r": `calc(var(--orbit-outer) * ${ratio})`,
        "--spin": `${spin}s`,
      }}
    >
      {items.map((item, index) => (
        <span
          className="stack-orbit-slot"
          key={item}
          style={{ "--angle": `${offset + (index * 360) / items.length}deg` }}
        >
          <span className="stack-orbit-counter">
            <motion.span
              className="stack-orbit-chip"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.05 + stagger * 0.05 + index * 0.06,
                type: "spring",
                stiffness: 420,
                damping: 24,
              }}
            >
              <i aria-hidden="true" />
              {item}
            </motion.span>
          </span>
        </span>
      ))}
    </div>
  );
}
