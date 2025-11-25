import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Mouse
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    // Velocity for "Scrub" effect
    const velocityX = useVelocity(smoothX);
    const velocityY = useVelocity(smoothY);

    // Dynamic Transformations based on velocity/position
    const skewX = useTransform(velocityX, [-1000, 1000], [-15, 15]);
    const scale = useTransform(velocityX, [-1000, 1000], [0.9, 1.1]);

    // RGB Split Offsets
    const redX = useTransform(velocityX, [-2000, 2000], [-10, 10]);
    const blueX = useTransform(velocityX, [-2000, 2000], [10, -10]);
    const greenY = useTransform(velocityY, [-2000, 2000], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-screen w-full bg-black overflow-hidden relative cursor-none select-none font-sans flex items-center justify-center"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-black to-black pointer-events-none" />

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center">

                {/* The "Scrubber" Text Group */}
                <div className="relative">
                    {/* RGB Split Layers (Red) */}
                    <motion.h1
                        style={{ x: redX, skewX, scale, opacity: 0.7 }}
                        className="text-[15vw] md:text-[12vw] font-black text-red-500 absolute inset-0 mix-blend-screen select-none pointer-events-none blur-[1px]"
                    >
                        OMAR
                    </motion.h1>

                    {/* RGB Split Layers (Blue) */}
                    <motion.h1
                        style={{ x: blueX, skewX, scale, opacity: 0.7 }}
                        className="text-[15vw] md:text-[12vw] font-black text-blue-500 absolute inset-0 mix-blend-screen select-none pointer-events-none blur-[1px]"
                    >
                        OMAR
                    </motion.h1>

                    {/* RGB Split Layers (Green) */}
                    <motion.h1
                        style={{ y: greenY, skewX, scale, opacity: 0.7 }}
                        className="text-[15vw] md:text-[12vw] font-black text-green-500 absolute inset-0 mix-blend-screen select-none pointer-events-none blur-[1px]"
                    >
                        OMAR
                    </motion.h1>

                    {/* Main White Text */}
                    <motion.h1
                        style={{ skewX, scale }}
                        className="text-[15vw] md:text-[12vw] font-black text-white relative z-10 mix-blend-normal"
                    >
                        OMAR
                    </motion.h1>
                </div>

                <motion.div
                    style={{ skewX: useTransform(skewX, v => -v) }}
                    className="flex items-center gap-6 mt-4 overflow-hidden"
                >
                    <div className="h-[2px] w-12 bg-white/50" />
                    <h2 className="text-xl md:text-3xl font-bold text-white/80 tracking-[0.5em] uppercase">
                        Editor
                    </h2>
                    <div className="h-[2px] w-12 bg-white/50" />
                </motion.div>

            </div>

            {/* Playhead / Cursor */}
            <motion.div
                className="fixed top-0 bottom-0 w-[1px] bg-red-500 z-50 pointer-events-none mix-blend-difference"
                style={{ left: smoothX }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-500 text-black text-[10px] font-mono px-1 py-0.5 font-bold">
                    SCRUB
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-red-500 text-black text-[10px] font-mono px-1 py-0.5 font-bold">
                    {/* Display simulated timecode based on X position */}
                    <TimecodeDisplay x={smoothX} />
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                <ArrowDown size={16} className="animate-bounce" />
            </motion.div>

        </section>
    );
};

// Helper component for dynamic timecode
const TimecodeDisplay = ({ x }: { x: any }) => {
    const [timecode, setTimecode] = useState("00:00:00:00");

    useTransform(x, (latest: number) => {
        const totalFrames = Math.floor((latest / window.innerWidth) * 1000);
        const frames = totalFrames % 24;
        const seconds = Math.floor(totalFrames / 24) % 60;
        const minutes = Math.floor(totalFrames / (24 * 60));

        const f = frames.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');

        setTimecode(`00:${m}:${s}:${f}`);
    });

    // We need to use a ref or effect to update the text content to avoid re-rendering the whole tree
    // But for simplicity in this specific component structure, we'll let Framer handle the heavy lifting 
    // and just use a simple state update here which might be slightly less performant but cleaner code.
    // For *maximum* performance we'd use a ref and update textContent directly.

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = x.on("change", (latest: number) => {
            if (ref.current) {
                const totalFrames = Math.floor((latest / window.innerWidth) * 2000); // 2000 frames total width
                const frames = totalFrames % 24;
                const seconds = Math.floor(totalFrames / 24) % 60;
                const minutes = Math.floor(totalFrames / (24 * 60));

                const f = frames.toString().padStart(2, '0');
                const s = seconds.toString().padStart(2, '0');
                const m = minutes.toString().padStart(2, '0');

                ref.current.textContent = `00:${m}:${s}:${f}`;
            }
        });
        return () => unsubscribe();
    }, [x]);

    return <div ref={ref}>{timecode}</div>;
};

export default Hero;
