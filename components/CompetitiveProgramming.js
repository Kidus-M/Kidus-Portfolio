import { ArrowUpRight, BrainCircuit, Code2, Gauge, Trophy } from "lucide-react";
import { SiCodeforces, SiLeetcode } from "react-icons/si";

const profiles = [
  {
    platform: "Codeforces",
    handle: "KidusMesfin",
    stat: "Expert",
    detail: "Rated competitive programmer with contest-tested speed and implementation discipline.",
    href: "https://codeforces.com/profile/KidusMesfin",
    icon: SiCodeforces,
  },
  {
    platform: "LeetCode",
    handle: "Kidus_Mesfin",
    stat: "850+ solved",
    detail: "Deep practice across data structures, algorithms, dynamic programming, and interviews.",
    href: "https://leetcode.com/u/Kidus_Mesfin/",
    icon: SiLeetcode,
  },
];

const strengths = [
  { label: "Data structures", icon: Code2 },
  { label: "Algorithms", icon: BrainCircuit },
  { label: "Contests", icon: Trophy },
  { label: "Optimization", icon: Gauge },
];

export default function CompetitiveProgramming() {
  return (
    <section id="competitive" className="section-shell competitive-section">
      <aside className="section-sticky">
        <span className="section-number">04</span>
        <span className="section-kicker">Problem Solving</span>
        <span className="section-rule" />
      </aside>

      <div className="competitive-content">
        <div className="competitive-copy">
          <span className="section-kicker">Competitive Programming</span>
          <h2>Algorithmic thinking, proven under pressure.</h2>
          <p>
            Beyond product engineering, I sharpen my problem-solving through contests
            and high-volume algorithm practice on Codeforces and LeetCode.
          </p>
        </div>

        <div className="competitive-profile-grid">
          {profiles.map(({ platform, handle, stat, detail, href, icon: Icon }) => (
            <a
              key={platform}
              className="competitive-profile-card"
              href={href}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
            >
              <div className="competitive-profile-head">
                <Icon size={28} />
                <ArrowUpRight size={18} />
              </div>
              <span>{platform}</span>
              <strong>{stat}</strong>
              <p>{detail}</p>
              <small>@{handle}</small>
            </a>
          ))}
        </div>

        <div className="competitive-strengths" aria-label="Competitive programming strengths">
          {strengths.map(({ label, icon: Icon }) => (
            <span key={label}>
              <Icon size={16} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
