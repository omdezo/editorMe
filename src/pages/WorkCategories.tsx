import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import FilmGrain from '../components/FilmGrain';
import { useLanguage } from '../context/LanguageContext';

const categories = [
    { id: 'motion-graphics', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop' },
    { id: 'events', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2622&auto=format&fit=crop' },
    { id: 'commercial-proposals', image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=2664&auto=format&fit=crop' },
    { id: 'cinema-films', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2670&auto=format&fit=crop' },
    { id: 'reels', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2670&auto=format&fit=crop' },
    { id: 'vfx-others', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2670&auto=format&fit=crop' },
];

const WorkCategories: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-white cursor-none flex flex-col">
            <CustomCursor />
            <FilmGrain />
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                            {t('work.title')}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            {t('work.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <Link to={`/work/${category.id}`} key={category.id} className="group block relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#111]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                    <img
                                        src={category.image}
                                        alt={t(`work.${category.id}.name`)}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:-translate-y-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">
                                                0{index + 1}
                                            </span>
                                            <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-emerald-500 transition-all" />
                                        </div>
                                        <h3 className="text-2xl font-bold leading-tight mb-1">
                                            {t(`work.${category.id}.name`)}
                                        </h3>
                                        <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {t(`work.${category.id}.desc`)}
                                        </p>
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
