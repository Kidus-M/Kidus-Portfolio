import { motion } from "framer-motion";
import { FaAws, FaDocker, FaLock, FaNodeJs, FaPython, FaReact, FaGithub } from "react-icons/fa";
import {
    SiDotnet,
    SiExpress,
    SiFastapi,
    SiFirebase,
    SiGo,
    SiMongodb,
    SiNextdotjs,
    SiPostgresql,
    SiSupabase,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
    SiJavascript,
    SiFigma,
} from "react-icons/si";

const techs = [
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Go", icon: <SiGo /> },
    { name: "Python", icon: <FaPython /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: ".NET", icon: <SiDotnet /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Supabase", icon: <SiSupabase /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "AWS", icon: <FaAws /> },
    { name: "Vercel", icon: <SiVercel /> },
    { name: "Auth", icon: <FaLock /> },
    { name: "Git & GitHub", icon: <FaGithub /> },
];

export default function TechStack() {
    return (
        <section id="tech" className="relative border border-[#eaeaea] bg-white text-black min-h-[calc(100vh-4rem)] lg:rounded-3xl shadow-sm flex items-center py-24 lg:py-0">
            <div className="mx-auto w-full max-w-[1600px] px-10 sm:px-16 lg:px-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 lg:items-center">
                    
                    {/* Left Column Text */}
                    <div className="lg:w-1/3 flex flex-col justify-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="mb-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                                Tech Stack
                            </p>
                            <h2 className="mb-8 font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-[#0a0a0a]">
                                Technologies
                                <br />
                                I work with
                            </h2>
                            <p className="max-w-xs text-[15px] leading-[1.6] text-zinc-600 font-medium tracking-tight">
                                A modern stack for building fast, scalable and responsive applications.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column Grid */}
                    <div className="lg:w-2/3">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                    },
                                },
                            }}
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-t border-l border-[#eaeaea]"
                        >
                            {techs.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    data-cursor="expand"
                                    className="group flex flex-col items-center justify-center aspect-square border-r border-b border-[#eaeaea] p-6 transition-all duration-500 hover:bg-[#fafafa]"
                                >
                                    <div className="text-4xl sm:text-5xl text-[#0a0a0a] opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-110 mb-4">
                                        {tech.icon}
                                    </div>
                                    <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-zinc-500 group-hover:text-[#0a0a0a] transition-colors duration-300 text-center">
                                        {tech.name}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
