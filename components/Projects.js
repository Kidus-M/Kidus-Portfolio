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

const engineeringProjects = [
    { id:"01", title:"StreamSynx", category:"Real-Time Streaming", description:"A synchronized streaming platform for couples and groups to enjoy movies or sports together remotely.", image:StreamSynx, liveDemo:"https://streamsynx.vercel.app", github:"https://github.com/kidus-m/streamsync", technologies:["Next.js","Firebase","Tailwind","TMDB API"], details:"StreamSynx allows real-time video synchronization between users in different locations. It includes room management, playback controls, and low-latency communication.", year:"2024" },
    { id:"02", title:"Andro Solutions", category:"Corporate Web", description:"Modern company website showcasing Andro Solutions services and portfolio.", image:AndroWebsite, liveDemo:"https://andro-solutions.vercel.app", github:"", technologies:["Next.js","Tailwind","Framer Motion"], details:"The official Andro Solutions website designed with a clean aesthetic, responsive layouts, smooth animations, and optimized SEO.", year:"2024" },
    { id:"03", title:"Spawn Point", category:"Health Care", description:"Hospital management simulation and patient care system.", image:SpawnPoint, liveDemo:"", github:"", technologies:["C#","Guna UI","SQL"], details:"Spawn Point Hospital Management lets users build, manage, and optimize a hospital with patient AI and resource allocation.", year:"2023" },
    { id:"04", title:"Homely", category:"Marketplace", description:"A platform connecting clients with trusted household service providers.", image:Homely, liveDemo:"", github:"https://github.com/example/homely", technologies:["Next.js","Firebase","Node.js"], details:"Homely is a service marketplace for household work. Clients can hire, track, and rate providers.", year:"2023" },
    { id:"05", title:"FPL Bot", category:"AI Automation", description:"Intelligent Fantasy Premier League assistant on Telegram.", image:FPL, liveDemo:"https://t.me/FPL_personal_AI_bot", github:"https://github.com/Kidus-M/FPLbot", technologies:["Python","PTB","Telegram API"], details:"The FPL Bot analyzes your squad and performance to offer smart transfer suggestions via chat.", year:"2024" },
    { id:"06", title:"Wolfden Cigar", category:"Luxury Lifestyle", description:"Gateway to the ultimate cigar experience with booking and e-commerce.", image:CL, liveDemo:"wolfdenaddis.com", github:"", technologies:["Next.js","Firebase","Node.js"], details:"Showcases curated cigar collections, membership options, and event booking.", year:"2023" },
    { id:"07", title:"Altium", category:"Social Network", description:"Social media app designed for seamless sharing.", image:Altium, liveDemo:"", github:"", technologies:["React","Node.js","MongoDB","Express"], details:"Connects people through sharing of posts, photos, and real-time interactions using MERN stack.", year:"2023" },
    { id:"08", title:"HMK Pharmacy", category:"Desktop Software", description:"Pharmacy management system for inventory and prescriptions.", image:hmk, liveDemo:"", github:"", technologies:["Java","AWT","Swing","SQL Server"], details:"Legacy desktop application for local pharmacy management handling large inventory datasets.", year:"2022" },
    { id:"09", title:"Pharma-Link", category:"Enterprise", description:"Inventory management, prescription tracking, and billing.", image:PharmaLink, liveDemo:"", github:"", technologies:["C#",".NET","WinForms","SQL Server"], details:"A robust .NET solution for pharmaceutical inventory tracking and billing cycles.", year:"2022" },
    { id:"10", title:"StreamSynx Mobile", category:"Mobile App", description:"Mobile companion for synchronized streaming.", image:StreamSynx, liveDemo:"https://streamsynx.vercel.app/download", github:"https://github.com/kidus-m/streamsynx-app", technologies:["Flutter","Firebase","TMDB API"], details:"Real-time video synchronization mobile app with room management and playback controls.", year:"2024" },
    { id:"11", title:"OpalLuxe", category:"E-Commerce", description:"Luxury online storefront with modern backend and frontend.", image:OpalLuxe, liveDemo:"https://opalluxe.vercel.app/", github:"https://github.com/marXus-3D/opalluxe", technologies:["Laravel","React","Tailwind CSS"], details:"Full-stack ecommerce with REST APIs, product management, authentication, and admin dashboard.", year:"2024" },
];

const designProjects = [
    { id:"g-01", title:"Andro Logo", category:"Branding", description:"Complete brand identity for Andro Solutions.", images:[AndroLogo,AndroPrimary,Androbc1,Androbc2,Androfont1,Androfont2,Androcolors,Androicons] },
    { id:"g-02", title:"Wolf Den Cigar", category:"Social Media", description:"High-end social media banners and post designs.", images:[CigarLogo,CigarLounge1,CigarLounge2,CigarLounge3,CigarLounge4,CigarLounge5] },
    { id:"g-03", title:"Miss Summers", category:"Visual Identity", description:"Soft, vibrant branding for a lifestyle brand.", images:[MissLogo,MissSummers,Missprimary,Misscolors,Missicons,Missfont1,Missfont2] },
    { id:"g-04", title:"Romans", category:"Logo Design", description:"Strong, classical logo design concepts.", images:[RomanPrimary,RomanSecondary] },
    { id:"g-05", title:"Nitsuh's Pastry", category:"Visual Identity", description:"Modern, vibrant branding for a pastry brand.", images:[Nitsuh1,Nitsuh2,Nitsuh3,Nitsuh4,Nitsuh5,Nitsuh6,Nitsuh7,Nitsuh8,Nitsuh9] },
    { id:"g-06", title:"Khaab", category:"Visual Identity", description:"Modern branding for a feminine brand.", images:[Khaab1,Khaab2,Khaab3,Khaab4,Khaab5] },
    { id:"g-07", title:"Safari Rifle", category:"Visual Identity", description:"Bold branding for an outdoor brand.", images:[Safari,Safari1,Safari2,Safari3,Safari4,Safari5] },
];

const safeDesignProjects = designProjects.map(p => ({ ...p, images: p.images.filter(img => img !== undefined) }));

/* ─── MODAL ─── */
const ProjectModal = ({ project, isOpen, onClose, type }) => {
    const lenis = useLenis();
    const panelRef = useRef(null);

    useEffect(() => {
        if (isOpen) { document.body.style.overflow = "hidden"; lenis?.stop(); }
        else { document.body.style.overflow = ""; lenis?.start(); }
        return () => { document.body.style.overflow = ""; lenis?.start(); };
    }, [isOpen, lenis]);

    useEffect(() => {
        if (!panelRef.current) return;
        if (isOpen) { gsap.fromTo(panelRef.current, { x: '100%' }, { x: 0, duration: 0.7, ease: "power4.out" }); }
    }, [isOpen]);

    if (!project || !isOpen) return null;

    return (
        <>
            <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:60, cursor:'none' }} />
            <div ref={panelRef} data-lenis-prevent style={{
                position:'fixed', right:0, top:0, height:'100%', width:'100%', maxWidth:'600px',
                background:'var(--bg-surface)', borderLeft:'1px solid var(--border-default)',
                zIndex:70, overflowY:'auto', padding:'clamp(1.5rem,4vw,3rem)',
            }}>
                <button onClick={onClose} data-cursor="expand" style={{
                    position:'absolute', top:'1.5rem', right:'1.5rem', background:'none', border:'1px solid var(--border-default)',
                    borderRadius:'50%', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center',
                    color:'var(--text-secondary)', cursor:'none', transition:'all 0.3s ease',
                }}><FaTimes size={14} /></button>

                <div style={{ marginTop:'3rem', paddingBottom:'3rem' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.75rem', display:'block' }}>
                        {type === 'eng' ? 'Case Study' : 'Visual Gallery'}
                    </span>
                    <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'2rem' }}>{project.title}</h2>

                    {type === 'eng' && (
                        <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
                            <div style={{ position:'relative', aspectRatio:'16/9', width:'100%', borderRadius:'var(--radius-md)', overflow:'hidden', border:'1px solid var(--border-default)' }}>
                                <Image src={project.image} alt={project.title} fill style={{ objectFit:'cover' }} />
                            </div>
                            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                                {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noreferrer" data-cursor="expand" style={{ flex:1, minWidth:'140px', padding:'0.875rem', background:'var(--accent)', color:'var(--bg-primary)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', textAlign:'center', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem' }}><FaExternalLinkAlt size={10} /> Live Demo</a>}
                                {project.github && <a href={project.github} target="_blank" rel="noreferrer" data-cursor="expand" style={{ flex:1, minWidth:'140px', padding:'0.875rem', border:'1px solid var(--border-default)', color:'var(--text-primary)', borderRadius:'var(--radius-md)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', textAlign:'center', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', transition:'border-color 0.3s ease' }}><FaGithub size={12} /> Source</a>}
                            </div>
                            <div>
                                <h4 style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.75rem', paddingBottom:'0.75rem', borderBottom:'1px solid var(--border-subtle)' }}>Project Details</h4>
                                <p style={{ fontSize:'0.95rem', lineHeight:1.8, color:'var(--text-secondary)' }}>{project.details}</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.75rem', paddingBottom:'0.75rem', borderBottom:'1px solid var(--border-subtle)' }}>Stack</h4>
                                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem' }}>
                                    {project.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'design' && (
                        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                            <p style={{ fontSize:'0.95rem', lineHeight:1.8, color:'var(--text-secondary)' }}>{project.description}</p>
                            {project.images?.map((img, idx) => (
                                <div key={idx} style={{ position:'relative', width:'100%', borderRadius:'var(--radius-sm)', overflow:'hidden', border:'1px solid var(--border-subtle)' }}>
                                    <Image src={img} alt={`${project.title} ${idx}`} width={800} height={600} style={{ width:'100%', height:'auto', objectFit:'cover', display:'block' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

/* ─── MAIN PROJECTS SECTION ─── */
const Projects = () => {
    const [activeTab, setActiveTab] = useState('engineering');
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const rowsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current, { y:50, opacity:0 }, { y:0, opacity:1, duration:1.2, ease:"power3.out", scrollTrigger:{ trigger:sectionRef.current, start:"top 80%", toggleActions:"play none none reverse" } });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const rows = rowsRef.current.filter(Boolean);
        if (!rows.length) return;
        gsap.fromTo(rows, { y:20, opacity:0 }, { y:0, opacity:1, duration:0.5, stagger:0.06, ease:"power3.out" });
    }, [activeTab]);

    return (
        <section ref={sectionRef} id="work" className="section-padding" style={{ background:'var(--bg-primary)', position:'relative' }}>
            <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
                {/* Header */}
                <div ref={headerRef} style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', marginBottom:'3rem', opacity:0 }}>
                    <div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:'0.75rem' }}>Archive 2022 — 2025</span>
                        <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1 }}>Selected<br/><span style={{ color:'var(--accent)' }}>Work</span></h2>
                    </div>
                    <div style={{ display:'flex', gap:'2px', background:'var(--border-subtle)', borderRadius:'var(--radius-md)', padding:'2px', border:'1px solid var(--border-subtle)' }}>
                        {[{k:'engineering',l:'Engineering',i:<FaCode/>},{k:'design',l:'Design Lab',i:<FaPaintBrush/>}].map(t=>(
                            <button key={t.k} onClick={()=>setActiveTab(t.k)} data-cursor="expand" style={{
                                padding:'0.6rem 1.5rem', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase', border:'none', cursor:'none', display:'flex', alignItems:'center', gap:'0.5rem', transition:'all 0.3s ease',
                                background: activeTab===t.k ? 'var(--accent)' : 'transparent',
                                color: activeTab===t.k ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                fontWeight: activeTab===t.k ? 600 : 400,
                            }}>{t.i} {t.l}</button>
                        ))}
                    </div>
                </div>

                <div className="hr-accent" style={{ marginBottom:'2rem' }} />

                {/* Engineering — List View */}
                {activeTab === 'engineering' && (
                    <div>
                        {engineeringProjects.map((project, i) => (
                            <div key={project.id} ref={el => rowsRef.current[i] = el}
                                onClick={() => setSelectedProject({ data:project, type:'eng' })}
                                data-cursor="expand"
                                style={{
                                    display:'grid', gridTemplateColumns:'auto 1fr auto auto', alignItems:'center', gap:'clamp(1rem,3vw,3rem)',
                                    padding:'1.5rem 0', borderBottom:'1px solid var(--border-subtle)', cursor:'none', transition:'all 0.4s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '1rem'; e.currentTarget.style.background = 'rgba(200,255,0,0.02)'; }}
                                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.background = 'transparent'; }}
                            >
                                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--text-muted)', minWidth:'2rem' }}>/{project.id}</span>
                                <div>
                                    <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.2rem,2.5vw,2rem)', fontWeight:700, letterSpacing:'-0.02em', transition:'color 0.3s ease' }}>{project.title}</h3>
                                </div>
                                <span className="tag" style={{ display:'none' }}>{project.category}</span>
                                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>{project.year}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Design — Grid View */}
                {activeTab === 'design' && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1px', background:'var(--border-subtle)' }}>
                        {safeDesignProjects.map((project, i) => (
                            <div key={project.id} ref={el => rowsRef.current[i] = el}
                                onClick={() => setSelectedProject({ data:project, type:'design' })}
                                data-cursor="expand"
                                style={{
                                    position:'relative', aspectRatio:'4/5', background:'var(--bg-card)', overflow:'hidden', cursor:'none',
                                }}
                            >
                                {project.images[0] && <Image src={project.images[0]} alt={project.title} fill style={{ objectFit:'cover', opacity:0.7, transition:'all 0.7s ease' }}
                                    onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1.05)'; }}
                                    onMouseLeave={e => { e.target.style.opacity = 0.7; e.target.style.transform = 'scale(1)'; }}
                                />}
                                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 50%)', pointerEvents:'none' }} />
                                <div style={{ position:'absolute', bottom:0, left:0, padding:'1.5rem', zIndex:2 }}>
                                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', display:'block', marginBottom:'0.375rem' }}>{project.category}</span>
                                    <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.25rem', fontWeight:700, color:'var(--text-primary)' }}>{project.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ProjectModal isOpen={!!selectedProject} project={selectedProject?.data} type={selectedProject?.type} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default Projects;