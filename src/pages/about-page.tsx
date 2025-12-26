import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Target, Rocket, Users, Heart, Zap, Award, Globe } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&q=75",
    bio: "Visionary leader with 10+ years in gaming industry, passionate about creating immersive worlds.",
    icon: Rocket,
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face&q=75",
    bio: "Tech innovator specializing in VR/AR technologies that redefine interactive storytelling.",
    icon: Zap,
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&q=75",
    bio: "Award-winning designer crafting next-gen game worlds with artistry and innovation.",
    icon: Award,
    color: "from-emerald-400 to-teal-400"
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "Head of Community",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face&q=75",
    bio: "Community builder connecting millions of gamers worldwide in inclusive spaces.",
    icon: Users,
    color: "from-orange-400 to-red-400"
  }
];

const storyPoints = [
  { text: "Zentry was born to redefine gaming", icon: Target },
  { text: "A place where every player shines", icon: Sparkles },
  { text: "We connect worlds and spark joy", icon: Globe },
  { text: "Innovation meets imagination here", icon: Zap },
  { text: "Building bonds through epic quests", icon: Heart },
  { text: "Your adventure starts with us", icon: Rocket }
];

// Memoized story card
const StoryCard = memo(({ point }: { point: typeof storyPoints[0] }) => (
  <div
    className="story-card group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/5"
    style={{ opacity: 0, transform: 'translateY(30px)' }}
  >
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
        <point.icon className="w-6 h-6 text-purple-400" />
      </div>
      <p className="text-lg font-semibold text-white leading-relaxed">
        {point.text}
      </p>
    </div>
  </div>
));

StoryCard.displayName = "StoryCard";

// Memoized team card
const TeamCard = memo(({ member }: { member: typeof teamMembers[0] }) => (
  <div
    className="team-card group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
    style={{ opacity: 0, transform: 'translateY(40px)' }}
  >
    {/* Image Container */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="team-img w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Icon Badge */}
      <div className={`absolute top-4 right-4 p-2.5 rounded-lg bg-gradient-to-br ${member.color} opacity-90`}>
        <member.icon className="w-5 h-5 text-white" />
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-1">
        {member.name}
      </h3>
      <p className={`text-base font-semibold mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
        {member.role}
      </p>
      <p className="text-gray-300 text-sm leading-relaxed">
        {member.bio}
      </p>
    </div>

    {/* Bottom gradient bar */}
    <div className={`h-1 bg-gradient-to-r ${member.color}`} />
  </div>
));

TeamCard.displayName = "TeamCard";

const AboutPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const animSettings = getAnimationSettings();

  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      // Set visible state without animations
      gsap.set(".hero-badge, .hero-title, .hero-subtitle, .hero-stats", { opacity: 1, y: 0 });
      gsap.set(".story-card, .team-card", { opacity: 1, y: 0 });
      gsap.set(".cta-content", { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Configure GSAP for performance
      gsap.config({ force3D: true });

      // Hero Animation - simplified
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

      // Story Cards - simplified scroll trigger
      gsap.utils.toArray<HTMLElement>(".story-card").forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none"
          },
          delay: (i % 3) * 0.05
        });
      });

      // Team Cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        {animSettings.enableBlur && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
          </>
        )}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">Redefining Interactive Entertainment</span>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Zentry
            </span>
          </h1>

          <p className="hero-subtitle text-lg md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Pioneering the future of interactive entertainment through innovative gaming experiences
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "10M+", desc: "Active Players" },
              { label: "150+", desc: "Countries" },
              { label: "500+", desc: "Game Titles" },
              { label: "99.9%", desc: "Uptime" }
            ].map((stat, i) => (
              <div
                key={i}
                className="hero-stats p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Every great journey begins with a vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyPoints.map((point, i) => (
              <StoryCard key={i} point={point} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The visionaries building the future of gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20" />

        <div className="cta-content relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Rocket className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Join Us</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready to Join the Adventure?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Become part of the Zentry universe and experience gaming like never before
          </p>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-transform duration-200 active:scale-95">
            Start Your Journey
          </button>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {[
              { icon: Globe, label: "Global Community" },
              { icon: Zap, label: "Cutting-Edge Tech" },
              { icon: Heart, label: "Player First" }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <p className="text-base font-semibold text-white">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

AboutPage.displayName = "AboutPage";

export default AboutPage;