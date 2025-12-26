/**
 * Performance utilities for optimizing animations and rendering
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if device is low-end (based on hardware concurrency)
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
};

// Debounce function for scroll/resize events
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for frequent events
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get optimized animation settings based on device
export const getAnimationSettings = () => {
  const reducedMotion = prefersReducedMotion();
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();

  return {
    // Disable or reduce animations for low-end devices
    shouldAnimate: !reducedMotion,
    // Reduce particle count on mobile/low-end
    particleCount: lowEnd || mobile ? 5 : 20,
    // Adjust animation durations
    durationMultiplier: lowEnd ? 0.5 : 1,
    // Disable complex effects
    enableBlur: !lowEnd && !mobile,
    enableParallax: !lowEnd && !reducedMotion,
    enableHoverEffects: !mobile,
    // Video settings
    enableVideoAutoplay: !mobile && !lowEnd,
    // Reduce scroll trigger refresh rate
    scrollRefreshInterval: lowEnd ? 100 : 50,
  };
};

// Intersection Observer for lazy animations
export const createLazyAnimationObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    }
  );
};

// Request Animation Frame with fallback
export const raf = (callback: FrameRequestCallback): number => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return window.setTimeout(callback, 16) as unknown as number;
};

// Cancel Animation Frame with fallback
export const cancelRaf = (id: number): void => {
  if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};
