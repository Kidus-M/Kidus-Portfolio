import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { href: "#hero", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileLinks = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 180) current = section;
      });
      if (current) setActive(`#${current.id}`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    gsap.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    const links = mobileLinks.current.filter(Boolean);
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(links, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header ref={navRef} className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#hero" className="brand" aria-label="Kidus Mesfin home">
          <span>Kidus <em>Mesfin</em></span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined}>
              {link.label}
              <span className="active-dot" />
            </a>
          ))}
        </nav>

        <a className="availability-pill" href="#contact">
          <span /> Available for work
        </a>

        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </header>

      <div ref={overlayRef} className="mobile-menu">
        {navLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            ref={(node) => (mobileLinks.current[index] = node)}
            onClick={() => setMenuOpen(false)}
          >
            <span>0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
