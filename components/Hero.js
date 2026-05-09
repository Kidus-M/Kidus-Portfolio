import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const headingLine1 = useRef(null);
    const headingLine2 = useRef(null);
    const headingLine3 = useRef(null);
    const subtitleRef = useRef(null);
    const taglineRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const gridRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Animated grid lines entrance
            tl.fromTo(
                gridRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 2, ease: "power2.out" },
                0
            );

            // Heading lines — cinematic staggered reveal
            const lines = [headingLine1.current, headingLine2.current, headingLine3.current];
            lines.forEach((line, i) => {
                tl.fromTo(
                    line,
                    { yPercent: 110, rotateX: -20 },
                    {
                        yPercent: 0,
                        rotateX: 0,
                        duration: 1.4,
                        ease: "power4.out",
                    },
                    0.15 + i * 0.12
                );
            });

            // Tagline
            tl.fromTo(
                taglineRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                1.0
            );

            // Subtitle
            tl.fromTo(
                subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                1.2
            );

            // CTA
            tl.fromTo(
                ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                1.4
            );

            // Status bar
            tl.fromTo(
                statusRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                1.5
            );

            // Scroll indicator
            tl.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" },
                1.8
            );

            // Infinite scroll indicator bounce
            gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-arrow'), {
                y: 8,
                duration: 1.2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'var(--bg-primary)',
            }}
        >
            {/* Animated Grid Background */}
            <div
                ref={gridRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)',
                }}
            />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(200, 255, 0, 0.04) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(200, 255, 0, 0.03) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />

            {/* Main Content */}
            <div className="section-padding-x" style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '1400px',
                width: '100%',
                margin: '0 auto',
                paddingTop: 'clamp(6rem, 15vh, 10rem)',
                paddingBottom: 'clamp(4rem, 10vh, 8rem)',
            }}>
                {/* Top tagline */}
                <div ref={taglineRef} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    opacity: 0,
                }}>
                    <div className="status-dot" />
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                    }}>
                        Open for Q3 2026 — Let's talk
                    </span>
                </div>

                {/* Giant Heading — Asymmetric Layout */}
                <div style={{ marginBottom: '3rem' }}>
                    {/* Line 1 */}
                    <div style={{ overflow: 'hidden', perspective: '400px' }}>
                        <h1
                            ref={headingLine1}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                willChange: 'transform',
                            }}
                        >
                            I Design
                        </h1>
                    </div>

                    {/* Line 2 — shifted right with accent */}
                    <div style={{
                        overflow: 'hidden',
                        perspective: '400px',
                        paddingLeft: 'clamp(1rem, 5vw, 6rem)',
                    }}>
                        <h1
                            ref={headingLine2}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                willChange: 'transform',
                            }}
                        >
                            <span style={{ color: 'var(--accent)' }}>The Systems</span>
                        </h1>
                    </div>

                    {/* Line 3 */}
                    <div style={{
                        overflow: 'hidden',
                        perspective: '400px',
                        paddingLeft: 'clamp(0.5rem, 2vw, 3rem)',
                    }}>
                        <h1
                            ref={headingLine3}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                willChange: 'transform',
                            }}
                        >
                            Behind It<span style={{ color: 'var(--accent)' }}>.</span>
                        </h1>
                    </div>
                </div>

                {/* Subtitle + CTA — Asymmetric right-aligned */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2rem',
                    maxWidth: '500px',
                    marginLeft: 'auto',
                }}>
                    <p
                        ref={subtitleRef}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                            lineHeight: 1.8,
                            color: 'var(--text-secondary)',
                            opacity: 0,
                        }}
                    >
                        Full-stack engineer obsessed with clean architecture,
                        ruthless performance, and interfaces that feel inevitable.
                        I don't build websites — I ship products.
                    </p>

                    <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0 }}>
                        <a
                            href="#work"
                            data-cursor="expand"
                            className="magnetic-btn"
                            style={{
                                padding: '1rem 2.5rem',
                                border: '1px solid var(--accent)',
                                borderRadius: 'var(--radius-full)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--accent)',
                                textDecoration: 'none',
                                background: 'transparent',
                            }}
                        >
                            View Work
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            data-cursor="expand"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--border-default)',
                                paddingBottom: '2px',
                                transition: 'color 0.3s ease, border-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'var(--text-secondary)';
                                e.target.style.borderColor = 'var(--text-secondary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = 'var(--text-muted)';
                                e.target.style.borderColor = 'var(--border-default)';
                            }}
                        >
                            Resume ↓
                        </a>
                    </div>
                </div>

                {/* Bottom status bar */}
                <div ref={statusRef} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'clamp(3rem, 8vh, 6rem)',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                    opacity: 0,
                }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                    }}>
                        Software Engineer
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                    }}>
                        Based in Addis Ababa
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                    }}>
                        Scroll to explore
                    </span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollIndicatorRef} style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 0,
            }}>
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, var(--accent), transparent)',
                }} />
                <div className="scroll-arrow" style={{
                    width: '6px',
                    height: '6px',
                    borderRight: '1px solid var(--accent)',
                    borderBottom: '1px solid var(--accent)',
                    transform: 'rotate(45deg)',
                }} />
            </div>
        </section>
    );
};

export default Hero;