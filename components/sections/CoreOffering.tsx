"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface CoreOfferingProps {
  locale: Locale;
}

export const CoreOffering: React.FC<CoreOfferingProps> = ({ locale }) => {
  const tCore = CONTENT.coreOffering[locale];
  const isRtl = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = tCore.services[activeIndex];
  const activeAssetKey = activeService.key as keyof typeof ASSETS.services;
  const activeAsset = ASSETS.services[activeAssetKey];

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="editorial-container">
        {/* Section Coordinate & Label */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-6">
          <span>03 / 07 — CORE OFFERING</span>
          <span>OPERATIONAL SCOPE</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tCore.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12] mb-4">
            {tCore.heading}
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            {tCore.description}
          </p>
        </div>

        {/* Desktop: Interactive Service Discovery Experience (Large Visual + Interactive List) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center bg-white p-8 sm:p-10 rounded-editorial border border-brand-border shadow-xs">
          {/* Left Column: Interactive Service Selector */}
          <div className="col-span-6 divide-y divide-brand-border/70">
            {tCore.services.map((service, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`py-5 transition-all duration-300 cursor-pointer group ${
                    isActive ? "pr-4 rtl:pl-4 rtl:pr-0" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                        isActive
                          ? "bg-brand-blue text-white"
                          : "bg-brand-warmbg text-brand-muted"
                      }`}
                    >
                      {service.id}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg font-bold transition-colors ${
                            isActive ? "text-brand-blue" : "text-brand-dark"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? "text-brand-blue translate-x-0.5 -translate-y-0.5 opacity-100"
                              : "opacity-0"
                          } ${isRtl ? "rotate-[-90deg]" : ""}`}
                        />
                      </div>
                      {isActive && (
                        <p className="text-xs text-brand-muted leading-relaxed mt-2 animate-fadeIn">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Directional Clip Image Display */}
          <div className="col-span-6">
            <div className="relative rounded-editorial overflow-hidden border border-brand-border shadow-md bg-brand-warmbg aspect-[16/11]">
              <EditorialImage
                key={activeService.id}
                src={activeAsset.src}
                alt={isRtl ? activeAsset.altAr : activeAsset.alt}
                categoryLabel={activeAsset.category}
                aspectRatio="aspect-[16/11]"
                className="w-full h-full transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-md border border-brand-border flex items-center justify-between text-xs font-semibold">
                <span className="text-brand-dark">{activeService.title}</span>
                <Link
                  href={`/${locale}/services`}
                  className="text-brand-blue hover:underline inline-flex items-center gap-1"
                >
                  <span>{isRtl ? "تفاصيل الخدمة" : "Service scope"}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: Touch-friendly Expanded Service Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
          {tCore.services.map((service, idx) => {
            const assetKey = service.key as keyof typeof ASSETS.services;
            const asset = ASSETS.services[assetKey];

            return (
              <div
                key={service.id}
                className="bg-white p-5 rounded-editorial border border-brand-border shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold bg-brand-blue-light text-brand-blue px-2.5 py-0.5 rounded-full">
                      {service.id}
                    </span>
                    <span className="text-xs font-semibold text-brand-blue">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="mb-4 overflow-hidden rounded-md border border-brand-border">
                    <EditorialImage
                      src={asset.src}
                      alt={isRtl ? asset.altAr : asset.alt}
                      categoryLabel={asset.category}
                      aspectRatio="aspect-[16/10]"
                      className="w-full"
                    />
                  </div>

                  <h3 className="text-base font-bold text-brand-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-blue">
                  <Link href={`/${locale}/services`} className="inline-flex items-center gap-1">
                    <span>{isRtl ? "استكشف الخدمة" : "Explore service"}</span>
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
