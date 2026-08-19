"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface WhoWeSupportProps {
  locale: Locale;
}

export const WhoWeSupport: React.FC<WhoWeSupportProps> = ({ locale }) => {
  const tSupport = CONTENT.whoWeSupport[locale];
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 lg:py-32 bg-brand-warmbg/40 border-t border-brand-border"
    >
      <div className="editorial-container">
        {/* Coordinate indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-6">
          <span>06 / 07 — CLIENT SEGMENTS</span>
          <span>CARE ENVIRONMENTS</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tSupport.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12]">
            {tSupport.heading}
          </h2>
        </div>

        {/* Desktop: Dynamic Expandable Accordion Grid */}
        <div className="hidden lg:flex gap-4 h-[420px]">
          {tSupport.items.map((item, idx) => {
            const assetKey = item.key as keyof typeof ASSETS.support;
            const asset = ASSETS.support[assetKey];
            const isExpanded = activeIdx === idx;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-editorial overflow-hidden border border-brand-border bg-white transition-all duration-500 ease-out cursor-pointer ${
                  isExpanded ? "flex-[2.5]" : "flex-[1] opacity-80 hover:opacity-100"
                }`}
              >
                <div className="absolute inset-0">
                  <EditorialImage
                    src={asset.src}
                    alt={isRtl ? asset.altAr : asset.alt}
                    aspectRatio="aspect-[4/3]"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-blue-light uppercase tracking-wider block mb-1">
                        0{idx + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>

                    {isExpanded && (
                      <Link
                        href={`/${locale}/services`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold rounded-full shadow-xs transition-all"
                      >
                        <span>{item.cta.replace(" →", "").replace(" ←", "")}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-[-90deg]" : ""}`} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Horizontal Touch-friendly Slider */}
        <div className="flex lg:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {tSupport.items.map((item, idx) => {
            const assetKey = item.key as keyof typeof ASSETS.support;
            const asset = ASSETS.support[assetKey];

            return (
              <div
                key={item.title}
                className="w-[280px] shrink-0 snap-start bg-white rounded-editorial border border-brand-border overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <EditorialImage
                    src={asset.src}
                    alt={isRtl ? asset.altAr : asset.alt}
                    aspectRatio="aspect-[16/10]"
                    className="w-full"
                  />
                  <div className="p-4">
                    <span className="text-[10px] font-mono font-bold text-brand-blue uppercase">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-brand-dark mt-1 mb-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Link
                    href={`/${locale}/services`}
                    className="text-xs font-semibold text-brand-blue inline-flex items-center gap-1"
                  >
                    <span>{item.cta.replace(" →", "").replace(" ←", "")}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
