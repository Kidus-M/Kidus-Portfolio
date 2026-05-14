import { ReactLenis } from 'lenis/react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.8, smoothTouch: false }}>
            <div
                className="min-h-screen bg-[#fafafa] text-[#0a0a0a] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] max-w-full mx-auto"
                style={{ "--sidebar-width": "clamp(120px, 16vw, 240px)" }}
            >
                <div className="noise-overlay" aria-hidden="true" />
                <CustomCursor />
                <Navbar />

                <main className="min-w-0 min-h-screen pt-50 lg:col-start-2 lg:pt-0 lg:pl-10 xl:pl-16 lg:pr-8 xl:pr-12 lg:pb-12 xl:pb-16 flex flex-col gap-12 xl:gap-16 w-full">
                    {children}
                </main>
            </div>
        </ReactLenis>
    );
};

export default Layout;
