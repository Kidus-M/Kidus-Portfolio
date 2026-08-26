import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { navLinks, profile, socials } from "@/data/site";
import { useClock } from "@/lib/motion";

const EASE = [0.76, 0, 0.24, 1];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();
  const time = useClock(profile.timezone);

  useLenis(({ scroll, limit }) => {
    setCondensed(scroll > 80);
    setProgress(limit > 0 ? Math.min(scroll / limit, 1) : 0);

    let current = navLinks[0].href;
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section && section.getBoundingClientRect().top <= 200) current = link.href;
    });
    setActive(current);
  });

  useEffect(() => {
    if (!lenis) return undefined;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (event, href) => {
    event.preventDefault();
    setOpen(false);
    window.requestAnimationFrame(() => lenis?.scrollTo(href, { offset: 0, duration: 1.4 }));
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className={"site-nav" + (condensed ? " is-condensed" : "")}>
        <a className="nav-brand" href="#index" onClick={(event) => go(event, "#index")}>
          <span className="nav-sigil" aria-hidden="true">
            KM
          </span>
          <span className="nav-brand-name">
            {profile.first} <em>{profile.last}</em>
          </span>
        </a>

        <nav className="nav-inline" aria-label="Sections">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => go(event, link.href)}
              className={active === link.href ? "is-active" : undefined}
              aria-current={active === link.href ? "true" : undefined}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-tail">
          <span className="nav-clock" aria-label={`Local time in ${profile.location}`}>
            <i aria-hidden="true" />
            {time} {profile.utc}
          </span>
          <button
            type="button"
            className={"nav-menu-button" + (open ? " is-open" : "")}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span className="nav-menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="nav-menu-word">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="menu-inner">
              <div className="menu-head">
                <span className="label">Navigation</span>
                <span className="label">{profile.location}</span>
              </div>

              <nav className="menu-links" aria-label="Menu">
                {navLinks.map((link, index) => (
                  <a key={link.href} href={link.href} onClick={(event) => go(event, link.href)}>
                    <motion.span
                      className="menu-link-inner"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.3, ease: "easeIn" } }}
                      transition={{ duration: 0.85, ease: EASE, delay: 0.22 + index * 0.06 }}
                    >
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {link.label}
                    </motion.span>
                  </a>
                ))}
              </nav>

              <motion.div
                className="menu-foot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a className="menu-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <div className="menu-socials">
                  {socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
