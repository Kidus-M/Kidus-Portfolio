import { ReactLenis } from 'lenis/react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.8, smoothTouch: false }}>
            {/* Noise texture overlay for depth */}
            <div className="noise-overlay" aria-hidden="true" />
            
            {/* Custom animated cursor */}
            <CustomCursor />
            
            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>{children}</main>
        </ReactLenis>
    );
};

export default Layout;