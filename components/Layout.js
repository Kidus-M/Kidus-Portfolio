import { ReactLenis } from "lenis/react";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <CustomCursor />
      <Navbar />
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <main id="main-content">{children}</main>
      <Footer />
    </ReactLenis>
  );
}
