// src/components/Contact.js
const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 md:px-20 border-t border-white/10 bg-[#050505]">
            <div className="max-w-4xl">
                <span className="font-mono text-accent text-sm">// READY TO BUILD?</span>
                <h2 className="font-heading text-5xl md:text-8xl font-bold mt-8 mb-12 leading-tight">
                    Let's engineer <br/> something robust.
                </h2>
                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                    <a
                        href="mailto:kidus@example.com"
                        className="bg-white text-black px-8 py-4 rounded-full font-bold font-mono hover:bg-accent hover:text-white transition-all"
                    >
                        INITIATE CONTACT
                    </a>
                    <a href="#" className="font-mono text-sm text-secondary hover:text-white underline">
                        DOWNLOAD RESUME.JSON
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Contact