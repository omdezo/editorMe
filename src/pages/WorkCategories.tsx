import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import FilmGrain from '../components/FilmGrain';

import { portfolioData } from '../data/portfolio';

const categories = portfolioData;

const WorkCategories: React.FC = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-white selection:bg-primary selection:text-white cursor-none flex flex-col">
            <CustomCursor />
            <FilmGrain />
            <Navbar />

            <main className="flex-grow flex flex-col justify-center items-center py-32 px-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-4xl w-full z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center"
                    >
                        SELECTED WORK
                    </motion.h1>

                    <div className="grid gap-4">
                        {categories.map((category, index) => (
                            <Link key={category.id} to={`/work/${category.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex items-center justify-between p-8 border-b border-white/10 hover:border-white/30 transition-colors overflow-hidden"
                                >
                                    {/* Hover Background */}
                                    <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                                    <div className="relative z-10 flex items-baseline gap-6">
                                        <span className="font-mono text-sm text-white/40 group-hover:text-primary transition-colors">
                                            {category.count}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                                            {category.name}
                                        </h2>
                                    </div>

                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-sm font-mono tracking-widest uppercase">View Project</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WorkCategories;
