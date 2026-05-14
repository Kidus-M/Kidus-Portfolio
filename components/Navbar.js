"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
    { href: "#hero", label: "Home", num: "01" },
    { href: "#tech", label: "Tech Stack", num: "02" },
    { href: "#work", label: "Projects", num: "03" },
    { href: "#contact", label: "Contact", num: "04" },
];

export default function Navbar() {
    const [active, setActive] = useState("hero");

    useEffect(() => {
        const sections = links
            .map((link) => document.querySelector(link.href))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.target?.id) {
                    setActive(visible.target.id);
                }
            },
            { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75] }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <aside className="sticky top-0 z-50 hidden h-screen w-full flex-col items-center justify-between border-r border-[#eaeaea] bg-white px-7 py-12 text-[#0a0a0a] lg:col-start-1 lg:row-start-1 lg:flex xl:px-9">
                <div>
                    <a
                        href="#hero"
                        data-cursor="expand"
                        className="font-heading text-2xl font-bold uppercase leading-none tracking-normal text-[#0a0a0a]"
                        aria-label="Kidus Mesfin home"
                    >
                        KM.
                    </a>
                </div>

                <nav className="flex flex-col items-start gap-8 xl:gap-10">
                    {links.map((link) => {
                        const isActive = active === link.href.slice(1);

                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                data-cursor="expand"
                                className="group relative flex flex-col items-start gap-0.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                                {isActive && (
                                    <span className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
                                )}
                                <span
                                    className={
                                        isActive
                                            ? "text-[#0a0a0a]"
                                            : "text-zinc-400 group-hover:text-zinc-600"
                                    }
                                >
                                    {link.num}
                                </span>
                                <span
                                    className={
                                        isActive
                                            ? "text-[#0a0a0a]"
                                            : "text-zinc-400 group-hover:text-zinc-600"
                                    }
                                >
                                    {link.label}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                <div>
                    <p className="font-sans text-[4px] font-bold uppercase leading-[1.8] tracking-wider text-zinc-400">
                        &copy; 2024
                        <br />
                        Kidus Mesfin
                        <br />
                        All rights reserved.
                    </p>
                </div>
            </aside>

            {/* Mobile Header remains unchanged */}
            <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[#eaeaea] bg-white/95 px-5 py-4 text-[#0a0a0a] backdrop-blur-md lg:hidden">
                <a href="#hero" data-cursor="expand" className="font-heading text-2xl font-bold uppercase">
                    KM.
                </a>
                <a
                    href="#work"
                    data-cursor="expand"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-normal"
                >
                    Projects
                    <ArrowUpRight className="h-4 w-4" />
                </a>
            </header>
        </>
    );
}