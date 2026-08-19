import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

interface HomeCtaProps {
  locale: Locale;
}

export const HomeCta: React.FC<HomeCtaProps> = ({ locale }) => {
  const tCta = CONTENT.homeCta[locale];
  const isRtl = locale === "ar";

  return (
    <section className="py-20 md:py-28">
      <div className="editorial-container">
        {/* Coordinate indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest mb-6">
          <span>07 / 07 — NEXT STEP</span>
          <span>ENGAGEMENT</span>
        </div>

        <div className="relative rounded-editorial-lg bg-brand-warmbg p-8 sm:p-12 md:p-16 border border-brand-border text-center flex flex-col items-center justify-center shadow-xs">
          {/* Eyebrow */}
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {tCta.eyebrow}
          </p>

          {/* Heading - Crisp, strong, perfectly readable */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-dark leading-[1.12] mb-4 max-w-2xl whitespace-pre-line">
            {tCta.heading}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed mb-8">
            {tCta.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold rounded-full shadow-sm transition-all hover:translate-y-[-1px] group"
            >
              <span>{tCta.cta.replace(" ↗", "")}</span>
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-brand-blue-light/50 text-brand-dark text-sm font-semibold rounded-full border border-brand-border shadow-2xs transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>{tCta.whatsappCta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
