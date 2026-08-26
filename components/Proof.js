import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import Counter from "@/components/motion/Counter";
import ScrubText from "@/components/motion/ScrubText";
import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { proof } from "@/data/site";
import { useInView } from "@/lib/motion";

const ICONS = { codeforces: SiCodeforces, leetcode: SiLeetcode };

/** Codeforces rating bands, used to place the peak marker in context. */
const TIERS = [
  { name: "Newbie", from: 800, to: 1200, color: "#9aa0a6" },
  { name: "Pupil", from: 1200, to: 1400, color: "#6ee7b7" },
  { name: "Specialist", from: 1400, to: 1600, color: "#5ad1cd" },
  { name: "Expert", from: 1600, to: 1900, color: "#7cc6fe" },
  { name: "Candidate Master", from: 1900, to: 2100, color: "#b79cff" },
];

const PEAK = 1690;
const MIN = TIERS[0].from;
const MAX = TIERS[TIERS.length - 1].to;
const position = ((PEAK - MIN) / (MAX - MIN)) * 100;

export default function Proof() {
  const ladderRef = useRef(null);
  const ladderInView = useInView(ladderRef, { threshold: 0.4 });

  return (
    <section id="proof" className="proof">
      <div className="shell">
        <div className="section-head">
          <span className="label">(07) &mdash; Proof</span>
          <h2 className="section-title">
            <RevealLine>Under</RevealLine>
            <RevealLine delay={0.08}>
              <em>pressure.</em>
            </RevealLine>
          </h2>
        </div>

        <ScrubText className="proof-body" text={proof.body} />

        <div className="proof-grid">
          {proof.profiles.map((item) => {
            const Icon = ICONS[item.icon];

            return (
              <a
                className="proof-card"
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Visit"
              >
                <div className="proof-card-top">
                  <Icon size={24} aria-hidden="true" />
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>

                <strong className="proof-value">
                  <Counter value={item.value} suffix={item.suffix ?? ""} />
                </strong>
                <span className="label">{item.valueLabel}</span>

                <div className="proof-card-foot">
                  <span className="proof-platform">{item.platform}</span>
                  <span className="proof-secondary">{item.secondary}</span>
                  <span className="proof-handle">@{item.handle}</span>
                </div>
              </a>
            );
          })}

          <Reveal className="proof-ladder" delay={0.05}>
            <div className="proof-ladder-head">
              <span className="label">Codeforces rating bands</span>
              <span className="proof-ladder-rank">Expert &middot; peak {PEAK}</span>
            </div>

            <div className="proof-ladder-track" ref={ladderRef}>
              {TIERS.map((tier) => (
                <span
                  className="proof-tier"
                  key={tier.name}
                  style={{
                    flexGrow: tier.to - tier.from,
                    "--tier": tier.color,
                  }}
                >
                  <i aria-hidden="true" />
                  <em>{tier.name}</em>
                </span>
              ))}

              <span
                className={"proof-marker" + (ladderInView ? " is-in" : "")}
                style={{ left: `${position}%` }}
              >
                <b>{PEAK}</b>
              </span>
            </div>

            <div className="proof-strengths">
              {proof.strengths.map((strength) => (
                <span className="chip" key={strength}>
                  {strength}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
