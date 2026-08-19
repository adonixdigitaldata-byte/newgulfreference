"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, MessageSquare, ShieldCheck, Activity } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { HealthcareNetworkCanvas } from "@/components/motion/HealthcareNetworkCanvas";

interface HeroSectionProps {
  locale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ locale }) => {
  const tHero = CONTENT.hero[locale];
  const isRtl = locale === "ar";

  const containerRef = useRef<HTMLDivElement>(null);
  const brandLineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Parallax / Mouse tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial brand accent line draw
      tl.fromTo(
        brandLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "expo.out" }
      )
        // 2. Eyebrow badge
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // 3. Masked title line 1 "Gulf M"
        .fromTo(
          heading1Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        )
        // 4. Masked title line 2 "Reference"
        .fromTo(
          heading2Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "power4.out" },
          "-=0.6"
        )
        // 5. Supporting statement
        .fromTo(
          subHeadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        // 6. Description
        .fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // 7. Buttons
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // 8. Image reveal with directional mask and gentle scale
        .fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 0.94, clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0% 100%)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "expo.out",
          },
          "-=1.1"
        )
        // 9. Floating badge
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
          "-=0.4"
        );
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 8;
      const y = (clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-offwhite"
    >
      {/* Living Healthcare Connectivity Canvas (Subtle background node pulses) */}
      <div className="absolute inset-0 opacity-80 pointer-events-none -z-10">
        <HealthcareNetworkCanvas />
      </div>

      <div className="editorial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Architectural Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Brand Coordinate Rule */}
            <div className="flex items-center gap-3 mb-6">
              <div
                ref={brandLineRef}
                className="w-12 h-[2px] bg-brand-blue origin-left"
              />
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-muted uppercase">
                01 / 07 — INFRASTRUCTURE
              </span>
            </div>

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="mb-4 inline-flex items-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light border border-brand-blue/20 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em]">
                <Activity className="w-3.5 h-3.5" />
                {tHero.eyebrow}
              </span>
            </div>

            {/* Masked Main Heading */}
            <div className="mb-4 overflow-hidden">
              <div className="overflow-hidden">
                <h1
                  ref={heading1Ref}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark leading-[1.05]"
                >
                  {isRtl ? "جولف إم" : "Gulf M"}
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  ref={heading2Ref}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark leading-[1.05]"
                >
                  {isRtl ? "ريفرنس" : "Reference"}
                </h1>
              </div>
            </div>

            {/* Blue Supporting Statement */}
            <h2
              ref={subHeadingRef}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-brand-blue leading-[1.18] mb-6 whitespace-pre-line"
            >
              {tHero.supportingHeading}
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed mb-8 font-normal"
            >
              {tHero.description}
            </p>

            {/* Magnetic/Elevated CTAs */}
            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
            >
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <span>{tHero.ctaPrimary}</span>
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isRtl ? "rotate-[-90deg] group-hover:-translate-x-0.5" : ""
                  }`}
                />
              </Link>

              <a
                href={CONTENT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-brand-blue-light/40 text-brand-dark text-sm font-semibold rounded-full border border-brand-border hover:border-brand-blue/30 shadow-2xs transition-all duration-300 group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{tHero.ctaSecondary}</span>
              </a>
            </div>

            {/* Supporting Trust Line */}
            <div className="flex items-center gap-2 text-xs text-brand-muted font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
              <span>{tHero.supportingLine}</span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Mouse-tilt Depth */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageFrameRef}
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                transition: "transform 0.2s ease-out",
              }}
              className="relative w-full max-w-md mx-auto lg:max-w-none shadow-xl rounded-editorial-lg overflow-hidden border border-brand-border bg-white"
            >
              <EditorialImage
                src={ASSETS.hero.femaleProfessionalBeigeHijab.src}
                alt={
                  isRtl
                    ? ASSETS.hero.femaleProfessionalBeigeHijab.altAr
                    : ASSETS.hero.femaleProfessionalBeigeHijab.alt
                }
                categoryLabel={
                  ASSETS.hero.femaleProfessionalBeigeHijab.category
                }
                aspectRatio="aspect-[4/5]"
                priority
                className="w-full"
              />

              {/* Floating Architectural Badge */}
              <div
                ref={badgeRef}
                style={{
                  transform: `translate3d(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px, 0)`,
                  transition: "transform 0.25s ease-out",
                }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-editorial border border-brand-border shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark mb-0.5">
                      {tHero.badgeTitle}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-brand-muted leading-tight">
                      {tHero.badgeSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
