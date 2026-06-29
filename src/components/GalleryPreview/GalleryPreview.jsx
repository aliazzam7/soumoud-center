import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import "./GalleryPreview.css";



const galleryImgs = [
  { src: "/gallery0.jpeg", alt: "Our dedicated teacher celebrating with her students" },
  { src: "/gallery1.jpeg", alt: "Small group learning session around the table" },
  { src: "/gallery2.jpeg", alt: "Teacher guiding students in an interactive classroom" },
  { src: "/gallery3.jpeg", alt: "Fun learning day with our beloved mascot" },
  { src: "/gallery4.jpeg", alt: "A student proudly sharing her everyday memories" },
  { src: "/gallery5.jpeg", alt: "Celebrating the holiday season at Soumoud Center" },
];

export default function GalleryPreview() {
  const [ref, inView] = useInView();
  const [lightbox, setLightbox] = useState(null);

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // prev / next
  const prev = () => setLightbox((i) => (i - 1 + galleryImgs.length) % galleryImgs.length);
  const next = () => setLightbox((i) => (i + 1) % galleryImgs.length);

  return (
    <>
      <section className="gp-section" ref={ref}>
        <div className="gp-head">
          <span className="gp-eyebrow">Gallery</span>
          <h2 className="gp-h2">Life at <span className="gp-yellow">Soumoud Center</span></h2>
          <div className="gp-accent-line" />
        </div>

        <div className={`gp-grid hs-fade${inView ? " hs-fade--in" : ""}`}>
          {galleryImgs.map((img, i) => (
            <div
              className="gp-item"
              key={i}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
              aria-label={`Open image: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gp-overlay">
                <span>{img.alt}</span>
                <svg className="gp-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="gp-cta">
          <Link to="/gallery" className="gp-btn-ghost">
            View Full Gallery
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gp-lb" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="gp-lb__close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="gp-lb__nav gp-lb__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
          <div className="gp-lb__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImgs[lightbox].src} alt={galleryImgs[lightbox].alt} />
            <p className="gp-lb__caption">{galleryImgs[lightbox].alt}</p>
          </div>
          <button className="gp-lb__nav gp-lb__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
        </div>
      )}
    </>
  );
}
