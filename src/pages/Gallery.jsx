import { useEffect, useState } from "react";
import "./Gallery.css";

/* ══════════════════════════════════════════════════════════════
   IMAGE DATA
══════════════════════════════════════════════════════════════ */
const sections = [
  {
  id: "life",
  eyebrow: "Our Center",
  title: "Life at Soumoud",
  sub: "A glimpse into our daily environment — where every student feels at home.",
  images: [
    { src: "/gallery6.jpeg",  alt: "Our colorful library corner filled with books and learning materials" },
    { src: "/gallery7.jpeg",  alt: "Motivational Arabic quotes displayed on the classroom wall" },
    { src: "/gallery8.jpeg",  alt: "A bright and welcoming classroom ready for students" },
    { src: "/gallery9.jpeg",  alt: "Arabic alphabet shelf with plush toys and educational tools" },
    { src: "/gallery10.jpeg", alt: "Grand opening ribbon-cutting ceremony at Soumoud Center" },
    { src: "/gallery11.jpeg", alt: "Two of our teachers smiling together at the center" },
  ],
},
{
  id: "practice",
  eyebrow: "How We Teach",
  title: "Practice & Learning",
  sub: "Our teaching approach focuses on hands-on learning, creativity, and individual growth.",
  images: [
    { src: "/practice1.jpeg", alt: "Arabic vocabulary lesson drawn on the whiteboard" },
    { src: "/practice2.jpeg", alt: "Student learning independently using a laptop and flashcards" },
    { src: "/practice3.jpeg", alt: "Math powers and exponents explained step by step on the board" },
    { src: "/practice4.jpeg", alt: "Young student practicing Arabic letters at the whiteboard" },
    { src: "/practice5.jpeg", alt: "Teacher working with students around a table in a warm classroom setting" },
    { src: "/practice6.jpeg", alt: "Student solving math equations independently at the whiteboard" },
  ],
},
 {
  id: "results",
  eyebrow: "Results & Notes",
  title: "Student Achievements",
  sub: "Proud moments — exam results, certificates, and student milestones that speak for themselves.",
  images: [
    { src: "/result1.jpeg", alt: "A student proudly holding her detailed Arabic written exam" },
    { src: "/result2.jpeg", alt: "Student showcasing a graded English language test" },
    { src: "/result3.jpeg", alt: "Official college report card with excellent grades" },
    { src: "/result4.jpeg", alt: "A student's organized Arabic study notes and summaries" },
    { src: "/result5.jpeg", alt: "Handwritten English essay demonstrating strong writing skills" },
    { src: "/result6.jpeg", alt: "Full subject grade sheet showing outstanding academic performance" },
  ],
},

];

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════════ */
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  setCurrent((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")   setCurrent((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  const prev = (e) => { e.stopPropagation(); setCurrent((i) => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent((i) => (i + 1) % images.length); };

  return (
    <div className="gl-lb" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button className="gl-lb__close" onClick={onClose} aria-label="Close">✕</button>

      <button className="gl-lb__nav gl-lb__nav--prev" onClick={prev} aria-label="Previous image">‹</button>

      <div className="gl-lb__content" onClick={(e) => e.stopPropagation()}>
        <img src={images[current].src} alt={images[current].alt} />
        <p className="gl-lb__caption">
          <span className="gl-lb__caption-text">{images[current].alt}</span>
          <span className="gl-lb__counter">{current + 1} / {images.length}</span>
        </p>
      </div>

      <button className="gl-lb__nav gl-lb__nav--next" onClick={next} aria-label="Next image">›</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION COMPONENT
══════════════════════════════════════════════════════════════ */
function GallerySection({ section }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="gl-section" id={section.id}>
      <div className="gl-section__head">
        <span className="gl-eyebrow">{section.eyebrow}</span>
        <h2 className="gl-h2">{section.title}</h2>
        <p className="gl-sub">{section.sub}</p>
        <div className="gl-accent-line" />
      </div>

      <div className="gl-grid">
        {section.images.map((img, i) => (
          <div
            className="gl-item"
            key={i}
            onClick={() => setLightbox(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
            aria-label={`View image: ${img.alt}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gl-overlay">
              <span>{img.alt}</span>
              <svg className="gl-zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          images={section.images}
          index={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function Gallery() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="gl-page">

      {/* ── Hero header ── */}
      <div className="gl-hero">
        <span className="gl-hero__eyebrow">Soumoud Center</span>
        <h1 className="gl-hero__h1">Our Gallery</h1>
        <p className="gl-hero__sub">
          Every photo tells a story of dedication, growth, and achievement.
          Explore life inside Soumoud Educational Center.
        </p>
        <div className="gl-hero__line" />

        {/* Quick nav */}
        <nav className="gl-nav" aria-label="Gallery sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="gl-nav__link">{s.eyebrow}</a>
          ))}
        </nav>
      </div>

      {/* ── Sections ── */}
      {sections.map((s) => (
        <GallerySection key={s.id} section={s} />
      ))}

    </main>
  );
}