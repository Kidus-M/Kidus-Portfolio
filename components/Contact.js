import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Send, FileText, MessageCircle, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const email = "kidusmesfin0237@gmail.com";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-line span", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: headlineRef.current, start: "top 78%" },
      });
      gsap.from(contentRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <span className="section-kicker">05 - Contact</span>

      <h2 ref={headlineRef} className="contact-headline">
        <span className="contact-line">
          <span>let's build</span>
        </span>
        <span className="contact-line">
          <span>something</span>
        </span>
        <span className="contact-line accent-line">
          <span>remarkable.</span>
        </span>
      </h2>

      <div ref={contentRef} className="contact-content">
        <p>
          I'm available for product builds, technical partnerships, and thoughtful
          web experiences that need both engineering discipline and visual taste.
        </p>

        <div className="contact-actions">
          <a className="cta-button" href={`mailto:${email}`}>
            Send me a message <Send size={16} />
          </a>
          <button className="copy-email" onClick={copyEmail} type="button">
            {copied ? (
              <>
                Copied <Check size={16} />
              </>
            ) : (
              email
            )}
          </button>
        </div>

        <div className="social-row">
          <a href="https://github.com/Kidus-M" target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/kidus0237" target="_blank" rel="noreferrer">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://t.me/kidus_mesfin" target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> Telegram
          </a>
          <a href="/resume.pdf" download>
            <FileText size={16} /> Resume PDF
          </a>
        </div>
      </div>
    </section>
  );
}
