"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

interface FaqAccordionProps {
  locale: Locale;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ locale }) => {
  const tFaq = CONTENT.faqPage[locale];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {tFaq.items.map((item, idx) => {
        const isOpen = openIdx === idx;

        return (
          <div
            key={idx}
            className={`border rounded-editorial transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-brand-blue bg-white shadow-card ring-1 ring-brand-blue/20"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full px-7 py-6 flex items-center justify-between text-left rtl:text-right gap-4 focus:outline-none"
            >
              <span
                className={`text-base sm:text-lg font-bold transition-colors ${
                  isOpen ? "text-brand-blue" : "text-slate-900"
                }`}
              >
                {item.q}
              </span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-tr from-brand-blue to-brand-cyan text-white border-transparent rotate-180 shadow-md shadow-brand-blue/30"
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-7 pb-7 pt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
