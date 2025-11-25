import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { portfolioData } from '../data/portfolio';

const categories = portfolioData.map(item => ({
    ...item,
    video: item.videos[0] // Use the first video as the preview
}));

const Portfolio: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);




    return (
        <section id="work" ref={containerRef} className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
                            SELECTED<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
                                WORK
                            </span>
                        </h2>
                        <p className="text-slate-400 max-w-md">
                            A collection of projects spanning motion graphics, cinematography, and visual effects.
                        </p>
                    </div>

                    <Link
                        to="/work"
                        className="group flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors"
                    >
                        <span className="uppercase tracking-widest text-sm">View All Categories</span>
                        <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <Link key={category.id} to={`/work/${category.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-white/10"
                            >
                                {/* Video Background (Iframe) */}
                                <div className="absolute inset-0 w-full h-full bg-black">
                                    <iframe
                                        src={category.video}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        allow="autoplay; encrypted-media"
                                        loading="lazy"
                                    />
                                    {/* Transparent overlay to prevent interaction with iframe but allow click on Link */}
                                    <div className="absolute inset-0 z-20" />
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="font-mono text-white/50 text-sm">/{category.count}</span>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <ArrowUpRight className="text-white" size={20} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            {category.name}
                                        </h3>
                                        <p className="text-white/60 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
