import gsap from "gsap";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { FaGithub } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { LINKS, NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { throttle, getAnimationSettings } from "@/lib/performance";

// Memoized audio indicator
const AudioIndicator = memo(({ isActive }: { isActive: boolean }) => (
  <>
    {Array(4)
      .fill("")
      .map((_, i) => (
        <div
          key={i + 1}
          className={cn("indicator-line", isActive && "active")}
          style={{ animationDelay: `${(i + 1) * 0.1}s` }}
        />
      ))}
  </>
));

AudioIndicator.displayName = "AudioIndicator";

// Memoized nav link
const NavLink = memo(({ href, label, isRoutedPage, shouldUseRouter }: {
  href: string;
  label: string;
  isRoutedPage: boolean;
  shouldUseRouter: boolean;
}) => {
  if (isRoutedPage) {
    return (
      <Link to={href} className="nav-hover-btn">
        {label}
      </Link>
    );
  }
  if (shouldUseRouter) {
    return (
      <Link to={`/${href}`} className="nav-hover-btn">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className="nav-hover-btn">
      {label}
    </a>
  );
});

NavLink.displayName = "NavLink";

export const Navbar = memo(() => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const animSettings = getAnimationSettings();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const routedPages = ["Home", "About", "Contact", "Pricing", "FAQ", "Services"];
  const routedPaths = ["/", "/about", "/contact", "/pricing", "/products", "/faq", "/services"];

  const toggleAudioIndicator = useCallback(() => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Audio control effect
  useEffect(() => {
    if (isAudioPlaying) {
      void audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  // Optimized scroll handler with throttle
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY + 5) {
        // Add threshold to prevent jitter
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY - 5) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }

      lastScrollYRef.current = currentScrollY;
    }, 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimized nav animation
  useEffect(() => {
    if (!animSettings.shouldAnimate) {
      if (navContainerRef.current) {
        navContainerRef.current.style.transform = isNavVisible
          ? "translateY(0)"
          : "translateY(-100px)";
        navContainerRef.current.style.opacity = isNavVisible ? "1" : "0";
      }
      return;
    }

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [isNavVisible, animSettings.shouldAnimate]);

  // Mobile menu animations - simplified
  useEffect(() => {
    if (!isMobileMenuOpen || !animSettings.shouldAnimate) return;

    gsap.fromTo(
      ".mobile-menu-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out" }
    );
    gsap.fromTo(
      ".mobile-menu-content",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      ".mobile-menu-item",
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        stagger: 0.05,
        delay: 0.1,
        ease: "power2.out",
      }
    );
  }, [isMobileMenuOpen, animSettings.shouldAnimate]);

  const isRoutedPage = (label: string) => routedPages.includes(label);
  const shouldUseRouter = (href: string) =>
    routedPaths.includes(location.pathname) && href.startsWith("#");

  return (
    <>
      <header
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-300 sm:inset-x-6 will-change-transform"
      >
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <Link
                to="/"
                className="transition hover:opacity-75"
                onClick={closeMobileMenu}
              >
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="w-10"
                  loading="eager"
                  width={40}
                  height={40}
                />
              </Link>

              <Link
                to="/products"
                className="md:flex hidden items-center justify-center gap-1 group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-blue-50 px-7 py-3 text-black transition hover:opacity-75"
              >
                <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                  Products
                </span>
                <TiLocationArrow className="ml-1" />
              </Link>
            </div>

            <div className="flex h-full items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                {NAV_ITEMS.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={label}
                    isRoutedPage={isRoutedPage(label)}
                    shouldUseRouter={shouldUseRouter(href)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Audio Controls */}
                <button
                  onClick={toggleAudioIndicator}
                  className="ml-2 md:ml-10 flex items-center space-x-1 p-2 transition hover:opacity-75"
                  title="Play Audio"
                  aria-label="Toggle audio"
                >
                  <audio
                    ref={audioElementRef}
                    src="/audio/loop.mp3"
                    className="hidden"
                    loop
                    preload="none"
                  />
                  <AudioIndicator isActive={isIndicatorActive} />
                </button>

                {/* GitHub Link */}
                <a
                  href={LINKS.sourceCode}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hidden sm:block transition hover:opacity-75"
                  title="Source Code"
                  aria-label="View source code on GitHub"
                >
                  <FaGithub className="size-5 text-white" />
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
                  title="Toggle Menu"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="mobile-menu-content absolute top-20 left-4 right-4 bg-black/90 rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex flex-col space-y-4">
              {/* Mobile Products Link */}
              <Link
                to="/products"
                className="mobile-menu-item flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 active:scale-95"
                onClick={closeMobileMenu}
              >
                <span>Products</span>
                <TiLocationArrow className="w-4 h-4" />
              </Link>

              {/* Mobile Navigation Items */}
              {NAV_ITEMS.map(({ label, href }) => {
                const routedPage = isRoutedPage(label);
                const useRouter = shouldUseRouter(href);

                if (routedPage) {
                  return (
                    <Link
                      key={href}
                      to={href}
                      className="mobile-menu-item block w-full text-white hover:text-yellow-400 py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-center font-medium"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  );
                }
                if (useRouter) {
                  return (
                    <Link
                      key={href}
                      to={`/${href}`}
                      className="mobile-menu-item block w-full text-white hover:text-yellow-400 py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-center font-medium"
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={href}
                    href={href}
                    className="mobile-menu-item block w-full text-white hover:text-yellow-400 py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-center font-medium"
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </a>
                );
              })}

              {/* Mobile GitHub Link */}
              <a
                href={LINKS.sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className="mobile-menu-item flex items-center justify-center gap-2 w-full text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
                onClick={closeMobileMenu}
              >
                <FaGithub className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Navbar.displayName = "Navbar";
