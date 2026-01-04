import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState, memo } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import { Button } from "./button";
import { COMPANY } from "@/constants";
import { getAnimationSettings, isMobile } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Local optimized hero video
const HERO_VIDEO = "/videos/hero-video.mp4";

// Memoized loading spinner to prevent re-renders
const LoadingSpinner = memo(({ isDark }: { isDark: boolean }) => (
  <div className={cn(
    "flex-center absolute z-[100] h-dvh w-screen overflow-hidden",
    isDark ? "bg-violet-50" : "bg-gray-100"
  )}>
    <div className="three-body">
      <div className="three-body__dot" />
      <div className="three-body__dot" />
      <div className="three-body__dot" />
    </div>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

export const Hero = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  // Check for mobile device on mount
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  // Handle video loaded
  const handleVideoLoad = () => {
    setIsLoading(false);
    // Auto-play with sound when loaded
    if (mainVideoRef.current) {
      mainVideoRef.current.play().catch(() => {
        // If autoplay with sound fails (browser policy), try muted first
        if (mainVideoRef.current) {
          mainVideoRef.current.muted = true;
          mainVideoRef.current.play();
        }
      });
    }
  };

  // Keep video always playing - never pause
  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;

    // Function to ensure video keeps playing
    const keepPlaying = () => {
      if (video.paused) {
        video.play().catch(() => { });
      }
    };

    // Check every second to ensure video is playing
    const interval = setInterval(keepPlaying, 1000);

    // Also restart on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => { });
      }
    };

    // Handle video ended - restart it
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => { });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", keepPlaying);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", keepPlaying);
    };
  }, [isLoading]);

  useGSAP(() => {
    if (!animSettings.shouldAnimate) return;

    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    ScrollTrigger.create({
      trigger: "#video-frame",
      start: "center center",
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(${14 - 14 * progress}% 0%, ${72 + 28 * progress}% 0%, ${90 + 10 * progress}% ${90 + 10 * progress}%, 0% 100%)`;
        const borderRadius = `0 0 ${40 - 40 * progress}% ${10 - 10 * progress}%`;
        gsap.set("#video-frame", { clipPath, borderRadius });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && <LoadingSpinner isDark={isDark} />}

      <div
        id="video-frame"
        className={cn(
          "relative z-10 h-dvh w-screen overflow-hidden rounded-lg",
          isDark ? "bg-blue-75" : "bg-gray-100"
        )}
      >
        {/* Gradient overlay for better text readability */}
        <div className={cn(
          "absolute inset-0 z-10",
          isDark
            ? "bg-gradient-to-b from-black/40 via-transparent to-black/60"
            : "bg-gradient-to-b from-white/30 via-transparent to-white/40"
        )} />

        {/* Main hero video - WITH SOUND, ALWAYS PLAYING */}
        <video
          ref={mainVideoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Company name watermark at bottom */}
        <h1 className={cn(
          "special-font hero-heading absolute bottom-5 right-5 z-40",
          isDark ? "text-blue-75" : "text-white/80"
        )}>
          4DK<b>.</b>Teams
        </h1>

        {/* Main hero content */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/* Badge */}
            <div className={cn(
              "mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm",
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-black/10 border-white/30"
            )}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white">Available for Projects</span>
            </div>

            <h1 className="special-font hero-heading text-white drop-shadow-lg">
              Innov<b>a</b>tive
            </h1>

            <h2 className="special-font text-4xl md:text-6xl font-bold mt-2 mb-4 text-white drop-shadow-lg">
              Digital Solutions
            </h2>

            <p className="mb-6 max-w-md font-robert-regular text-lg leading-relaxed text-white/90 drop-shadow-md">
              Transforming ideas into powerful digital experiences.
              Web development, mobile apps, and AI-powered solutions by {COMPANY.name}.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  id="get-started"
                  leftIcon={TiLocationArrow}
                  containerClass="bg-gradient-to-r from-yellow-400 to-orange-400 flex-center gap-1 text-black hover:shadow-2xl hover:shadow-yellow-500/30 transition-all"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  id="view-services"
                  containerClass="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                >
                  View Services
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            {!isMobileDevice && (
              <div className="mt-12 flex items-center gap-8">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "99%", label: "Satisfaction" },
                  { value: "10+", label: "Years" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Background company name */}
      <h1 className={cn(
        "special-font hero-heading absolute bottom-5 right-5",
        isDark ? "text-black" : "text-gray-300"
      )}>
        4DK<b>.</b>Teams
      </h1>
    </section>
  );
});

Hero.displayName = "Hero";
