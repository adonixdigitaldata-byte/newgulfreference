import React from "react";
import { CONTENT, type Locale } from "@/data/content";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import Link from "next/link";
import { MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

export default function FaqPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const tFaq = CONTENT.faqPage[locale];
  const isRtl = locale === "ar";

  return (
    <div className="pt-32 md:pt-40 pb-28">
      <div className="editorial-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            {tFaq.heroEyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-5">
            {tFaq.heroHeading}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            {tFaq.heroDescription}
          </p>
        </div>

        {/* Accordion Component */}
        <FaqAccordion locale={locale} />

        {/* Still have questions banner */}
        <div className="max-w-3xl mx-auto mt-20 p-8 sm:p-10 bg-slate-900 text-white rounded-editorial-lg border border-slate-800 shadow-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden bg-dark-grid-pattern">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-left rtl:text-right relative z-10">
            <h4 className="text-lg font-bold text-white mb-1.5">
              {isRtl ? "هل لديك متطلب أو استفسار فني آخر؟" : "Have a specific technical requirement?"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {isRtl
                ? "فريقنا في جدة جاهز للإجابة وتقديم الدعم المتكامل لمنشأتكم."
                : "Our Jeddah team is available to assist your healthcare organization."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <a
              href={CONTENT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isRtl ? "واتساب" : "WhatsApp"}</span>
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-bold rounded-full shadow-lg shadow-brand-blue/30 transition-all"
            >
              <span>{isRtl ? "اتصل بنا" : "Contact"}</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 ${
                  isRtl ? "rotate-[-90deg]" : ""
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
