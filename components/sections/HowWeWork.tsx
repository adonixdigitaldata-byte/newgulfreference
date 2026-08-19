"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTENT, type Locale } from "@/data/content";

interface HowWeWorkProps {
  locale: Locale;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ locale }) => {
  const tWork = CONTENT.howWeWork[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progressive line draw on scroll
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }

      // Step activation
      stepsRef.current.forEach((step, idx) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              step,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: idx * 0.1,
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
    <section ref={containerRef} className="py-20 md:py-28 lg:py-32">
      <div className="editorial-container">
        {/* Coordinate indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-6">
          <span>05 / 07 — METHODOLOGY</span>
          <span>OPERATIONAL LIFECYCLE</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tWork.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12]">
            {tWork.heading}
          </h2>
        </div>

        {/* Desktop Progressive Horizontal Timeline */}
        <div className="relative hidden lg:block mb-12">
          {/* Base Background Line */}
          <div className="absolute top-6 left-0 right-0 h-[2px] bg-brand-border" />

          {/* Animated Connecting Line */}
          <div
            ref={progressBarRef}
            className="absolute top-6 left-0 right-0 h-[2px] bg-brand-blue"
          />

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {tWork.steps.map((step, idx) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepsRef.current[idx] = el;
                }}
                className="flex flex-col items-start pt-1 group"
              >
                {/* Step Circle */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center font-mono font-bold text-xs text-brand-blue mb-5 shadow-xs group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  {step.num}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-brand-dark mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-brand-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="block lg:hidden space-y-6 relative border-l-2 rtl:border-r-2 rtl:border-l-0 border-brand-blue/40 ml-4 rtl:mr-4 rtl:ml-0 pl-6 rtl:pr-6">
          {tWork.steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="absolute -left-[31px] rtl:-right-[31px] top-1 w-4 h-4 rounded-full bg-brand-blue border-2 border-white shadow-xs" />
              <div className="text-xs font-mono font-bold text-brand-blue mb-1">
                {step.num} — {step.title}
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
