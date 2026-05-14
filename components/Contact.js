import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Globe,
    X,
    Send,
    CheckCircle2
} from "lucide-react";

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (event) => {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch("https://formspree.io/f/mldbdqbn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed");
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="contact" className="relative border-b border-[#eaeaea] bg-white text-[#0a0a0a] min-h-[100vh] flex items-center py-24 lg:py-0">
                <div className="mx-auto w-full max-w-[1600px] px-10 sm:px-16 lg:px-32">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        
                        {/* Title Column */}
                        <div className="lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="mb-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                                    Contact
                                </p>
                                <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-[#0a0a0a]">
                                    Let&apos;s work
                                    <br />
                                    together
                                </h2>
                            </motion.div>
                        </div>

                        {/* Description & Button */}
                        <div className="lg:w-1/3 flex flex-col pt-2 md:pt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            >
                                <p className="text-[15px] leading-[1.6] text-zinc-600 font-medium tracking-tight mb-8 max-w-sm">
                                    I&apos;m currently available for freelance projects and full-time opportunities. Let&apos;s build something great together.
                                </p>

                                <button
                                    type="button"
                                    data-cursor="expand"
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center gap-3 bg-[#0a0a0a] px-8 py-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-white hover:bg-[#222] transition-colors duration-300 w-fit"
                                >
                                    Get in touch
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Contact Info list */}
                        <div className="lg:w-1/3 flex flex-col lg:items-end pt-2 md:pt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="flex flex-col gap-4 text-[13px] md:text-[14px] text-zinc-600 font-medium tracking-tight"
                            >
                                <div className="flex items-center gap-4">
                                    <Mail className="h-4 w-4 text-zinc-400" />
                                    <a href="mailto:hello@kidusmesfin.dev" className="hover:text-[#0a0a0a] transition-colors">hello@kidusmesfin.dev</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-4 w-4 text-zinc-400" />
                                    <span>Addis Ababa, Ethiopia</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-4 w-4 text-zinc-400" />
                                    <a href="tel:+251912345678" className="hover:text-[#0a0a0a] transition-colors">+251 91 234 5678</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe className="h-4 w-4 text-zinc-400" />
                                    <a href="https://kidusmesfin.dev" className="hover:text-[#0a0a0a] transition-colors">kidusmesfin.dev</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Linkedin className="h-4 w-4 text-zinc-400" />
                                    <a href="https://linkedin.com/in/kidusmesfin" className="hover:text-[#0a0a0a] transition-colors">linkedin.com/in/kidusmesfin</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Github className="h-4 w-4 text-zinc-400" />
                                    <a href="https://github.com/kidus-m" className="hover:text-[#0a0a0a] transition-colors">github.com/kidus-m</a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="mt-16 lg:mt-auto text-right"
                            >
                                <h3 className="font-heading text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4">
                                    KM.
                                </h3>
                                <a href="#hero" className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-[#0a0a0a] flex items-center justify-end gap-2 transition-colors">
                                    LET&apos;S CONNECT <ArrowUpRight className="h-3 w-3" />
                                </a>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a0a0a]/40 p-4 backdrop-blur-sm">
                    <button
                        type="button"
                        aria-label="Close contact form"
                        className="absolute inset-0 cursor-default"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative w-full max-w-xl bg-white p-8 md:p-12 text-[#0a0a0a] shadow-2xl">
                        <div className="mb-8 flex items-center justify-between border-b border-[#eaeaea] pb-6">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">New inquiry</p>
                                <h3 className="font-heading text-3xl font-bold tracking-tight">
                                    Project brief
                                </h3>
                            </div>
                            <button
                                type="button"
                                data-cursor="expand"
                                onClick={() => setIsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center border border-[#eaeaea] transition-colors hover:bg-[#0a0a0a] hover:text-white"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid gap-6">
                            {[
                                { name: "name", type: "text", label: "Name", placeholder: "Your name" },
                                { name: "email", type: "email", label: "Email", placeholder: "email@example.com" },
                                { name: "subject", type: "text", label: "Subject", placeholder: "Project inquiry" },
                            ].map((field) => (
                                <label key={field.name} className="block">
                                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                                        {field.label}
                                    </span>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full border border-[#eaeaea] bg-transparent px-4 py-3 text-[14px] text-[#0a0a0a] outline-none transition-colors placeholder:text-zinc-400 focus:border-[#0a0a0a]"
                                    />
                                </label>

                            ))}

                            <label className="block">
                                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                                    Message
                                </span>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about the project..."
                                    required
                                    className="w-full resize-y border border-[#eaeaea] bg-transparent px-4 py-3 text-[14px] text-[#0a0a0a] outline-none transition-colors placeholder:text-zinc-400 focus:border-[#0a0a0a]"
                                />
                            </label>

                            {submitStatus === "success" && (
                                <div className="flex items-center gap-2 border border-[#eaeaea] bg-white px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#0a0a0a] font-bold">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Sent successfully
                                </div>
                            )}
                            {submitStatus === "error" && (
                                <div className="border border-[#0a0a0a] bg-[#0a0a0a] px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white font-bold">
                                    Failed. Try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                data-cursor="expand"
                                className="mt-2 inline-flex items-center justify-center gap-3 bg-[#0a0a0a] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.1em] font-bold text-white transition-opacity disabled:opacity-50 hover:bg-[#222]"
                            >
                                {isSubmitting ? "Sending..." : "Send message"}
                                {isSubmitting ? null : <Send className="h-4 w-4" />}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
