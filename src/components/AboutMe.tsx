import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Plus, Target, Aperture, Layers, Zap } from 'lucide-react';

const AboutMe: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setMousePosition] = useState({ x: 0, y: 0 });

    // Motion values for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPct = (e.clientX - rect.left) / width - 0.5;
        const mouseYPct = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(mouseXPct);
        mouseY.set(mouseYPct);

        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Data points configuration
    const points = [
        { id: 1, x: 30, y: 40, label: "VISION", value: "Cinematic", icon: <Aperture size={14} />, delay: 0.2 },
        { id: 2, x: 70, y: 75, label: "DEPTH", value: "Multi-Layered", icon: <Layers size={14} />, delay: 0.4 },
        { id: 3, x: 80, y: 60, label: "IMPACT", value: "Visceral", icon: <Zap size={14} />, delay: 0.6 },
    ];

    return (
        <section
            ref={containerRef}
            className="min-h-screen bg-[#050505] text-white overflow-hidden relative flex items-center justify-center py-20 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Grid / HUD Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/50" />
                <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/50" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

                {/* Portrait Container */}
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative w-full max-w-md aspect-[3/4]"
                >
                    {/* Main Image */}
                    <div className="absolute inset-0 bg-slate-900 rounded-sm overflow-hidden border border-white/10 group">
                        <img
                            src="/omar-01.jpg"
                            alt="Portrait"
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                        />

                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-red-500/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-100" style={{ clipPath: 'inset(10% 0 80% 0)' }} />
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-100 delay-75" style={{ clipPath: 'inset(80% 0 10% 0)' }} />

                        {/* Tracking Points Overlay */}
                        {points.map((point) => (
                            <div
                                key={point.id}
                                className="absolute w-4 h-4 -ml-2 -mt-2 flex items-center justify-center"
                                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                            >
                                <Target className="text-red-500 animate-pulse" size={16} />
                                {/* Connecting Line (Simulated with absolute div for simplicity) */}
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    whileInView={{ width: 100, opacity: 1 }}
                                    transition={{ delay: point.delay, duration: 0.5 }}
                                    className={`absolute top-1/2 h-[1px] bg-red-500/50 origin-left ${point.x > 50 ? 'right-full rotate-180' : 'left-full'}`}
                                    style={{ width: '60px' }}
                                />

                                {/* Data Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: point.x > 50 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: point.delay + 0.3 }}
                                    className={`absolute top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm border border-white/20 p-2 rounded-sm whitespace-nowrap flex items-center gap-3 ${point.x > 50 ? 'right-[80px]' : 'left-[80px]'}`}
                                >
                                    <div className="text-red-500">{point.icon}</div>
                                    <div className="text-left">
                                        <div className="text-[10px] text-slate-400 tracking-widest">{point.label}</div>
                                        <div className="text-sm font-bold">{point.value}</div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Corners */}
                    <Plus className="absolute -top-2 -left-2 text-white/50" size={20} />
                    <Plus className="absolute -top-2 -right-2 text-white/50" size={20} />
                    <Plus className="absolute -bottom-2 -left-2 text-white/50" size={20} />
                    <Plus className="absolute -bottom-2 -right-2 text-white/50" size={20} />
                </motion.div>

                {/* Text Content */}
                <div className="max-w-lg z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-mono text-red-500 mb-4 tracking-[0.2em]">/// SUBJECT: OMAR</h2>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tighter">
                            VISUAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">ALCHEMIST</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 border-l-2 border-red-500/50 pl-6">
                            I don't just edit videos; I engineer emotions. Using a blend of technical precision and artistic intuition, I transform raw footage into compelling visual narratives that resonate.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">05+</div>
                                <div className="text-xs text-slate-500 tracking-widest uppercase">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">100+</div>
                                <div className="text-xs text-slate-500 tracking-widest uppercase">Projects Delivered</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
