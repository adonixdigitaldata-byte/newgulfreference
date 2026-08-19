import React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Target, ShieldCheck, Sparkles } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";

export default function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const tAbout = CONTENT.aboutPage[locale];
  const isRtl = locale === "ar";

  const pillarIcons = [ShieldCheck, Compass, Target];

  return (
    <div className="pt-32 md:pt-40 pb-24">
      {/* 1. About Hero Section with High-Tech Ambient Grid */}
      <section className="editorial-container mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {tAbout.heroEyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              {tAbout.heroHeading}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {tAbout.heroDescription}
            </p>
          </div>

          {/* Right Image: Female healthcare worker wearing green hijab */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-blue/20 via-brand-cyan/20 to-transparent rounded-editorial-lg blur-xl opacity-70" />
            <div className="relative rounded-editorial-lg overflow-hidden border-2 border-white shadow-2xl glass-panel">
              <EditorialImage
                src={ASSETS.about.femaleProfessionalGreenHijab.src}
                alt={
                  isRtl
                    ? ASSETS.about.femaleProfessionalGreenHijab.altAr
                    : ASSETS.about.femaleProfessionalGreenHijab.alt
                }
                categoryLabel={
                  ASSETS.about.femaleProfessionalGreenHijab.category
                }
                aspectRatio="aspect-[4/5]"
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Editorial Information Pillars (Who We Are, Vision, Mission) */}
      <section className="editorial-container mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tAbout.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx];

            return (
              <div
                key={pillar.tag}
                className="bg-white p-8 sm:p-10 rounded-editorial-lg border border-slate-200 hover:border-brand-blue/60 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center mb-6 shadow-md shadow-brand-blue/30 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue mb-4">
                    {pillar.tag}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {pillar.text}
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-slate-100 text-xs text-slate-400 font-mono font-bold">
                  0{idx + 1} / 03
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Journey Timeline */}
      <JourneyTimeline locale={locale} />

      {/* 4. Commitment Section (Luxury Dark Split Layout) */}
      <section className="editorial-container mt-24 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900 text-white p-8 sm:p-12 md:p-16 rounded-editorial-lg border border-slate-800 shadow-2xl relative overflow-hidden bg-dark-grid-pattern">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-brand-cyan text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {tAbout.commitmentEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.15] mb-5">
              {tAbout.commitmentHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 font-normal">
              {tAbout.commitmentDescription}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-bold rounded-full shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all duration-300 group"
            >
              <span>{tAbout.commitmentCta.replace(" ↗", "")}</span>
              <ArrowUpRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRtl ? "rotate-[-90deg] group-hover:-translate-x-0.5" : ""
                }`}
              />
            </Link>
          </div>

          <div className="lg:col-span-6 relative z-10">
            <div className="relative rounded-editorial-lg overflow-hidden border-2 border-slate-700 shadow-2xl glass-panel-dark">
              <EditorialImage
                src={ASSETS.about.surgicalProcedure.src}
                alt={
                  isRtl
                    ? ASSETS.about.surgicalProcedure.altAr
                    : ASSETS.about.surgicalProcedure.alt
                }
                categoryLabel={ASSETS.about.surgicalProcedure.category}
                aspectRatio="aspect-[16/11]"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
