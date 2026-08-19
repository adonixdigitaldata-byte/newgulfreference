"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface ServiceDirectoryProps {
  locale: Locale;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ locale }) => {
  const tServices = CONTENT.coreOffering[locale];
  const isRtl = locale === "ar";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 border-b border-slate-200 bg-slate-50/40">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
          <span className="flex items-center gap-2 text-brand-blue">
            <Sparkles className="w-4 h-4" />
            <span>01 — 05</span>
          </span>
          <span>{isRtl ? "دليل الحلول والخدمات" : "Services Directory & Capabilities"}</span>
        </div>

        {/* Interactive Service Rows */}
        <div className="divide-y divide-slate-200">
          {tServices.services.map((service, idx) => {
            const assetKey = service.key as keyof typeof ASSETS.services;
            const asset = ASSETS.services[assetKey];
            const isHovered = hoveredIdx === idx;

            return (
              <Link
                key={service.id}
                href={`/${locale}/services#request-form`}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`block py-10 md:py-12 transition-all duration-300 group cursor-pointer ${
                  isHovered
                    ? "bg-white px-6 sm:px-8 rounded-editorial shadow-card my-2 border border-brand-blue/30"
                    : "hover:bg-white/60 px-4 rounded-xl"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Service Number & Title */}
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <span className="text-base font-mono font-black text-brand-blue shrink-0 mt-0.5 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                      {service.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Image Preview (Dominant on Hover) */}
                  <div className="lg:col-span-3">
                    <div className="max-w-[300px] rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <EditorialImage
                        src={asset.src}
                        alt={isRtl ? asset.altAr : asset.alt}
                        categoryLabel={asset.category}
                        aspectRatio="aspect-[16/10]"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Icon */}
                  <div className="lg:col-span-1 flex justify-end">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent scale-110 shadow-md shadow-brand-blue/30"
                          : "border-slate-300 text-slate-400 group-hover:text-brand-blue group-hover:border-brand-blue"
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          isRtl ? "rotate-[-90deg]" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
