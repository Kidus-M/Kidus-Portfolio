"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/public/Logo-2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
      <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div
            animate={{
              backgroundColor: isScrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)",
              boxShadow: isScrolled
                  ? "0 4px 20px rgba(0,0,0,0.05)"
                  : "0 2px 12px rgba(0,0,0,0.03)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="backdrop-blur-lg border border-[var(--color-border)]
                   rounded-full shadow-md px-5 md:px-8 py-3 flex items-center justify-between gap-4
                   max-w-[90vw] md:max-w-3xl"
        >
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
                src={Logo}
                alt="Logo"
                width={34}
                height={34}
                className="object-contain"
            />

          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 font-inter text-sm font-medium text-[var(--color-text-secondary)]">
            {links.map((link) => (
                <li key={link.href}>
                  <Link
                      href={link.href}
                      className="relative group hover:text-[var(--color-accent)] transition-all duration-200"
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[var(--color-accent)] rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[var(--color-surface-subtle)] transition"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.div>

        {/* Mobile Dropdown */}
        <motion.div
            initial={false}
            animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden md:hidden mt-3 rounded-2xl shadow-[var(--shadow-soft)]
                   bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <ul className="flex flex-col px-6 py-4 space-y-3 font-inter text-[var(--color-text-secondary)] text-sm">
            {links.map((link) => (
                <li key={link.href}>
                  <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>
  );
}
