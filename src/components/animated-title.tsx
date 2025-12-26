import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, memo, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  containerClass?: string;
}

export const AnimatedTitle = memo(({
  children,
  containerClass,
}: PropsWithChildren<AnimatedTitleProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animSettings = getAnimationSettings();

  useEffect(() => {
    if (!containerRef.current) return;

    // If animations are disabled, show content immediately
    if (!animSettings.shouldAnimate) {
      const words = containerRef.current.querySelectorAll(".animated-word");
      words.forEach((word) => {
        (word as HTMLElement).style.opacity = "1";
        (word as HTMLElement).style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".animated-word");
      if (!words || words.length === 0) return;

      // Set initial state
      gsap.set(words, {
        opacity: 0,
        transform: "translate3d(10px, 30px, 0) rotateY(20deg)",
      });

      // Create animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg)",
            ease: "power2.out",
            stagger: 0.03,
            duration: 0.4,
          });
        },
        once: true, // Only animate once for better performance
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animSettings.shouldAnimate]);

  // Parse children and create word spans
  const renderContent = () => {
    const content = children?.toString() || "";
    const lines = content.split("<br />");

    return lines.map((line, lineIndex) => (
      <h1
        key={`line-${lineIndex}`}
        className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
      >
        {line.split(" ").map((word, wordIndex) => (
          <span
            key={`${lineIndex}-${wordIndex}`}
            className="animated-word"
            style={!animSettings.shouldAnimate ? { opacity: 1, transform: 'none' } : undefined}
            dangerouslySetInnerHTML={{ __html: word }}
          />
        ))}
      </h1>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={cn("animated-title", containerClass)}
    >
      {renderContent()}
    </div>
  );
});

AnimatedTitle.displayName = "AnimatedTitle";
