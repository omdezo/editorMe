import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll: React.FC = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // direction: 'vertical', // default
            // gestureDirection: 'vertical', // default
            // smooth: true, // default
            // mouseMultiplier: 1, // default
            // smoothTouch: false, // default
            // touchMultiplier: 2, // default
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
