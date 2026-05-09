"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const menuOverlayRef = useRef(null);
    const menuItemsRef = useRef([]);
    const menuFooterRef = useRef(null);

    const navLinks = [
        { href: "#work", label: "Work", num: "01" },
        { href: "#tech", label: "Stack", num: "02" },
        { href: "#contact", label: "Contact", num: "03" },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Entrance
    useEffect(() => {
        gsap.fromTo(navRef.current, { y: -40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.8,
        });
    }, []);

    // Fullscreen menu open/close
    useEffect(() => {
        if (!menuOverlayRef.current) return;
        const items = menuItemsRef.current.filter(Boolean);

        if (menuOpen) {
            document.body.style.overflow = "hidden";
            gsap.set(menuOverlayRef.current, { display: "flex" });
            gsap.to(menuOverlayRef.current, { opacity: 1, duration: 0.5, ease: "power3.out" });
            gsap.fromTo(items,
                { y: 80, opacity: 0, rotateX: -15 },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "power4.out", delay: 0.2 }
            );
            if (menuFooterRef.current) {
                gsap.fromTo(menuFooterRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.6 });
            }
        } else {
            document.body.style.overflow = "";
            gsap.to(menuOverlayRef.current, {
                opacity: 0, duration: 0.4, ease: "power2.in",
                onComplete: () => gsap.set(menuOverlayRef.current, { display: "none" }),
            });
        }
    }, [menuOpen]);

    return (
        <>
            <header
                ref={navRef}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    padding: scrolled ? "0.75rem clamp(1.5rem,5vw,5rem)" : "1.25rem clamp(1.5rem,5vw,5rem)",
                    transition: "padding 0.5s cubic-bezier(0.16,1,0.3,1)",
                    opacity: 0,
                    mixBlendMode: menuOpen ? "normal" : "difference",
                }}
            >
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    maxWidth: "1400px", margin: "0 auto",
                }}>
                    {/* Logo */}
                    <a href="#" data-cursor="expand" style={{
                        display: "flex", alignItems: "center", gap: "0.6rem",
                        textDecoration: "none", color: "#fff",
                    }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="0" y="0" width="8" height="8" fill="#c8ff00" />
                            <rect x="10" y="0" width="10" height="8" rx="4" fill="#c8ff00" opacity="0.4" />
                            <rect x="0" y="10" width="20" height="10" rx="5" fill="#c8ff00" opacity="0.15" />
                        </svg>
                        <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                            letterSpacing: "0.12em", textTransform: "uppercase",
                        }}>
                            Kidus<span style={{ opacity: 0.4 }}>.dev</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex" style={{ alignItems: "center", gap: "3rem" }}>
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} data-cursor="expand" style={{
                                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                                letterSpacing: "0.12em", textTransform: "uppercase",
                                color: "#fff", textDecoration: "none", position: "relative",
                                display: "flex", alignItems: "baseline", gap: "0.4rem",
                            }}>
                                <span style={{ fontSize: "0.5rem", opacity: 0.3 }}>{link.num}</span>
                                {link.label}
                            </a>
                        ))}
                        <a href="/resume.pdf" download data-cursor="expand" style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                            padding: "0.5rem 1.2rem", border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "var(--radius-full)", color: "#fff",
                            textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = "#c8ff00"; e.target.style.color = "#c8ff00"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "#fff"; }}
                        >
                            Résumé
                        </a>
                    </nav>

                    {/* Burger */}
                    <button onClick={() => setMenuOpen(p => !p)} className="md:hidden" data-cursor="expand"
                        aria-label="Menu" style={{
                            background: "none", border: "none", cursor: "none", padding: "6px",
                            display: "flex", flexDirection: "column", gap: menuOpen ? "0" : "5px",
                            width: "28px", position: "relative", zIndex: 110,
                        }}>
                        <span style={{
                            display: "block", width: "100%", height: "1.5px", background: menuOpen ? "#c8ff00" : "#fff",
                            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                            transform: menuOpen ? "translateY(1.5px) rotate(45deg)" : "none",
                        }} />
                        <span style={{
                            display: "block", width: menuOpen ? "0" : "60%", height: "1.5px", background: "#fff",
                            transition: "all 0.3s ease", marginLeft: "auto",
                        }} />
                        <span style={{
                            display: "block", width: "100%", height: "1.5px", background: menuOpen ? "#c8ff00" : "#fff",
                            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                            transform: menuOpen ? "translateY(-1.5px) rotate(-45deg)" : "none",
                        }} />
                    </button>
                </div>
            </header>

            {/* Fullscreen Mobile Menu */}
            <div ref={menuOverlayRef} style={{
                display: "none", position: "fixed", inset: 0, zIndex: 99,
                background: "rgba(5,5,5,0.97)", backdropFilter: "blur(30px)",
                flexDirection: "column", justifyContent: "center", alignItems: "center",
                gap: "0.5rem", opacity: 0,
            }}>
                {navLinks.map((link, i) => (
                    <a key={link.href} href={link.href}
                        ref={el => menuItemsRef.current[i] = el}
                        onClick={() => setMenuOpen(false)}
                        data-cursor="expand"
                        style={{
                            fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem,10vw,5rem)",
                            fontWeight: 700, color: "#fff", textDecoration: "none",
                            letterSpacing: "-0.03em", lineHeight: 1.2,
                            display: "flex", alignItems: "baseline", gap: "1rem",
                            transition: "color 0.3s ease", perspective: "600px",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "#c8ff00"}
                        onMouseLeave={e => e.currentTarget.style.color = "#fff"}
                    >
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", opacity: 0.3, letterSpacing: "0.1em" }}>{link.num}</span>
                        {link.label}
                    </a>
                ))}
                <div ref={menuFooterRef} style={{
                    position: "absolute", bottom: "2rem", display: "flex", gap: "2rem",
                    fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                    <a href="https://github.com/Kidus-M" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
                    <a href="https://www.linkedin.com/in/kidus0237" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn</a>
                    <a href="https://t.me/kidus_mesfin" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Telegram</a>
                </div>
            </div>
        </>
    );
}
