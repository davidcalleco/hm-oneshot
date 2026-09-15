"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import {
  MOTION_OK,
  duration,
  ease,
  gsap,
  registerMotion,
  revealShift,
  revealStart,
} from "@/lib/motion";

registerMotion();

/**
 * Anything still waiting to be revealed. Keyed by element so a focus landing
 * inside one can release it — a keyboard user must never be moved to an
 * element that is still transparent.
 */
const pending = new Map<HTMLElement, () => void>();
let focusBound = false;

function onFocusIn(event: FocusEvent) {
  let node = event.target as HTMLElement | null;
  while (node) {
    const release = pending.get(node);
    if (release) release();
    node = node.parentElement;
  }
}

/**
 * Scroll reveal.
 *
 * Content renders visible. The hidden state is applied only after JS runs and
 * only when the visitor has not asked for reduced motion, so the page is
 * complete without scripts and stable for anyone who does not want movement.
 *
 * Elements already on screen (or behind us) at mount are left alone — nothing
 * is hidden after the fact. Anything the viewport later skips past is released
 * by ScrollTrigger on refresh rather than left invisible, and anything that
 * receives focus is released immediately.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  y = revealShift,
  className = "",
  children,
}: {
  as?: ElementType;
  /** Seconds. */
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

        gsap.set(el, { opacity: 0, y });

        const tween = gsap.to(el, {
          opacity: 1,
          y: 0,
          delay,
          duration: duration.reveal,
          ease: ease.out,
          scrollTrigger: { trigger: el, start: revealStart, once: true },
        });

        const release = () => {
          pending.delete(el);
          tween.scrollTrigger?.kill();
          gsap.set(el, { opacity: 1, y: 0 });
        };

        pending.set(el, release);

        if (!focusBound) {
          focusBound = true;
          document.addEventListener("focusin", onFocusIn, true);
        }

        tween.eventCallback("onComplete", () => pending.delete(el));

        return () => {
          pending.delete(el);
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
