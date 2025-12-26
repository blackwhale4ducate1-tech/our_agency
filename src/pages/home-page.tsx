import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { DevelopmentProcess } from "@/components/development-process";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { OurWork } from "@/components/our-work";
import { Testimonials } from "@/components/testimonials";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <main>
        <Hero />
        <About />
        <OurWork />
        <DevelopmentProcess />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};
