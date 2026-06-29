import { useEffect } from "react";
import Hero         from "../components/Hero/Hero";
import AboutPreview from "../components/AboutPreview/AboutPreview";
// import Services     from "../components/Services/Services";
import Statistics   from "../components/Statistics/Statistics";
import WhyUs        from "../components/WhyUs/WhyUs";
import GalleryPreview from "../components/GalleryPreview/GalleryPreview";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA          from "../components/CTA/CTA";
import Footer       from "../components/Footer/Footer";

export default function Home() {

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-content">
      <Hero />
      <AboutPreview />
      {/* <Services /> */}
      <Statistics />
      <WhyUs />
      <GalleryPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}