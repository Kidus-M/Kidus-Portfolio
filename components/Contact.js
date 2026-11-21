import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, FileText, Send, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import { RevealLine } from "@/components/motion/Reveal";
import { profile, socials } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];
const FORM_ENDPOINT = "https://formspree.io/f/mldbdqbn";
const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const lenis = useLenis();

  /* The section is the one light room in the site — tell the chrome to invert. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("is-light", entry.intersectionRatio > 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      document.body.classList.remove("is-light");
    };
  }, []);

  useEffect(() => {
    if (!lenis) return undefined;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Send failed");

      setStatus("success");
      setForm(EMPTY);
      window.setTimeout(() => {
        setOpen(false);
        setStatus(null);
      }, 1800);
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact" ref={sectionRef}>
        <Marquee className="ribbon is-loud" baseSpeed={3.4} repeat={4}>
          {Array.from({ length: 4 }, (_, index) => (
            <span className="ribbon-item" key={index}>
              Available for work
              <i aria-hidden="true" />
            </span>
          ))}
        </Marquee>

        <div className="shell contact-inner">
          <span className="label">(08) &mdash; Contact</span>

          <h2 className="contact-title">
            <RevealLine>Let&rsquo;s build</RevealLine>
            <RevealLine delay={0.07}>something</RevealLine>
            <RevealLine delay={0.14}>
              <em>remarkable.</em>
            </RevealLine>
          </h2>

          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                I&rsquo;m open to product builds, technical partnerships, and interfaces that need
                both engineering discipline and visual taste.
              </p>

              <div className="contact-actions">
                <Magnetic>
                  <button type="button" className="button is-invert" onClick={() => setOpen(true)}>
                    Send a message
                    <Send size={16} aria-hidden="true" />
                  </button>
                </Magnetic>
                <button type="button" className="contact-email" onClick={copyEmail}>
                  {copied ? (
                    <>
                      Copied to clipboard <Check size={15} aria-hidden="true" />
                    </>
                  ) : (
                    profile.email
                  )}
                </button>
              </div>
            </div>

            <div className="contact-links">
              <span className="label">Elsewhere</span>
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  <span>{social.label}</span>
                  <i>{social.handle}</i>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
              <a href="/resume.pdf" download="Kidus_Mesfin_Resume.pdf">
                <span>Résumé</span>
                <i>PDF</i>
                <FileText size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="sheet-scrim"
              onClick={() => setOpen(false)}
              aria-label="Close contact form"
            />

            <motion.div
              className="sheet-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-form-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <header className="sheet-head">
                <div>
                  <span className="label">Direct line</span>
                  <h3 id="contact-form-title">Tell me about it</h3>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact form"
                >
                  <X size={18} />
                </button>
              </header>

              <form className="sheet-form" onSubmit={submit}>
                <label>
                  <span className="label">Name</span>
                  <input name="name" type="text" required value={form.name} onChange={change} placeholder="Your name" />
                </label>
                <label>
                  <span className="label">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={change}
                    placeholder="you@company.com"
                  />
                </label>
                <label className="is-wide">
                  <span className="label">Subject</span>
                  <input
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={change}
                    placeholder="Project enquiry"
                  />
                </label>
                <label className="is-wide">
                  <span className="label">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={change}
                    placeholder="The product, the timeline, and what success should feel like."
                  />
                </label>

                {status === "success" && (
                  <p className="form-status is-success">
                    <CheckCircle2 size={16} aria-hidden="true" /> Sent. I&rsquo;ll be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p className="form-status is-error">
                    <AlertCircle size={16} aria-hidden="true" /> That didn&rsquo;t send. Try again, or
                    email me directly.
                  </p>
                )}

                <button className="button is-primary sheet-submit" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                  <Send size={16} aria-hidden="true" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
