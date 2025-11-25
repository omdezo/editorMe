import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Scissors, Monitor, ChevronRight, ChevronDown, Search, Folder, FileVideo, Settings, Aperture, Image as ImageIcon, Video } from 'lucide-react';

interface Clip {
    id: string;
    start: number; // 0-100 percentage
    width: number; // 0-100 percentage
    track: number;
    title: string;
    src: string;
    type: 'video' | 'audio' | 'image';
    color: string;
    duration: string;
}

const clips: Clip[] = [
    { id: 'c1', start: 0, width: 25, track: 0, title: 'A001_C004_RAW.MOV', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', type: 'video', color: 'bg-indigo-600', duration: '00:00:05:00' },
    { id: 'c2', start: 25, width: 15, track: 0, title: 'B002_C012_CITY.MP4', src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', type: 'video', color: 'bg-indigo-600', duration: '00:00:03:00' },
    { id: 'c3', start: 40, width: 30, track: 0, title: 'A001_C009_INT.MXF', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', type: 'video', color: 'bg-indigo-600', duration: '00:00:06:00' },
    { id: 'c4', start: 70, width: 30, track: 0, title: 'FINAL_COMP_v04.MOV', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', type: 'video', color: 'bg-teal-600', duration: '00:00:06:00' },

    { id: 'a1', start: 0, width: 45, track: 1, title: 'SFX_AMBIENCE_CITY.WAV', src: '', type: 'audio', color: 'bg-emerald-700', duration: '00:00:09:00' },
    { id: 'a2', start: 50, width: 40, track: 1, title: 'VO_NARRATION_TK02.WAV', src: '', type: 'audio', color: 'bg-emerald-700', duration: '00:00:08:00' },

    { id: 'fx1', start: 0, width: 100, track: 2, title: 'GRADE_ADJ_LAYER', src: '', type: 'image', color: 'bg-fuchsia-700', duration: '00:00:20:00' },
];

const tools = [
    { name: 'Adobe After Effects', category: 'VFX & Motion', type: 'adobe', code: 'Ae', color: 'bg-[#00005b] text-[#d291ff] border-[#d291ff]/30' },
    { name: 'Adobe Illustrator', category: 'Vector Art', type: 'adobe', code: 'Ai', color: 'bg-[#330000] text-[#ff9a00] border-[#ff9a00]/30' },
    { name: 'Adobe Audition', category: 'Audio Mixing', type: 'adobe', code: 'Au', color: 'bg-[#002e1f] text-[#00e2b3] border-[#00e2b3]/30' },
    { name: 'DaVinci Resolve', category: 'Color Grading', type: 'icon', icon: <Aperture size={24} />, color: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white' },
    { name: 'Adobe Premiere', category: 'Editing', type: 'adobe', code: 'Pr', color: 'bg-[#00005b] text-[#d291ff] border-[#d291ff]/30' },
    { name: 'Adobe Photoshop', category: 'Image Editing', type: 'adobe', code: 'Ps', color: 'bg-[#001e36] text-[#31a8ff] border-[#31a8ff]/30' },
    { name: 'Nano Banana Pro', category: 'Image Creation', type: 'icon', icon: <ImageIcon size={24} />, color: 'bg-yellow-400 text-black' },
    { name: 'Veo', category: 'Video Generation', type: 'icon', icon: <Video size={24} />, color: 'bg-emerald-500 text-white' },
];

const About: React.FC = () => {
    const [playheadX, setPlayheadX] = useState(35); // Start at 35%
    const [activeClip, setActiveClip] = useState<Clip | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);

    // Auto-play simulation
    useEffect(() => {
        let interval: number;
        if (isPlaying) {
            interval = setInterval(() => {
                setPlayheadX(prev => (prev + 0.2) % 100);
            }, 1000 / 30);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Update active clip based on playhead
    useEffect(() => {
        const clip = clips.find(c => c.track === 0 && playheadX >= c.start && playheadX <= c.start + c.width);
        setActiveClip(clip || null);
    }, [playheadX]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!timelineRef.current) return;
        // Only scrub if mouse button is down or just hovering? Let's do hover for ease
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPlayheadX(percentage);
        setIsPlaying(false); // Pause on manual scrub
    };

    const formatTimecode = (pct: number) => {
        const totalFrames = 3600; // 2 mins at 30fps
        const currentFrame = Math.floor((pct / 100) * totalFrames);
        const f = (n: number) => n.toString().padStart(2, '0');
        const m = Math.floor((currentFrame % (30 * 60 * 60)) / (30 * 60));
        const s = Math.floor((currentFrame % (30 * 60)) / 30);
        const fr = currentFrame % 30;
        return `00:${f(m)}:${f(s)}:${f(fr)}`;
    };

    return (
        <section id="about" className="py-24 bg-[#0f0f0f] text-gray-300 overflow-hidden select-none font-sans">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            ONLINE // EDIT_SUITE_01
                        </div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">WORKSTATION</h3>
                    </div>
                    <div className="flex gap-6 text-xs font-mono text-gray-500">
                        <span>CPU: <span className="text-gray-300">12%</span></span>
                        <span>GPU: <span className="text-gray-300">4%</span></span>
                        <span>RAM: <span className="text-gray-300">32GB</span></span>
                    </div>
                </div>

                {/* Main Workspace Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 h-[700px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden shadow-2xl">

                    {/* LEFT COLUMN: Project Bin (3 cols) */}
                    <div className="lg:col-span-3 bg-[#141414] border-r border-white/5 flex flex-col">
                        {/* Panel Header */}
                        <div className="h-8 bg-[#1f1f1f] border-b border-black flex items-center px-3 justify-between">
                            <span className="text-xs font-bold text-gray-400">PROJECT: PORTFOLIO_V1</span>
                            <Settings size={12} />
                        </div>

                        {/* Search */}
                        <div className="p-2 border-b border-white/5">
                            <div className="bg-[#0a0a0a] rounded px-2 py-1 flex items-center gap-2 text-xs border border-white/5">
                                <Search size={12} className="text-gray-500" />
                                <input type="text" placeholder="Search..." className="bg-transparent w-full outline-none text-gray-400 placeholder-gray-600" />
                            </div>
                        </div>

                        {/* Tree View */}
                        <div className="flex-1 overflow-y-auto p-2 text-xs font-medium text-gray-400">
                            <div className="flex items-center gap-1 py-1 text-white"><ChevronDown size={12} /><Folder size={12} className="text-blue-400" /> <span>Master Sequence</span></div>
                            <div className="pl-4">
                                <div className="flex items-center gap-1 py-1 hover:bg-white/5 rounded px-1 cursor-pointer"><FileVideo size={12} className="text-purple-400" /> <span>Main_Timeline_v04</span></div>
                            </div>

                            <div className="flex items-center gap-1 py-1 mt-2"><ChevronRight size={12} /><Folder size={12} className="text-yellow-400" /> <span>Footage</span></div>
                            <div className="pl-4 text-gray-500">
                                <div className="flex items-center gap-1 py-1"><FileVideo size={12} /> <span>A001_Raw</span></div>
                                <div className="flex items-center gap-1 py-1"><FileVideo size={12} /> <span>B002_City</span></div>
                            </div>

                            <div className="flex items-center gap-1 py-1 mt-2"><ChevronRight size={12} /><Folder size={12} className="text-green-400" /> <span>Audio</span></div>
                            <div className="flex items-center gap-1 py-1 mt-2"><ChevronRight size={12} /><Folder size={12} className="text-pink-400" /> <span>GFX</span></div>
                        </div>

                        {/* Metadata Panel */}
                        <div className="h-1/3 border-t border-white/5 bg-[#111] p-3 overflow-y-auto">
                            <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Clip Metadata</div>
                            {activeClip ? (
                                <div className="space-y-2 text-xs">
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="text-gray-600">Name</span>
                                        <span className="col-span-2 text-gray-300 truncate">{activeClip.title}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="text-gray-600">Dur</span>
                                        <span className="col-span-2 text-gray-300">{activeClip.duration}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="text-gray-600">Res</span>
                                        <span className="col-span-2 text-gray-300">3840x2160</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="text-gray-600">Codec</span>
                                        <span className="col-span-2 text-gray-300">ProRes 422 HQ</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs text-gray-700 italic">No clip selected</div>
                            )}
                        </div>
                    </div>

                    {/* MIDDLE/RIGHT COLUMN: Monitor & Timeline (9 cols) */}
                    <div className="lg:col-span-9 flex flex-col bg-[#0a0a0a]">

                        {/* TOP: Source & Program Monitors */}
                        <div className="h-[55%] flex border-b border-white/5">

                            {/* Source Monitor (Static/Placeholder) */}
                            <div className="hidden md:flex w-1/2 border-r border-white/5 flex-col bg-[#141414]">
                                <div className="h-8 bg-[#1f1f1f] border-b border-black flex items-center px-3 justify-between">
                                    <span className="text-xs font-bold text-gray-400">SOURCE: (NO CLIP)</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center bg-[#050505] relative">
                                    <div className="text-xs text-gray-700 font-mono">NO SIGNAL</div>
                                    {/* Scopes Overlay */}
                                    <div className="absolute bottom-2 left-2 w-20 h-16 border border-white/10 opacity-50" />
                                </div>
                                <div className="h-10 bg-[#1a1a1a] border-t border-black flex items-center justify-center gap-4">
                                    <div className="w-full px-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="w-0 h-full bg-gray-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Program Monitor (Active) */}
                            <div className="w-full md:w-1/2 flex flex-col bg-[#141414]">
                                <div className="h-8 bg-[#1f1f1f] border-b border-black flex items-center px-3 justify-between">
                                    <span className="text-xs font-bold text-emerald-500">PROGRAM: MASTER_SEQ</span>
                                    <div className="text-[10px] font-mono text-gray-400">FIT / 100%</div>
                                </div>
                                <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center group">
                                    <AnimatePresence mode='wait'>
                                        {activeClip ? (
                                            <motion.img
                                                key={activeClip.id}
                                                src={activeClip.src}
                                                initial={{ opacity: 0.8 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.1 }}
                                                className="w-full h-full object-contain"
                                                alt="Program"
                                            />
                                        ) : (
                                            <div className="text-center opacity-50">
                                                <div className="text-gray-600 font-mono text-sm tracking-widest">BLACK</div>
                                            </div>
                                        )}
                                    </AnimatePresence>

                                    {/* Overlays */}
                                    <div className="absolute top-4 right-4 font-mono text-emerald-400 text-lg font-bold drop-shadow-md">
                                        {formatTimecode(playheadX)}
                                    </div>
                                    <div className="absolute bottom-4 left-4 flex gap-1">
                                        <div className="w-1 h-4 bg-green-500" />
                                        <div className="w-1 h-4 bg-green-500" />
                                    </div>
                                </div>

                                {/* Transport Controls */}
                                <div className="h-10 bg-[#1a1a1a] border-t border-black flex items-center justify-between px-4">
                                    <div className="text-[10px] font-mono text-gray-500">00:00:00:00</div>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <Play size={14} className="fill-current cursor-pointer hover:text-white" onClick={() => setIsPlaying(!isPlaying)} />
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-500">00:02:00:00</div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM: Timeline */}
                        <div className="flex-1 bg-[#141414] flex flex-col relative">
                            {/* Timeline Toolbar */}
                            <div className="h-8 bg-[#1f1f1f] border-b border-black flex items-center px-2 gap-4 text-gray-500">
                                <div className="flex gap-1">
                                    <div className="p-1 hover:bg-white/10 rounded cursor-pointer text-blue-400"><Scissors size={14} /></div>
                                    <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><Monitor size={14} /></div>
                                </div>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <div className="text-[10px] font-mono">V1: Target</div>
                            </div>

                            {/* Time Ruler */}
                            <div className="h-6 bg-[#111] border-b border-white/5 relative overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="absolute top-0 bottom-0 border-l border-white/10 text-[9px] text-gray-600 pl-1 pt-0.5 select-none" style={{ left: `${i * 5.5}%` }}>
                                        {formatTimecode(i * 5.5)}
                                    </div>
                                ))}
                            </div>

                            {/* Tracks Container */}
                            <div
                                ref={timelineRef}
                                className="flex-1 relative overflow-hidden overflow-y-auto bg-[#111]"
                                onMouseMove={handleMouseMove}
                            >
                                {/* Playhead */}
                                <div
                                    className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-50 pointer-events-none"
                                    style={{ left: `${playheadX}%` }}
                                >
                                    <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 text-red-500">
                                        <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor">
                                            <path d="M0.5 0H10.5V6L5.5 11L0.5 6V0Z" />
                                        </svg>
                                    </div>
                                    <div className="absolute top-0 bottom-0 w-full bg-red-500/10" />
                                </div>

                                {/* Track V2 (FX) */}
                                <div className="h-16 border-b border-black/50 relative flex group">
                                    <div className="w-24 bg-[#1a1a1a] border-r border-black/50 flex flex-col justify-center px-2 z-10">
                                        <span className="text-[10px] font-bold text-gray-500">V2</span>
                                        <div className="flex gap-1 mt-1"><div className="w-2 h-2 bg-gray-700 rounded-sm" /></div>
                                    </div>
                                    <div className="flex-1 relative bg-[#161616]">
                                        {clips.filter(c => c.track === 2).map(clip => (
                                            <div key={clip.id} className={`absolute top-1 bottom-1 rounded-sm ${clip.color} opacity-60 border border-white/10 overflow-hidden`}
                                                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}>
                                                <div className="px-2 py-0.5 text-[9px] text-white/90 truncate font-medium">{clip.title}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Track V1 (Main) */}
                                <div className="h-16 border-b border-black/50 relative flex group">
                                    <div className="w-24 bg-[#1a1a1a] border-r border-black/50 flex flex-col justify-center px-2 z-10">
                                        <span className="text-[10px] font-bold text-blue-400">V1</span>
                                        <div className="flex gap-1 mt-1"><div className="w-2 h-2 bg-blue-900 rounded-sm border border-blue-500" /></div>
                                    </div>
                                    <div className="flex-1 relative bg-[#161616]">
                                        {clips.filter(c => c.track === 0).map(clip => (
                                            <div key={clip.id} className={`absolute top-1 bottom-1 rounded-sm ${clip.color} border border-white/10 overflow-hidden group-hover:brightness-110 transition-all`}
                                                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}>
                                                {/* Clip Content */}
                                                <div className="h-full w-full relative">
                                                    <div className="absolute top-0 left-0 right-0 h-4 bg-black/20 px-2 flex items-center">
                                                        <span className="text-[9px] text-white/90 truncate font-medium">{clip.title}</span>
                                                    </div>
                                                    {/* Thumbnails simulation */}
                                                    <div className="absolute bottom-0 left-0 right-0 top-4 opacity-30 flex overflow-hidden">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div key={i} className="flex-1 border-r border-white/5 bg-black/10" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Track A1 (Audio) */}
                                <div className="h-16 border-b border-black/50 relative flex group mt-1">
                                    <div className="w-24 bg-[#1a1a1a] border-r border-black/50 flex flex-col justify-center px-2 z-10">
                                        <span className="text-[10px] font-bold text-emerald-500">A1</span>
                                        <div className="flex gap-1 mt-1"><div className="w-2 h-2 bg-emerald-900 rounded-sm border border-emerald-500" /></div>
                                    </div>
                                    <div className="flex-1 relative bg-[#161616]">
                                        {clips.filter(c => c.track === 1).map(clip => (
                                            <div key={clip.id} className={`absolute top-1 bottom-1 rounded-sm ${clip.color} border border-white/10 overflow-hidden`}
                                                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}>
                                                <div className="px-2 py-0.5 text-[9px] text-white/90 truncate font-medium bg-black/20">{clip.title}</div>
                                                {/* Waveform */}
                                                <div className="absolute bottom-0 left-0 right-0 top-4 opacity-50 flex items-center gap-[1px] px-1">
                                                    {[...Array(40)].map((_, i) => (
                                                        <div key={i} className="w-full bg-black/50" style={{ height: `${Math.random() * 80 + 10}%` }} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools Marquee Banner */}
                <div className="mt-12 relative overflow-hidden group rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f] z-10 pointer-events-none" />

                    <div className="flex overflow-x-hidden">
                        <div className="animate-marquee whitespace-nowrap flex gap-8 py-6">
                            {[...tools, ...tools, ...tools].map((tool, index) => (
                                <div
                                    key={index}
                                    className="inline-flex items-center gap-4 px-6 py-4 bg-black/20 border border-white/5 rounded-lg hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300"
                                >
                                    {/* Logo Rendering */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg ${tool.color} ${tool.type === 'adobe' ? 'border-2' : ''}`}>
                                        {tool.type === 'adobe' ? (
                                            <span className="text-xl font-bold tracking-tighter">{tool.code}</span>
                                        ) : (
                                            tool.icon
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white/90 tracking-tight">
                                            {tool.name}
                                        </span>
                                        <span className="text-xs text-emerald-500/70 font-mono uppercase tracking-widest">
                                            {tool.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 py-6">
                            {[...tools, ...tools, ...tools].map((tool, index) => (
                                <div
                                    key={`clone-${index}`}
                                    className="inline-flex items-center gap-4 px-6 py-4 bg-black/20 border border-white/5 rounded-lg hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300"
                                >
                                    {/* Logo Rendering */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg ${tool.color} ${tool.type === 'adobe' ? 'border-2' : ''}`}>
                                        {tool.type === 'adobe' ? (
                                            <span className="text-xl font-bold tracking-tighter">{tool.code}</span>
                                        ) : (
                                            tool.icon
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white/90 tracking-tight">
                                            {tool.name}
                                        </span>
                                        <span className="text-xs text-emerald-500/70 font-mono uppercase tracking-widest">
                                            {tool.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
