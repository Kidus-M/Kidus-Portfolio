import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const followRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Check if we're on a touch device
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (isTouchDevice) return;

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const onMouseEnterInteractive = () => {
            dotRef.current?.classList.add('expanded');
            followRef.current?.classList.add('expanded');
        };

        const onMouseLeaveInteractive = () => {
            dotRef.current?.classList.remove('expanded');
            followRef.current?.classList.remove('expanded');
        };

        window.addEventListener('mousemove', onMouseMove);

        // Track interactive elements for cursor expansion
        const interactiveSelectors = 'a, button, [data-cursor="expand"], input, textarea';
        const addListeners = () => {
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
        };

        // Debounced observer to watch for DOM changes
        const observer = new MutationObserver(() => {
            addListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        addListeners();

        // Animation loop — dot follows instantly, circle lags behind
        const tick = () => {
            // Dot follows with light lerp
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            if (dotRef.current) {
                gsap.set(dotRef.current, {
                    x: mouse.current.x - dotRef.current.offsetWidth / 2,
                    y: mouse.current.y - dotRef.current.offsetHeight / 2,
                });
            }

            if (followRef.current) {
                gsap.set(followRef.current, {
                    x: pos.current.x - followRef.current.offsetWidth / 2,
                    y: pos.current.y - followRef.current.offsetHeight / 2,
                });
            }

            requestAnimationFrame(tick);
        };

        const rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={followRef} className="cursor-follow" />
        </>
    );
};

export default CustomCursor;
