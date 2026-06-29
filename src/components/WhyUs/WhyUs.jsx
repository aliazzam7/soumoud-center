import { useEffect, useRef, useState } from "react";
import {
  FaHeart, FaUsers, FaAward,
  FaCheckCircle, FaLeaf, FaStar,
} from "react-icons/fa";
import useInView from "../../hooks/useInView";
import "./WhyUs.css";

const whyUs = [
  { icon: <FaHeart />,       title: "Caring Environment", desc: "A warm, family-like atmosphere where every student feels seen, valued, and motivated." },
  { icon: <FaUsers />,       title: "Expert Educators",   desc: "Qualified teachers with 7+ years of experience and ongoing professional development." },
  { icon: <FaAward />,       title: "Proven Results",     desc: "98% of our students show measurable academic improvement within their first semester." },
  { icon: <FaCheckCircle />, title: "Holistic Approach",  desc: "Beyond academics — we nurture confidence, creativity, and life skills in every student." },
  { icon: <FaLeaf />,        title: "Small Class Sizes",  desc: "Intimate groups that allow teachers to give every student the individual attention they deserve." },
  { icon: <FaStar />,        title: "Trusted Since 2018", desc: "A cornerstone of the Borj Rahal community, built on trust, dedication, and real results." },
];

export default function WhyUs() {
  const [ref, inView] = useInView();
  return (
    <section className="wu-section" ref={ref}>
      <div className="wu-head">
        <span className="wu-label">Why Soumoud</span>
        <h2 className="wu-h2">More Than a Tutoring Center — <span className="wu-yellow">A Community</span></h2>
        <div className="wu-accent-line" />
      </div>

      <div className={`wu-grid hs-fade${inView ? " hs-fade--in" : ""}`}>
        {whyUs.map((w, i) => (
          <div className="wu-card" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="wu-card__icon">{w.icon}</div>
            <h3 className="wu-card__title">{w.title}</h3>
            <p className="wu-card__desc">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}