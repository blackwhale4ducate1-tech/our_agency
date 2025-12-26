import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HomePage } from "@/pages/home-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import FaqPage from "@/pages/faq-page";
import PricingPage from "@/pages/pricing-page";
import { ProductPage } from "@/pages/product-page";
import ServicePage from "@/pages/service-page";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
