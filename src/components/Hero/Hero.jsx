import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaClipboardCheck, FaLaptop } from "react-icons/fa";
import "./Hero.css";

const words = ["Excellence", "Confidence", "Success", "Growth"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 380);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__wrap">

        {/* ── LEFT ── */}
        <div className="hero__left">

          {/* big location title */}
          <div className="hero__eyebrow">
            <span className="hero__dot-live" />
            Hraiby Educational Center — Borj Rahal
          </div>

          {/* main headline */}
          <h1 className="hero__h1">
            Where Students<br />
            Discover{" "}
            <span className={`hero__word${visible ? " hero__word--in" : " hero__word--out"}`}>
              {words[wordIndex]}
            </span>
          </h1>

          {/* yellow accent line */}
          <div className="hero__accent-line" />

          {/* description */}
          <p className="hero__sub">
            Personalized academic support, daily follow-up, and a nurturing
            environment — empowering every student to reach their full potential.
          </p>

          {/* buttons */}
          <div className="hero__btns">
            <Link to="/register" className="hero__btn-main">
              Register Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className="hero__btn-ghost">
              Learn More
            </Link>
          </div>

          {/* pills */}
          <div className="hero__pills">
            <span className="hero__pill"><FaBookOpen className="hero__pill-icon" /> Academic Support</span>
            <span className="hero__pill"><FaClipboardCheck className="hero__pill-icon" /> Daily Follow-up</span>
            <span className="hero__pill"><FaLaptop className="hero__pill-icon" /> Online & In-Person</span>
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="hero__right">

          {/* center image */}
          <div className="hero__imgbox">
            <img src="/center2.jpeg" alt="Soumoud Educational Center" className="hero__centerimg" />
            <div className="hero__imgfallback">
              <img src="/logos.png" alt="Soumoud Center" className="hero__fallback-logo" />
              <p>Soumoud Educational Center</p>
            </div>
          </div>

          {/* label */}
          <div className="hero__imglabel">
            <span className="hero__imglabel-name">Soumoud Center</span>
            <span className="hero__imglabel-sub">by Hraiby Sisters</span>
          </div>

          {/* 3 stat boxes */}
          <div className="hero__statrow">
            <div className="hero__statbox">
              <strong>7+</strong>
              <span>Years of Experience</span>
            </div>
            <div className="hero__statbox">
              <strong>200+</strong>
              <span>Students Enrolled</span>
            </div>
            <div className="hero__statbox">
              <strong>98%</strong>
              <span>Satisfaction Rate</span>
            </div>
          </div>

        </div>
      </div>

      {/* scroll cue */}
      <div className="hero__scrollcue" aria-hidden="true">
        <div className="hero__scrollline" />
        <span>scroll</span>
      </div>
    </section>
  );
}