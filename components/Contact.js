import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaGithub, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Using Formspree endpoint
            const response = await fetch("https://formspree.io/f/mldbdqbn", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                // Close modal after 2 seconds on success
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSubmitStatus(null);
                }, 2000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="contact" className="py-32 px-6 md:px-20 border-t border-white/10 bg-[#050505]">
                <div className="max-w-4xl">
                    <span className="font-mono text-accent text-sm">// READY TO BUILD?</span>
                    <h2 className="font-heading text-5xl md:text-8xl font-bold mt-8 mb-12 leading-tight">
                        Let's engineer <br/> something robust.
                    </h2>

                    {/* Actions Row */}
                    <div className="flex flex-col md:flex-row gap-8 md:items-center mb-16">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-8 py-4 rounded-full font-bold font-mono hover:bg-[#22c55e] hover:text-white transition-all"
                        >
                            INITIATE CONTACT
                        </button>

                        {/* IMPORTANT:
                   For this link to work, you MUST move 'resume.pdf'
                   from 'src/assets/' to the 'public/' folder.
                   The path '/resume.pdf' refers to public/resume.pdf
                */}
                        <a
                            href="/resume.pdf"
                            download="Kidus_Mesfin_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm text-secondary hover:text-white underline flex items-center gap-2"
                        >
                            DOWNLOAD RESUME.JSON
                        </a>
                    </div>

                    {/* Social Links Section (Main View) */}
                    <div className="border-t border-white/10 pt-10">
                        <span className="font-mono text-secondary text-xs block mb-6 uppercase tracking-widest">// Establish Connection</span>
                        <div className="flex gap-8">
                            <a href="https://github.com/Kidus-M" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors group">
                                <FaGithub size={32} className="group-hover:scale-110 transition-transform" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://www.instagram.com/kidus._.m" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors group">
                                <FaInstagram size={32} className="group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.linkedin.com/in/kidus0237" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors group">
                                <FaLinkedin size={32} className="group-hover:scale-110 transition-transform" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://t.me/kidus_mesfin" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors group">
                                <FaTelegram size={32} className="group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-xl p-8 z-[70] shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-heading text-2xl">Initialize Connection</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-white">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block font-mono text-xs text-secondary mb-1">VAR NAME = STRING</label>
                                    <input
                                        type="text" name="name" placeholder="Your Name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs text-secondary mb-1">VAR EMAIL = STRING</label>
                                    <input
                                        type="email" name="email" placeholder="email@example.com" required
                                        value={formData.email} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs text-secondary mb-1">VAR SUBJECT = STRING</label>
                                    <input
                                        type="text" name="subject" placeholder="Project Inquiry" required
                                        value={formData.subject} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs text-secondary mb-1">VAR MESSAGE = TEXT</label>
                                    <textarea
                                        name="message" rows="4" placeholder="Tell me about your project architecture..." required
                                        value={formData.message} onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>

                                {/* Status Feedback */}
                                {submitStatus === 'success' && (
                                    <div className="flex items-center gap-2 text-green-400 font-mono text-xs bg-green-400/10 p-3 rounded">
                                        <FaCheckCircle /> Transmission Successful. Closing...
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs bg-red-400/10 p-3 rounded">
                                        <FaExclamationCircle /> Transmission Failed. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded font-bold font-mono flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-accent hover:bg-blue-600 text-white'}`}
                                >
                                    {isSubmitting ? 'SENDING DATA...' : <><FaPaperPlane /> EXECUTE SEND</>}
                                </button>
                            </form>

                            {/* Social Links inside Modal */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="font-mono text-xs text-secondary mb-4 text-center">OR CONNECT VIA</p>
                                <div className="flex justify-center gap-6">
                                    <a href="https://github.com/Kidus-M" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors">
                                        <FaGithub size={24} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/kidus0237" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors">
                                        <FaLinkedin size={24} />
                                    </a>
                                    <a href="https://t.me/kidus_mesfin" target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors">
                                        <FaTelegram size={24} />
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Contact