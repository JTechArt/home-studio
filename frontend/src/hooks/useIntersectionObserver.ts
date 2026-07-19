import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && elementRef.current) {
        elementRef.current.classList.add('visible');
      }
    }, options);

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [options]);

  return { elementRef, isIntersecting };
};
