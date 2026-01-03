import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { COMPANY, GOOGLE_FORMS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const { isDark } = useTheme();

  useGSAP(() => {
    // Animate contact section
    gsap.fromTo(
      "#contact-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#contact-content",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate contact cards
    gsap.fromTo(
      ".contact-card",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".contact-cards",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate form
    gsap.fromTo(
      "#contact-form",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  return (
    <section id="contact" className={cn(
      "relative min-h-screen w-screen py-20 overflow-hidden",
      isDark
        ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
        : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    )}>
      {/* Background Elements */}
      <div className={cn(
        "absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 blur-3xl",
        isDark
          ? "bg-gradient-to-r from-blue-400 to-purple-400"
          : "bg-gradient-to-r from-blue-300 to-purple-300"
      )}></div>
      <div className={cn(
        "absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10 blur-3xl",
        isDark
          ? "bg-gradient-to-r from-yellow-400 to-orange-400"
          : "bg-gradient-to-r from-yellow-300 to-orange-300"
      )}></div>

      <div className="container mx-auto px-4">
        <div id="contact-content" className="text-center mb-16">
          <p className={cn(
            "font-general text-sm uppercase mb-4",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Get In Touch
          </p>
          <h2 className={cn(
            "special-font text-5xl md:text-6xl font-bold mb-6",
            isDark ? "text-white" : "text-gray-800"
          )}>
            Let&apos;s B<b className="text-yellow-400">u</b>ild Something
            <br /> Amaz<b className="text-yellow-400">i</b>ng T<b className="text-yellow-400">o</b>gether
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-lg",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Ready to transform your ideas into reality? Contact {COMPANY.name} today and let&apos;s discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="contact-cards space-y-6">
            <div className={cn(
              "contact-card backdrop-blur-lg rounded-2xl p-6 border",
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/80 border-gray-200 shadow-lg"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>Email Us</h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{COMPANY.email}</p>
                </div>
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Send us an email and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <div className={cn(
              "contact-card backdrop-blur-lg rounded-2xl p-6 border",
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/80 border-gray-200 shadow-lg"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>Call Us</h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{COMPANY.phone}</p>
                </div>
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Speak directly with our team for immediate assistance.
              </p>
            </div>

            <div className={cn(
              "contact-card backdrop-blur-lg rounded-2xl p-6 border",
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white/80 border-gray-200 shadow-lg"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>Visit Us</h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{COMPANY.address}</p>
                </div>
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                Come visit our office for a face-to-face consultation.
              </p>
            </div>
          </div>

          {/* Google Form Embed */}
          <div id="contact-form" className={cn(
            "backdrop-blur-lg rounded-2xl p-8 border overflow-hidden",
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/80 border-gray-200 shadow-lg"
          )}>
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
              <h3 className={cn(
                "text-2xl font-bold",
                isDark ? "text-white" : "text-gray-800"
              )}>Send us a message</h3>
            </div>

            {/* Google Form Embed Container */}
            <div className="relative w-full rounded-lg overflow-hidden" style={{ minHeight: "500px" }}>
              <iframe
                src={GOOGLE_FORMS.inquiry}
                width="100%"
                height="500"
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

              {/* Fallback content if form doesn't load */}
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center -z-10",
                isDark ? "bg-gray-800/50" : "bg-gray-100"
              )}>
                <MessageCircle className="w-16 h-16 text-purple-400 mb-4" />
                <p className={cn(
                  "text-lg font-semibold mb-2",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  Contact Form Loading...
                </p>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  If the form doesn't load, please email us at {COMPANY.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
