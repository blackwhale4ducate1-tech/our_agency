import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Twitter, Sparkles } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY, GOOGLE_FORMS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    id: 1,
    icon: Mail,
    title: "Email Us",
    info: COMPANY.email,
    description: "Drop us a line anytime",
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 2,
    icon: Phone,
    title: "Call Us",
    info: COMPANY.phone,
    description: "Mon-Fri 9AM-6PM IST",
    gradient: "from-emerald-400 to-teal-400",
    bgGradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    id: 3,
    icon: MapPin,
    title: "Visit Us",
    info: COMPANY.address,
    description: "Development Hub",
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  }
];

const socialLinks = [
  { icon: MessageCircle, href: "#", label: "Discord", gradient: "from-indigo-400 to-purple-400" },
  { icon: Twitter, href: "#", label: "Twitter", gradient: "from-blue-400 to-cyan-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-500 to-blue-600" }
];

// Memoized contact card
const ContactCard = memo(({ method, isDark }: { method: typeof contactMethods[0]; isDark: boolean }) => (
  <div
    className={cn(
      "contact-card group relative rounded-2xl overflow-hidden border transition-all duration-200",
      isDark
        ? "border-white/10 hover:border-white/20"
        : "border-gray-200 hover:border-gray-300 bg-white shadow-sm"
    )}
    style={{ opacity: 0, transform: 'translateY(30px)' }}
  >
    <div className={cn(
      `absolute inset-0 bg-gradient-to-br ${method.bgGradient} transition-opacity duration-200`,
      isDark ? "opacity-50 group-hover:opacity-80" : "opacity-30 group-hover:opacity-50"
    )} />

    <div className="relative p-6">
      <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center`}>
        <method.icon className="w-7 h-7 text-white" />
      </div>

      <h3 className={cn(
        "text-xl font-bold mb-1 text-center",
        isDark ? "text-white" : "text-gray-800"
      )}>
        {method.title}
      </h3>
      <p className={`text-base font-semibold mb-1 text-center bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
        {method.info}
      </p>
      <p className={cn(
        "text-sm text-center",
        isDark ? "text-gray-400" : "text-gray-500"
      )}>
        {method.description}
      </p>
    </div>

    <div className={`h-1 bg-gradient-to-r ${method.gradient}`} />
  </div>
));

ContactCard.displayName = "ContactCard";

// Memoized social link
const SocialLink = memo(({ social, isDark }: { social: typeof socialLinks[0]; isDark: boolean }) => (
  <a
    href={social.href}
    className={cn(
      "social-link group relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-200",
      isDark
        ? "bg-white/5 border border-white/10 hover:bg-white/10"
        : "bg-gray-100 border border-gray-200 hover:bg-gray-200"
    )}
    aria-label={social.label}
  >
    <social.icon className={cn(
      "relative w-6 h-6",
      isDark ? "text-white" : "text-gray-700"
    )} />
  </a>
));

SocialLink.displayName = "SocialLink";

const ContactPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const animSettings = getAnimationSettings();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      gsap.set(".hero-badge, .hero-title, .hero-subtitle", { opacity: 1, y: 0 });
      gsap.set(".contact-card", { opacity: 1, y: 0 });
      gsap.set(".form-heading, .form-container, .submit-button", { opacity: 1, x: 0, y: 0 });
      gsap.set(".info-card, .social-link", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.config({ force3D: true });

      // Hero animations - simplified
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

      // Contact cards
      gsap.utils.toArray<HTMLElement>(".contact-card").forEach((card, i) => {
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
          delay: i * 0.1
        });
      });

      // Form section
      gsap.fromTo(".form-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".form-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".form-container",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".form-container",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Info cards
      gsap.utils.toArray<HTMLElement>(".info-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1
          }
        );
      });

      // Social links
      gsap.utils.toArray<HTMLElement>(".social-link").forEach((link, i) => {
        gsap.fromTo(link,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ".social-section",
              start: "top 88%",
              toggleActions: "play none none none"
            },
            delay: i * 0.08
          }
        );
      });
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
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15"
            : "bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/30"
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={cn(
            "hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-8",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"
          )}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">Let's Connect</span>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>

          <p className={cn(
            "hero-subtitle text-lg md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Ready to transform your ideas into digital reality? Let's build something amazing together with {COMPANY.name}.
          </p>

          {/* Contact Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <ContactCard key={method.id} method={method} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section with Google Form */}
      <section className="form-section relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="form-heading text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Send a Message
              </span>
            </h2>
            <p className={cn(
              "text-lg",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              Share your ideas, questions, or just say hello!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Google Form Embed */}
            <div className={cn(
              "form-container rounded-2xl p-6 border overflow-hidden",
              isDark
                ? "bg-gradient-to-br from-white/5 to-white/0 border-white/10"
                : "bg-white border-gray-200 shadow-lg"
            )}>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                <h3 className={cn(
                  "text-xl font-bold",
                  isDark ? "text-white" : "text-gray-800"
                )}>Contact Form</h3>
              </div>

              <div className="relative w-full rounded-lg overflow-hidden" style={{ minHeight: "550px" }}>
                <iframe
                  src={GOOGLE_FORMS.contact}
                  width="100%"
                  height="550"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact Form"
                  className="w-full"
                  style={{
                    background: isDark ? 'transparent' : '#ffffff',
                    border: 'none'
                  }}
                >
                  Loading form...
                </iframe>

                {/* Fallback content */}
                <div className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center -z-10",
                  isDark ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <MessageCircle className="w-12 h-12 text-purple-400 mb-4" />
                  <p className={cn(
                    "text-lg font-semibold mb-2",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    Loading Contact Form...
                  </p>
                  <p className={cn(
                    "text-sm text-center px-4",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    If the form doesn't load, please email us directly at {COMPANY.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-5">
              <div className={cn(
                "info-card p-6 rounded-2xl border",
                isDark
                  ? "bg-gradient-to-br from-white/5 to-white/0 border-white/10"
                  : "bg-white border-gray-200 shadow-sm"
              )}>
                <h3 className={cn(
                  "text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  Why Contact {COMPANY.name}?
                </h3>
                <ul className={cn(
                  "space-y-2.5 text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  {[
                    "Get expert guidance on your development projects",
                    "Explore partnership opportunities",
                    "Request technical consultations or demos",
                    "Join our network of innovators"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn(
                "info-card p-6 rounded-2xl border",
                isDark
                  ? "bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20"
                  : "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
              )}>
                <h3 className={cn(
                  "text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  Quick Response
                </h3>
                <p className={cn(
                  "text-sm mb-3",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  We typically respond within 24 hours on business days. For urgent inquiries, please call us directly.
                </p>
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Team is online</span>
                </div>
              </div>

              <div className={cn(
                "info-card p-6 rounded-2xl border",
                isDark
                  ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
              )}>
                <h3 className={cn(
                  "text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  {COMPANY.name} Office
                </h3>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  📍 {COMPANY.address}<br />
                  📞 {COMPANY.phone}<br />
                  ✉️ {COMPANY.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className={cn(
        "social-section relative py-24 px-6",
        isDark
          ? "bg-gradient-to-b from-black via-gray-900/30 to-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
      )}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Follow Our Journey
            </span>
          </h3>
          <p className={cn(
            "text-lg mb-10",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>
            Join our community and stay updated with the latest from {COMPANY.name}
          </p>

          <div className="flex justify-center gap-4">
            {socialLinks.map((social, i) => (
              <SocialLink key={i} social={social} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

ContactPage.displayName = "ContactPage";

export default ContactPage;