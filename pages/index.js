import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionTemplate,
    AnimatePresence
} from 'framer-motion';
import {
    Code2,
    Palette,
    Terminal,
    Cpu,
    Globe,
    Layout,
    Github,
    Linkedin,
    Twitter,
    ExternalLink,
    ChevronDown,
    Menu,
    X,
    Moon,
    Sun,
    Download,
    Send,
    MousePointer2
} from 'lucide-react';

// --- Data ---

const SKILLS = [
    { name: 'Next.js', level: 90 },
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind', level: 95 },
    { name: 'Node.js', level: 80 },
    { name: 'Figma', level: 90 },
    { name: 'Three.js', level: 60 },
    { name: 'PostgreSQL', level: 75 },
];

const PROJECTS = [
    {
        id: 1,
        title: "Full Stack Architect",
        category: "Development",
        description: "Building robust, scalable web applications. Once I figure out how to center a div.",
        image: "linear-gradient(to right, #10b981, #3b82f6)",
        tech: ["Next.js", "Supabase", "Vercel"],
        year: "2024"
    },
    {
        id: 2,
        title: "Brand Identity System",
        category: "Design",
        description: "Crafting visually appealing interfaces. Canva is for noobs. Let's talk if you disagree.",
        image: "linear-gradient(to right, #ec4899, #8b5cf6)",
        tech: ["Illustrator", "Figma", "Motion"],
        year: "2023"
    },
    {
        id: 3,
        title: "Tech Consulting",
        category: "Consulting",
        description: "All the technical stuff and what actually works. Admire the centering.",
        image: "linear-gradient(to right, #f59e0b, #ef4444)",
        tech: ["System Design", "Audit", "Strategy"],
        year: "2024"
    },
    {
        id: 4,
        title: "Immersive Portfolio",
        category: "Development",
        description: "A 3D-accelerated showcase of skills. Yes, this website.",
        image: "linear-gradient(to right, #6366f1, #14b8a6)",
        tech: ["React", "Three.js", "Framer"],
        year: "2025"
    }
];

const TESTIMONIALS = [
    {
        id: 1,
        text: "Kidus spent 50+ hours on Illustrator for our logo. It shows. The man is a pixel perfectionist.",
        author: "Sarah Jenkins",
        role: "CTO, StartUp Inc"
    },
    {
        id: 2,
        text: "He finally figured out how to center the div. Our website looks amazing now.",
        author: "Mark Davis",
        role: "Product Lead"
    }
];

// --- Utility Components ---

const ThemeToggle = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-emerald-400 transition-all hover:scale-110"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
            style={{ scaleX }}
        />
    );
};

const MouseFollower = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e, MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-emerald-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
            style={{ x: cursorX, y: cursorY }}
        />
    );
};

// --- 3D Card Component ---

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(MouseEvent) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

// --- Sections ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: '// home', href: '#hero' },
        { name: '// work', href: '#work' },
        { name: '// about', href: '#about' },
        { name: '// contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled || mobileMenuOpen
                    ? 'bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 py-4'
                    : 'bg-transparent border-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 dark:text-white text-slate-900">
                    <span className="text-emerald-500 font-mono">&lt;</span>
                    Kidus
                    <span className="text-emerald-500 font-mono">/&gt;</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <ThemeToggle />
                    <a
                        href="#contact"
                        className="px-5 py-2 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        Let's Talk
                    </a>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-slate-600 dark:text-slate-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-mono text-lg text-slate-600 dark:text-slate-400 hover:text-emerald-500"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const Hero = () => {
    // Simple Particle Effect using Canvas
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles= [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.2)'; // Emerald color

            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 - dist/1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-12 items-center">
                <motion.div
                    style={{ y: y1 }}
                    className="md:col-span-7 space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs"
                    >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
                        Open to new opportunities
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 leading-tight"
                    >
                        DESIGNER<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
              DEVELOPER
            </span><br />
                        PROBLEM SOLVER
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed"
                    >
                        I'm <strong className="text-emerald-500">Kidus Mesfin</strong>. I bridge the gap between engineering and design.
                        When I'm not debugging, I'm convincing myself that spending 50+ hours on Adobe Illustrator is healthy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#work"
                            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            View Projects
                            <ChevronDown className="w-4 h-4" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="md:col-span-5 relative hidden md:block"
                >
                    <TiltCard className="relative z-10">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">kidus.config.js</span>
                            </div>
                            <div className="font-mono text-sm space-y-2 text-slate-600 dark:text-slate-400">
                                <p><span className="text-purple-500">const</span> <span className="text-blue-500">portfolio</span> = {'{'}</p>
                                <p className="pl-4">developer: <span className="text-green-500">'Kidus Mesfin'</span>,</p>
                                <p className="pl-4">location: <span className="text-green-500">'Ethiopia'</span>,</p>
                                <p className="pl-4">style: <span className="text-green-500">['Minimal', 'Clean', 'Witty']</span>,</p>
                                <p className="pl-4">status: <span className="text-orange-500">'Centering divs...'</span></p>
                                <p>{'}'}</p>
                                <p className="text-slate-400 mt-4 text-xs animate-pulse">// Try hovering over this card</p>
                            </div>
                        </div>

                        {/* Decorative Elements behind card */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                    </TiltCard>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
            >
                <MousePointer2 className="w-6 h-6" />
            </motion.div>
        </section>
    );
};

const Gallery = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    return (
        <section id="work" className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Selected Works</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                            A collection of projects where I figured out how to center a div and more.
                        </p>
                    </div>

                    <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-lg overflow-x-auto">
                        {['All', 'Development', 'Design', 'Consulting'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                                    filter === cat
                                        ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-emerald-900/10 transition-all"
                            >
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                                        style={{ background: project.image }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white">
                                            {project.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{project.title}</h3>
                                        <ExternalLink className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">The Tech Stack</h2>
                    <div className="space-y-6">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                                    <span className="text-slate-500">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-emerald-500 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl rotate-6 opacity-20 blur-xl"></div>
                    <div className="relative bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <Terminal className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">My Approach</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            I believe in <span className="text-emerald-500 font-semibold">User-Centric Design</span> powered by robust engineering.
                            My workflow is simple: Plan, Design, Code, Cry about a bug, Fix it, Ship it.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Whether it's a simple landing page or a complex SaaS dashboard, I bring the same level of attention to detail.
                            Also, I'm really good at Googling things I don't know.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white"
                >
                    What People Are Saying
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm relative"
                        >
                            <div className="absolute top-6 right-8 text-6xl text-emerald-500/20 font-serif">"</div>
                            <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-6 relative z-10">
                                {t.text}
                            </p>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{t.author}</h4>
                                <span className="text-sm text-emerald-500">{t.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-white dark:bg-slate-900 transition-colors relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-50 dark:bg-emerald-900/10 -skew-x-12 translate-x-20"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden relative">
                    {/* Decorator */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="flex flex-col gap-4">
                                <a href="mailto:kidus@example.com" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500">
                                        <Layout size={18} />
                                    </div>
                                    kidus@example.com
                                </a>
                                <div className="flex items-center gap-4 mt-4">
                                    <a href="#" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-emerald-600 transition-all"><Github size={20} /></a>
                                    <a href="#" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition-all"><Linkedin size={20} /></a>
                                    <a href="#" className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-sky-500 transition-all"><Twitter size={20} /></a>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                                <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Hello..." />
                            </div>
                            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-slate-500 font-mono text-sm flex items-center justify-center gap-2">
                <Code2 size={14} />
                Built with Next.js, Tailwind & Framer Motion
            </p>
            <p className="text-slate-400 text-xs mt-2">
                © 2025 Kidus Mesfin. All rights reserved.
            </p>
        </footer>
    );
};

export default function Portfolio() {
    return (
        <div className="antialiased selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200">
            <ScrollProgress />
            <MouseFollower />
            <Navbar />
            <main className="overflow-hidden">
                <Hero />
                <Skills />
                <Gallery />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}