"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const timeRef = useRef(null);

    const links = [
        { href: "#work", label: "Work" },
        { href: "#tech", label: "Stack" },
        { href: "#contact", label: "Contact" },
    ];

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            if (timeRef.current) {
                const now = new Date();
                timeRef.current.textContent = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
            }
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Entry animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 2 }
            );
        });
        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (isOpen) {
            gsap.to(mobileMenuRef.current, {
                clipPath: "inset(0 0 0 0)",
                opacity: 1,
                duration: 0.6,
                ease: "power4.out",
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                clipPath: "inset(0 0 100% 0)",
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

    // Magnetic effect on nav links
    const handleMouseMove = (e, index) => {
        const el = linksRef.current[index];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = (index) => {
        const el = linksRef.current[index];
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 w-full z-50 mix-blend-difference"
            style={{ opacity: 0 }}
        >
            <div
                className="section-padding-x flex items-center justify-between"
                style={{
                    paddingTop: isScrolled ? '1rem' : '1.5rem',
                    paddingBottom: isScrolled ? '1rem' : '1.5rem',
                    transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Logo / Brand */}
                <a
                    href="#"
                    className="flex items-center gap-3"
                    data-cursor="expand"
                    style={{ textDecoration: 'none' }}
                >
                    <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#c8ff00',
                        borderRadius: '50%',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        color: '#fff',
                        textTransform: 'uppercase',
                    }}>
                        Kidus Mesfin
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
                    {links.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            ref={(el) => (linksRef.current[i] = el)}
                            onMouseMove={(e) => handleMouseMove(e, i)}
                            onMouseLeave={() => handleMouseLeave(i)}
                            data-cursor="expand"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            <span style={{
                                color: 'rgba(200, 255, 0, 0.5)',
                                marginRight: '0.35rem',
                            }}>
                                /
                            </span>
                            {link.label}
                        </a>
                    ))}

                    {/* Live time */}
                    <span
                        ref={timeRef}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'rgba(255,255,255,0.3)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        --:--
                    </span>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                    data-cursor="expand"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        background: 'none',
                        border: 'none',
                        cursor: 'none',
                        padding: '8px',
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{
                        display: 'block',
                        width: '24px',
                        height: '1.5px',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(45deg) translateY(7.5px)' : 'none',
                    }} />
                    <span style={{
                        display: 'block',
                        width: isOpen ? '0px' : '16px',
                        height: '1.5px',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        marginLeft: 'auto',
                    }} />
                    <span style={{
                        display: 'block',
                        width: '24px',
                        height: '1.5px',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(-45deg) translateY(-7.5px)' : 'none',
                    }} />
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden"
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(5, 5, 5, 0.98)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    clipPath: 'inset(0 0 100% 0)',
                    opacity: 0,
                    zIndex: -1,
                }}
            >
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 8vw, 4rem)',
                            fontWeight: 700,
                            color: '#fff',
                            textDecoration: 'none',
                            letterSpacing: '-0.02em',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#c8ff00'}
                        onMouseLeave={(e) => e.target.style.color = '#fff'}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="/resume.pdf"
                    download
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: '1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '0.25rem',
                    }}
                >
                    Download Resume ↓
                </a>
            </div>
        </nav>
    );
}
