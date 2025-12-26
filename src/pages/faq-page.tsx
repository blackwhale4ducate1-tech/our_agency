import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, MessageCircle, Zap, Shield, Globe, Users, Rocket, HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is Zentry and who is it for?",
    a: "Zentry is a next‑gen gaming universe and tooling stack built for creators, studios, and players to build and experience immersive worlds. Whether you're an indie developer or a AAA studio, our platform provides everything you need to create engaging gaming experiences.",
    icon: Sparkles,
    gradient: "from-purple-400 to-pink-400"
  },
  {
    q: "How do I get early access to your products?",
    a: "Join our waitlist or contact our team. We prioritize active creators, studios, and partners for early previews and betas. Early access members get exclusive benefits including beta features, priority support, and direct input into our product roadmap.",
    icon: Rocket,
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    q: "Do your products support cross‑platform?",
    a: "Yes. Our SDKs and services target desktop, web, and XR with modern pipelines to help you ship everywhere fast. We support Windows, macOS, Linux, iOS, Android, and major VR/AR platforms with a single codebase.",
    icon: Globe,
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    q: "Can I integrate with my existing engine/tooling?",
    a: "Absolutely. We provide clean APIs, adapters, and reference projects to plug into your current stack without friction. Our platform integrates seamlessly with Unity, Unreal Engine, and custom engines through our flexible SDK architecture.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    q: "What pricing models are available?",
    a: "We offer free tiers for exploration, usage‑based pricing for scale, and enterprise plans with SLA and dedicated support. Start free with up to 100 monthly active users, then scale with transparent pricing as you grow.",
    icon: Shield,
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    q: "Is there a community or support channel?",
    a: "Yes. Join our Discord for community help, announcements, and dev support. Enterprise customers receive dedicated channels with direct access to our engineering team, including video calls and custom integrations support.",
    icon: Users,
    gradient: "from-pink-400 to-rose-400"
  },
  {
    q: "Do you support multiplayer and realtime features?",
    a: "Yes. Our cloud and networking products are optimized for low‑latency realtime experiences at global scale. We handle matchmaking, state synchronization, voice chat, and real-time analytics out of the box.",
    icon: MessageCircle,
    gradient: "from-cyan-400 to-blue-400"
  },
  {
    q: "How can we partner with Zentry?",
    a: "Reach out via our Contact page for partnerships. We collaborate with studios, IP holders, and ecosystem tools to create mutual value. Our partnership program includes co-marketing, revenue sharing, and technical collaboration opportunities.",
    icon: HelpCircle,
    gradient: "from-violet-400 to-purple-400"
  }
];

const FaqPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();
      
      const heroBadge = heroRef.current?.querySelector(".hero-badge");
      if (heroBadge) {
        tl.fromTo(
          heroBadge,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
      const heroTitle = heroRef.current?.querySelector("h1");
      if (heroTitle) {
        tl.fromTo(
          heroTitle,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        );
      }
      const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
      if (heroSubtitle) {
        tl.fromTo(
          heroSubtitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
      const heroButtons = heroRef.current?.querySelectorAll(".hero-btn");
      if (heroButtons) {
        tl.fromTo(
          heroButtons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // FAQ Items scroll animations
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;

        const card = item.querySelector(".faq-card");
        const number = numberRefs.current[idx];
        const icon = item.querySelector(".faq-icon");
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const decorCircle = item.querySelector(".decor-circle");

        // Main card entrance
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: 100,
            rotateY: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveIndex(idx),
              onEnterBack: () => setActiveIndex(idx),
            }
          }
        );

        // Large number parallax
        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, x: -50, scale: 0.8 },
            {
              opacity: 0.08,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Icon rotation and scale
        gsap.fromTo(
          icon,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 65%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Question text reveal with split
        if (question) {
          const chars = (question as HTMLElement).textContent?.split("") || [];
          (question as HTMLElement).innerHTML = chars
            .map((c) => c === " " 
              ? '<span class="inline-block w-2"></span>' 
              : `<span class="inline-block opacity-0">${c}</span>`
            )
            .join("");
          
          gsap.to(question.querySelectorAll("span"), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Answer fade and slide up
        gsap.fromTo(
          answer,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 55%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Decorative circle pulse
        if (decorCircle) {
          gsap.fromTo(
            decorCircle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.15,
              duration: 1.5,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Continuous pulse
          gsap.to(decorCircle, {
            scale: 1.1,
            opacity: 0.08,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 70%"
            }
          });
        }

        // Hover effects
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-emerald-900/20" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Your Questions Answered</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about Zentry
          </p>

          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Scroll through our most frequently asked questions or reach out to our team for personalized assistance
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="hero-btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              View All FAQs
            </button>
            <button className="hero-btn border-2 border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all hover:bg-white/5">
              Contact Support
            </button>
          </div>

          <div className="scroll-indicator flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section ref={contentRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemRefs.current[idx] = el;
              }}
              className="relative"
            >
              {/* Large Background Number */}
              <div
                ref={(el) => {
                  if (el) numberRefs.current[idx] = el;
                }}
                className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-black text-white pointer-events-none select-none"
                style={{ lineHeight: 1 }}
              >
                {(idx + 1).toString().padStart(2, '0')}
              </div>

              {/* Decorative Circle */}
              <div
                className={`decor-circle absolute -right-20 top-0 w-64 h-64 rounded-full bg-gradient-to-br ${faq.gradient} blur-3xl pointer-events-none`}
              />

              {/* Main Card */}
              <div className="faq-card relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 md:p-12 shadow-2xl">
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${faq.gradient}`} />

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Icon */}
                  <div className={`faq-icon flex-shrink-0 p-5 rounded-2xl bg-gradient-to-br ${faq.gradient}`}>
                    <faq.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="faq-question text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      {faq.q}
                    </h3>
                    <p className="faq-answer text-lg md:text-xl text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>

                    {/* Additional Info Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">Question #{idx + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {faqs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              itemRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'bg-white scale-150 h-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-emerald-900/30" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Need More Help?</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Still have questions?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our team is here to help you build, ship, and scale your next immersive world
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-5 px-10 rounded-full text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
              Talk to Our Team
            </button>
            <button 
              onClick={scrollToTop}
              className="border-2 border-white/20 hover:border-white/40 text-white font-semibold py-5 px-10 rounded-full text-xl transition-all hover:bg-white/5"
            >
              Back to Top
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: Users, label: "10K+", desc: "Active Developers" },
              { icon: Globe, label: "150+", desc: "Countries Reached" },
              { icon: Zap, label: "99.9%", desc: "Uptime Guarantee" }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-5xl font-bold text-white mb-2">{stat.label}</div>
                <div className="text-gray-400 text-lg">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;