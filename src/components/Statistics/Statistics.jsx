import { useEffect, useRef, useState } from "react";
import useInView from "../../hooks/useInView";
import "./Statistics.css";


function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 7,   suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Students Enrolled"   },
  { value: 6,   suffix: "",  label: "Core Services"       },
  { value: 98,  suffix: "%", label: "Satisfaction Rate"   },
];

export default function Statistics() {
  return (
    <section className="st-section">
      <div className="st-inner">
        {stats.map((s, i) => (
          <div className="st-stat" key={i}>
            <strong className="st-num">
              <Counter target={s.value} suffix={s.suffix} />
            </strong>
            <span className="st-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}