import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  Layers3,
  MonitorCog,
  Server,
  X,
} from "lucide-react";
import { IconContainer, Radar } from "@/components/ui/radar-effect";
import { techCategories } from "@/data/tech";

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

export default function TechStack() {
  const [activeGroup, setActiveGroup] = useState(null);

  const radarGroups = [
    ...techCategories.map((category) => ({
      ...category,
      ...(categoryMeta[category.label] ?? { icon: Braces, summary: "" }),
    })),
    ...extraGroups,
  ];

  useEffect(() => {
    if (!activeGroup) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveGroup(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGroup]);

  return (
    <section id="stack" className="section-shell stack-section">
      <div className="tech-radar-panel">
        <div className="section-heading tech-radar-heading">
          <span className="section-number">03</span>
          <span className="section-kicker">Tech Stack</span>
        </div>

        <div className="tech-radar-stage">
          <div className="tech-radar-intro">
            <span className="section-kicker">Grouped Capabilities</span>
            <h3>Click a signal to inspect the tools behind it.</h3>
          </div>

          <div className="tech-radar-row is-wide">
            {radarGroups.slice(0, 3).map((group, index) => (
              <RadarButton key={group.label} group={group} index={index} onClick={setActiveGroup} />
            ))}
          </div>
          <div className="tech-radar-row is-tight">
            {radarGroups.slice(3, 5).map((group, index) => (
              <RadarButton key={group.label} group={group} index={index + 3} onClick={setActiveGroup} />
            ))}
          </div>
          <div className="tech-radar-row is-medium">
            {radarGroups.slice(5).map((group, index) => (
              <RadarButton key={group.label} group={group} index={index + 5} onClick={setActiveGroup} />
            ))}
          </div>

          <Radar className="tech-radar-sweep" />
          <div className="tech-radar-horizon" />
        </div>
      </div>

      <AnimatePresence>
        {activeGroup && (
          <motion.div
            className="tech-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="tech-modal-backdrop"
              onClick={() => setActiveGroup(null)}
              aria-label="Close tech details"
            />
            <motion.div
              className="tech-modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-modal-title"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="tech-modal-head">
                <div>
                  <span className="section-kicker">Stack Group</span>
                  <h3 id="tech-modal-title">{activeGroup.label}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setActiveGroup(null)}
                  aria-label="Close tech details"
                >
                  <X size={18} />
                </button>
              </div>
              <p>{activeGroup.summary}</p>
              <div className="tech-modal-grid">
                {activeGroup.items.map((item) => (
                  <span className="tech-modal-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function RadarButton({ group, index, onClick }) {
  const Icon = group.icon;

  return (
    <motion.button
      type="button"
      className="radar-tech-action"
      style={{ "--ping-delay": `${1 + index * 0.16}s` }}
      onClick={() => onClick(group)}
      data-cursor="view"
      aria-label={`Open ${group.label} technologies`}
      initial={{ opacity: 0, scale: 0.35, y: 28, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{
        delay: 0.95 + index * 0.16,
        type: "spring",
        stiffness: 380,
        damping: 18,
      }}
    >
      <IconContainer
        text={group.label}
        delay={1.05 + index * 0.16}
        icon={<Icon size={28} strokeWidth={1.6} />}
      />
    </motion.button>
  );
}
