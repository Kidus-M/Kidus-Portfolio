import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt,
    FaPython, FaLock
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiGo, SiMongodb,
    SiPostgresql, SiFirebase, SiSupabase, SiExpress, SiFastapi,
    SiDotnet, SiVercel, SiPandas, SiShadcnui, SiGin
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const techCategories = {
    ALL: 'ALL',
    FRONTEND: 'INTERFACE',
    BACKEND: 'COMPUTE',
    DATABASE: 'STORAGE',
    DEVOPS: 'INFRA',
};

const techs = [
    { name: 'Next.js', icon: <SiNextdotjs />, category: techCategories.FRONTEND, color: '#ffffff' },
    { name: 'React', icon: <FaReact />, category: techCategories.FRONTEND, color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, category: techCategories.FRONTEND, color: '#3178C6' },
    { name: 'Tailwind', icon: <SiTailwindcss />, category: techCategories.FRONTEND, color: '#38B2AC' },
    { name: 'Shadcn UI', icon: <SiShadcnui />, category: techCategories.FRONTEND, color: '#ffffff' },
    { name: 'Node.js', icon: <FaNodeJs />, category: techCategories.BACKEND, color: '#339933' },
    { name: 'Go', icon: <SiGo />, category: techCategories.BACKEND, color: '#00ADD8' },
    { name: 'Python', icon: <FaPython />, category: techCategories.BACKEND, color: '#3776AB' },
    { name: 'FastAPI', icon: <SiFastapi />, category: techCategories.BACKEND, color: '#009688' },
    { name: 'Gin', icon: <SiGin />, category: techCategories.BACKEND, color: '#00ADD8' },
    { name: 'Express', icon: <SiExpress />, category: techCategories.BACKEND, color: '#ffffff' },
    { name: '.NET', icon: <SiDotnet />, category: techCategories.BACKEND, color: '#512BD4' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: techCategories.DATABASE, color: '#336791' },
    { name: 'MongoDB', icon: <SiMongodb />, category: techCategories.DATABASE, color: '#47A248' },
    { name: 'Supabase', icon: <SiSupabase />, category: techCategories.DATABASE, color: '#3ECF8E' },
    { name: 'Firebase', icon: <SiFirebase />, category: techCategories.DATABASE, color: '#FFCA28' },
    { name: 'Pandas', icon: <SiPandas />, category: techCategories.DATABASE, color: '#150458' },
    { name: 'Docker', icon: <FaDocker />, category: techCategories.DEVOPS, color: '#2496ED' },
    { name: 'AWS', icon: <FaAws />, category: techCategories.DEVOPS, color: '#FF9900' },
    { name: 'Vercel', icon: <SiVercel />, category: techCategories.DEVOPS, color: '#ffffff' },
    { name: 'Auth', icon: <FaLock />, category: techCategories.DEVOPS, color: '#c8ff00' },
];

const TechStack = () => {
    const [filter, setFilter] = useState(techCategories.ALL);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);

    const filteredTechs = techs.filter(t =>
        filter === techCategories.ALL ? true : t.category === filter
    );

    // Section entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate cards when filter changes
    useEffect(() => {
        const validCards = cardsRef.current.filter(Boolean);
        if (validCards.length === 0) return;

        gsap.fromTo(validCards,
            { y: 30, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.04,
                ease: "power3.out",
            }
        );
    }, [filter, filteredTechs.length]);

    // Tilt effect on cards
    const handleCardMouseMove = useCallback((e, index) => {
        const el = cardsRef.current[index];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(el, {
            rotateY: x * 15,
            rotateX: -y * 15,
            duration: 0.4,
            ease: "power2.out",
        });
    }, []);

    const handleCardMouseLeave = useCallback((index) => {
        const el = cardsRef.current[index];
        if (!el) return;
        gsap.to(el, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="tech"
            className="section-padding"
            style={{
                background: 'var(--bg-secondary)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Ambient glow */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '800px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(200, 255, 0, 0.03) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                {/* Header */}
                <div ref={headerRef} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    marginBottom: '3rem',
                    opacity: 0,
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '2rem',
                    }}>
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem',
                            }}>
                                <div className="status-dot" />
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-muted)',
                                }}>
                                    Operational Stack
                                </span>
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                lineHeight: 1,
                            }}>
                                System<br />
                                <span style={{ color: 'var(--accent)' }}>Architecture</span>
                            </h2>
                        </div>

                        {/* Filter Tags */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                        }}>
                            {Object.values(techCategories).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`tag ${filter === cat ? 'active' : ''}`}
                                    data-cursor="expand"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="hr-accent" />
                </div>

                {/* Tech Grid */}
                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '1px',
                        background: 'var(--border-subtle)',
                        border: '1px solid var(--border-subtle)',
                    }}
                >
                    {filteredTechs.map((tech, index) => (
                        <div
                            key={tech.name}
                            ref={(el) => (cardsRef.current[index] = el)}
                            data-cursor="expand"
                            onMouseMove={(e) => handleCardMouseMove(e, index)}
                            onMouseLeave={() => handleCardMouseLeave(index)}
                            style={{
                                background: 'var(--bg-primary)',
                                padding: '2rem 1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                cursor: 'none',
                                perspective: '600px',
                                transformStyle: 'preserve-3d',
                                transition: 'background 0.4s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--bg-elevated)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'var(--bg-primary)';
                            }}
                        >
                            {/* Hover glow */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)`,
                                opacity: 0,
                                transition: 'opacity 0.5s ease',
                                pointerEvents: 'none',
                            }}
                                className="card-glow"
                            />

                            <div style={{
                                fontSize: '1.8rem',
                                color: 'var(--text-muted)',
                                transition: 'color 0.4s ease, transform 0.4s ease',
                                transformStyle: 'preserve-3d',
                                transform: 'translateZ(20px)',
                            }}>
                                {tech.icon}
                            </div>

                            <div style={{ textAlign: 'center', transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}>
                                <span style={{
                                    display: 'block',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.3s ease',
                                }}>
                                    {tech.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section footer stats */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                }}>
                    {[
                        { label: 'Languages', value: '5+' },
                        { label: 'Frameworks', value: '10+' },
                        { label: 'Projects Shipped', value: '20+' },
                    ].map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <span style={{
                                display: 'block',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                fontWeight: 700,
                                color: 'var(--accent)',
                                lineHeight: 1,
                            }}>
                                {stat.value}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.55rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginTop: '0.5rem',
                                display: 'block',
                            }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;