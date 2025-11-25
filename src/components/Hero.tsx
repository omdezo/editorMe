import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Aperture, Maximize, Focus } from 'lucide-react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Position (0-1)
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth Mouse for Lens
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth);
        mouseY.set(clientY / innerHeight);
    };

    // Lens Size
    const lensSize = 350;

    // Clip Path for the "Polished" Layer
    const clipPath = useTransform(
        [smoothX, smoothY],
        ([x, y]: number[]) => {
            const px = x * 100;
            const py = y * 100;
            return `circle(${lensSize / 2}px at ${px} % ${py} %)`;
        }
    );

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-screen w-full bg-black overflow-hidden relative cursor-none select-none font-sans"
        >
            {/* 1. RAW LAYER (Background - Grayscale & Grainy) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/omar-01.jpg"
                    alt="Omar Raw"
                    className="w-full h-full object-cover filter grayscale contrast-[1.2] brightness-75 blur-[1px]"
                />
                {/* Heavy Grain Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black/90" />

                {/* Raw Data Overlay */}
                <div className="absolute top-32 left-10 font-mono text-xs text-white/30 flex flex-col gap-1 z-20">
                    <span>IMG_RAW_001.CR3</span>
                    <span>ISO 1600 / f/2.8</span>
                    <span>AWAITING_GRADE</span>
                </div>
            </div>

            {/* 2. POLISHED LAYER (Foreground - Revealed by Lens) */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{ clipPath }}
            >
                <img
                    src="/omar-01.jpg"
                    alt="Omar Polished"
                    className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.1] brightness-110"
                />
                {/* Polished Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-teal-500/20 mix-blend-overlay" />
            </motion.div>

            {/* 3. LENS UI (The Ring) */}
            <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                    left: useTransform(smoothX, x => `calc(${x * 100} % - ${lensSize / 2}px)`),
                    top: useTransform(smoothY, y => `calc(${y * 100} % - ${lensSize / 2}px)`),
                    width: lensSize,
                    height: lensSize,
                }}
            >
                {/* Ring */}
                <div className="absolute inset-0 rounded-full border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-[0px]" />

                {/* Crosshairs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/80" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0.5 h-3 bg-white/80" />
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white/80" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white/80" />

                {/* Center Focus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                </div>

                {/* Lens Data */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-mono text-white font-bold tracking-widest whitespace-nowrap bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    <span className="text-emerald-400">IN_FOCUS</span>
                    <span className="w-[1px] h-3 bg-white/20" />
                    <span>1/250</span>
                </div>
            </motion.div>

            {/* 4. TYPOGRAPHY (Static but High Impact) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 mix-blend-difference">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter mix-blend-difference">
                        OMAR
                    </h1>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="h-[1px] w-16 bg-white/50" />
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[0.5em] uppercase">
                            Editor
                        </h2>
                        <div className="h-[1px] w-16 bg-white/50" />
                    </div>
                </motion.div>
            </div>

            {/* 5. BOTTOM UI */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-30 pointer-events-none text-white mix-blend-difference">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                        <Aperture size={14} />
                        <span>APERTURE: F/1.4</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                        <Maximize size={14} />
                        <span>ZOOM: 100%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Focus size={14} className="text-red-500 animate-spin-slow" />
                    <span className="text-xs font-bold tracking-widest opacity-80">REC</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
