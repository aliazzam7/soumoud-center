import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--open" : ""}`}>
      <div className="navbar__inner">

        {/* Logo — left side */}
        <Link to="/" className="navbar__logo" aria-label="Soumoud Center Home">
          <img src="/logosrmv.png" alt="Soumoud Center Educational" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-title">Soumoud</span>
            <span className="navbar__logo-sub">Educational Center</span>
          </span>
        </Link>

        {/* Links — right side (desktop) */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link${location.pathname === link.path ? " navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/register" className="navbar__cta">
            Register Now
          </Link>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className={`navbar__burger${menuOpen ? " navbar__burger--active" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? " navbar__mobile--open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__mobile-link${location.pathname === link.path ? " navbar__mobile-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/register" className="navbar__mobile-cta">
            Register Now
          </Link>
        </nav>
      </div>
    </header>
  );
}