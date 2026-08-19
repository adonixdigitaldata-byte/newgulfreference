import React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const tFooter = CONTENT.footer[locale];
  const tNav = CONTENT.nav[locale];
  const isRtl = locale === "ar";

  const links = [
    { label: tNav.home, href: `/${locale}` },
    { label: tNav.about, href: `/${locale}/about` },
    { label: tNav.services, href: `/${locale}/services` },
    { label: tNav.faq, href: `/${locale}/faq` },
    { label: tNav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-brand-footer text-white pt-16 pb-12 mt-20 border-t border-brand-footer/80">
      <div className="editorial-container">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue-light" />
                <span className="text-base font-bold uppercase tracking-[0.2em] text-white">
                  GULF M REFERENCE
                </span>
              </div>
              <p className="text-sm text-white/80 max-w-md leading-relaxed">
                {tFooter.description}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {tFooter.regionBadge}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              {tFooter.exploreTitle}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isRtl ? "rotate-[-90deg]" : ""
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Information (Strictly Jeddah) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              {tFooter.contactTitle}
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/60" />
                <a
                  href={`tel:${tFooter.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors font-mono"
                  dir="ltr"
                >
                  {tFooter.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/60" />
                <a
                  href={`mailto:${tFooter.email}`}
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
                >
                  {tFooter.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-xs text-white/70 whitespace-pre-line leading-relaxed font-light">
                <MapPin className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                <span>{tFooter.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>{tFooter.rights}</div>
          <div className="flex items-center gap-6">
            {tFooter.socials.map((social) => (
              <span
                key={social}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
