import "./ContactHero.css";
import { Link } from "react-router-dom";

export default function ContactHero() {
  return (
    <section className="ch-section">
      <div className="ch-bg-blur ch-bg-blur--1" />
      <div className="ch-bg-blur ch-bg-blur--2" />
      <div className="ch-inner">
        <div className="ch-breadcrumb">
          <Link to="/" className="ch-bread-link">Home</Link>
          <span className="ch-bread-sep">›</span>
          <span className="ch-bread-current">Contact</span>
        </div>
        <h1 className="ch-h1">
          Get in <span className="ch-yellow">Touch</span>
        </h1>
        <p className="ch-sub">
          Have a question or want to enroll your child? We're here for you —
          reach out and we'll get back to you right away.
        </p>
        <div className="ch-accent-line" />
      </div>
    </section>
  );
}