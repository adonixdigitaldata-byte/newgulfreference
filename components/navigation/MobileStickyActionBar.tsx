"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

export const MobileStickyActionBar: React.FC<{ locale: Locale }> = ({ locale }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isRtl = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Hide when near the bottom footer or when scrolling down fast
      if (currentScrollY + winHeight > docHeight - 300) {
        setIsVisible(false);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY < 100) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden transition-transform duration-300 ease-out bg-white/95 backdrop-blur-md border-t border-brand-border shadow-lg ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        {/* Call Button */}
        <a
          href="tel:+966555535655"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-warmbg text-brand-dark rounded-full text-xs font-bold border border-brand-border active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-brand-blue" />
          <span>{isRtl ? "اتصال" : "Call"}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={CONTENT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-xs active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isRtl ? "واتساب" : "WhatsApp"}</span>
        </a>

        {/* Request CTA */}
        <Link
          href={`/${locale}/contact`}
          className="flex-1.5 flex items-center justify-center gap-1 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold shadow-xs active:scale-95 transition-transform"
        >
          <span>{isRtl ? "طلب خدمة" : "Request"}</span>
          <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-[-90deg]" : ""}`} />
        </Link>
      </div>
    </div>
  );
};
