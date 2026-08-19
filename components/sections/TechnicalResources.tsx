import React from "react";
import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

interface TechnicalResourcesProps {
  locale: Locale;
}

export const TechnicalResources: React.FC<TechnicalResourcesProps> = ({ locale }) => {
  const tServices = CONTENT.servicesPage[locale];
  const isRtl = locale === "ar";

  return (
    <section className="py-20 md:py-28 bg-brand-warmbg/40 border-t border-brand-border">
      <div className="editorial-container">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tServices.resourcesEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12] mb-4">
            {tServices.resourcesHeading}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            {tServices.resourcesDescription}
          </p>
        </div>

        {/* Resource Cards (Request-Based) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {tServices.resourcesList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-editorial border border-brand-border hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="w-9 h-9 rounded-md bg-brand-blue-light text-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark mb-1 group-hover:text-brand-blue transition-colors">
                  {item}
                </h4>
                <p className="text-[11px] text-brand-muted">
                  {isRtl ? "متاح عند الطلب" : "Available upon request"}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] font-semibold text-brand-blue flex items-center justify-between">
                <span>{isRtl ? "طلب وثيقة" : "Request document"}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center sm:text-left">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all hover:translate-y-[-1px] group"
          >
            <span>{tServices.resourcesCta.replace(" ↗", "")}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRtl ? "rotate-[-90deg] group-hover:-translate-x-0.5" : ""
              }`}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
