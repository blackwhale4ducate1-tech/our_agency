import { useEffect, useRef, useState, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Linkedin, Twitter, Sparkles, CheckCircle } from "lucide-react";
import { getAnimationSettings } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    id: 1,
    icon: Mail,
    title: "Email Us",
    info: "hello@devcompany.com",
    description: "Drop us a line anytime",
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 2,
    icon: Phone,
    title: "Call Us",
    info: "+1 (555) 123-4567",
    description: "Mon-Fri 9AM-6PM PST",
    gradient: "from-emerald-400 to-teal-400",
    bgGradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    id: 3,
    icon: MapPin,
    title: "Visit Us",
    info: "123 Tech Street, Digital City",
    description: "Development Hub",
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  }
];

const socialLinks = [
  { icon: MessageCircle, href: "#", label: "Discord", gradient: "from-indigo-400 to-purple-400" },
  { icon: Twitter, href: "#", label: "Twitter", gradient: "from-blue-400 to-cyan-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", gradient: "from-blue-500 to-blue-600" },
  { icon: Github, href: "#", label: "GitHub", gradient: "from-gray-400 to-gray-600" }
];

// Memoized contact card
const ContactCard = memo(({ method }: { method: typeof contactMethods[0] }) => (
  <div
    className="contact-card group relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-200 hover:border-white/20"
    style={{ opacity: 0, transform: 'translateY(30px)' }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-50 group-hover:opacity-80 transition-opacity duration-200`} />

    <div className="relative p-6">
      <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center`}>
        <method.icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-1 text-center">
        {method.title}
      </h3>
      <p className={`text-base font-semibold mb-1 text-center bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
        {method.info}
      </p>
      <p className="text-sm text-gray-400 text-center">
        {method.description}
      </p>
    </div>

    <div className={`h-1 bg-gradient-to-r ${method.gradient}`} />
  </div>
));

ContactCard.displayName = "ContactCard";

// Memoized social link
const SocialLink = memo(({ social }: { social: typeof socialLinks[0] }) => (
  <a
    href={social.href}
    className="social-link group relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-200 hover:bg-white/10"
    aria-label={social.label}
  >
    <social.icon className="relative w-6 h-6 text-white" />
  </a>
));

SocialLink.displayName = "SocialLink";

const ContactPage = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const animSettings = getAnimationSettings();

  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      gsap.set(".hero-badge, .hero-title, .hero-subtitle", { opacity: 1, y: 0 });
      gsap.set(".contact-card", { opacity: 1, y: 0 });
      gsap.set(".form-heading, .form-field, .submit-button", { opacity: 1, x: 0, y: 0 });
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

      gsap.utils.toArray<HTMLElement>(".form-field").forEach((field, i) => {
        gsap.fromTo(field,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: field,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            delay: i * 0.05
          }
        );
      });

      gsap.fromTo(".submit-button",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".submit-button",
            start: "top 95%",
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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isSuccess) return;

    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSuccess(false);
    }, 2500);
  }, [isSubmitting, isSuccess]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15" />
        {animSettings.enableBlur && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
          </>
        )}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">Let's Connect</span>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>

          <p className="hero-subtitle text-lg md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your ideas into digital reality? Let's build something amazing together.
          </p>

          {/* Contact Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <ContactCard key={method.id} method={method} />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="form-heading text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Send a Message
              </span>
            </h2>
            <p className="text-lg text-gray-400">
              Share your ideas, questions, or just say hello!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <div ref={formContainerRef} className="space-y-5">
              <div className="form-field">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-colors duration-200 text-white placeholder-gray-500 resize-none"
                  placeholder="Tell us about your project vision..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isSuccess}
                className="submit-button w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {/* Info Cards */}
            <div className="space-y-5">
              <div className="info-card p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2.5 text-gray-300 text-sm">
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

              <div className="info-card p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  Quick Response
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  We typically respond within 24 hours on business days. For urgent inquiries, please call us directly.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Team is online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Follow Our Journey
            </span>
          </h3>
          <p className="text-lg text-gray-400 mb-10">
            Join our community and stay updated with the latest
          </p>

          <div className="flex justify-center gap-4">
            {socialLinks.map((social, i) => (
              <SocialLink key={i} social={social} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

ContactPage.displayName = "ContactPage";

export default ContactPage;