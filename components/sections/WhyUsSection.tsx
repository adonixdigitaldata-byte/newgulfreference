"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface WhyUsSectionProps {
  locale: Locale;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ locale }) => {
  const tWhy = CONTENT.whyUs[locale];
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax image subtle movement on scroll
      gsap.to(leftColRef.current, {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Sequential storytelling bullet reveals
      bulletsRef.current.forEach((bullet, idx) => {
        if (!bullet) return;
        ScrollTrigger.create({
          trigger: bullet,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              bullet,
              { opacity: 0, x: isRtl ? -20 : 20 },
              { opacity: 1, x: 0, duration: 0.6, delay: idx * 0.15, ease: "power2.out" }
            );
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 lg:py-32 bg-brand-warmbg/50 border-y border-brand-border overflow-hidden"
    >
      <div className="editorial-container">
        {/* Coordinate label */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-8">
          <span>04 / 07 — WHY PARTNER</span>
          <span>STRATEGIC ALIGNMENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Parallax Healthcare Ambulance Visual */}
          <div ref={leftColRef} className="lg:col-span-6">
            <div className="relative rounded-editorial-lg overflow-hidden border border-brand-border shadow-lg bg-white">
              <EditorialImage
                src={ASSETS.whyUs.ambulanceEnvironment.src}
                alt={
                  isRtl
                    ? ASSETS.whyUs.ambulanceEnvironment.altAr
                    : ASSETS.whyUs.ambulanceEnvironment.alt
                }
                categoryLabel={ASSETS.whyUs.ambulanceEnvironment.category}
                aspectRatio="aspect-[4/3]"
                className="w-full"
              />
              <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-brand-border text-xs text-brand-dark font-medium flex items-center justify-between">
                <span>{isRtl ? "تنسيق طبي واستجابة ميدانية" : "Clinical Coordination & Emergency Logistics"}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>
          </div>

          {/* Right Column: Sequential Storytelling Presentation */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              {tWhy.eyebrow}
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark leading-[1.15] mb-5">
              {tWhy.heading}
            </h2>

            <p className="text-base text-brand-muted leading-relaxed mb-8">
              {tWhy.description}
            </p>

            {/* Bullets with Individual Story Cards */}
            <div className="space-y-4 mb-8">
              {tWhy.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    bulletsRef.current[idx] = el;
                  }}
                  className="flex items-start gap-3.5 p-4 rounded-editorial bg-white border border-brand-border shadow-2xs hover:border-brand-blue/40 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-brand-dark leading-snug">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-dark hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all hover:translate-y-[-1px] group"
              >
                <span>{tWhy.cta.replace(" ↗", "")}</span>
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRtl ? "rotate-[-90deg] group-hover:-translate-x-0.5" : ""
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
