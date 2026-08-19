"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTENT, type Locale } from "@/data/content";

interface JourneyTimelineProps {
  locale: Locale;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ locale }) => {
  const tAbout = CONTENT.aboutPage[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: idx * 0.12,
                ease: "power2.out",
              }
            );
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 border-t border-brand-border">
      <div className="editorial-container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tAbout.journeyEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12]">
            {tAbout.journeyHeading}
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {tAbout.milestones.map((item, idx) => (
            <div
              key={item.year}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="bg-white p-6 rounded-editorial border border-brand-border hover:border-brand-blue/50 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Year tag */}
                <div className="text-2xl sm:text-3xl font-mono font-bold text-brand-blue mb-3">
                  {item.year}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Accent bottom highlight */}
              <div className="mt-6 w-8 h-[2px] bg-brand-blue/30 group-hover:w-full group-hover:bg-brand-blue transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
