import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, memo, useState, useCallback } from "react";
import { Star, Quote, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

import { AnimatedTitle } from "./animated-title";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        position: "CEO",
        company: "TechStart Inc.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "Working with this development team was an absolute game-changer for our business. They delivered a stunning e-commerce platform that exceeded all our expectations. The attention to detail and commitment to quality is unmatched.",
        highlight: "Revenue increased by 340%",
        gradient: "from-violet-500 to-fuchsia-500",
        bgGlow: "violet"
    },
    {
        id: 2,
        name: "Michael Chen",
        position: "CTO",
        company: "InnovateLab",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "The mobile app they developed for us has revolutionized how our customers interact with our services. The user experience is seamless and the performance is outstanding. Highly recommend their services!",
        highlight: "5M+ app downloads",
        gradient: "from-blue-500 to-cyan-500",
        bgGlow: "blue"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        position: "Founder",
        company: "HealthTech Solutions",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "Their expertise in healthcare technology is remarkable. They built a comprehensive patient management system that has streamlined our operations and improved patient satisfaction significantly.",
        highlight: "40% efficiency boost",
        gradient: "from-emerald-500 to-teal-500",
        bgGlow: "emerald"
    },
    {
        id: 4,
        name: "David Thompson",
        position: "Marketing Director",
        company: "GrowthCorp",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "The AI-powered analytics dashboard they created has transformed how we make data-driven decisions. Real-time insights, beautiful visualizations, and incredible performance. Worth every penny!",
        highlight: "200% ROI in 6 months",
        gradient: "from-orange-500 to-amber-500",
        bgGlow: "orange"
    },
    {
        id: 5,
        name: "Lisa Wang",
        position: "Product Manager",
        company: "FutureTech",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "From concept to deployment, their team was professional, communicative, and delivered exceptional results. They truly understand modern web development and user experience design.",
        highlight: "Launched in 8 weeks",
        gradient: "from-indigo-500 to-purple-500",
        bgGlow: "indigo"
    },
    {
        id: 6,
        name: "James Miller",
        position: "Operations Manager",
        company: "LogiFlow",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80",
        rating: 5,
        text: "The logistics management system they developed has optimized our entire supply chain. Real-time tracking, automated workflows, and excellent customer support. A true partner in innovation.",
        highlight: "30% cost reduction",
        gradient: "from-pink-500 to-rose-500",
        bgGlow: "pink"
    }
];

// Animated star rating with stagger
const StarRating = memo(({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`star-icon w-5 h-5 transition-all duration-300 ${index < rating
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                    : "text-gray-600"
                    }`}
                style={{ animationDelay: `${index * 0.1}s` }}
            />
        ))}
    </div>
));

StarRating.displayName = "StarRating";

// Enhanced testimonial card with 3D hover effects
const TestimonialCard = memo(({
    testimonial,
    index,
    isActive
}: {
    testimonial: typeof testimonials[0];
    index: number;
    isActive: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className={`testimonial-card group relative overflow-hidden rounded-3xl border transition-all duration-500 ${isActive
                ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 scale-105 shadow-2xl z-10'
                : 'border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/20'
                }`}
            style={{ opacity: 0, transform: 'translateY(60px) rotateX(10deg)' }}
            data-index={index}
        >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${isActive ? 'opacity-30' : ''}`} />

            {/* Top accent line with animation */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>

            {/* Quote watermark */}
            <div className="absolute top-6 right-6 text-white/5">
                <Quote className="w-20 h-20 fill-current" />
            </div>

            <div className="relative p-8">
                {/* Header with avatar */}
                <div className="flex items-center gap-5 mb-6">
                    {/* Avatar with ring */}
                    <div className="relative">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-full blur opacity-75`} />
                        <div className={`relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-black ring-white/20`}>
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.position}</p>
                        <p className={`text-sm font-medium bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                            {testimonial.company}
                        </p>
                    </div>
                </div>

                {/* Rating with animation */}
                <div className="mb-5">
                    <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed text-sm mb-6">
                    "{testimonial.text}"
                </p>

                {/* Highlight badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} shadow-lg`}>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">{testimonial.highlight}</span>
                </div>
            </div>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

// Featured testimonial (large showcase)
const FeaturedTestimonial = memo(({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="featured-testimonial relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
        {/* Background elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-3xl opacity-20`} />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

        {/* Top accent */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${testimonial.gradient}`} />

        <div className="relative p-10 md:p-14">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left: Avatar and info */}
                <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
                    {/* Large avatar */}
                    <div className="relative">
                        <div className={`absolute -inset-3 bg-gradient-to-r ${testimonial.gradient} rounded-full blur-lg opacity-50 animate-pulse`} />
                        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/20">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-white mb-1">{testimonial.name}</h3>
                        <p className="text-gray-400">{testimonial.position}</p>
                        <p className={`font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                            {testimonial.company}
                        </p>
                    </div>

                    <StarRating rating={testimonial.rating} />

                    {/* Play video button */}
                    <button className={`flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white font-semibold transition-all hover:shadow-lg hover:scale-105`}>
                        <Play className="w-5 h-5" />
                        Watch Story
                    </button>
                </div>

                {/* Right: Quote */}
                <div className="lg:w-2/3">
                    <Quote className={`w-16 h-16 mb-6 opacity-50 fill-current bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`} />
                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                        "{testimonial.text}"
                    </p>

                    {/* Highlight stat */}
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${testimonial.gradient} shadow-xl`}>
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-lg font-bold text-white">{testimonial.highlight}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

FeaturedTestimonial.displayName = "FeaturedTestimonial";

export const Testimonials = memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const animSettings = getAnimationSettings();

    const nextFeatured = useCallback(() => {
        setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevFeatured = useCallback(() => {
        setFeaturedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useGSAP(() => {
        if (!animSettings.shouldAnimate) {
            gsap.set(".testimonial-card, .featured-testimonial", { opacity: 1, y: 0, rotateX: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            // Section badge animation
            gsap.fromTo("#testimonials-badge",
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: "#testimonials-badge",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Featured testimonial entrance
            gsap.fromTo(".featured-testimonial",
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".featured-testimonial",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Grid cards with 3D stagger
            gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    delay: (i % 3) * 0.15
                });

                // Hover 3D tilt effect
                if (animSettings.enableHoverEffects) {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            scale: 1.03,
                            rotateY: 2,
                            rotateX: -2,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            scale: 1,
                            rotateY: 0,
                            rotateX: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                }
            });

            // Star icons stagger animation
            gsap.utils.toArray<HTMLElement>(".star-icon").forEach((star, i) => {
                gsap.fromTo(star,
                    { scale: 0, rotate: -180 },
                    {
                        scale: 1,
                        rotate: 0,
                        duration: 0.4,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: star,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        },
                        delay: i * 0.05
                    }
                );
            });

        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [animSettings.shouldAnimate, animSettings.enableHoverEffects]);

    return (
        <section id="testimonials" className="relative min-h-screen w-screen bg-black py-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
                {animSettings.enableBlur && (
                    <>
                        <div className="absolute top-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                        <div className="absolute bottom-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
                    </>
                )}
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div ref={containerRef} className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <div id="testimonials-badge" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-8">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-semibold text-white">Client Success Stories</span>
                    </div>

                    <AnimatedTitle containerClass="!text-white text-center">
                        {"What Our Cl<b>i</b>ents S<b>a</b>y"}
                    </AnimatedTitle>

                    <p className="text-gray-400 max-w-2xl mx-auto mt-8 text-lg leading-relaxed">
                        Don't just take our word for it. Here's what industry leaders say about working with us.
                    </p>
                </div>

                {/* Featured Testimonial */}
                <div className="mb-20">
                    <FeaturedTestimonial testimonial={testimonials[featuredIndex]} />

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={prevFeatured}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setFeaturedIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${featuredIndex === i ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextFeatured}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                            isActive={false}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20">
                    <div className="inline-flex flex-col items-center gap-6">
                        <p className="text-gray-400 text-lg">Ready to become our next success story?</p>
                        <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">Start Your Project Today</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
});

Testimonials.displayName = "Testimonials";
