'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 'none' | '100' | '200' | '300' | '400';
};

function getDelayClass(delay: MotionRevealProps['delay']) {
  if (!delay || delay === 'none') return '';
  return `motion-delay-${delay}`;
}

export function MotionReveal({
  children,
  className = '',
  delay = 'none',
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const delayClass = getDelayClass(delay);

  return (
    <div
      ref={ref}
      data-visible={isVisible ? 'true' : 'false'}
      className={`viewport-reveal ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
