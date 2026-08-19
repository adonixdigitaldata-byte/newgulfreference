import React from "react";
import { CONTENT, type Locale } from "@/data/content";
import { ASSETS } from "@/data/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ServiceDirectory } from "@/components/sections/ServiceDirectory";
import { ServiceInquiryForm } from "@/components/forms/ServiceInquiryForm";
import { TechnicalResources } from "@/components/sections/TechnicalResources";
import { Sparkles, MessageSquare } from "lucide-react";

export default function ServicesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const tServices = CONTENT.servicesPage[locale];
  const isRtl = locale === "ar";

  return (
    <div className="pt-32 md:pt-40 pb-24">
      {/* 1. Services Hero Section */}
      <section className="editorial-container mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {tServices.heroEyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              {tServices.heroHeading}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {tServices.heroDescription}
            </p>
          </div>

          {/* Right-side image: Medical professional in surgical environment */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-blue/20 via-brand-cyan/20 to-transparent rounded-editorial-lg blur-xl opacity-70" />
            <div className="relative rounded-editorial-lg overflow-hidden border-2 border-white shadow-2xl glass-panel">
              <EditorialImage
                src={ASSETS.about.surgicalProcedure.src}
                alt={
                  isRtl
                    ? ASSETS.about.surgicalProcedure.altAr
                    : ASSETS.about.surgicalProcedure.alt
                }
                categoryLabel={ASSETS.about.surgicalProcedure.category}
                aspectRatio="aspect-[4/3]"
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Service Directory (5 Rows) */}
      <ServiceDirectory locale={locale} />

      {/* 3. Service Request Form Section */}
      <section className="editorial-container py-20 md:py-28" id="request-form">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Context Header */}
          <div className="lg:col-span-4 sticky top-28">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {isRtl ? "طلب استشارة وحلول" : "PROJECT INQUIRY"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-[1.18] mb-5">
              {tServices.formHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal">
              {tServices.formDescription}
            </p>
            <div className="p-6 bg-slate-900 text-white rounded-editorial-lg border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm text-white">
                  {isRtl ? "تواصل فوري مع فريق جدة" : "Immediate Team Contact"}
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {isRtl
                  ? "للحالات والمشاريع العاجلة، يمكنكم أيضاً مراسلتنا مباشرة عبر واتساب على الرقم 5655 553 55 966+"
                  : "For urgent inquiries, reach out directly on WhatsApp at +966 55 553 5655."}
              </p>
              <a
                href={CONTENT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>{isRtl ? "فتح محادثة واتساب" : "Open WhatsApp Chat"}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Form Component */}
          <div className="lg:col-span-8">
            <ServiceInquiryForm locale={locale} />
          </div>
        </div>
      </section>

      {/* 4. Technical Resources (5 Request-based Cards) */}
      <TechnicalResources locale={locale} />
    </div>
  );
}
