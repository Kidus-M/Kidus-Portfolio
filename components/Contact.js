import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  FileText,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const email = "kidusmesfinteferi@gmail.com";
  const socials = [
    { href: "https://github.com/Kidus-M", label: "GitHub", icon: Github },
    { href: "https://www.instagram.com/kidus._.m", label: "Instagram", icon: Instagram },
    { href: "https://www.linkedin.com/in/kidus-m", label: "LinkedIn", icon: Linkedin },
    { href: "https://t.me/kidus_mesfin", label: "Telegram", icon: MessageCircle },
  ];

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
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

      if (!response.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      window.setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  return (
    <>
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
            <button className="cta-button" onClick={() => setIsModalOpen(true)} type="button">
              Send me a message <Send size={16} />
            </button>
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
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                <Icon size={16} /> {label}
              </a>
            ))}
            <a href="/resume.pdf" download="Kidus_Mesfin_Resume.pdf">
              <FileText size={16} /> Resume PDF
            </a>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <button className="contact-modal-backdrop" type="button" aria-label="Close contact form" onClick={() => setIsModalOpen(false)} />
          <div className="contact-modal-panel">
            <div className="contact-modal-head">
              <div>
                <span className="section-kicker">Formspree - secure send</span>
                <h3 id="contact-modal-title">Initialize connection</h3>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)} type="button" aria-label="Close contact form">
                <X size={18} />
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input name="name" type="text" placeholder="Your name" required value={formData.name} onChange={handleChange} />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="email@example.com" required value={formData.email} onChange={handleChange} />
              </label>
              <label>
                <span>Subject</span>
                <input name="subject" type="text" placeholder="Project inquiry" required value={formData.subject} onChange={handleChange} />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about the product, timeline, and what success should feel like."
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>

              {submitStatus === "success" && (
                <div className="form-status is-success">
                  <CheckCircle2 size={16} /> Message sent. Closing...
                </div>
              )}
              {submitStatus === "error" && (
                <div className="form-status is-error">
                  <AlertCircle size={16} /> Message failed. Please try again.
                </div>
              )}

              <button className="form-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Execute send"}
                <Send size={16} />
              </button>
            </form>

            <div className="modal-socials">
              {socials.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
