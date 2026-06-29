import { useRef, useEffect, useState } from "react";
import { Link , useLocation } from "react-router-dom";
import {
  FaBookOpen, FaUserGraduate, FaLanguage, FaChild,
  FaPalette, FaLaptop, FaWhatsapp, FaInstagram,
  FaCheckCircle, FaArrowRight
} from "react-icons/fa";
import "./Services.css";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const services = [
  {
    id: "followup",
    icon: <FaBookOpen />,
    title: "Daily Academic Follow-up",
    tagline: "Never fall behind again",
    desc: "We provide structured daily homework support and consistent progress tracking. Our teachers work closely with each student to ensure assignments are completed correctly, concepts are understood, and no one slips through the cracks.",
    points: ["Daily homework review and support","Weekly progress reports","Direct communication with parents","Personalized study plans"],
    audience: "All school grades",
    schedule: "Daily, after school",
  },
  {
    id: "tutoring",
    icon: <FaUserGraduate />,
    title: "Personalized Tutoring",
    tagline: "Learning at your child's pace",
    desc: "One-on-one and small-group tutoring sessions across all school subjects. We identify each student's strengths and gaps, then build a tailored learning path that meets them exactly where they are and moves them forward with confidence.",
    points: ["All school subjects covered","One-on-one & small group sessions","Exam preparation and revision","Concept reinforcement and practice"],
    audience: "All school grades",
    schedule: "Flexible scheduling",
  },
  {
    id: "languages",
    icon: <FaLanguage />,
    title: "Arabic & English Courses",
    tagline: "Strong language skills for life",
    desc: "Foundation and remedial courses in both Arabic and English. Whether a student needs to build from the basics or strengthen existing skills, our structured language programs develop reading, writing, grammar, and comprehension in a supportive setting.",
    points: ["Arabic language foundation & remedial","English language foundation & remedial","Reading, writing & grammar focus","Suitable for all levels"],
    audience: "Primary to secondary",
    schedule: "Weekly sessions",
  },
  {
    id: "preschool",
    icon: <FaChild />,
    title: "Preschool Preparation",
    tagline: "A confident start to school life",
    desc: "Our preschool preparation program is designed to equip young learners — ages 3 to 6 — with the essential cognitive, social, and motor skills needed for a successful and confident start to their formal education journey.",
    points: ["Cognitive & language development","Social skills and group interaction","Fine motor skills activities","School readiness assessment"],
    audience: "Ages 3 – 6",
    schedule: "Morning & afternoon sessions",
  },
  {
    id: "arts",
    icon: <FaPalette />,
    title: "Arts, Crafts & Activities",
    tagline: "Learning through creativity and play",
    desc: "Educational and recreational activities that go beyond the classroom. Through arts and crafts, interactive games, and group projects, students develop creativity, critical thinking, teamwork, and social skills — all while having fun.",
    points: ["Arts and crafts workshops","Interactive educational games","Group projects and teamwork","Creative thinking development"],
    audience: "All age groups",
    schedule: "Integrated into daily program",
  },
  {
    id: "resources",
    icon: <FaLaptop />,
    title: "Modern Learning Resources",
    tagline: "The right tools for every learner",
    desc: "We use carefully selected educational materials, digital tools, and modern teaching resources appropriate for different age groups and learning styles. Our environment supports visual, auditory, and hands-on learners alike.",
    points: ["Age-appropriate learning materials","Digital and interactive tools","Visual and hands-on resources","Regular material updates"],
    audience: "All students",
    schedule: "Available every session",
  },
];

function ServicesHero() {
  return (
    <section className="sv-hero">
      <div className="sv-hero__inner">
        <span className="sv-label">Our Services</span>
        <h1 className="sv-hero__h1">Everything Your Child Needs —<br /><span className="sv-yellow">All in One Place</span></h1>
        <div className="sv-accent-line sv-accent-line--center" />
        <p className="sv-hero__sub">Six tailored educational services designed to support every student at every stage — from preschool to secondary school.</p>
        <div className="sv-hero__breadcrumb">
          <Link to="/">Home</Link><span>/</span><span>Services</span>
        </div>
      </div>
    </section>
  );
}


function ServiceCard({ service: s, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;
  return (
    <article className={`sv-card${isEven ? " sv-card--normal" : " sv-card--flipped"} sv-fade${inView ? " sv-fade--in" : ""}`} ref={ref} id={s.id}>
      <div className="sv-card__visual">
        <div className="sv-card__icon-wrap"><div className="sv-card__icon">{s.icon}</div></div>
        <div className="sv-card__meta">
          <div className="sv-card__meta-item">
            <span className="sv-card__meta-label">Audience</span>
            <span className="sv-card__meta-val">{s.audience}</span>
          </div>
          <div className="sv-card__meta-item">
            <span className="sv-card__meta-label">Schedule</span>
            <span className="sv-card__meta-val">{s.schedule}</span>
          </div>
        </div>
        <Link to="/register" className="sv-card__cta">Enroll Now <FaArrowRight /></Link>
      </div>
      <div className="sv-card__content">
        <span className="sv-card__tagline">{s.tagline}</span>
        <h2 className="sv-card__title">{s.title}</h2>
        <div className="sv-accent-line" />
        <p className="sv-card__desc">{s.desc}</p>
        <ul className="sv-card__points">
          {s.points.map((p, i) => (
            <li key={i}><FaCheckCircle className="sv-card__check" />{p}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ServicesList() {
  return (
    <section className="sv-list">
      <div className="sv-list__inner">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </section>
  );
}

function ServicesCTA() {
  const [ref, inView] = useInView();
  return (
    <section className="sv-cta" ref={ref}>
      <div className={`sv-cta__inner sv-fade${inView ? " sv-fade--in" : ""}`}>
        <span className="sv-label sv-label--light">Get Started</span>
        <h2 className="sv-cta__h2">Not Sure Which Service Is Right?</h2>
        <p className="sv-cta__sub">Contact us on WhatsApp and we'll help you find the perfect program for your child's needs and goals.</p>
        <div className="sv-cta__btns">
          <Link to="/register" className="sv-cta__btn-main">
            Register Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="https://wa.me/96171240366" target="_blank" rel="noopener noreferrer" className="sv-cta__btn-wa"><FaWhatsapp /> Ask Intisar</a>
          <a href="https://wa.me/96103932176" target="_blank" rel="noopener noreferrer" className="sv-cta__btn-wa"><FaWhatsapp /> Ask Soumaya</a>
          <a href="https://www.instagram.com/soumoud.center" target="_blank" rel="noopener noreferrer" className="sv-cta__btn-ig"><FaInstagram /> Instagram</a>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const { hash } = useLocation();

useEffect(() => {
  if (!hash) return;
  const id = hash.replace("#", "");
  
  const timer = setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = document.querySelector("nav")?.offsetHeight || 90;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });

    // highlight
    el.classList.add("sv-card--highlight");
    setTimeout(() => el.classList.remove("sv-card--highlight"), 2500);
  }, 400);
  
  return () => clearTimeout(timer);
}, [hash]);

  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </>
  );
}