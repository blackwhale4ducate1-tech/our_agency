import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

import { AnimatedTitle } from "./animated-title";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

export const About = memo(() => {
  const navigate = useNavigate();
  const animSettings = getAnimationSettings();

  const handleLearnMore = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  useGSAP(() => {
    if (!animSettings.shouldAnimate) return;

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.8, // Slightly higher for smoother animation
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] text-gray-400">
          About Our Development Company
        </p>

        <AnimatedTitle containerClass="mt-5 !text-white text-center">
          {
            "Craft<b>i</b>ng Digital Solut<b>i</b>ons <br />for Tomorrow&apos;s World"
          }
        </AnimatedTitle>

        <div className="about-subtext">
          <p className="text-gray-300">We are a passionate team of developers, designers, and innovators</p>
          <p className="text-gray-300">Transforming ideas into powerful digital experiences that drive success</p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLearnMore}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-semibold transition-transform duration-200 active:scale-95 shadow-lg"
          >
            Learn More About Us
          </button>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="/img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});

About.displayName = "About";
