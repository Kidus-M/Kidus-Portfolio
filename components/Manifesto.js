import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import ScrubText from "@/components/motion/ScrubText";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";
import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { capabilities, manifesto, metrics, profile } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];
const RIBBON = ["End to end", "Interface", "Services", "Data", "Applied AI", "Delivery"];

export default function Manifesto() {
  const [open, setOpen] = useState(0);

  return (
    <section id="index-manifesto" className="manifesto">
      <Marquee className="ribbon" baseSpeed={2.4} repeat={4}>
        {RIBBON.map((word) => (
          <span className="ribbon-item" key={word}>
            {word}
            <i aria-hidden="true" />
          </span>
        ))}
      </Marquee>

      <div className="shell">
        <div className="section-head">
          <span className="label">(02) &mdash; Index</span>
          <h2 className="section-title">
            <RevealLine>How I</RevealLine>
            <RevealLine delay={0.08}>
              <em>work.</em>
            </RevealLine>
          </h2>
        </div>

        <div className="manifesto-split">
          <ScrubText className="manifesto-body" text={manifesto} />

          <aside className="manifesto-card">
            <div className="manifesto-sigil" aria-hidden="true">
              <Image src="/kidus-sigil.png" alt="" width={128} height={128} />
            </div>
            <dl>
              {[
                ["Based", profile.location],
                ["Focus", "End-to-end product systems"],
                ["Status", "Open to new work"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="label">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="capability-list">
          {capabilities.map((capability, index) => {
            const isOpen = open === index;

            return (
              <div
                className={"capability" + (isOpen ? " is-open" : "")}
                key={capability.title}
                onMouseEnter={() => setOpen(index)}
              >
                <button
                  type="button"
                  className="capability-head"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="capability-index">{capability.index}</span>
                  <span className="capability-title">{capability.title}</span>
                  <span className="capability-icon" aria-hidden="true">
                    <Plus size={18} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="capability-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="capability-panel-inner">
                        <p>{capability.detail}</p>
                        <div className="chip-row">
                          {capability.tools.map((tool) => (
                            <span className="chip" key={tool}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal className="metric-row" delay={0.1}>
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>
                <Counter value={metric.value} suffix={metric.suffix} />
              </strong>
              <span className="label">{metric.label}</span>
            </div>
          ))}
          <p className="metric-note">
            Based in {profile.location}. Working with teams anywhere.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
