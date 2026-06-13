import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Track horizontal scroll progress across the map.
 * Returns 0 (far left) to 1 (far right).
 * Uses requestAnimationFrame polling since the container may mount after loading.
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let active = true;

    const update = () => {
      const container = containerRef?.current;
      if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          const p = container.scrollLeft / maxScroll;
          setProgress(Math.min(1, Math.max(0, p)));
          setScrollLeft(container.scrollLeft);
        }
      }
      if (active) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return { progress, scrollLeft };
}

/**
 * Convert vertical wheel events to horizontal scroll.
 */
export function useHorizontalScroll(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const onWheel = (e) => {
      // If the user is scrolling vertically, redirect to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.5;
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [containerRef]);
}

/**
 * Check if an element is in the horizontal viewport.
 */
export function useInHorizontalView(elementRef, containerRef, offset = 200) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    const element = elementRef?.current;
    if (!container || !element) return;

    const check = () => {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const inView =
        elementRect.left < containerRect.right + offset &&
        elementRect.right > containerRect.left - offset;

      setIsInView(inView);
    };

    container.addEventListener('scroll', check, { passive: true });
    check();

    return () => container.removeEventListener('scroll', check);
  }, [elementRef, containerRef, offset]);

  return isInView;
}

/**
 * Manage a set of discovered easter eggs.
 */
export function useEasterEggs(totalCount) {
  const [found, setFound] = useState(new Set());

  const discover = useCallback((id) => {
    setFound((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return {
    found,
    discover,
    count: found.size,
    total: totalCount,
    allFound: found.size >= totalCount,
  };
}
