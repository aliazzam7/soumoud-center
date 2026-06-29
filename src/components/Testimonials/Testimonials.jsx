
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import useInView from "../../hooks/useInView";
import "./Testimonials.css";

const testimonials = [
  {
    stars: 5,
    text: "من خلال المتابعة المستمرة والدعم الدائم، نايا تحسنت كتير من الناحية التعليمية، حتى بعد الظروف الصعبة اللي مرينا فيها. المعلمات كانوا دايمًا يخبروني عن تقدمها، وصارت عندها قدرة على المشاركة والانخراط. وأكتر شي لفت نظري إنها كمان نمت من ناحية نفسية — صارت تتحمل مسؤوليتها لوحدها، وبتحب كل يوم تروح عالمركز. بعد الخوف الكبير اللي عشناه من الحرب، هيدا الشي بيعني كل شي. شكرًا كتير، وأكيد رح نكمل معكم بإذن الله.",
  },
  {
    stars: 5,
    text: "بالنسبة لمحمد، لقيت تغير منيح بعد ما دخل عالمركز — صار يعرف يقرأ ويكتب أشياء كان عاجز عنها. وحتى شخصيته تحسنت وصارت أقوى.",
  },
  {
    stars: 5,
    text: "أول مرة بحس إبني هيك متحمس وحابب يدرس! كتير كتير فخورة إنه في ناس بتدرس بضمير هيك وبهيدا الأسلوب.",
  },
  {
    stars: 5,
    text: "من خلال المتابعة المستمرة والدعم الدائم، ولادي تحسنوا كتير — على الصعيد التعليمي وأكتر. المعلمات دايمًا كانوا يعلمونا بتقدمهم ويشجعوهم على المشاركة. وهني بيحبوا يجوا عالمركز كل يوم، وهيدا بيقول كل شي.",
  },
  {
    stars: 5,
    text: "بعد شهر بس، التغيير كان واضح — وين كان وين صار! إن شاء الله بيبلش بالصيف وبيفوت على المدرسة سوبر. شكرا حبيبة قلبي.",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView();

  return (
    <section className="tm-section" ref={ref}>
      {/* Header — English UI */}
      <div className="tm-head">
        <span className="tm-eyebrow">Parent Reviews</span>
        <h2 className="tm-h2">
          What Our <span className="tm-yellow">Families Are Saying</span>
        </h2>
        <div className="tm-accent-line" />
        <p className="tm-subhead">
          Real words from the parents who walk this journey with us every day.
        </p>
      </div>

      {/* Grid — all cards visible */}
      <div className={`tm-grid hs-fade${inView ? " hs-fade--in" : ""}`}>
        {testimonials.map((t, i) => (
          <article
            className="tm-card"
            key={i}
            style={{ animationDelay: `${i * 80}ms` }}
            dir="rtl"
          >
            <FaQuoteLeft className="tm-quote-icon" />
            <p className="tm-text">{t.text}</p>
            <div className="tm-footer">
              <div className="tm-stars">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <FaStar key={s} />
                ))}
              </div>
              <span className="tm-role">Parent</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
