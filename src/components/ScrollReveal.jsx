import React, { useEffect, useRef, useState } from 'react';

const VARIANT_KEYFRAMES = {
  up: 'weddingFadeInUp',
  down: 'weddingFadeInDown',
  left: 'weddingFadeInLeft',
  right: 'weddingFadeInRight',
  bounce: 'weddingBounceIn',
  fade: 'fadeIn',
};

export const ScrollReveal = ({
  children,
  variant = 'up',
  delay = 0,
  duration = 750,
  className = '',
  style = {},
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const keyframeName = VARIANT_KEYFRAMES[variant] || 'weddingFadeInUp';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? undefined : 0,
        animation: isVisible
          ? `${keyframeName} ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`
          : 'none',
      }}
    >
      {children}
    </div>
  );
};
