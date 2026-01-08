import { useEffect, useRef, useState, memo } from "react";
import { ChevronDown, Check, Zap, Shield, Users, TrendingUp, Star, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";

const tiers = [
  {
    id: 1,
    name: "Web Development",
    price: "₹24,999",
    period: "/project",
    tagline: "Modern websites that convert visitors into customers",
    description:
      "Perfect for small businesses and personal brands that need a fast, responsive and professional website that looks great on every device.",
    features: [
      "Up to 5 custom-designed pages",
      "Responsive design for mobile, tablet & desktop",
      "SEO-friendly structure & basic on-page optimization",
      "Contact / enquiry form integration",
      "Basic speed optimization",
      "Deployment & domain configuration support",
      "1 round of revisions included",
      "Delivery in 10-14 business days"
    ],
    accent: "from-emerald-400 to-teal-400",
    accentSolid: "bg-emerald-500",
    icon: Zap,
    highlights: ["Best for small businesses", "One-time project", "Launch-ready website"]
  },
  {
    id: 2,
    name: "App Development",
    price: "₹1,19,999",
    period: "/project",
    tagline: "Custom mobile & web apps built for your idea",
    description:
      "Ideal for startups and growing teams that want a production-ready app with clean UX, scalable architecture and ongoing support options.",
    features: [
      "Discovery & requirements workshop",
      "UI/UX design for core user flows",
      "Cross-platform app (web or mobile) MVP",
      "Authentication & secure user management",
      "API integration (payments, email, or third-party)",
      "Admin dashboard or basic analytics",
      "Testing & QA before launch",
      "Technical handover & documentation"
    ],
    accent: "from-blue-400 to-indigo-400",
    accentSolid: "bg-blue-500",
    popular: true,
    icon: TrendingUp,
    highlights: ["Most popular", "Great for startups", "Scales with your product"]
  },
  {
    id: 3,
    name: "Social Media Handling",
    price: "₹14,999",
    period: "/month",
    tagline: "Consistent content and engagement for your brand",
    description:
      "For brands that want professional, consistent social media presence without hiring a full-time team.",
    features: [
      "Content strategy for 1–2 platforms (Instagram, Facebook, LinkedIn, etc.)",
      "12–16 posts per month (graphics + captions)",
      "Hashtag & basic keyword research",
      "Posting calendar & scheduling",
      "Replying to basic comments & DMs (business hours)",
      "Monthly performance summary report",
      "Basic ad creatives (static) – up to 2 per month",
      "One strategy review call each month"
    ],
    accent: "from-purple-400 to-fuchsia-400",
    accentSolid: "bg-purple-500",
    icon: Shield,
    highlights: ["Grow your audience", "Done-for-you content", "Great for ongoing brand building"]
  }
];

const PricingPage = memo(() => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Detect when the section is mostly in view
        threshold: 0.2, // Lower threshold for mobile
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={cn(
      "min-h-screen w-full overflow-x-hidden transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Hero Section */}
      <section
        ref={(el) => { sectionRefs.current[0] = el }}
        className="relative min-h-[90dvh] flex flex-col items-center justify-center px-4 py-24 sm:py-32 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isDark
              ? "bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-emerald-900/10 opacity-60"
              : "bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-emerald-100/30 opacity-80"
          )} />
          <div className={cn(
            "absolute top-1/4 left-1/4 h-64 w-64 md:h-96 md:w-96 rounded-full blur-[100px] animate-pulse",
            isDark ? "bg-purple-500/10" : "bg-purple-300/20"
          )} style={{ animationDuration: '4s' }} />
          <div className={cn(
            "absolute bottom-1/4 right-1/4 h-64 w-64 md:h-96 md:w-96 rounded-full blur-[100px] animate-pulse",
            isDark ? "bg-blue-500/10" : "bg-blue-300/20"
          )} style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in px-4">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border mb-6 md:mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" />
            <span className={cn(
              "text-xs md:text-sm font-medium",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Transparent Pricing, No Hidden Fees
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>

          <p className={cn(
            "text-lg sm:text-xl md:text-3xl mb-4 max-w-3xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Choose the perfect plan for your needs with {COMPANY.name}
          </p>

          <p className={cn(
            "text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Clear pricing with no setup fees or hidden charges. All plans include our core features with transparent cost breakdown.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection(1)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3.5 px-8 rounded-full text-base sm:text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              View Plans
            </button>
            <button className={cn(
              "w-full sm:w-auto border py-3.5 px-8 rounded-full text-base sm:text-lg font-semibold transition-all",
              isDark
                ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
            )}>
              Compare Features
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className={cn(
              "w-6 h-6 sm:w-8 sm:h-8 mx-auto",
              isDark ? "text-white/50" : "text-gray-400"
            )} />
          </div>
        </div>
      </section>

      {/* Tier Sections */}
      <div className="flex flex-col gap-20 md:gap-32 py-20 overflow-hidden">
        {tiers.map((tier, index) => (
          <section
            key={tier.id}
            ref={(el) => { sectionRefs.current[index + 1] = el }}
            className={`relative min-h-[50vh] flex items-center justify-center px-4 md:px-6 transition-all duration-700 ${activeSection === index + 1 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-12'
              }`}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-gradient-to-r ${tier.accent} opacity-10 blur-3xl`}
                style={{
                  transform: `translate(-50%, -50%) scale(${activeSection === index + 1 ? 1.2 : 0.8})`,
                  transition: 'transform 1s ease-out'
                }}
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div
                  className="space-y-6 md:space-y-8 text-center lg:text-left"
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${tier.accent} shadow-lg shadow-${tier.accentSolid}/20`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    {tier.popular && (
                      <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-orange-500 text-black flex items-center gap-1 shadow-lg shadow-yellow-500/20">
                        <Star className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent mb-2`}>
                      {tier.name}
                    </h2>
                    <p className={cn(
                      "text-xl md:text-2xl",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      {tier.tagline}
                    </p>
                  </div>

                  <p className={cn(
                    "text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    {tier.description}
                  </p>

                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-2 justify-center lg:justify-start">
                    <span className={`text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent`}>
                      {tier.price}
                    </span>
                    <span className={cn(
                      "text-xl mb-2",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>{tier.period}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {tier.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className={cn(
                          "px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border transition-colors",
                          isDark ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-white text-gray-700"
                        )}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${tier.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-blue-500/50'
                      : isDark
                        ? 'bg-white text-black hover:shadow-white/50'
                        : 'bg-gray-900 text-white hover:shadow-gray-900/50'
                      }`}
                  >
                    Get Started
                  </button>
                </div>

                {/* Right Content - Feature Card */}
                <div
                  className={cn(
                    "rounded-3xl overflow-hidden border backdrop-blur-md transition-all duration-700",
                    tier.popular
                      ? "border-blue-400/50 shadow-2xl shadow-blue-500/10"
                      : isDark ? "border-white/10" : "border-gray-200",
                    isDark
                      ? "bg-gradient-to-br from-white/5 to-transparent"
                      : "bg-white/80"
                  )}
                  style={{
                    transform: activeSection === index + 1
                      ? 'perspective(1000px) rotateY(0deg) translateZ(0)'
                      : 'perspective(1000px) rotateY(5deg) translateZ(-50px)',
                    opacity: activeSection === index + 1 ? 1 : 0.8
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${tier.accent}`} />

                  <div className="p-6 md:p-8 lg:p-10">
                    <h3 className={cn(
                      "text-xl md:text-2xl font-bold mb-6 flex items-center gap-2",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      <Check className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                      Everything Included
                    </h3>

                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className={cn(
                            "flex items-start gap-3",
                            isDark ? "text-gray-300" : "text-gray-600"
                          )}
                        >
                          <div className={`mt-0.5 p-1 rounded-full ${tier.accentSolid} flex-shrink-0`}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-sm md:text-base leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={cn(
                      "mt-8 pt-8 border-t",
                      isDark ? "border-white/10" : "border-gray-100"
                    )}>
                      <p className={cn(
                        "text-sm text-center font-medium",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        🎉 Contact us for a free consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Number Indicator (Desktop Only) */}
            <div className="hidden lg:block absolute bottom-8 right-8 pointer-events-none select-none">
              <div className={cn(
                "text-[10rem] font-black leading-none opacity-5",
                isDark ? "text-white" : "text-black"
              )}>
                0{index + 1}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Custom Plan Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 py-20 sm:py-32">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-b from-emerald-900/10 via-blue-900/5 to-purple-900/5"
            : "bg-gradient-to-b from-emerald-100/30 via-blue-100/20 to-purple-100/20"
        )} />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className={cn(
            "rounded-3xl border backdrop-blur-md p-8 md:p-14 text-center",
            isDark
              ? "border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
              : "border-gray-200 bg-white/90 shadow-xl"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6",
              isDark ? "bg-white/5 border-white/15" : "bg-gray-100 border-gray-200"
            )}>
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className={cn(
                "text-xs md:text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                Need something different?
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Custom Plans for Your Project
              </span>
            </h2>

            <p className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Not sure which plan fits your idea? Tell us about your website, app, or social media goals and we'll craft a custom package.
            </p>

            <div className="grid gap-6 md:grid-cols-3 text-left mb-12">
              {[
                { title: "Tailored Scope", desc: "We adjust features and timelines." },
                { title: "Transparent Pricing", desc: "Clear breakdown before we start." },
                { title: "Dedicated Support", desc: "We help you choose the right tech." }
              ].map((item) => (
                <div key={item.title} className={cn(
                  "p-6 rounded-2xl border",
                  isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
                )}>
                  <h3 className={cn(
                    "text-lg font-bold mb-2",
                    isDark ? "text-white" : "text-gray-900"
                  )}>{item.title}</h3>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/contact"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/50"
              >
                Request Custom Quote
              </a>
              <p className={cn(
                "text-sm max-w-xs",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                Share your requirements, budget range, and timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 pb-40 sm:py-32 sm:pb-48">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-t from-purple-900/20 to-transparent"
            : "bg-gradient-to-t from-purple-100/30 to-transparent"
        )} />

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to get started?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-10 rounded-full text-lg md:text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
              Get Started Today
            </button>
            <button className={cn(
              "w-full sm:w-auto border-2 font-semibold py-4 px-10 rounded-full text-lg md:text-xl transition-all",
              isDark
                ? "border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100"
            )}>
              Talk to Us
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Users, label: "50+", desc: "Happy Clients" },
              { icon: Star, label: "4.9/5", desc: "Client Rating" },
              { icon: Shield, label: "100%", desc: "Satisfaction" }
            ].map((stat) => (
              <div key={stat.label} className={cn(
                "p-6 rounded-2xl border transition-colors hover:border-blue-400/30",
                isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
              )}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className={cn(
                  "text-3xl font-bold mb-1",
                  isDark ? "text-white" : "text-gray-800"
                )}>{stat.label}</div>
                <div className={isDark ? "text-gray-400" : "text-gray-500"}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Progress Indicator (Desktop Only) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              activeSection === idx
                ? "scale-150 bg-accent-primary"
                : isDark ? "bg-white/20 hover:bg-white/40" : "bg-gray-300 hover:bg-gray-400",
              activeSection === idx && isDark ? "bg-white" : "",
              activeSection === idx && !isDark ? "bg-gray-900" : ""
            )}
            aria-label={`Scroll to section ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
});

PricingPage.displayName = "PricingPage";

export default PricingPage;