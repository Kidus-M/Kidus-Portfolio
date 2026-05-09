import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    FaReact, FaNodeJs, FaAws, FaDocker, FaPython, FaLock
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiGo, SiMongodb,
    SiPostgresql, SiFirebase, SiSupabase, SiExpress, SiFastapi,
    SiDotnet, SiVercel, SiPandas, SiShadcnui, SiGin
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const categories = ['ALL', 'FRONTEND', 'BACKEND', 'DATA', 'INFRA'];

const techs = [
    { name:'Next.js', icon:<SiNextdotjs/>, cat:'FRONTEND', color:'#fff', exp:'3 yrs' },
    { name:'React', icon:<FaReact/>, cat:'FRONTEND', color:'#61DAFB', exp:'4 yrs' },
    { name:'TypeScript', icon:<SiTypescript/>, cat:'FRONTEND', color:'#3178C6', exp:'3 yrs' },
    { name:'Tailwind CSS', icon:<SiTailwindcss/>, cat:'FRONTEND', color:'#38BDF8', exp:'3 yrs' },
    { name:'Shadcn/ui', icon:<SiShadcnui/>, cat:'FRONTEND', color:'#fff', exp:'1 yr' },
    { name:'Node.js', icon:<FaNodeJs/>, cat:'BACKEND', color:'#68A063', exp:'4 yrs' },
    { name:'Go', icon:<SiGo/>, cat:'BACKEND', color:'#00ADD8', exp:'2 yrs' },
    { name:'Python', icon:<FaPython/>, cat:'BACKEND', color:'#FFD43B', exp:'3 yrs' },
    { name:'FastAPI', icon:<SiFastapi/>, cat:'BACKEND', color:'#009688', exp:'2 yrs' },
    { name:'Gin', icon:<SiGin/>, cat:'BACKEND', color:'#00ADD8', exp:'1 yr' },
    { name:'Express', icon:<SiExpress/>, cat:'BACKEND', color:'#fff', exp:'3 yrs' },
    { name:'.NET', icon:<SiDotnet/>, cat:'BACKEND', color:'#512BD4', exp:'2 yrs' },
    { name:'PostgreSQL', icon:<SiPostgresql/>, cat:'DATA', color:'#336791', exp:'3 yrs' },
    { name:'MongoDB', icon:<SiMongodb/>, cat:'DATA', color:'#47A248', exp:'3 yrs' },
    { name:'Supabase', icon:<SiSupabase/>, cat:'DATA', color:'#3ECF8E', exp:'2 yrs' },
    { name:'Firebase', icon:<SiFirebase/>, cat:'DATA', color:'#FFCA28', exp:'3 yrs' },
    { name:'Pandas', icon:<SiPandas/>, cat:'DATA', color:'#E70488', exp:'2 yrs' },
    { name:'Docker', icon:<FaDocker/>, cat:'INFRA', color:'#2496ED', exp:'2 yrs' },
    { name:'AWS', icon:<FaAws/>, cat:'INFRA', color:'#FF9900', exp:'1 yr' },
    { name:'Vercel', icon:<SiVercel/>, cat:'INFRA', color:'#fff', exp:'3 yrs' },
    { name:'Better Auth', icon:<FaLock/>, cat:'INFRA', color:'#c8ff00', exp:'1 yr' },
];

const TechStack = () => {
    const [filter, setFilter] = useState('ALL');
    const [hoveredTech, setHoveredTech] = useState(null);
    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);
    const marqueeRef = useRef(null);

    const filtered = techs.filter(t => filter === 'ALL' || t.cat === filter);

    // Scroll-triggered entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current, { y: 60, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
            });
            if (marqueeRef.current) {
                gsap.fromTo(marqueeRef.current, { opacity: 0 }, {
                    opacity: 1, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: marqueeRef.current, start: "top 90%", toggleActions: "play none none reverse" }
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Re-animate cards on filter
    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (!cards.length) return;
        gsap.fromTo(cards, { y: 25, opacity: 0, scale: 0.92 }, {
            y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.03, ease: "power3.out",
        });
    }, [filter]);

    const onCardEnter = useCallback((e, i, tech) => {
        setHoveredTech(tech);
        const el = cardsRef.current[i];
        if (!el) return;
        gsap.to(el, { scale: 1.04, duration: 0.35, ease: "power2.out" });
        gsap.to(el.querySelector('.tech-icon'), { scale: 1.2, color: tech.color, duration: 0.3, ease: "power2.out" });
    }, []);

    const onCardLeave = useCallback((i) => {
        setHoveredTech(null);
        const el = cardsRef.current[i];
        if (!el) return;
        gsap.to(el, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        gsap.to(el.querySelector('.tech-icon'), { scale: 1, color: 'var(--text-muted)', duration: 0.3 });
    }, []);

    return (
        <section ref={sectionRef} id="tech" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            {/* Marquee band at top */}
            <div ref={marqueeRef} style={{
                borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)',
                padding: '1rem 0', overflow: 'hidden', opacity: 0,
            }}>
                <div className="marquee-track" style={{ gap: '4rem', fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.8rem,1.5vw,1rem)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {[...Array(2)].map((_, j) => (
                        <div key={j} style={{ display: 'flex', gap: '4rem', paddingRight: '4rem' }}>
                            {['Full-Stack Engineering', '•', 'System Design', '•', 'API Architecture', '•', 'Cloud Infrastructure', '•', 'Performance Optimization', '•', 'UI Engineering', '•'].map((t, i) => (
                                <span key={i} style={{ color: t === '•' ? 'var(--accent)' : undefined, flexShrink: 0 }}>{t}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="section-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div ref={headRef} style={{ marginBottom: '3rem', opacity: 0 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.75rem' }}>
                                Tools I Ship With
                            </span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                My Toolkit
                            </h2>
                        </div>

                        {/* Filters */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {categories.map(c => (
                                <button key={c} onClick={() => setFilter(c)} data-cursor="expand" className={`tag ${filter === c ? 'active' : ''}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hr-accent" />
                </div>

                {/* Hover preview label */}
                <div style={{ height: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {hoveredTech && (
                        <>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: hoveredTech.color, transition: 'color 0.3s ease' }}>{hoveredTech.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{hoveredTech.exp}</span>
                            <span className="tag" style={{ fontSize: '0.5rem' }}>{hoveredTech.cat}</span>
                        </>
                    )}
                </div>

                {/* Cards Grid */}
                <div ref={gridRef} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '1px',
                    background: 'var(--border-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                }}>
                    {filtered.map((tech, i) => (
                        <div
                            key={tech.name}
                            ref={el => cardsRef.current[i] = el}
                            data-cursor="expand"
                            onMouseEnter={e => onCardEnter(e, i, tech)}
                            onMouseLeave={() => onCardLeave(i)}
                            style={{
                                background: 'var(--bg-primary)',
                                padding: '1.75rem 1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                cursor: 'none',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="tech-icon" style={{
                                fontSize: '1.6rem', color: 'var(--text-muted)',
                                transition: 'color 0.3s ease, transform 0.3s ease',
                            }}>
                                {tech.icon}
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                                color: 'var(--text-muted)', textAlign: 'center',
                                letterSpacing: '0.05em', lineHeight: 1.3,
                            }}>
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
                    marginTop: '3rem', background: 'var(--border-subtle)',
                    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                }}>
                    {[
                        { num: '5+', label: 'Languages' },
                        { num: '10+', label: 'Frameworks & Tools' },
                        { num: '20+', label: 'Projects Deployed' },
                    ].map(s => (
                        <div key={s.label} style={{
                            background: 'var(--bg-primary)', padding: '2rem',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        }}>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.num}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;