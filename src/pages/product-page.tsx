import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown, Rocket, Zap, Globe, Shield, Code, Server } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Web Development Suite",
    tagline: "Full‑stack web applications",
    description: "Build powerful, scalable web applications with our comprehensive development toolkit.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=75",
    icon: Code,
    gradient: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    name: "Mobile App Framework",
    tagline: "Cross‑platform mobile solutions",
    description: "Create stunning mobile experiences that work seamlessly across iOS and Android.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=75",
    icon: Rocket,
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    name: "AI Analytics Platform",
    tagline: "Data‑driven business insights",
    description: "Harness the power of artificial intelligence to unlock actionable insights from your data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=75",
    icon: Zap,
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    id: 4,
    name: "Cloud Infrastructure",
    tagline: "Scalable cloud solutions",
    description: "Enterprise-grade cloud infrastructure designed for performance and reliability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=75",
    icon: Globe,
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    id: 5,
    name: "E-commerce Platform",
    tagline: "Complete online store solution",
    description: "Launch and scale your online business with our feature-rich e-commerce platform.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=75",
    icon: Shield,
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    id: 6,
    name: "DevOps Automation",
    tagline: "Streamlined deployment pipeline",
    description: "Automate your development workflow with our powerful DevOps tools and integrations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=75",
    icon: Server,
    gradient: "from-pink-400 to-rose-400"
  },
];

// Memoized product card
const ProductCard = memo(({
  product,
  index
}: {
  product: typeof products[0];
  index: number;
}) => {
  const Icon = product.icon;

  return (
    <div
      className="product-card relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
      style={{ opacity: 0, transform: 'translateY(60px) scale(0.95)' }}
      data-index={index}
    >
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient}`} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Icon badge */}
        <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${product.gradient}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
          {product.name}
        </h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-gray-300">
            Enterprise
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-gray-300">
            API Ready
          </span>
        </div>

        {/* CTA */}
        <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${product.gradient} text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98]`}>
          Learn More
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

// Memoized horizontal card
const HorizontalCard = memo(({
  product,
  index
}: {
  product: typeof products[0];
  index: number;
}) => {
  const Icon = product.icon;

  return (
    <div className="h-item min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw]">
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm h-full">
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient} z-10`} />

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[45vh] object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-400">Product #{index + 1}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-gray-300 text-lg">{product.tagline}</p>
        </div>
      </div>
    </div>
  );
});

HorizontalCard.displayName = "HorizontalCard";

export const ProductPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const hTrackRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const animSettings = getAnimationSettings();

  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      // Set visible state without animations
      gsap.set(".product-card", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".hero-element", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.config({ force3D: true });

      // Hero animations - smooth and elegant
      const heroTl = gsap.timeline();

      heroTl
        .fromTo(".hero-badge",
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo(".hero-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".hero-buttons",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Product cards - staggered reveal with smooth entrance
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          delay: (i % 3) * 0.1
        });

        // Hover effect
        if (animSettings.enableHoverEffects) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
          });
        }
      });

      // Horizontal scroll section - smooth scrub animation
      if (horizontalRef.current && hTrackRef.current) {
        const sections = hTrackRef.current.querySelectorAll(".h-item");
        const total = sections.length;
        const scrollWidth = (total - 1) * 100;

        gsap.to(hTrackRef.current, {
          xPercent: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`,
            scrub: 0.8, // Smoother scrub
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const newIndex = Math.round(self.progress * (total - 1));
              if (newIndex !== activeProduct) {
                setActiveProduct(newIndex);
              }
            }
          },
        });

        // Fade in each section as it enters
        sections.forEach((sec) => {
          gsap.fromTo(sec,
            { opacity: 0.5, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "left 80%",
                end: "left 20%",
                containerAnimation: gsap.getById("horizontal-scroll"),
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animSettings.shouldAnimate, animSettings.enableHoverEffects]);

  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-hidden">
      {/* Animated Background - FAQ style colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-emerald-900/20" />
        {animSettings.enableBlur && (
          <>
            <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          </>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Premium Solutions</span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Our Products
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            Built for businesses and innovators. Engineered for performance, scalability, and success.
          </p>

          <p className="text-base text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore our comprehensive suite of development solutions designed to transform your digital vision into reality
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.98]"
            >
              Talk to Sales
            </Link>
            <a
              href="#catalog"
              className="border-2 border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all hover:bg-white/5"
            >
              Explore Catalog
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="catalog" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Featured Products</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Development Solutions
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale modern applications
            </p>
          </div>

          {/* Product Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Showcase */}
      <section ref={horizontalRef} className="relative">
        {/* Section Header */}
        <div className="text-center py-16 px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Featured Showcase
            </span>
          </h2>
          <p className="text-lg text-gray-400">Scroll horizontally to explore our featured products</p>
        </div>

        {/* Horizontal Track */}
        <div className="sticky top-0 h-[70vh] overflow-hidden">
          <div
            ref={hTrackRef}
            className="flex items-center gap-8 px-8 will-change-transform h-full"
          >
            {products.slice(0, 5).map((product, i) => (
              <HorizontalCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
          {products.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 transition-all duration-300 rounded-full ${activeProduct === idx
                ? 'bg-white h-8'
                : 'bg-white/30 h-2'
                }`}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Get Started Today</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to Build?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers and businesses building the future with our solutions
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30 active:scale-[0.98]"
            >
              Start Building
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white/20 hover:border-white/40 text-white font-semibold py-5 px-10 rounded-full text-xl transition-all hover:bg-white/5"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              { icon: Globe, label: "150+", desc: "Countries Served" },
              { icon: Rocket, label: "10K+", desc: "Active Projects" },
              { icon: Shield, label: "99.9%", desc: "Uptime Guarantee" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-200 hover:bg-white/10"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <div className="text-4xl font-bold text-white mb-1">{stat.label}</div>
                <div className="text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

ProductPage.displayName = "ProductPage";
