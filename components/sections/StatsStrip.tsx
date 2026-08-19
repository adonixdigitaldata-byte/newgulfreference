"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTENT, type Locale } from "@/data/content";

interface StatsStripProps {
  locale: Locale;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ locale }) => {
  const tStats = CONTENT.stats[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );

          numbersRef.current.forEach((el, index) => {
            if (!el) return;
            const targetText = tStats.items[index].value;
            const match = targetText.match(/\d+/);
            if (match) {
              const targetNum = parseInt(match[0], 10);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: targetNum,
                duration: 1.8,
                ease: "power2.out",
                delay: index * 0.12,
                onUpdate: () => {
                  const current = Math.floor(obj.val);
                  el.textContent = targetText.replace(/\d+/, current.toString());
                },
              });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tStats]);

  return (
    <section
      ref={containerRef}
      className="py-14 border-y border-brand-border bg-brand-warmbg/60 relative overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Coordinate Indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-8">
          <span>02 / 07 — INSTITUTIONAL METRICS</span>
          <span>SAUDI ARABIA COVERAGE</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/90 rtl:lg:divide-x-reverse">
          {tStats.items.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx > 1 ? "pt-6 lg:pt-0" : ""
              } lg:px-8 group`}
            >
              <span
                ref={(el) => {
                  numbersRef.current[idx] = el;
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark mb-2 tabular-nums font-sans"
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
