import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  Layers3,
  MonitorCog,
  Server,
} from "lucide-react";
import { techCategories, techMarquee } from "@/data/tech";

const categoryMeta = {
  Languages: {
    icon: Code2,
    summary: "Core programming languages I use for product work, APIs, automation, and systems.",
  },
  Frameworks: {
    icon: Layers3,
    summary: "Frontend and backend frameworks I reach for when shipping fast, polished apps.",
  },
  Databases: {
    icon: Database,
    summary: "Storage tools for relational data, realtime products, and managed backend workflows.",
  },
  "DevOps / Cloud": {
    icon: Cloud,
    summary: "Deployment, source control, container, and cloud tooling for production delivery.",
  },
};

const extraGroups = [
  {
    label: "Interfaces",
    items: ["Figma", "Responsive UI", "Motion Systems", "Accessibility"],
    icon: MonitorCog,
    summary: "Design-aware implementation details that make interfaces feel deliberate.",
  },
  {
    label: "APIs",
    items: ["REST APIs", "Auth Flows", "Integrations", "Automation"],
    icon: Server,
    summary: "Service connections and backend flows behind useful product features.",
  },
];

const stackGroups = [
  ...techCategories.map((category) => ({
    ...category,
    ...(categoryMeta[category.label] ?? { icon: Braces, summary: "" }),
  })),
  ...extraGroups,
];

const slug = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pad = (value) => String(value).padStart(2, "0");

export default function TechStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const railRef = useRef(null);

  const active = stackGroups[activeIndex];
  const ActiveIcon = active.icon;
  const outerItems = active.items.filter((_, index) => index % 2 === 0);
  const innerItems = active.items.filter((_, index) => index % 2 === 1);

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
      const next = (current + step + stackGroups.length) % stackGroups.length;
      railRef.current?.querySelectorAll("button")[next]?.focus();
      return next;
    });
  }, []);

  return (
    <section id="stack" className="section-shell stack-section">
      <div className="stack-console">
        <div className="section-heading stack-heading">
          <span className="section-number">03</span>
          <span className="section-kicker">Tech Stack</span>
        </div>

        <div className="stack-console-body">
          <div className="stack-rail">
            <span className="section-kicker">Grouped Capabilities</span>
            <h3 className="stack-rail-title">The signals behind the build.</h3>

            <div
              className="stack-rail-list"
              role="tablist"
              aria-label="Technology groups"
              ref={railRef}
              onKeyDown={onRailKeyDown}
            >
              {stackGroups.map((group, index) => {
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
                <span className="stack-orbit-circle is-far" />
                <span className="stack-orbit-circle is-outer" />
                <span className="stack-orbit-circle is-inner" />
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
                    <ActiveIcon size={26} strokeWidth={1.4} />
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
                    <OrbitRing items={outerItems} variant="outer" offset={0} />
                    <OrbitRing items={innerItems} variant="inner" offset={40} />
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
                {pad(activeIndex + 1)} / {pad(stackGroups.length)}
              </span>
            </div>
          </div>
        </div>

        <div className="stack-ticker" aria-hidden="true">
          <div className="stack-ticker-track">
            {[0, 1].map((copy) => (
              <div className="stack-ticker-group" key={copy}>
                {techMarquee.map((tech) => (
                  <span key={copy + tech.name}>
                    <i />
                    {tech.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitRing({ items, variant, offset }) {
  if (!items.length) return null;

  return (
    <div className={`stack-orbit-ring is-${variant}`}>
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
                delay: 0.06 + index * 0.07,
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
