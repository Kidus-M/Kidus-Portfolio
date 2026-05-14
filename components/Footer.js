import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

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
      <div className="footer-row">
        <a href="#hero" className="footer-name">
          <span>Kidus</span> <em>Mesfin</em>
        </a>
        <button className="back-top" onClick={() => lenis?.scrollTo("#hero")} type="button">
          Back to top <ArrowUp size={16} />
        </button>
      </div>
      <div className="footer-row footer-meta">
        <span>© {new Date().getFullYear()} Kidus Mesfin</span>
        <span>Designed & developed with obsessive detail</span>
        <span>Addis Ababa {time}</span>
      </div>
    </footer>
  );
}
