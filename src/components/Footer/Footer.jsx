import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaTiktok, FaEnvelope  } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [waOpen, setWaOpen]   = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const waRef  = useRef(null);
  const devRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (waRef.current  && !waRef.current.contains(e.target))  setWaOpen(false);
      if (devRef.current && !devRef.current.contains(e.target)) setDevOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // time opn and closed 
  const now = new Date();

const day = now.getDay(); // Sunday = 0, Monday = 1 ... Saturday = 6
const hour = now.getHours();
const minute = now.getMinutes();

const currentTime = hour * 60 + minute;

const openTime = 10 * 60; // 10:00 AM
const closeTime = 18 * 60; // 6:00 PM

const isWeekday = day >= 1 && day <= 5;

const isOpen =
  isWeekday &&
  currentTime >= openTime &&
  currentTime < closeTime;

  return (
    <footer className="ft-footer">

      {/* ── Top grid ── */}
      <div className="ft-top">

        {/* Brand */}
        <div className="ft-brand-col">
          <div className="ft-logo-row">
            <div className="ft-logo-box">
              <img src="/logosrmv.png" alt="Soumoud" className="ft-logo-img" />
            </div>
            <div>
              <strong className="ft-brand-name">Soumoud Center</strong>
              <span className="ft-brand-sub">Educational Center</span>
            </div>
          </div>
          <p className="ft-desc">
            Building brighter futures through education, resilience, and community — since 2018 in Borj Rahal.
          </p>

          <div className="ft-socials">
            {/* WhatsApp dropdown */}
            <div className="ft-wa" ref={waRef}>
              <button
                className="ft-wa-btn"
                onClick={() => setWaOpen(o => !o)}
                aria-expanded={waOpen}
                aria-haspopup="true"
              >
                <FaWhatsapp />
                WhatsApp
                <span className={`ft-wa-chevron${waOpen ? " ft-wa-chevron--up" : ""}`}>▾</span>
              </button>

              {waOpen && (
                <div className="ft-wa-popup">
                  <p className="ft-wa-popup-label">Contact us on WhatsApp</p>

                  <a
                    href="https://wa.me/96171240366"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-wa-contact"
                    onClick={() => setWaOpen(false)}
                  >
                    <div className="ft-wa-avatar">I</div>
                    <div className="ft-wa-info">
                      <strong>Intisar</strong>
                      <span>+961 71 240 366</span>
                    </div>
                    <span className="ft-wa-arrow">↗</span>
                  </a>

                  <a
                    href="https://wa.me/96103932176"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-wa-contact"
                    onClick={() => setWaOpen(false)}
                  >
                    <div className="ft-wa-avatar">S</div>
                    <div className="ft-wa-info">
                      <strong>Soumaya</strong>
                      <span>+961 03 932 176</span>
                    </div>
                    <span className="ft-wa-arrow">↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/soumoud.center"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-ig-btn"
              aria-label="Instagram"
            >
              <FaInstagram /> Instagram
            </a>
            {/* Email */}
            <a
              href="mailto:soumoud.center@gmail.com"
              className="ft-email-btn"
              aria-label="Email"
            >
              <FaEnvelope /> Email
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="ft-col">
          <p className="ft-col-title">Navigation</p>
          <ul className="ft-col-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/register">Register Now</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="ft-col">
          <p className="ft-col-title">Services</p>
          <ul className="ft-col-links">
            <li><Link to="/services#followup">Academic Follow-up</Link></li>
            <li><Link to="/services#tutoring">Personalized Tutoring</Link></li>
            <li><Link to="/services#languages">Arabic & English</Link></li>
            <li><Link to="/services#preschool">Preschool Prep</Link></li>
            <li><Link to="/services#arts">Arts & Activities</Link></li>
          </ul>
        </div>

      {/* Working Hours */}
<div className="ft-col">
  <p className="ft-col-title">Working Hours</p>

 <div className={`ft-open-badge ${isOpen ? "ft-open" : "ft-closed"}`}>
  <span className="ft-open-dot" />
  {isOpen ? "Open now" : "Closed"}
</div>

  <div className="ft-hours">
    <div className="ft-hours-row">
      <span className="ft-hours-day">Monday – Friday</span>
      <span className="ft-hours-time">10:00 AM – 6:00 PM</span>
    </div>

    <div className="ft-hours-row">
      <span className="ft-hours-day">Saturday</span>
      <span className="ft-hours-time ft-hours-time--closed">Closed</span>
    </div>

    <div className="ft-hours-row">
      <span className="ft-hours-day">Sunday</span>
      <span className="ft-hours-time ft-hours-time--closed">Closed</span>
    </div>
  </div>
</div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <span className="ft-copy">
          © {new Date().getFullYear()} Soumoud Educational Center · Borj Rahal, South Lebanon · All rights reserved
        </span>

        {/* Developer credit with dropdown */}
        <div className="ft-dev" ref={devRef}>
          <button
            className="ft-dev-trigger"
            onClick={() => setDevOpen(o => !o)}
            aria-expanded={devOpen}
            aria-haspopup="true"
          >
            <div className="ft-dev-badge">
              <img src="/logoats.png" alt="ATS" className="ft-dev-logo-img" />
            </div>
            <span className="ft-dev-text">
              Developed by <strong>Ali Azzam · Ali Tech Solutions</strong>
            </span>
            <span className={`ft-wa-chevron ft-dev-chevron${devOpen ? " ft-wa-chevron--up" : ""}`}>▾</span>
          </button>

          {devOpen && (
            <div className="ft-dev-popup">
              <p className="ft-wa-popup-label">Connect with the developer</p>

              <a
                href="https://wa.me/96176915446"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-wa-contact"
                onClick={() => setDevOpen(false)}
              >
                <div className="ft-wa-avatar ft-dev-avatar--wa">
                  <FaWhatsapp size={15} />
                </div>
                <div className="ft-wa-info">
                  <strong>WhatsApp</strong>
                  <span>+961 76 915 446</span>
                </div>
                <span className="ft-wa-arrow">↗</span>
              </a>

              <a
                href="https://www.tiktok.com/@ali.tech.solutions?_r=1&_t=ZS-97YgBGK6qp7"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-wa-contact"
                onClick={() => setDevOpen(false)}
              >
                <div className="ft-wa-avatar ft-dev-avatar--tt">
                  <FaTiktok size={15} />
                </div>
                <div className="ft-wa-info">
                  <strong>TikTok</strong>
                  <span>@ali.tech.solutions</span>
                </div>
                <span className="ft-wa-arrow">↗</span>
              </a>

              <a
                href="https://www.instagram.com/ali.tech.solutions?igsh=MjRuNHc5a3pvMHpk"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-wa-contact"
                onClick={() => setDevOpen(false)}
              >
                <div className="ft-wa-avatar ft-dev-avatar--ig">
                  <FaInstagram size={15} />
                </div>
                <div className="ft-wa-info">
                  <strong>Instagram</strong>
                  <span>@ali.tech.solutions</span>
                </div>
                <span className="ft-wa-arrow">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>

    </footer>
  );
}