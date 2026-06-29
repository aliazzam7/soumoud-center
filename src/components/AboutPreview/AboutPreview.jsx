import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutPreview.css";

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

export default function AboutPreview() {
  const [ref, inView] = useInView();
  return (
    <section className="ap-section" ref={ref}>
      <div className={`ap-inner hs-fade${inView ? " hs-fade--in" : ""}`}>

        <div className="ap-img-col">
          <div className="ap-imgbox">
            <img src="/about.jpeg" alt="Soumoud Center" className="ap-img" />
            <div className="ap-imgfallback">
              <img src="/logos.png" alt="Soumoud" />
              <p>Soumoud Center</p>
            </div>
            {/* <div className="ap-badge">
              <strong>Est. 2018</strong>
              <span>Borj Rahal</span>
            </div> */}
          </div>
        </div>

        <div className="ap-content">
          <span className="ap-label">About Us</span>
          <h2 className="ap-h2">
            Built on the Belief That{" "}
            <span className="ap-yellow">Every Student Can Succeed</span>
          </h2>
          <div className="ap-accent-line" />
          <p className="ap-body">
            Soumoud Educational Center was established in Borj Rahal with a single conviction: education
            is the foundation for building a brighter future. We provide a supportive learning environment
            where students strengthen academic abilities, develop personal skills, and achieve success with
            confidence and excellence.
          </p>
          <p className="ap-body">
            The name <strong>"Soumoud"</strong> — meaning <em>resilience</em> — reflects our mission to remain
            steadfast alongside our students, empowering a generation of knowledgeable, confident, and
            responsible young people ready to shape a better future.
          </p>
          <Link to="/about" className="ap-btn-main">
            Our Full Story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}