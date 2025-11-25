import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 py-12 border-t border-slate-900">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold text-white">
                        PORTFOLIO<span className="text-primary">.</span>
                    </h2>
                    <p className="text-slate-400 mt-2 text-sm">
                        Creating visual stories that matter.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-8 text-center text-slate-600 text-xs">
                &copy; {new Date().getFullYear()} All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
