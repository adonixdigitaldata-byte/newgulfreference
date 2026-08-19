import React from "react";
import { CONTENT, type Locale } from "@/data/content";
import { ServiceInquiryForm } from "@/components/forms/ServiceInquiryForm";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

export default function ContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const tContact = CONTENT.contactPage[locale];
  const isRtl = locale === "ar";

  return (
    <div className="pt-32 md:pt-40 pb-28">
      <div className="editorial-container">
        {/* Page Hero Intro */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {tContact.heroEyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
            {tContact.heroHeading}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {tContact.heroDescription}
          </p>
        </div>

        {/* 2-Column Split: Direct Channels (Left) & Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Speak with Gulf M Reference (Strictly Jeddah) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white p-8 sm:p-10 rounded-editorial-lg border border-slate-800 shadow-2xl relative overflow-hidden bg-dark-grid-pattern">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-slate-800">
                {tContact.leftHeading}
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-brand-cyan flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {tContact.phoneLabel}
                    </span>
                    <a
                      href={`tel:${tContact.phoneValue.replace(/\s+/g, "")}`}
                      className="text-base font-bold text-white hover:text-brand-cyan font-mono transition-colors"
                      dir="ltr"
                    >
                      {tContact.phoneValue}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-brand-cyan flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {tContact.emailLabel}
                    </span>
                    <a
                      href={`mailto:${tContact.emailValue}`}
                      className="text-sm font-semibold text-white hover:text-brand-cyan transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-brand-cyan"
                    >
                      {tContact.emailValue}
                    </a>
                  </div>
                </div>

                {/* Address (Strictly Jeddah) */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-brand-cyan flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {tContact.addressLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
                      {tContact.addressValue}
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {tContact.responseLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {tContact.responseValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <a
                href={CONTENT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{tContact.whatsappCta.replace(" ↗", "")}</span>
                <ArrowUpRight
                  className={`w-4 h-4 ${
                    isRtl ? "rotate-[-90deg]" : ""
                  }`}
                />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {tContact.formHeading}
              </h3>
              <p className="text-sm text-slate-600">
                {tContact.formDescription}
              </p>
            </div>
            <ServiceInquiryForm locale={locale} showSecurityNote />
          </div>
        </div>
      </div>
    </div>
  );
}
