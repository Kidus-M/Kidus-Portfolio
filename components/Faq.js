import { Plus } from "lucide-react";
import { RevealLine } from "@/components/motion/Reveal";
import { faq } from "@/data/site";

/**
 * Short, direct answers to the questions people (and answer engines) ask
 * about Kidus. The same entries are published as FAQPage structured data in
 * lib/seo.js, so what is marked up is always what is on the page.
 */
export default function Faq() {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="section-head faq-head">
          <span className="label">(07) &mdash; Answers</span>
          <h2 id="faq-title" className="section-title">
            <RevealLine>Asked,</RevealLine>
            <RevealLine delay={0.08}>
              <em>answered.</em>
            </RevealLine>
          </h2>
        </div>

        <div className="faq-list">
          {faq.map((item, index) => (
            <details className="faq-item" key={item.question} open={index < 2}>
              <summary>
                <span className="faq-index label">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="faq-question">{item.question}</h3>
                <Plus className="faq-icon" size={20} aria-hidden="true" />
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
