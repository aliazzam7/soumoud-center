import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./CTA.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

export default function CTA() {
  const [ref, inView] = useInView();
  return (
    <section className="cta-section" ref={ref}>
      <div className={`cta-inner hs-fade${inView ? " hs-fade--in" : ""}`}>
        <span className="cta-label">Ready to Begin?</span>
        <h2 className="cta-h2">ابدأ رحلة النجاح اليوم</h2>
        <p className="cta-sub">
          Join 200+ students who are already discovering their potential
          at Soumoud Educational Center in Borj Rahal.
        </p>
        <div className="cta-btns">
          <Link to="/register" className="cta-btn-main">
            Register Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href="https://wa.me/96171240366" target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
            <FaWhatsapp /> WhatsApp Us
          </a>
          <a href="https://www.instagram.com/soumoud.center" target="_blank" rel="noopener noreferrer" className="cta-btn-ig">
            <FaInstagram /> Follow Us
          </a>
        </div>
      </div>
    </section>
  );
}