import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaDatabase, FaAws, FaDocker, FaGitAlt,
    FaPython, FaLock, FaServer, FaCode
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiGo, SiMongodb,
    SiPostgresql, SiFirebase, SiSupabase, SiExpress, SiFastapi,
    SiDotnet, SiVercel, SiPandas, SiShadcnui, SiGin
} from 'react-icons/si';

// --- DATA ---
const techCategories = {
    ALL: 'ALL',
    FRONTEND: 'INTERFACE',
    BACKEND: 'COMPUTE',
    DATABASE: 'STORAGE',
    DEVOPS: 'INFRA & TOOLS'
};

const techs = [
    // FRONTEND
    { name: 'Next.js', icon: <SiNextdotjs />, category: techCategories.FRONTEND, color: '#fff' },
    { name: 'React', icon: <FaReact />, category: techCategories.FRONTEND, color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, category: techCategories.FRONTEND, color: '#3178C6' },
    { name: 'Tailwind', icon: <SiTailwindcss />, category: techCategories.FRONTEND, color: '#38B2AC' },
    { name: 'Shadcn UI', icon: <SiShadcnui />, category: techCategories.FRONTEND, color: '#fff' },

    // BACKEND
    { name: 'Node.js', icon: <FaNodeJs />, category: techCategories.BACKEND, color: '#339933' },
    { name: 'Go (Golang)', icon: <SiGo />, category: techCategories.BACKEND, color: '#00ADD8' },
    { name: 'Python', icon: <FaPython />, category: techCategories.BACKEND, color: '#3776AB' },
    { name: 'FastAPI', icon: <SiFastapi />, category: techCategories.BACKEND, color: '#009688' },
    { name: 'Gin Gonic', icon: <SiGin />, category: techCategories.BACKEND, color: '#00ADD8' },
    { name: 'Express', icon: <SiExpress />, category: techCategories.BACKEND, color: '#fff' },
    { name: '.NET Core', icon: <SiDotnet />, category: techCategories.BACKEND, color: '#512BD4' },

    // DATABASE / DATA
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: techCategories.DATABASE, color: '#336791' },
    { name: 'MongoDB', icon: <SiMongodb />, category: techCategories.DATABASE, color: '#47A248' },
    { name: 'Supabase', icon: <SiSupabase />, category: techCategories.DATABASE, color: '#3ECF8E' },
    { name: 'Firebase', icon: <SiFirebase />, category: techCategories.DATABASE, color: '#FFCA28' },
    { name: 'Pandas', icon: <SiPandas />, category: techCategories.DATABASE, color: '#150458' },

    // DEVOPS / TOOLS
    { name: 'Docker', icon: <FaDocker />, category: techCategories.DEVOPS, color: '#2496ED' },
    { name: 'AWS', icon: <FaAws />, category: techCategories.DEVOPS, color: '#FF9900' },
    { name: 'Vercel', icon: <SiVercel />, category: techCategories.DEVOPS, color: '#fff' },
    { name: 'Better-Auth', icon: <FaLock />, category: techCategories.DEVOPS, color: '#ff5722' },
];

const TechStack = () => {
    const [filter, setFilter] = useState(techCategories.ALL);

    const filteredTechs = techs.filter(t =>
        filter === techCategories.ALL ? true : t.category === filter
    );

    return (
        <section id="tech" className="py-32 px-6 md:px-20 bg-surface min-h-screen flex flex-col justify-center">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="font-heading text-4xl md:text-6xl mb-4">System<br/>Architecture</h2>
                    <p className="font-mono text-secondary text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        // OPERATIONAL STACK
                    </p>
                </div>

                {/* Filter Tabs - Styled like a toggle switch */}
                <div className="flex flex-wrap gap-2">
                    {Object.values(techCategories).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full font-mono text-xs border transition-all duration-300 ${
                                filter === cat
                                    ? 'bg-white text-black border-white font-bold'
                                    : 'bg-transparent text-secondary border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid System */}
            <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredTechs.map((tech) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            key={tech.name}
                            className="group relative aspect-square bg-background border border-white/5 hover:border-white/20 transition-colors flex flex-col items-center justify-center gap-4 p-4 cursor-default"
                        >
                            {/* Hover Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
                            />

                            <div className="text-4xl text-secondary group-hover:text-white transition-colors z-10 duration-300">
                                {tech.icon}
                            </div>

                            <div className="text-center z-10">
                <span className="block font-heading text-sm text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-1">
                  {tech.category}
                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Decorative Footer for this section */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center font-mono text-xs text-gray-600">
                <span>CPU: 12%</span>
                <span>MEM: 4.2GB</span>
                <span>UPTIME: 99.9%</span>
            </div>
        </section>
    );
};

export default TechStack;