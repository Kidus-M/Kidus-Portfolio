// src/components/Layout.js
"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

const Layout = ({ children }) => {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
            <div className="font-sans antialiased selection:bg-accent selection:text-white">
                <nav className="fixed top-0 w-full z-50 flex justify-between px-8 py-6 mix-blend-difference text-white">
                    <span className="font-mono text-sm tracking-widest">KIDUS.DEV</span>
                    <div className="flex gap-6 font-mono text-xs">
                        <a href="#work" className="hover:text-accent transition-colors">/WORK</a>
                        <a href="#tech" className="hover:text-accent transition-colors">/STACK</a>
                        <a href="#contact" className="hover:text-accent transition-colors">/CONTACT</a>
                    </div>
                </nav>
                <main>{children}</main>
            </div>
        </ReactLenis>
    )
}

export default Layout