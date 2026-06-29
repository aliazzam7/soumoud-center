import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar   from "./components/NavBar/Navbar";
import Home     from "./pages/Home";
import About    from "./pages/About";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Contact  from "./pages/Contact";
import Gallery  from "./pages/Gallery";
import TestimonialsPage from "./pages/TestimonialsPage";
import "./components/NavBar/Navbar.css";

const Placeholder = ({ title }) => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "2rem", color: "#1a1a1a" }}>{title}</h1>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/about"        element={<About />} />
        <Route path="/services"     element={<Services />} />
        <Route path="/gallery"      element={<Gallery />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/register"     element={<Register />} />
        <Route path="*"             element={<div className="page-content"><Placeholder title="404 — Not Found" /></div>} />
      </Routes>
    </BrowserRouter>
  );
}


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar    from "./components/NavBar/Navbar";
// import Home      from "./pages/Home";
// import Register  from "./pages/Register";
// import "./components/NavBar/Navbar.css";

// const Placeholder = ({ title }) => (
//   <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//     <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "2rem", color: "#1a1a1a" }}>{title}</h1>
//   </div>
// );

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/"             element={<Home />} />
//         <Route path="/about"        element={<div className="page-content"><Placeholder title="About" /></div>} />
//         <Route path="/services"     element={<div className="page-content"><Placeholder title="Services" /></div>} />
//         <Route path="/gallery"      element={<div className="page-content"><Placeholder title="Gallery" /></div>} />
//         <Route path="/testimonials" element={<div className="page-content"><Placeholder title="Testimonials" /></div>} />
//         <Route path="/contact"      element={<div className="page-content"><Placeholder title="Contact" /></div>} />
//         <Route path="/register"     element={<Register />} />
//         <Route path="*"             element={<div className="page-content"><Placeholder title="404 — Not Found" /></div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
