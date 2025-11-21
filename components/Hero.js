// src/components/Hero.js
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen md:mt-0 mt-30 flex flex-col justify-center px-6 md:px-20 border-b border-white/10 bg-[url('/grid.svg')]">
            {/* Background Grid Logic */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Left: The Pitch */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
            <span className="font-mono text-accent text-sm tracking-wider mb-4 block">
              // FULL STACK ENGINEER
            </span>
                        <h1 className="font-heading text-5xl md:text-8xl font-bold leading-[0.9] mb-8">
                            Building <br />
                            Scalable <br />
                            Logic.
                        </h1>
                        <p className="text-secondary max-w-md text-lg leading-relaxed mb-8">
                            I don't just design websites; I engineer high-performance web applications.
                            Focusing on architecture, scalability, and clean code.
                        </p>
                        <button className="px-8 py-4 border border-white/20 rounded-full font-mono text-sm hover:bg-white hover:text-black transition-all duration-300">
                            VIEW DOCUMENTATION (WORK)
                        </button>
                    </motion.div>
                </div>

                {/* Right: The Code Evidence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="lg:block"
                >
                    <div className="bg-[#111] border border-white/10 rounded-lg p-6 font-mono text-xs md:text-sm shadow-2xl">
                        <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-gray-400 space-y-2">
                            <p><span className="text-purple-400">const</span> developer <span className="text-white">=</span> <span className="text-yellow-300">{"{"}</span></p>
                            <p className="pl-4">name: <span className="text-green-400">'Kidus Mesfin'</span>,</p>
                            <p className="pl-4">role: <span className="text-green-400">'Software Engineer'</span>,</p>
                            <p className="pl-4">focus: <span className="text-green-400">['Performance', 'Scalability', 'UX']</span>,</p>
                            <p className="pl-4">stack: <span className="text-yellow-300">{"{"}</span></p>
                            <p className="pl-8">frontend: <span className="text-green-400">'Next.js'</span>,</p>
                            <p className="pl-8">backend: <span className="text-green-400">'Node.js'</span></p>
                            <p className="pl-4"><span className="text-yellow-300">{"}"}</span></p>
                            <p><span className="text-yellow-300">{"}"}</span>;</p>
                            <p className="mt-4 animate-pulse text-accent">_</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;