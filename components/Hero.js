"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen overflow-hidden bg-white text-black"
        >
            <div className="flex flex-col-reverse lg:flex-row h-full min-h-screen">
                
                {/* Left Content */}
                <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:pl-24 lg:pr-12 py-20 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col"
                    >
                        <p className="mb-6 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">
                            HELLO, I&apos;M
                        </p>
                        
                        {/* Increased font weight to make it punchier */}
                        <h1 className="font-sans text-[clamp(4rem,9vw,9rem)] font-black leading-[0.85] tracking-tighter text-[#0a0a0a] mb-10">
                            Kidus
                            <br />
                            Mesfin
                        </h1>

                        <div className="flex flex-col gap-5 mb-12 w-full max-w-md">
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#0a0a0a] font-bold whitespace-nowrap">
                                    FULL STACK DEVELOPER
                                </span>
                                <span className="h-[1px] w-24 bg-zinc-300" />
                            </div>
                            <p className="text-[15px] md:text-[17px] leading-relaxed text-zinc-600 font-medium max-w-[340px]">
                                I build exceptional digital experiences that are fast, scalable, and beautifully designed.
                            </p>
                        </div>

                        {/* FIXED: Added 'w-max' and explicitly defined padding to prevent collapsing */}
                        <a
                            href="#work"
                            className="inline-flex w-max items-center justify-center gap-5 bg-[#0a0a0a] px-8 py-4 font-sans text-[11px] md:text-xs uppercase tracking-[0.15em] text-white hover:bg-zinc-800 transition-all duration-300 group"
                        >
                            VIEW MY WORK
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </motion.div>
                </div>

                {/* Right Content / Portrait */}
                <div className="relative flex-1 bg-[#f4f4f4] min-h-[60vh] lg:min-h-screen w-full lg:w-1/2 overflow-hidden flex items-end justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Make sure the src exactly matches the file name in your /public folder */}
                        <Image
                            src="/portrait.png" 
                            alt="Kidus Mesfin Portrait"
                            fill
                            className="object-cover object-bottom grayscale contrast-125"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </motion.div>

                    {/* Circular Badge */}
                    <div className="absolute top-10 right-10 lg:top-14 lg:right-14 w-28 h-28 md:w-32 md:h-32 z-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite]">
                            <defs>
                                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                            </defs>
                            <text fontSize="8.5" fontWeight="700" fill="#0a0a0a" letterSpacing="2.5" className="uppercase font-sans">
                                <textPath href="#circlePath">
                                    AVAILABLE FOR FREELANCE • AVAILABLE FOR FREELANCE •
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 right-10 hidden lg:flex flex-col items-center gap-12 pointer-events-none z-10">
                        <span className="rotate-90 font-sans text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a] font-bold origin-left translate-y-4">
                            SCROLL
                        </span>
                        <div className="h-24 w-[1px] bg-[#0a0a0a]/20" />
                    </div>
                </div>

            </div>
        </section>
    );
}