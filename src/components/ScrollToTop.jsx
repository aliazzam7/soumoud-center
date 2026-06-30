import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      const timer = setTimeout(() => {
        const el = document.getElementById(id);

        if (el) {
          const navHeight =
            document.querySelector("nav")?.offsetHeight || 90;

          const top =
            el.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            16;

          window.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    
    window.scrollTo({
      top: 0,
      behavior: "auto", 
    });
  }, [pathname, hash]);

  return null;
}