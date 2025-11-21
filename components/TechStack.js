// src/components/TechStack.js
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';

const techs = [
    { name: 'Next.js', icon: <SiNextdotjs />, category: 'Frontend Core' },
    { name: 'React', icon: <FaReact />, category: 'UI Library' },
    { name: 'TypeScript', icon: <SiTypescript />, category: 'Type Safety' },
    { name: 'Tailwind', icon: <SiTailwindcss />, category: 'Styling Engine' },
    { name: 'Node.js', icon: <FaNodeJs />, category: 'Runtime' },
    { name: 'PostgreSQL', icon: <FaDatabase />, category: 'Database' },
    { name: 'AWS', icon: <FaAws />, category: 'Cloud Infra' },
    { name: 'Docker', icon: <FaDocker />, category: 'Containerization' },
];

const TechStack = () => {
    return (
        <section id="tech" className="py-32 px-6 md:px-20 bg-surface">
            <div className="mb-16">
                <h2 className="font-heading text-4xl md:text-6xl mb-4">System Architecture</h2>
                <p className="font-mono text-secondary text-sm">// TOOLS & TECHNOLOGIES I USE TO DEPLOY</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techs.map((tech, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                        className="p-6 border border-white/5 bg-background rounded-sm flex flex-col justify-between aspect-square transition-colors cursor-default group"
                    >
                        <div className="text-4xl text-secondary group-hover:text-accent transition-colors">
                            {tech.icon}
                        </div>
                        <div>
                            <span className="block font-mono text-xs text-secondary mb-1">{tech.category}</span>
                            <span className="font-heading text-xl">{tech.name}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;