import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaGithub, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name:'', email:'', subject:'', message:'' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const modalRef = useRef(null);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch("https://formspree.io/f/mldbdqbn", { method:"POST", headers:{'Content-Type':'application/json'}, body:JSON.stringify(formData) });
            if (response.ok) { setSubmitStatus('success'); setFormData({name:'',email:'',subject:'',message:''}); setTimeout(()=>{setIsModalOpen(false);setSubmitStatus(null);},2000); }
            else throw new Error('Failed');
        } catch { setSubmitStatus('error'); }
        finally { setIsSubmitting(false); }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current, { y:80, opacity:0 }, { y:0, opacity:1, duration:1.4, ease:"power3.out",
                scrollTrigger:{ trigger:sectionRef.current, start:"top 75%", toggleActions:"play none none reverse" }
            });
            gsap.fromTo(contentRef.current, { y:40, opacity:0 }, { y:0, opacity:1, duration:1, ease:"power3.out",
                scrollTrigger:{ trigger:sectionRef.current, start:"top 65%", toggleActions:"play none none reverse" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!modalRef.current) return;
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(modalRef.current, { opacity:0, scale:0.95, y:30 }, { opacity:1, scale:1, y:0, duration:0.5, ease:"power4.out" });
        } else {
            document.body.style.overflow = '';
        }
    }, [isModalOpen]);

    const socials = [
        { icon:<FaGithub size={20}/>, href:"https://github.com/Kidus-M", label:"GitHub" },
        { icon:<FaInstagram size={20}/>, href:"https://www.instagram.com/kidus._.m", label:"Instagram" },
        { icon:<FaLinkedin size={20}/>, href:"https://www.linkedin.com/in/kidus0237", label:"LinkedIn" },
        { icon:<FaTelegram size={20}/>, href:"https://t.me/kidus_mesfin", label:"Telegram" },
    ];

    return (
        <>
            <section ref={sectionRef} id="contact" className="section-padding" style={{ background:'var(--bg-primary)', position:'relative', overflow:'hidden', borderTop:'1px solid var(--border-subtle)' }}>
                {/* Ambient glow */}
                <div style={{ position:'absolute', bottom:'-20%', right:'-10%', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)', filter:'blur(100px)', pointerEvents:'none' }} />

                <div style={{ maxWidth:'900px', position:'relative', zIndex:2 }}>
                    <div ref={headingRef} style={{ opacity:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
                            <div className="status-dot" />
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)' }}>Ready to build?</span>
                        </div>
                        <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:0.95, marginBottom:'2.5rem' }}>
                            Let's engineer<br/><span style={{ color:'var(--accent)' }}>something robust.</span>
                        </h2>
                    </div>

                    <div ref={contentRef} style={{ opacity:0, display:'flex', flexDirection:'column', gap:'3rem' }}>
                        {/* CTAs */}
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center' }}>
                            <button onClick={() => setIsModalOpen(true)} data-cursor="expand" className="magnetic-btn"
                                style={{ padding:'1rem 2.5rem', background:'var(--accent)', color:'var(--bg-primary)', border:'none', borderRadius:'var(--radius-full)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'none' }}>
                                Initiate Contact
                            </button>
                            <a href="/resume.pdf" download="Kidus_Mesfin_Resume.pdf" data-cursor="expand"
                                style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', textDecoration:'none', borderBottom:'1px solid var(--border-default)', paddingBottom:'2px', transition:'color 0.3s ease' }}
                                onMouseEnter={e=>e.target.style.color='var(--text-secondary)'}
                                onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>
                                Download Resume ↓
                            </a>
                        </div>

                        {/* Socials */}
                        <div style={{ paddingTop:'2rem', borderTop:'1px solid var(--border-subtle)' }}>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:'1.25rem' }}>Connect</span>
                            <div style={{ display:'flex', gap:'1.5rem' }}>
                                {socials.map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="expand" aria-label={s.label}
                                        style={{ color:'var(--text-muted)', transition:'color 0.3s ease, transform 0.3s ease', display:'inline-flex' }}
                                        onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.transform='translateY(0)'; }}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ paddingTop:'2rem', borderTop:'1px solid var(--border-subtle)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>© {new Date().getFullYear()} Kidus Mesfin</span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>Built with Next.js & GSAP</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            {isModalOpen && (
                <>
                    <div onClick={() => setIsModalOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(12px)', zIndex:60 }} />
                    <div ref={modalRef} style={{
                        position:'fixed', inset:0, margin:'auto', width:'calc(100% - 2rem)', maxWidth:'480px', height:'fit-content', maxHeight:'90vh', overflowY:'auto',
                        background:'var(--bg-surface)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-lg)', padding:'2rem', zIndex:70,
                    }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
                            <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.25rem', fontWeight:700 }}>Initialize Connection</h3>
                            <button onClick={() => setIsModalOpen(false)} data-cursor="expand" style={{ background:'none', border:'1px solid var(--border-default)', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)', cursor:'none' }}><FaTimes size={12} /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                            {[{name:'name',type:'text',label:'Name',ph:'Your Name'},{name:'email',type:'email',label:'Email',ph:'email@example.com'},{name:'subject',type:'text',label:'Subject',ph:'Project Inquiry'}].map(f=>(
                                <div key={f.name}>
                                    <label style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:'0.375rem' }}>{f.label}</label>
                                    <input type={f.type} name={f.name} placeholder={f.ph} required value={formData[f.name]} onChange={handleChange} className="form-field" />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-muted)', display:'block', marginBottom:'0.375rem' }}>Message</label>
                                <textarea name="message" rows="4" placeholder="Tell me about your project..." required value={formData.message} onChange={handleChange} className="form-field" style={{ resize:'vertical' }} />
                            </div>

                            {submitStatus === 'success' && <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'var(--accent)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', background:'var(--accent-dim)', padding:'0.75rem', borderRadius:'var(--radius-md)' }}><FaCheckCircle /> Sent successfully</div>}
                            {submitStatus === 'error' && <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#ff4444', fontFamily:'var(--font-mono)', fontSize:'0.7rem', background:'rgba(255,68,68,0.1)', padding:'0.75rem', borderRadius:'var(--radius-md)' }}><FaExclamationCircle /> Failed. Try again.</div>}

                            <button type="submit" disabled={isSubmitting} data-cursor="expand"
                                style={{
                                    width:'100%', padding:'1rem', borderRadius:'var(--radius-md)', border:'none', fontFamily:'var(--font-mono)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', transition:'all 0.3s ease',
                                    background: isSubmitting ? 'var(--bg-elevated)' : 'var(--accent)', color: isSubmitting ? 'var(--text-muted)' : 'var(--bg-primary)',
                                }}>
                                {isSubmitting ? 'Sending...' : <><FaPaperPlane size={10}/> Send Message</>}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default Contact;