"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Progressive scroll reveal.
 *
 * Content renders visible. The hidden state is only *armed* once JS runs and
 * only when the visitor has not asked for reduced motion — so the page is
 * complete without scripts, and stable for anyone who does not want movement.
 *
 * One shared observer serves every instance, plus a scroll fallback that
 * releases anything the viewport has skipped past (anchor jumps, restored
 * scroll positions, find-in-page). Content that was scrolled past must never
 * stay invisible.
 */

const watched = new Set<HTMLElement>();
let observer: IntersectionObserver | null = null;
let scrollBound = false;
let frame = 0;

function release(el: HTMLElement) {
  el.dataset.revealIn = "true";
  watched.delete(el);
  observer?.unobserve(el);
}

function sweep() {
  frame = 0;
  for (const el of watched) {
    if (el.getBoundingClientRect().bottom <= 0) release(el);
  }
}

function onScroll() {
  if (frame || watched.size === 0) return;
  frame = requestAnimationFrame(sweep);
}

function watch(el: HTMLElement) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
          release(entry.target as HTMLElement);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );

  if (!scrollBound) {
    scrollBound = true;
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  watched.add(el);
  observer.observe(el);
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen (or behind us) at mount — leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.revealArmed = "true";
    watch(el);

    return () => {
      watched.delete(el);
      observer?.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
