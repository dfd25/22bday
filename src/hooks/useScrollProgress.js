import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Track scroll progress across the map.
 * Returns 0 (start) to 1 (end).
 * Supports both horizontal (desktop) and vertical (mobile) modes.
 */
export function useScrollProgress(containerRef, isVertical = false) {
  const [progress, setProgress] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let active = true;

    const update = () => {
      const container = containerRef?.current;
      if (container) {
        let maxScroll, currentScroll;
        if (isVertical) {
          maxScroll = container.scrollHeight - container.clientHeight;
          currentScroll = container.scrollTop;
        } else {
          maxScroll = container.scrollWidth - container.clientWidth;
          currentScroll = container.scrollLeft;
        }
        if (maxScroll > 0) {
          const p = currentScroll / maxScroll;
          setProgress(Math.min(1, Math.max(0, p)));
          setScrollLeft(currentScroll);
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
  }, [containerRef, isVertical]);

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
