import { useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Rocket, Factory, Tv, Calendar, ShoppingCart } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/constants";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Types
interface Metric {
    value: string;
    label: string;
}

interface Solution {
    title: string;
    description: string;
    tags: string[];
}

interface CaseStudyData {
    id: string;
    number: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    image: string | null;
    imageAlt: string;
    problem: string;
    problemTags: string[];
    solutions: Solution[];
    result: string;
    metrics: Metric[];
    techStack: string[];
    color: string;
}

// Case Studies Data
const caseStudiesData: CaseStudyData[] = [
    {
        id: "iiot",
        number: "01",
        category: "Industrial IoT",
        icon: Factory,
        title: "IIoT Protocol Unification",
        subtitle: "Protocol Converter Gateway",
        image: "/img/case-studies/iiot-dashboard.png",
        imageAlt: "IIoT Dashboard showing SCADA machinery monitoring view",
        problem: "Our client had a messy situation. Their factory floor was running on three different protocols: Modbus RTU, Modbus TCP, and BACnet. None of these talked to each other. They wanted cloud monitoring, but getting data out of these old systems was a nightmare.",
        problemTags: ["Modbus RTU", "Modbus TCP", "BACnet"],
        solutions: [
            {
                title: "The Hardware",
                description: "A compact Linux box with a Cortex A45 processor. We added RJ45 for ethernet and RS485 for the serial devices.",
                tags: ["Cortex A45", "RJ45", "RS485"]
            },
            {
                title: "The Software",
                description: "We wrote middleware that reads all three protocols and translates them into MQTT and HTTP. Clean JSON data, ready for any cloud platform.",
                tags: ["MQTT", "HTTP"]
            }
        ],
        result: "Now they have one API for everything. Their team monitors the entire facility from a dashboard. No more walking around with clipboards.",
        metrics: [
            { value: "100%", label: "Devices Connected" },
            { value: "Live", label: "Data Streaming" }
        ],
        techStack: ["Linux", "MQTT", "Modbus", "BACnet", "Node.js"],
        color: "from-purple-400 to-blue-400"
    },
    {
        id: "stb",
        number: "02",
        category: "Smart Media",
        icon: Tv,
        title: "Smart Media Transformation",
        subtitle: "STB Apps & Entertainment Hub",
        image: "/img/case-studies/stb-hub.png",
        imageAlt: "STB Hub interface showing entertainment apps",
        problem: "Cable operators were getting crushed by Netflix and Hotstar. Their set-top boxes could only show cable channels. Customers were cutting the cord because they wanted apps, YouTube, streaming.",
        problemTags: [],
        solutions: [
            {
                title: "Custom Android",
                description: "We stripped down Android to run smooth on low-end STB hardware. No bloat, just what's needed.",
                tags: []
            },
            {
                title: "App Store",
                description: "Built a curated store with streaming apps, games, and local content. Added DRM so premium content stays protected.",
                tags: ["DRM"]
            },
            {
                title: "Hybrid Mode",
                description: "Users can flip between live cable and OTT apps without switching inputs. It just works.",
                tags: ["OTT"]
            }
        ],
        result: "Subscribers stopped leaving. The operators got a new revenue stream from app partnerships.",
        metrics: [
            { value: "40%", label: "Less Churn" },
            { value: "3x", label: "Watch Time" },
            { value: "50+", label: "Apps Live" }
        ],
        techStack: ["Android", "Kotlin", "ExoPlayer", "DRM", "Firebase"],
        color: "from-emerald-400 to-teal-400"
    },
    {
        id: "event",
        number: "03",
        category: "Event Management",
        icon: Calendar,
        title: "Event Stall Booking Platform",
        subtitle: "Exhibition Management System",
        image: "/img/case-studies/event-booking.png",
        imageAlt: "Event booking floor plan with interactive stall selection",
        problem: "A big trade show organizer was managing stall bookings on Excel. Double bookings happened. Exhibitors got frustrated. Money was left on the table because no one knew which premium spots were still available.",
        problemTags: [],
        solutions: [
            {
                title: "Visual Floor Plan",
                description: "Exhibitors see the venue layout. Click a stall, see the price, book it. Availability updates instantly.",
                tags: []
            },
            {
                title: "Dynamic Pricing",
                description: "Spots near the entrance cost more. Corner booths are premium. The system handles all the pricing logic.",
                tags: []
            },
            {
                title: "Payments",
                description: "Razorpay integration. GST invoices generated automatically. No more chasing payments.",
                tags: ["GST", "Razorpay"]
            }
        ],
        result: "What used to take days now takes 5 minutes. The organizer runs 3x more events with the same team.",
        metrics: [
            { value: "95%", label: "Faster" },
            { value: "0", label: "Double Bookings" },
            { value: "25%", label: "More Revenue" }
        ],
        techStack: ["React", "Node.js", "MongoDB", "Canvas", "Razorpay"],
        color: "from-yellow-400 to-orange-400"
    },
    {
        id: "ecommerce",
        number: "04",
        category: "E-Commerce",
        icon: ShoppingCart,
        title: "Multi-Store E-Commerce",
        subtitle: "Enterprise Retail Platform",
        image: null,
        imageAlt: "",
        problem: "A retail chain with 50+ stores wanted to go online. But their stock was scattered across locations. Their existing ERP didn't talk to anything web-based. And they needed to handle sale-day traffic spikes.",
        problemTags: [],
        solutions: [
            {
                title: "Headless Architecture",
                description: "Fast frontend, flexible backend. We can power their website, mobile app, and in-store kiosks from one system.",
                tags: []
            },
            {
                title: "Live Inventory",
                description: "Stock syncs across all 50 stores in real-time. Sell something in-store, the website updates in seconds.",
                tags: []
            },
            {
                title: "Smart Fulfillment",
                description: "Order online, pick up at nearest store. Or get it delivered from wherever has stock.",
                tags: []
            }
        ],
        result: "Their first flash sale hit 10x expected traffic. Zero downtime. Online revenue became a real business.",
        metrics: [
            { value: "300%", label: "Revenue Up" },
            { value: "99.99%", label: "Uptime" },
            { value: "2M+", label: "Visitors/Month" }
        ],
        techStack: ["Next.js", "GraphQL", "PostgreSQL", "Redis", "Kubernetes"],
        color: "from-pink-400 to-red-400"
    }
];

const heroStats = [
    { label: "50+", desc: "Projects Delivered" },
    { label: "98%", desc: "Client Satisfaction" },
    { label: "12+", desc: "Industries Served" },
    { label: "4", desc: "Case Studies" }
];

// Tag Component
const TechTag = memo(({ tag, isDark }: { tag: string; isDark: boolean }) => (
    <span className={cn(
        "inline-block px-2 py-0.5 rounded text-xs font-medium ml-1",
        isDark
            ? "bg-purple-500/20 text-purple-300"
            : "bg-purple-100 text-purple-700"
    )}>
        {tag}
    </span>
));

TechTag.displayName = "TechTag";

// Case Study Card Component
const CaseStudyCard = memo(({ caseStudy, isDark }: { caseStudy: CaseStudyData; isDark: boolean }) => {
    const IconComponent = caseStudy.icon;

    return (
        <article
            className={cn(
                "case-study-card relative rounded-2xl border overflow-hidden transition-all duration-200",
                isDark
                    ? "bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-white/20"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-lg"
            )}
            style={{ opacity: 0, transform: "translateY(40px)" }}
        >
            {/* Top Gradient Bar */}
            <div className={`h-1 bg-gradient-to-r ${caseStudy.color}`} />

            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <span className={cn(
                        "text-6xl font-black",
                        isDark ? "text-white/10" : "text-gray-100"
                    )}>
                        {caseStudy.number}
                    </span>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border",
                        isDark
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-50 border-gray-200"
                    )}>
                        <IconComponent className="w-4 h-4 text-purple-400" />
                        <span className={cn(
                            "text-sm font-medium",
                            isDark ? "text-gray-300" : "text-gray-600"
                        )}>
                            {caseStudy.category}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className={cn(
                    "text-2xl md:text-3xl font-bold mb-2",
                    isDark ? "text-white" : "text-gray-800"
                )}>
                    {caseStudy.title}
                </h3>
                <p className={`text-base font-semibold mb-6 bg-gradient-to-r ${caseStudy.color} bg-clip-text text-transparent`}>
                    {caseStudy.subtitle}
                </p>

                {/* Image */}
                {caseStudy.image && (
                    <div className={cn(
                        "relative rounded-xl overflow-hidden mb-6 border",
                        isDark ? "border-white/10" : "border-gray-200"
                    )}>
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.imageAlt}
                            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                )}

                {/* Problem Section */}
                <div className={cn(
                    "p-4 rounded-xl mb-4",
                    isDark ? "bg-white/5" : "bg-gray-50"
                )}>
                    <h4 className={cn(
                        "text-lg font-semibold mb-2",
                        isDark ? "text-white" : "text-gray-800"
                    )}>
                        The Problem
                    </h4>
                    <p className={cn(
                        "text-sm leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        {caseStudy.problem}
                        {caseStudy.problemTags.map((tag, i) => (
                            <TechTag key={i} tag={tag} isDark={isDark} />
                        ))}
                    </p>
                </div>

                {/* Solutions Section */}
                <div className={cn(
                    "p-4 rounded-xl mb-4",
                    isDark ? "bg-white/5" : "bg-gray-50"
                )}>
                    <h4 className={cn(
                        "text-lg font-semibold mb-3",
                        isDark ? "text-white" : "text-gray-800"
                    )}>
                        What We Built
                    </h4>
                    <div className="space-y-3">
                        {caseStudy.solutions.map((solution, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-3 rounded-lg border-l-2",
                                    isDark
                                        ? "bg-white/5 border-purple-400"
                                        : "bg-white border-purple-400"
                                )}
                            >
                                <strong className={isDark ? "text-white" : "text-gray-800"}>
                                    {solution.title}:
                                </strong>{" "}
                                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                                    {solution.description}
                                </span>
                                {solution.tags.map((tag, i) => (
                                    <TechTag key={i} tag={tag} isDark={isDark} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Result Section */}
                <div className={cn(
                    "p-4 rounded-xl mb-6",
                    isDark ? "bg-white/5" : "bg-gray-50"
                )}>
                    <h4 className={cn(
                        "text-lg font-semibold mb-2",
                        isDark ? "text-white" : "text-gray-800"
                    )}>
                        The Result
                    </h4>
                    <p className={cn(
                        "text-sm leading-relaxed mb-4",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        {caseStudy.result}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {caseStudy.metrics.map((metric, index) => (
                            <div
                                key={index}
                                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${caseStudy.color}`}
                            >
                                <div className="text-lg font-bold text-white">{metric.value}</div>
                                <div className="text-xs text-white/80">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className={cn(
                    "pt-4 border-t flex flex-wrap gap-2",
                    isDark ? "border-white/10" : "border-gray-200"
                )}>
                    {caseStudy.techStack.map((tech, index) => (
                        <span
                            key={index}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200",
                                isDark
                                    ? "bg-white/5 border-white/10 text-gray-300 hover:border-purple-400 hover:text-purple-400"
                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600"
                            )}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
});

CaseStudyCard.displayName = "CaseStudyCard";

// Main Page Component
const CaseStudiesPage = memo(() => {
    const animSettings = getAnimationSettings();
    const { isDark } = useTheme();

    useEffect(() => {
        if (!animSettings.shouldAnimate) {
            gsap.set(".hero-badge, .hero-title, .hero-subtitle, .hero-stats", { opacity: 1, y: 0 });
            gsap.set(".case-study-card", { opacity: 1, y: 0 });
            gsap.set(".cta-content", { opacity: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.config({ force3D: true });

            // Hero Animation
            gsap.fromTo(".hero-badge",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );

            gsap.fromTo(".hero-title",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
            );

            gsap.fromTo(".hero-subtitle",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
            );

            gsap.fromTo(".hero-stats",
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.3 }
            );

            // Case Study Cards
            gsap.utils.toArray<HTMLElement>(".case-study-card").forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    delay: (i % 2) * 0.1
                });
            });

            // CTA Section
            gsap.fromTo(".cta-content",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".cta-section",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [animSettings.shouldAnimate]);

    return (
        <div className={cn(
            "min-h-screen overflow-x-hidden",
            isDark ? "bg-black text-white" : "bg-gray-50 text-gray-800"
        )}>
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"
                        : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/30 via-gray-50 to-gray-50"
                )} />
                {animSettings.enableBlur && (
                    <>
                        <div className={cn(
                            "absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-2xl",
                            isDark ? "bg-purple-500/10" : "bg-purple-300/20"
                        )} />
                        <div className={cn(
                            "absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl",
                            isDark ? "bg-blue-500/10" : "bg-blue-300/20"
                        )} />
                    </>
                )}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    <div className={cn(
                        "hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-8",
                        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                    )}>
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">Our Work</span>
                    </div>

                    <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 leading-none">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Case Studies
                        </span>
                    </h1>

                    <p className={cn(
                        "hero-subtitle text-lg md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Real problems. Real solutions. Here's what {COMPANY.name} built for our clients.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {heroStats.map((stat, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "hero-stats p-5 rounded-xl border",
                                    isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                                )}
                            >
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                    {stat.label}
                                </div>
                                <div className={cn(
                                    "text-xs",
                                    isDark ? "text-gray-400" : "text-gray-500"
                                )}>{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="relative py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                What We've Built
                            </span>
                        </h2>
                        <p className={cn(
                            "text-lg max-w-2xl mx-auto",
                            isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                            From industrial IoT to entertainment platforms, we deliver results
                        </p>
                    </div>

                    <div className="space-y-8">
                        {caseStudiesData.map((caseStudy) => (
                            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} isDark={isDark} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section relative py-24 px-6 overflow-hidden">
                <div className={cn(
                    "absolute inset-0",
                    isDark
                        ? "bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20"
                        : "bg-gradient-to-r from-purple-100/30 via-blue-100/30 to-pink-100/30"
                )} />

                <div className="cta-content relative z-10 max-w-5xl mx-auto text-center">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-6",
                        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
                    )}>
                        <Rocket className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">Start Your Project</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Got a Project in Mind?
                        </span>
                    </h2>

                    <p className={cn(
                        "text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        Tell us what you're building. We'll figure out if we're the right fit.
                    </p>

                    <Link
                        to="/contact"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-transform duration-200 active:scale-95"
                    >
                        Let's Talk
                    </Link>
                </div>
            </section>
        </div>
    );
});

CaseStudiesPage.displayName = "CaseStudiesPage";

export default CaseStudiesPage;
