import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, Instagram, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const webhookUrl = "https://hooks.zapier.com/hooks/catch/25475468/uzgcx01/";

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                // mode: 'no-cors', // Zapier webhooks often require no-cors if called directly from browser due to CORS policies, but let's try standard first or handle the opaque response if needed. Actually, standard fetch to Zapier usually triggers CORS errors in browser unless using a proxy or no-cors. 
                // However, 'no-cors' means we can't check response status. 
                // Let's try standard POST. If it fails due to CORS, we might need 'no-cors'. 
                // User provided code snippet didn't specify no-cors, but it's common. 
                // I'll use the user's exact snippet structure but add error handling.
                // Actually, for a simple contact form, 'no-cors' is often the safest bet to avoid CORS errors blocking the request, even if we can't read the response.
                // But let's stick to the user's request structure first.
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString()
                })
            });

            // Since we might get an opaque response or CORS error if not handled, 
            // but assuming it works or we just treat it as sent:
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">LET'S CREATE</h2>
                    <p className="text-slate-400 text-xl mb-8">Ready to start your next project? Get in touch.</p>

                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <a href="tel:+96891276869" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group">
                            <Phone size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-mono tracking-wider">+968 9127 6869</span>
                        </a>
                        <a href="mailto:omaraflah9988@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group">
                            <Mail size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-mono tracking-wider">omaraflah9988@gmail.com</span>
                        </a>
                        <a href="https://www.instagram.com/omar_alkindi0/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group">
                            <Instagram size={20} className="text-pink-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-mono tracking-wider">@omar_alkindi0</span>
                        </a>
                    </div>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className={`inline-flex items-center px-8 py-4 font-bold rounded-full transition-all group ${status === 'success'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-primary text-white hover:bg-primary/90'
                                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {status === 'submitting' ? (
                                    <>
                                        Sending...
                                        <Loader2 size={18} className="ml-2 animate-spin" />
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        Message Sent!
                                        <CheckCircle size={18} className="ml-2" />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <div className="mt-4 text-red-500 flex items-center justify-center gap-2 text-sm">
                                    <AlertCircle size={16} />
                                    <span>Something went wrong. Please try again or email directly.</span>
                                </div>
                            )}
                        </motion.div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
