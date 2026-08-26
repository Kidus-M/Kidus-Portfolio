import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Footer from "./Footer";
import Preloader from "./Preloader";
import { ScrollTrigger } from "@/lib/motion";

const IntroContext = createContext(false);

/** True once the preloader has handed the viewport over. */
export const useIntroReady = () => useContext(IntroContext);

/** Keeps ScrollTrigger in step with Lenis' virtual scroll position. */
function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    ScrollTrigger.refresh();
    return () => lenis.off("scroll", update);
  }, [lenis]);

  return null;
}

export default function Layout({ children }) {
  const [ready, setReady] = useState(false);

  const onIntroDone = useCallback(() => {
    setReady(true);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          syncTouch: false,
        }}
      >
        <IntroContext.Provider value={ready}>
          <ScrollSync />
          <Preloader onDone={onIntroDone} />
          <Cursor />
          <Nav />

          <a href="#index" className="skip-link">
            Skip to content
          </a>

          <div className="grain" aria-hidden="true" />

          <main id="main-content">{children}</main>
          <Footer />
        </IntroContext.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
