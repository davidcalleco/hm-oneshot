"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MOTION_OK, ScrollTrigger, ease, gsap, registerMotion } from "@/lib/motion";

registerMotion();

/**
 * The capability ticker.
 *
 * Runs on GSAP's ticker rather than a CSS animation so it can respond to
 * scrolling: it speeds up with scroll velocity and follows scroll direction.
 * Pauses on hover and focus. The full list is also rendered for screen
 * readers, and under reduced motion it simply sits still.
 */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      const wrap = root.current;
      if (!el || !wrap) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.to(el, {
          xPercent: -50,
          duration: 44,
          ease: "none",
          repeat: -1,
        });

        const clamp = gsap.utils.clamp(1, 4);
        const trigger = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = clamp(1 + Math.abs(self.getVelocity()) / 1800);
            loop.timeScale(self.direction * boost);
            gsap.to(loop, {
              timeScale: self.direction,
              duration: 0.9,
              ease: ease.soft,
              overwrite: true,
            });
          },
        });

        const pause = () => loop.pause();
        const play = () => loop.play();
        wrap.addEventListener("pointerenter", pause);
        wrap.addEventListener("pointerleave", play);
        wrap.addEventListener("focusin", pause);
        wrap.addEventListener("focusout", play);

        return () => {
          wrap.removeEventListener("pointerenter", pause);
          wrap.removeEventListener("pointerleave", play);
          wrap.removeEventListener("focusin", pause);
          wrap.removeEventListener("focusout", play);
          trigger.kill();
          loop.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-line bg-cream py-4"
    >
      <div ref={track} className="flex w-max" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="type-label px-7 whitespace-nowrap text-ink">
                  {item}
                </span>
                <span className="size-[5px] rounded-full bg-signal" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="sr-only">Capabilities: {items.join(", ")}.</p>
    </div>
  );
}
