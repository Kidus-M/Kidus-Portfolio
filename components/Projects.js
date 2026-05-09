import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode, FaPaintBrush } from 'react-icons/fa';
import { useLenis } from 'lenis/react';

import StreamSynx from "@/assets/StreamSynx.png";
import AndroWebsite from "@/assets/AndroWebsite.png";
import SpawnPoint from "@/assets/SpawnPoint.png";
import Homely from "@/assets/Homely.jpg";
import FPL from "@/assets/fpl.jpg";
import CL from "@/assets/CL.jpg";
import hmk from "@/assets/HMK.jpg";
import PharmaLink from "@/assets/PHARMALINK.png";
import Altium from "@/assets/Altium Logo.svg";
import OpalLuxe from "@/assets/OPAL LUXE .png";
import AndroLogo from "@/assets/Andro/Logo-1.png";
import AndroPrimary from "@/assets/Andro/primary.png";
import Androicons from "@/assets/Andro/icons.png";
import Androfont1 from "@/assets/Andro/font1.png";
import Androfont2 from "@/assets/Andro/font2.png";
import Androcolors from "@/assets/Andro/colors.png";
import Androbc1 from "@/assets/Andro/bc1.png";
import Androbc2 from "@/assets/Andro/bc2.png";
import MissLogo from "@/assets/MissSummers/logos-01.png";
import Missprimary from "@/assets/MissSummers/primary.png";
import Missicons from "@/assets/MissSummers/icons.png";
import Missfont1 from "@/assets/MissSummers/font1.png";
import Missfont2 from "@/assets/MissSummers/font2.png";
import Misscolors from "@/assets/MissSummers/colors.png";
import MissSummers from "@/assets/MissSummers/summers.png";
import CigarLogo from "@/assets/cigar-lounge/Logo.png";
import CigarLounge1 from "@/assets/cigar-lounge/Jazz Night.jpg";
import CigarLounge2 from "@/assets/cigar-lounge/New Years Cigar Lounge.jpg";
import CigarLounge3 from "@/assets/cigar-lounge/WD ad1.jpg";
import CigarLounge4 from "@/assets/cigar-lounge/WD ad2.jpg";
import CigarLounge5 from "@/assets/cigar-lounge/WD ad10.jpg";
import RomanPrimary from "@/assets/Romans/primary.png";
import RomanSecondary from "@/assets/Romans/secondary.png";
import Nitsuh1 from "@/assets/Nitsuh/Nitsuh-01.jpg";
import Nitsuh2 from "@/assets/Nitsuh/Nitsuh-02.jpg";
import Nitsuh3 from "@/assets/Nitsuh/Nitsuh-03.jpg";
import Nitsuh4 from "@/assets/Nitsuh/Nitsuh-04.jpg";
import Nitsuh5 from "@/assets/Nitsuh/Nitsuh-05.jpg";
import Nitsuh6 from "@/assets/Nitsuh/Nitsuh-06.jpg";
import Nitsuh7 from "@/assets/Nitsuh/Nitsuh-07.jpg";
import Nitsuh8 from "@/assets/Nitsuh/Nitsuh-08.jpg";
import Nitsuh9 from "@/assets/Nitsuh/Nitsuh-09.jpg";
import Khaab1 from "@/assets/Khaab/Khaab.png";
import Khaab2 from "@/assets/Khaab/kp-02.jpg";
import Khaab3 from "@/assets/Khaab/kp-03.jpg";
import Khaab4 from "@/assets/Khaab/kp-04.jpg";
import Khaab5 from "@/assets/Khaab/kp-05.jpg";
import Safari from "@/assets/Safari Rifle/Safari.png";
import Safari1 from "@/assets/Safari Rifle/sf-01.jpg";
import Safari2 from "@/assets/Safari Rifle/sf-02.jpg";
import Safari3 from "@/assets/Safari Rifle/sf-03.jpg";
import Safari4 from "@/assets/Safari Rifle/sf-04.jpg";
import Safari5 from "@/assets/Safari Rifle/sf-05.jpg";

gsap.registerPlugin(ScrollTrigger);

const engProjects = [
    { id:"01", title:"StreamSynx", cat:"Streaming Platform", desc:"Synchronized watch parties — movies, sports, together in real time.", image:StreamSynx, live:"https://streamsynx.vercel.app", gh:"https://github.com/kidus-m/streamsync", tech:["Next.js","Firebase","Tailwind","TMDB API"], details:"Real-time video sync between users in different locations with room management, playback controls, and low-latency communication.", yr:"2024" },
    { id:"02", title:"Andro Solutions", cat:"Corporate Platform", desc:"A digital identity for a tech consultancy — built for conversion.", image:AndroWebsite, live:"https://andro-solutions.vercel.app", gh:"", tech:["Next.js","Tailwind","Framer Motion"], details:"The official Andro Solutions website with responsive layouts, scroll-driven animations, and SEO-first architecture.", yr:"2024" },
    { id:"03", title:"Spawn Point", cat:"Healthcare Simulation", desc:"Simulate, manage, and optimize a virtual hospital.", image:SpawnPoint, live:"", gh:"", tech:["C#","Guna UI","SQL"], details:"Hospital management sim with patient AI, staff scheduling, and resource allocation challenges.", yr:"2023" },
    { id:"04", title:"Homely", cat:"Service Marketplace", desc:"Connecting households with vetted service providers.", image:Homely, live:"", gh:"https://github.com/example/homely", tech:["Next.js","Firebase","Node.js"], details:"Service marketplace where clients hire, track, and rate providers. Providers manage schedules and payments.", yr:"2023" },
    { id:"05", title:"FPL Bot", cat:"AI / Automation", desc:"Your FPL squad's smartest advisor — on Telegram.", image:FPL, live:"https://t.me/FPL_personal_AI_bot", gh:"https://github.com/Kidus-M/FPLbot", tech:["Python","PTB","Telegram API"], details:"Analyzes squad, budget, and performance to offer smart transfer suggestions via real-time chat.", yr:"2024" },
    { id:"06", title:"Wolfden Cigar", cat:"Luxury E-Commerce", desc:"A digital experience matching the lounge's sophistication.", image:CL, live:"wolfdenaddis.com", gh:"", tech:["Next.js","Firebase","Node.js"], details:"Curated cigar collections, membership options, event booking, and refined design.", yr:"2023" },
    { id:"07", title:"Altium", cat:"Social Network", desc:"Share moments. Build connections. Stay real.", image:Altium, live:"", gh:"", tech:["React","Node.js","MongoDB","Express"], details:"MERN-stack social platform — posts, photos, real-time interactions.", yr:"2023" },
    { id:"08", title:"HMK Pharmacy", cat:"Desktop Software", desc:"Battle-tested pharmacy management for local clinics.", image:hmk, live:"", gh:"", tech:["Java","AWT","Swing","SQL Server"], details:"Legacy desktop app managing large pharmaceutical inventory datasets.", yr:"2022" },
    { id:"09", title:"Pharma-Link", cat:"Enterprise System", desc:"End-to-end pharmaceutical inventory and billing pipeline.", image:PharmaLink, live:"", gh:"", tech:["C#",".NET","WinForms","SQL Server"], details:"Robust .NET solution for inventory tracking and billing cycles.", yr:"2022" },
    { id:"10", title:"StreamSynx Mobile", cat:"Mobile App", desc:"The StreamSynx experience — native on your phone.", image:StreamSynx, live:"https://streamsynx.vercel.app/download", gh:"https://github.com/kidus-m/streamsynx-app", tech:["Flutter","Firebase","TMDB API"], details:"Mobile companion with room management and synchronized playback.", yr:"2024" },
    { id:"11", title:"OpalLuxe", cat:"E-Commerce", desc:"Where luxury meets code — full-stack retail done right.", image:OpalLuxe, live:"https://opalluxe.vercel.app/", gh:"https://github.com/marXus-3D/opalluxe", tech:["Laravel","React","Tailwind CSS"], details:"Full-stack ecommerce: REST APIs, product management, secure checkout, admin dashboard.", yr:"2024" },
];

const designProjects = [
    { id:"g-01", title:"Andro Logo", cat:"Branding", desc:"Complete brand identity for Andro Solutions.", images:[AndroLogo,AndroPrimary,Androbc1,Androbc2,Androfont1,Androfont2,Androcolors,Androicons] },
    { id:"g-02", title:"Wolf Den Cigar", cat:"Social Media", desc:"High-end social media content design.", images:[CigarLogo,CigarLounge1,CigarLounge2,CigarLounge3,CigarLounge4,CigarLounge5] },
    { id:"g-03", title:"Miss Summers", cat:"Visual Identity", desc:"Soft, vibrant branding for a lifestyle brand.", images:[MissLogo,MissSummers,Missprimary,Misscolors,Missicons,Missfont1,Missfont2] },
    { id:"g-04", title:"Romans", cat:"Logo Design", desc:"Strong, classical logo concepts.", images:[RomanPrimary,RomanSecondary] },
    { id:"g-05", title:"Nitsuh's Pastry", cat:"Visual Identity", desc:"Warm, appetizing branding for artisan pastry.", images:[Nitsuh1,Nitsuh2,Nitsuh3,Nitsuh4,Nitsuh5,Nitsuh6,Nitsuh7,Nitsuh8,Nitsuh9] },
    { id:"g-06", title:"Khaab", cat:"Visual Identity", desc:"Elegant branding for a feminine lifestyle brand.", images:[Khaab1,Khaab2,Khaab3,Khaab4,Khaab5] },
    { id:"g-07", title:"Safari Rifle", cat:"Visual Identity", desc:"Bold branding for outdoor adventure.", images:[Safari,Safari1,Safari2,Safari3,Safari4,Safari5] },
];
const safeDesign = designProjects.map(p => ({ ...p, images: p.images.filter(Boolean) }));

/* ─── SLIDE-IN MODAL ─── */
const Modal = ({ project, isOpen, onClose, type }) => {
    const lenis = useLenis();
    const panelRef = useRef(null);

    useEffect(() => {
        if (isOpen) { document.body.style.overflow="hidden"; lenis?.stop(); }
        else { document.body.style.overflow=""; lenis?.start(); }
        return () => { document.body.style.overflow=""; lenis?.start(); };
    }, [isOpen, lenis]);

    useEffect(() => {
        if (!panelRef.current || !isOpen) return;
        gsap.fromTo(panelRef.current, { x:'100%' }, { x:0, duration:0.6, ease:"power4.out" });
    }, [isOpen]);

    if (!project || !isOpen) return null;

    return (
        <>
            <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)', zIndex:60, cursor:'none' }} />
            <div ref={panelRef} data-lenis-prevent style={{
                position:'fixed', right:0, top:0, height:'100%', width:'100%', maxWidth:'580px',
                background:'var(--bg-surface)', borderLeft:'1px solid var(--border-default)',
                zIndex:70, overflowY:'auto', padding:'2.5rem clamp(1.5rem,4vw,2.5rem)',
            }}>
                <button onClick={onClose} data-cursor="expand" style={{
                    position:'sticky', top:0, float:'right', background:'var(--bg-elevated)', border:'1px solid var(--border-default)',
                    borderRadius:'50%', width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center',
                    color:'var(--text-secondary)', cursor:'none', zIndex:5,
                }}><FaTimes size={12}/></button>

                <div style={{ paddingTop:'1rem', paddingBottom:'3rem' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'0.5rem' }}>
                        {type==='eng' ? '— Case Study' : '— Gallery'}
                    </span>
                    <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'1.5rem' }}>{project.title}</h2>

                    {type==='eng' && (
                        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                            <div style={{ position:'relative', aspectRatio:'16/9', borderRadius:'var(--radius-md)', overflow:'hidden', border:'1px solid var(--border-default)' }}>
                                <Image src={project.image} alt={project.title} fill style={{ objectFit:'cover' }} />
                            </div>
                            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                                {project.live && <a href={project.live} target="_blank" rel="noreferrer" data-cursor="expand" style={{ flex:1, minWidth:'130px', padding:'0.75rem', background:'var(--accent)', color:'var(--bg-primary)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-mono)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', textAlign:'center', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem' }}><FaExternalLinkAlt size={9}/> Live</a>}
                                {project.gh && <a href={project.gh} target="_blank" rel="noreferrer" data-cursor="expand" style={{ flex:1, minWidth:'130px', padding:'0.75rem', border:'1px solid var(--border-default)', color:'var(--text-primary)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase', textAlign:'center', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem' }}><FaGithub size={11}/> Code</a>}
                            </div>
                            <p style={{ fontSize:'0.9rem', lineHeight:1.8, color:'var(--text-secondary)' }}>{project.details}</p>
                            <div>
                                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:'0.5rem' }}>Built With</span>
                                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem' }}>
                                    {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                        </div>
                    )}

                    {type==='design' && (
                        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                            <p style={{ fontSize:'0.9rem', lineHeight:1.8, color:'var(--text-secondary)', marginBottom:'0.5rem' }}>{project.desc}</p>
                            {project.images?.map((img, idx) => (
                                <div key={idx} style={{ borderRadius:'var(--radius-sm)', overflow:'hidden', border:'1px solid var(--border-subtle)' }}>
                                    <Image src={img} alt={`${project.title} ${idx}`} width={800} height={600} style={{ width:'100%', height:'auto', display:'block' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

/* ─── MAIN ─── */
const Projects = () => {
    const [tab, setTab] = useState('eng');
    const [selected, setSelected] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(-1);
    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const rowsRef = useRef([]);
    const previewRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current, { y:50, opacity:0 }, {
                y:0, opacity:1, duration:1.2, ease:"power3.out",
                scrollTrigger:{ trigger:sectionRef.current, start:"top 80%", toggleActions:"play none none reverse" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Stagger rows on tab switch
    useEffect(() => {
        const rows = rowsRef.current.filter(Boolean);
        if (!rows.length) return;
        gsap.fromTo(rows, { y:20, opacity:0 }, { y:0, opacity:1, duration:0.4, stagger:0.05, ease:"power3.out" });
    }, [tab]);

    // Floating image preview follows cursor
    useEffect(() => {
        if (!previewRef.current) return;
        const move = (e) => {
            if (hoveredIdx < 0) return;
            gsap.to(previewRef.current, { x: e.clientX + 20, y: e.clientY - 100, duration: 0.4, ease: "power2.out" });
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [hoveredIdx]);

    const hoveredProject = hoveredIdx >= 0 ? engProjects[hoveredIdx] : null;

    return (
        <section ref={sectionRef} id="work" className="section-padding" style={{ background:'var(--bg-primary)', position:'relative', minHeight:'100vh' }}>
            {/* Floating image preview on hover — desktop only */}
            <div ref={previewRef} className="hidden md:block" style={{
                position:'fixed', top:0, left:0, width:'300px', height:'200px',
                borderRadius:'var(--radius-md)', overflow:'hidden', pointerEvents:'none',
                zIndex:40, opacity: hoveredProject ? 1 : 0,
                border:'1px solid var(--border-default)',
                transition:'opacity 0.3s ease',
                boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
            }}>
                {hoveredProject && <Image src={hoveredProject.image} alt="" fill style={{ objectFit:'cover' }} />}
            </div>

            <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
                {/* Header */}
                <div ref={headRef} style={{ marginBottom:'3rem', opacity:0 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', marginBottom:'2rem' }}>
                        <div>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'0.75rem' }}>Featured Projects</span>
                            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1 }}>
                                Work That<br/>Speaks for Itself
                            </h2>
                        </div>
                        <div style={{ display:'flex', gap:'2px', background:'var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'2px', border:'1px solid var(--border-subtle)' }}>
                            {[{k:'eng',l:'Engineering',i:<FaCode size={10}/>},{k:'design',l:'Design',i:<FaPaintBrush size={10}/>}].map(t=>(
                                <button key={t.k} onClick={()=>setTab(t.k)} data-cursor="expand" style={{
                                    padding:'0.55rem 1.25rem', borderRadius:'6px', fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase', border:'none', cursor:'none', display:'flex', alignItems:'center', gap:'0.4rem', transition:'all 0.3s ease',
                                    background: tab===t.k ? 'var(--accent)' : 'transparent',
                                    color: tab===t.k ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                    fontWeight: tab===t.k ? 600 : 400,
                                }}>{t.i}{t.l}</button>
                            ))}
                        </div>
                    </div>
                    <div className="hr-accent" />
                </div>

                {/* Engineering List */}
                {tab==='eng' && engProjects.map((p, i) => (
                    <div key={p.id} ref={el=>rowsRef.current[i]=el}
                        onClick={()=>setSelected({data:p,type:'eng'})}
                        onMouseEnter={()=>setHoveredIdx(i)}
                        onMouseLeave={()=>setHoveredIdx(-1)}
                        data-cursor="expand"
                        style={{
                            display:'grid', gridTemplateColumns:'3rem 1fr auto auto', alignItems:'center', gap:'clamp(0.75rem,2vw,2rem)',
                            padding:'1.25rem 0', borderBottom:'1px solid var(--border-subtle)', cursor:'none',
                            transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.paddingLeft='1.5rem';
                            e.currentTarget.style.borderColor='var(--accent)';
                            e.currentTarget.querySelector('.proj-title').style.color='var(--accent)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.paddingLeft='0';
                            e.currentTarget.style.borderColor='var(--border-subtle)';
                            e.currentTarget.querySelector('.proj-title').style.color='var(--text-primary)';
                        }}
                    >
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--text-muted)' }}>/{p.id}</span>
                        <div>
                            <h3 className="proj-title" style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.1rem,2.5vw,1.75rem)', fontWeight:700, letterSpacing:'-0.02em', transition:'color 0.3s ease', marginBottom:'0.15rem' }}>{p.title}</h3>
                            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--text-muted)', lineHeight:1.4 }}>{p.desc}</span>
                        </div>
                        <span className="tag" style={{ display:'none' }}>{p.cat}</span>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>{p.yr}</span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent)', opacity:0.6 }}>→</span>
                        </div>
                    </div>
                ))}

                {/* Design Grid */}
                {tab==='design' && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1px', background:'var(--border-subtle)', borderRadius:'var(--radius-sm)', overflow:'hidden' }}>
                        {safeDesign.map((p,i) => (
                            <div key={p.id} ref={el=>rowsRef.current[i]=el}
                                onClick={()=>setSelected({data:p,type:'design'})}
                                data-cursor="expand"
                                style={{ position:'relative', aspectRatio:'4/5', background:'var(--bg-card)', overflow:'hidden', cursor:'none' }}
                            >
                                {p.images[0] && <Image src={p.images[0]} alt={p.title} fill style={{ objectFit:'cover', opacity:0.6, transition:'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                                    onMouseEnter={e=>{e.target.style.opacity='1';e.target.style.transform='scale(1.06)';}}
                                    onMouseLeave={e=>{e.target.style.opacity='0.6';e.target.style.transform='scale(1)';}}
                                />}
                                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)', pointerEvents:'none' }} />
                                <div style={{ position:'absolute', bottom:0, left:0, padding:'1.25rem', zIndex:2 }}>
                                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'0.25rem' }}>{p.cat}</span>
                                    <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.1rem', fontWeight:700, color:'var(--text-primary)' }}>{p.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={!!selected} project={selected?.data} type={selected?.type} onClose={()=>setSelected(null)} />
        </section>
    );
};

export default Projects;