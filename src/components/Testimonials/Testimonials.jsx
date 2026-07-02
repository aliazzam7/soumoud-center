import { Link } from "react-router-dom";
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
  {
    stars: 5,
    text: "يعطيكن العافية كلكن نشاط وطاقة إيجابية وأهم شي صحة الولد النفسية عندكم بتكون ممتازة. شكرًا لجهودكن ودعمكن وإصراركن ليطلع من عندكن تلاميذ مليانة شغف وحب للدراسة. كل عام وانتم الأفضل دائمًا. راح نكفي سوا لنوصل لأعلى المستويات ❤️❤️",
  },
  {
    stars: 5,
    text: "سلام حبيبتي، شكراً كتير أولاً على جهودكم الجبارة وروحكم المرحة التي وهبتوها لإبني. ابني صار كتير قادر على التكيف مع الصعوبات، وتعكس هذه التغيرات ليس فقط جهوده الشخصية تجاه التعليم الأكاديمي بل أيضاً الدعم والتشجيع اللذين تلقاهما طوال رحلته معكم والتي أثرت بشكل إيجابي عليه.",
  },
];

export default function Testimonials({ limit, showMoreButton = false }) {
  const [ref, inView] = useInView();

  const visibleTestimonials = limit
    ? testimonials.slice(0, limit)
    : testimonials;

  return (
    <section className="tm-section" ref={ref}>
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

      <div className={`tm-grid hs-fade${inView ? " hs-fade--in" : ""}`}>
        {visibleTestimonials.map((t, i) => (
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

      {showMoreButton && (
        <div className="tm-more-wrap">
          <Link to="/testimonials" className="tm-more-btn">
            More
          </Link>
        </div>
      )}
    </section>
  );
}
