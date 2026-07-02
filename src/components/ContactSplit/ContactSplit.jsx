import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaUser, FaCheckCircle } from "react-icons/fa";
import "./ContactSplit.css";

const persons = [
  {
    id:     "intisar",
    name:   "Intisar",
    role:   "Co-Founder & Teacher",
    phone:  "96171240366",
    avatar: "I",
    color:  "#ffc107",
  },
  {
    id:     "soumaya",
    name:   "Soumaya",
    role:   "Co-Founder & Teacher",
    phone:  "96103932176",
    avatar: "S",
    color:  "#ff8c00",
  },
];

function buildWaUrl(person, senderName, message) {
  const text = `Hello ${person.name}! \n\nMy name is ${senderName}.\n\n${message}\n\n— Sent from Soumoud Center website`;
  return `https://wa.me/${person.phone}?text=${encodeURIComponent(text)}`;
}

export default function ContactSplit() {
  const [selected, setSelected]     = useState("intisar");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage]       = useState("");
  const [sent, setSent]             = useState(false);

  const person = persons.find(p => p.id === selected);

  function handleSend(e) {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;
    const url = buildWaUrl(person, senderName.trim(), message.trim());
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === "visible") {
        setSenderName("");
        setMessage("");
        setSelected("intisar");
        setSent(false);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <section className="cs-section">
      <div className="cs-inner">

        {/* ══════════ LEFT ══════════ */}
        <div className="cs-left">

          <h2 className="cs-left__title">Contact Information</h2>
          <p className="cs-left__sub">
            Reach us on WhatsApp or visit us in Borj Rahal — we'd love to hear from you.
          </p>

          <div className="cs-info-list">

            <a href="https://wa.me/96171240366" target="_blank" rel="noopener noreferrer" className="cs-info-card cs-info-card--wa">
              <div className="cs-info-card__icon-wrap cs-info-card__icon-wrap--wa">
                <FaWhatsapp />
              </div>
              <div className="cs-info-card__body">
                <strong>Intisar — WhatsApp</strong>
                <span>+961 71 240 366</span>
              </div>
              <span className="cs-info-card__arrow">↗</span>
            </a>

            <a href="https://wa.me/96103932176" target="_blank" rel="noopener noreferrer" className="cs-info-card cs-info-card--wa">
              <div className="cs-info-card__icon-wrap cs-info-card__icon-wrap--wa">
                <FaWhatsapp />
              </div>
              <div className="cs-info-card__body">
                <strong>Soumaya — WhatsApp</strong>
                <span>+961 03 932 176</span>
              </div>
              <span className="cs-info-card__arrow">↗</span>
            </a>

            <a href="https://www.instagram.com/soumoud.center" target="_blank" rel="noopener noreferrer" className="cs-info-card cs-info-card--ig">
              <div className="cs-info-card__icon-wrap cs-info-card__icon-wrap--ig">
                <FaInstagram />
              </div>
              <div className="cs-info-card__body">
                <strong>Instagram</strong>
                <span>@soumoud.center</span>
              </div>
              <span className="cs-info-card__arrow">↗</span>
            </a>

            <a href="https://www.google.com/maps/place//@33.3086586,35.2799797,17z/data=!4m6!1m5!3m4!2zMzPCsDE4JzMxLjIiTiAzNcKwMTYnNTcuMiJF!8m2!3d33.3086586!4d35.2825546?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="cs-info-card cs-info-card--map">
              <div className="cs-info-card__icon-wrap cs-info-card__icon-wrap--map">
                <FaMapMarkerAlt />
              </div>
              <div className="cs-info-card__body">
                <strong>Our Location</strong>
                <span>Borj Rahal, South Lebanon</span>
              </div>
              <span className="cs-info-card__arrow">↗</span>
            </a>

          </div>

          {/* Google Maps iframe */}
          <div
            className="cs-map-card"
            style={{ cursor: "pointer" }}
            onClick={() => window.open("https://www.google.com/maps/place//@33.3086586,35.2799797,17z/data=!4m6!1m5!3m4!2zMzPCsDE4JzMxLjIiTiAzNcKwMTYnNTcuMiJF!8m2!3d33.3086586!4d35.2825546?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer")}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3334.388454684229!2d35.279979675685006!3d33.30865857344612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2slb!4v1782712993353!5m2!1sen!2slb"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Soumoud Center Location"
            />
          </div>

        </div>

        {/* ══════════ RIGHT ══════════ */}
        <div className="cs-right">
          <div className="cs-form-card">
            <h2 className="cs-form__title">Send us a Message</h2>
            <p className="cs-form__sub">
              Fill in the form and we'll open WhatsApp for you with your message ready to send.
            </p>

            <form className="cs-form" onSubmit={handleSend} noValidate>

              <div className="cs-field">
                <label className="cs-label" htmlFor="sender-name">
                  <FaUser className="cs-label__icon" /> Your Name
                </label>
                <input
                  id="sender-name"
                  className="cs-input"
                  type="text"
                  placeholder="e.g. Ahmad Hassan"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  required
                />
              </div>

              <div className="cs-field">
                <label className="cs-label">Who would you like to contact?</label>
                <div className="cs-person-cards">
                  {persons.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      className={`cs-person-card${selected === p.id ? " cs-person-card--active" : ""}`}
                      onClick={() => setSelected(p.id)}
                      aria-pressed={selected === p.id}
                    >
                      <div
                        className="cs-person-card__avatar"
                        style={{ background: selected === p.id ? p.color : undefined }}
                      >
                        {p.avatar}
                      </div>
                      <div className="cs-person-card__info">
                        <strong>{p.name}</strong>
                        <span>{p.role}</span>
                      </div>
                      {selected === p.id && (
                        <FaCheckCircle className="cs-person-card__check" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cs-field">
                <label className="cs-label" htmlFor="msg">
                  Your Message
                </label>
                <textarea
                  id="msg"
                  className="cs-textarea"
                  placeholder={`Hi ${person.name}, I'm interested in enrolling my child...`}
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>

              {senderName && message && (
                <div className="cs-preview">
                  <p className="cs-preview__label">📱 Message preview</p>
                  <p className="cs-preview__text">
                    Hello {person.name}!{"\n\n"}
                    My name is {senderName}.{"\n\n"}
                    {message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className={`cs-submit${sent ? " cs-submit--sent" : ""}`}
                disabled={!senderName.trim() || !message.trim()}
              >
                {sent ? (
                  <><FaCheckCircle /> Opened WhatsApp!</>
                ) : (
                  <><FaWhatsapp /> Send via WhatsApp to {person.name}</>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}