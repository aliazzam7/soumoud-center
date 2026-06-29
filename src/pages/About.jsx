import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap, FaCertificate, FaBriefcase,
  FaWhatsapp, FaInstagram, FaStar, FaHeart, FaUsers
} from "react-icons/fa";
import "./About.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const team = [
  {
    name: "Soumaya Ali Hraiby",
    role: "Co-Founder & Teacher",
    phone: "03932176",
    wa: "96103932176",
    photo: "/soumaya.jpeg",
    initial: "S",
    color: "#ffc107",
    qualifications: [
      { icon: <FaGraduationCap />, label: "Academic", items: ["Master's Degree (M2) in English", "Lebanese University"] },
      { icon: <FaCertificate />,   label: "Certifications", items: ["Certified Healthcare Assistant", "CIS Training Center"] },
      { icon: <FaBriefcase />,     label: "Experience", items: ["Teaching since 2018", "7+ years in education"] },
    ],
  },
  {
    name: "Intissar Ali Hraiby",
    role: "Co-Founder & Teacher",
    phone: "71240366",
    wa: "96171240366",
    photo: "/intissar.jpeg",
    initial: "I",
    color: "#111111",
    qualifications: [
      { icon: <FaGraduationCap />, label: "Academic", items: ["Bachelor's in Arabic Language & Literature", "Lebanese University", "Pursuing Master's in Arabic"] },
      { icon: <FaCertificate />,   label: "Training", items: ["English Language – Cycle One, CIS", "English Language – Cycle Two, CIS"] },
      { icon: <FaBriefcase />,     label: "Experience", items: ["Teaching since 2018", "7+ years in education"] },
    ],
  },
];

const offers = [
  "Daily academic follow-up and homework support.",
  "Personalized tutoring and reinforcement in all school subjects.",
  "Foundation and remedial courses in both Arabic and English.",
  "Preschool preparation programs for a confident school start.",
  "Educational activities, arts & crafts, and interactive games.",
  "Modern learning resources suitable for different age groups.",
];

const values = [
  { icon: <FaStar />,  title: "Excellence", desc: "We set high standards and help every student reach them." },
  { icon: <FaHeart />, title: "Care",        desc: "Every child is treated with warmth, patience, and genuine support." },
  { icon: <FaUsers />, title: "Community",   desc: "A trusted partner in the Borj Rahal community since 2018." },
];

/* ── Sections ────────────────────────────────────────────────── */
function AboutHero() {
  return (
    <section className="ab-hero">
      <div className="ab-hero__inner">
        <span className="ab-label">About Us</span>
        <h1 className="ab-hero__h1">The Story Behind <span className="ab-yellow">Soumoud</span></h1>
        <div className="ab-accent-line ab-accent-line--center" />
        <p className="ab-hero__sub">An educational center born from a passion for teaching and a belief that every student deserves the right environment to thrive.</p>
        <div className="ab-hero__breadcrumb">
          <Link to="/">Home</Link><span>/</span><span>About</span>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const [ref, inView] = useInView();
  return (
    <section className="ab-story" ref={ref}>
      <div className={`ab-story__inner ab-fade${inView ? " ab-fade--in" : ""}`}>
        <div className="ab-story__img-col">
          <div className="ab-story__imgbox">
            <img src="/about2.jpeg" alt="Soumoud Center" className="ab-story__img" />
            <div className="ab-story__imgfallback"><img src="/logo.png" alt="Soumoud" /><p>Soumoud Center</p></div>
          </div>
          <div className="ab-story__badge-row">
            <div className="ab-story__badge"><strong>2018</strong><span>Founded</span></div>
            <div className="ab-story__badge"><strong>200+</strong><span>Students</span></div>
            <div className="ab-story__badge"><strong>7+</strong><span>Years</span></div>
          </div>
        </div>
        <div className="ab-story__content">
          <span className="ab-label">Our Story</span>
          <h2 className="ab-h2">Built on the Belief That <span className="ab-yellow">Education Changes Everything</span></h2>
          <div className="ab-accent-line" />
          <p className="ab-body">Soumoud Educational Center is an educational and developmental center established in Borj Rahal with the belief that education is the foundation for building a brighter future. The center provides a supportive learning environment that helps students strengthen their academic abilities, develop personal skills, and achieve success with confidence and excellence.</p>
          <p className="ab-body">The name <strong>"Soumoud"</strong> — meaning <em>resilience</em> — reflects our belief that education is the strongest path to resilience, hope, and growth. We remain steadfast despite challenges, empowering a generation of knowledgeable, confident, and responsible students.</p>
          <p className="ab-body">At Soumoud, we believe every student has the potential to succeed when given the right guidance, encouragement, and learning environment. Our commitment is to support every learner and become a trusted partner in building a brighter future.</p>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  const [ref, inView] = useInView();
  return (
    <section className="ab-vision" ref={ref}>
      <div className={`ab-vision__inner ab-fade${inView ? " ab-fade--in" : ""}`}>
        <div className="ab-section-head">
          <span className="ab-label">What Drives Us</span>
          <h2 className="ab-h2">Vision, Mission <span className="ab-yellow">&amp; Values</span></h2>
          <div className="ab-accent-line ab-accent-line--center" />
        </div>
        <div className="ab-vision__cards">
          <div className="ab-vision__card ab-vision__card--vision">
            <div className="ab-vision__card-tag">Vision</div>
            <h3>A Generation Ready to Lead</h3>
            <p>We envision a community where every young person has access to quality education that unlocks their full potential and prepares them to lead with knowledge, character, and confidence.</p>
          </div>
          <div className="ab-vision__card ab-vision__card--mission">
            <div className="ab-vision__card-tag">Mission</div>
            <h3>Steadfast Support for Every Learner</h3>
            <p>Our mission is to remain steadfast alongside our students — providing personalized academic support, a nurturing environment, and the tools each child needs to grow academically, socially, and personally.</p>
          </div>
        </div>
        <div className="ab-values">
          {values.map((v, i) => (
            <div className="ab-value-card" key={i}>
              <div className="ab-value-card__icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeOffer() {
  const [ref, inView] = useInView();
  return (
    <section className="ab-offer" ref={ref}>
      <div className={`ab-offer__inner ab-fade${inView ? " ab-fade--in" : ""}`}>
        <div className="ab-section-head">
          <span className="ab-label">What We Offer</span>
          <h2 className="ab-h2">Everything Your Child <span className="ab-yellow">Needs to Succeed</span></h2>
          <div className="ab-accent-line ab-accent-line--center" />
        </div>
        <ul className="ab-offer__list">
          {offers.map((item, i) => (
            <li key={i} className="ab-offer__item">
              <span className="ab-offer__num">0{i + 1}</span>
              <span className="ab-offer__text">{item}</span>
            </li>
          ))}
        </ul>
        <div className="ab-offer__cta">
          <Link to="/services" className="ab-btn-main">
            Explore Our Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [ref, inView] = useInView();
  return (
    <section className="ab-team" ref={ref}>
      <div className={`ab-team__inner ab-fade${inView ? " ab-fade--in" : ""}`}>
        <div className="ab-section-head">
          <span className="ab-label">Our Team</span>
          <h2 className="ab-h2">Meet the <span className="ab-yellow">Hraiby Sisters</span></h2>
          <div className="ab-accent-line ab-accent-line--center" />
          <p className="ab-section-sub">Two passionate educators who built Soumoud from the ground up — driven by love for teaching and commitment to their community.</p>
        </div>
        <div className="ab-team__grid">
          {team.map((member, i) => (
            <div className="ab-team__card" key={i}>
              <div className="ab-team__photo-wrap">
                <div className="ab-team__photo">
                  <img src={member.photo} alt={member.name} className="ab-team__img" />
                  <div className="ab-team__photo-fallback" style={{ background: member.color }}>
                    <span>{member.initial}</span>
                  </div>
                </div>
                <div className="ab-team__name-block">
                  <h3 className="ab-team__name">{member.name}</h3>
                  <span className="ab-team__role">{member.role}</span>
                </div>
              </div>
              <div className="ab-team__quals">
                {member.qualifications.map((q, j) => (
                  <div className="ab-team__qual" key={j}>
                    <div className="ab-team__qual-label">
                      <span className="ab-team__qual-icon">{q.icon}</span>
                      {q.label}
                    </div>
                    <ul className="ab-team__qual-items">
                      {q.items.map((item, k) => <li key={k}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="ab-team__contact">
                <a href={`https://wa.me/${member.wa}`} target="_blank" rel="noopener noreferrer" className="ab-team__wa">
                  <FaWhatsapp /> {member.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  const [ref, inView] = useInView();
  return (
    <section className="ab-cta" ref={ref}>
      <div className={`ab-cta__inner ab-fade${inView ? " ab-fade--in" : ""}`}>
        <span className="ab-label ab-label--light">Ready to Join?</span>
        <h2 className="ab-cta__h2">Become Part of the <span style={{ color:"#ffc107" }}>Soumoud Family</span></h2>
        <p className="ab-cta__sub">Register your child today and give them the environment they deserve to grow, learn, and succeed.</p>
        <div className="ab-cta__btns">
          <Link to="/register" className="ab-cta__btn-main">
            Register Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="https://wa.me/96171240366" target="_blank" rel="noopener noreferrer" className="ab-cta__btn-wa"><FaWhatsapp /> WhatsApp Us</a>
          <a href="https://www.instagram.com/soumoud.center" target="_blank" rel="noopener noreferrer" className="ab-cta__btn-ig"><FaInstagram /> Instagram</a>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <AboutHero />
      <Story />
      <VisionMission />
      <WhatWeOffer />
      <Team />
      <AboutCTA />
    </>
  );
}