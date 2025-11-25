import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Maximize2, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import FilmGrain from '../components/FilmGrain';

import { portfolioData } from '../data/portfolio';

const WorkGallery: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const category = portfolioData.find(item => item.id === categoryId);
    const videos = category ? category.videos : [];
    const title = category ? category.name : 'Work';

    // Handle body class for cursor visibility
    useEffect(() => {
        if (selectedVideo) {
            document.body.classList.add('video-open');
        } else {
            document.body.classList.remove('video-open');
        }
        return () => {
            document.body.classList.remove('video-open');
        };
    }, [selectedVideo]);

    if (!categoryId || !videos) {
        return <div>Category not found</div>;
    }

    return (
        <div className="bg-slate-950 min-h-screen text-white selection:bg-primary selection:text-white cursor-none flex flex-col">
            <CustomCursor />
            <FilmGrain />
            <Navbar />

            <main className="flex-grow py-32 px-6">
                <div className="container mx-auto">
                    <div className="mb-12">
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Categories
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter"
                        >
                            {title}
                        </motion.h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((videoSrc, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                                onClick={() => {
                                    setSelectedVideo(videoSrc);
                                    setIsLoading(true);
                                }}
                            >
                                <div className="w-full h-full bg-black relative">
                                    <iframe
                                        src={videoSrc}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        allow="autoplay; encrypted-media"
                                        loading="lazy"
                                    />
                                    {/* Overlay to capture clicks */}
                                    <div className="absolute inset-0 z-10" />
                                </div>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                        <Maximize2 className="text-white" size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-auto"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[10000] p-2 bg-black/50 rounded-full hover:bg-black/80 cursor-pointer"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <X size={40} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 relative flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <Loader2 className="animate-spin text-white/50" size={48} />
                                </div>
                            )}
                            <iframe
                                src={selectedVideo}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media; fullscreen"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default WorkGallery;
