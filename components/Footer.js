import { useEffect, useState } from "react";
import { ArrowUp, FileText, Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLenis } from "lenis/react";

const footerLinks = [
  { href: "#hero", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/Kidus-M", label: "GitHub", icon: Github },
  { href: "https://www.instagram.com/kidus._.m", label: "Instagram", icon: Instagram },
  { href: "https://www.linkedin.com/in/kidus-m", label: "LinkedIn", icon: Linkedin },
  { href: "https://t.me/kidus_mesfin", label: "Telegram", icon: MessageCircle },
];

export default function Footer() {
  const lenis = useLenis();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Africa/Addis_Ababa",
        }).format(new Date())
      );
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <a href="#hero" className="footer-name" aria-label="Kidus Mesfin home">
            
            <span>
              <span>Kidus</span> <em>Mesfin</em>
            </span>
          </a>
          <p>Full-stack developer crafting fast, expressive web products from Addis Ababa.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <span>Navigate</span>
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-connect">
          <span>Connect</span>
          <a href="mailto:kidusmesfinteferi@gmail.com">
            <Mail size={16} /> Email
          </a>
          <a href="/resume.pdf" download="Kidus_Mesfin_Resume.pdf">
            <FileText size={16} /> Resume
          </a>
          <div className="footer-socials">
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-row footer-meta">
        <span>&copy; {new Date().getFullYear()} Kidus Mesfin</span>
        <span>Addis Ababa, Ethiopia &middot; {time}</span>
        <button className="back-top" onClick={() => lenis?.scrollTo("#hero")} type="button">
          Back to top <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
