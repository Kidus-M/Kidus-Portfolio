import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { navLinks, profile, socials } from "@/data/site";
import { useClock } from "@/lib/motion";

export default function Footer() {
  const lenis = useLenis();
  const time = useClock(profile.timezone);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-name">
              {profile.first} <em>{profile.last}</em>
            </span>
            <p>{profile.intro}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <span className="label">Index</span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  lenis?.scrollTo(link.href, { duration: 1.4 });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-social">
            <span className="label">Elsewhere</span>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} {profile.first} {profile.last}</span>
          <span>
            {profile.location} &middot; {time}
          </span>
          <button
            type="button"
            className="footer-top-link"
            onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
          >
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
