import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Aperture, Maximize } from 'lucide-react';

import heroVideo from '../assets/hero.mp4';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefRaw = useRef<HTMLVideoElement>(null);
    const videoRefPolished = useRef<HTMLVideoElement>(null);

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

    // Lens Size (Percentage of screen)
    const lensSize = 400; // px

    // Clip Path for the "Polished" Layer
    // We use a circle mask centered on the mouse
    const clipPath = useTransform(
        [smoothX, smoothY],
        ([x, y]: number[]) => {
            const px = x * 100;
            const py = y * 100;
            return `circle(${lensSize / 2}px at ${px}% ${py}%)`;
        }
    );

    // Sync videos
    useEffect(() => {
        const v1 = videoRefRaw.current;
        const v2 = videoRefPolished.current;

        if (v1 && v2) {
            v1.playbackRate = 2.0;
            v2.playbackRate = 2.0;
            const sync = () => {
                if (Math.abs(v1.currentTime - v2.currentTime) > 0.1) {
                    v2.currentTime = v1.currentTime;
                }
                requestAnimationFrame(sync);
            };
            sync();
        }
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-screen w-full bg-black overflow-hidden relative cursor-none select-none font-sans"
        >
            {/* 1. RAW LAYER (Background - The "Work") */}
            <div className="absolute inset-0 z-0 opacity-40">
                <video
                    ref={videoRefRaw}
                    src={heroVideo}
                    className="w-full h-full object-cover filter grayscale contrast-[0.8] blur-[2px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                {/* Grid Overlay for "Raw" feel */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />

                {/* Raw Data Overlay */}
                <div className="absolute top-10 left-10 font-mono text-xs text-white/30 flex flex-col gap-1">
                    <span>RAW_FOOTAGE_LOG_C</span>
                    <span>ISO 800 / 5600K / 24FPS</span>
                    <span>LUT: OFF</span>
                </div>
            </div>

            {/* 2. POLISHED LAYER (Foreground - The "Result") */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{ clipPath }}
            >
                <video
                    ref={videoRefPolished}
                    src={heroVideo}
                    className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.2] brightness-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                {/* Polished Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-teal-500/10 mix-blend-overlay" />
            </motion.div>

            {/* 3. LENS UI (The Ring) */}
            <motion.div
                className="absolute z-20 pointer-events-none rounded-full border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-[1px]"
                style={{
                    left: useTransform(smoothX, x => `calc(${x * 100}% - ${lensSize / 2}px)`),
                    top: useTransform(smoothY, y => `calc(${y * 100}% - ${lensSize / 2}px)`),
                    width: lensSize,
                    height: lensSize,
                }}
            >
                {/* Lens Markers */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-white" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-2 bg-white" />
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-white" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-1 bg-white" />

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />

                {/* Lens Data */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-mono text-white font-bold tracking-widest whitespace-nowrap">
                    <span className="text-emerald-400">FINAL_GRADE</span>
                    <span className="w-[1px] h-3 bg-white/20" />
                    <span>4K_UHD</span>
                </div>
            </motion.div>

            {/* 4. TYPOGRAPHY (Static but High Impact) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 mix-blend-difference">
                <h1 className="text-[10vw] font-black text-white leading-none tracking-tighter">
                    OMAR
                </h1>
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-white" />
                    <h2 className="text-xl font-bold text-white tracking-[0.5em] uppercase">
                        Production
                    </h2>
                    <div className="h-[1px] w-12 bg-white" />
                </div>
            </div>

            {/* 5. BOTTOM UI */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-30 pointer-events-none mix-blend-difference text-white">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                        <Aperture size={14} />
                        <span>LENS: 35MM PRIME</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                        <Maximize size={14} />
                        <span>ASPECT: 2.39:1</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-xs font-bold tracking-widest">LIVE PREVIEW</span>
                </div>
            </div>

        </section>
    );
};

export default Hero;
