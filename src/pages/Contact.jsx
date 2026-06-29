import {  useEffect } from "react";
import ContactHero  from "../components/ContactHero/ContactHero";
import ContactSplit  from "../components/ContactSplit/ContactSplit";
import Footer        from "../components/Footer/Footer";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-content">
      <ContactHero />
      <ContactSplit />
      <Footer />
    </div>
  );
}