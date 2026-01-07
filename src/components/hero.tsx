import { useEffect, useRef, useState, memo } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import { Button } from "./button";
import { COMPANY } from "@/constants";
import { isMobile } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

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

  return (
    <section id="hero" className="relative h-screen w-screen overflow-hidden">
      {isLoading && <LoadingSpinner isDark={isDark} />}

      {/* Full Screen Video Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main hero video - FULL SCREEN, WITH SOUND, ALWAYS PLAYING */}
        <video
          ref={mainVideoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
        />

        {/* Dark overlay for better text readability */}
        <div className={cn(
          "absolute inset-0 z-10",
          isDark
            ? "bg-gradient-to-b from-black/50 via-black/20 to-black/70"
            : "bg-gradient-to-b from-black/40 via-black/10 to-black/60"
        )} />
      </div>

      {/* Hero Content - Overlay */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm bg-white/10 border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Available for Projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="special-font hero-heading text-white drop-shadow-2xl">
            Innov<b>a</b>tive
          </h1>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-2 mb-6 text-white drop-shadow-xl">
            Digital Solutions
          </h2>

          <p className="mb-8 max-w-xl font-robert-regular text-lg md:text-xl leading-relaxed text-white/90 drop-shadow-lg">
            Transforming ideas into powerful digital experiences.
            Web development, mobile apps, and AI-powered solutions by {COMPANY.name}.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/contact">
              <Button
                id="get-started"
                leftIcon={TiLocationArrow}
                containerClass="bg-gradient-to-r from-yellow-400 to-orange-400 flex-center gap-1 text-black font-bold hover:shadow-2xl hover:shadow-yellow-500/30 transition-all px-8 py-4"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/services">
              <Button
                id="view-services"
                containerClass="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all px-8 py-4"
              >
                View Services
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          {!isMobileDevice && (
            <div className="flex items-center gap-10">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "3+", label: "Years Experience" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white drop-shadow-xl">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Company name watermark - bottom right */}
      <div className="absolute bottom-8 right-8 z-30">
        <h1 className="text-6xl md:text-8xl font-black text-white/20 tracking-tight">
          4DK<span className="text-yellow-400/30">.</span>Teams
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
