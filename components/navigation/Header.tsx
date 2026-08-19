"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { CONTENT, type Locale } from "@/data/content";
import { Logo } from "@/components/ui/Logo";

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tNav = CONTENT.nav[locale];
  const isRtl = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: tNav.home, href: `/${locale}` },
    { label: tNav.about, href: `/${locale}/about` },
    { label: tNav.services, href: `/${locale}/services` },
    { label: tNav.faq, href: `/${locale}/faq` },
    { label: tNav.contact, href: `/${locale}/contact` },
  ];

  const switchLocaleHref = () => {
    const targetLocale = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-sm"
            : "bg-transparent py-5 lg:py-6"
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center group focus:outline-none rounded-lg transition-transform duration-300 hover:opacity-95"
            aria-label="Gulf M Reference Home"
          >
            <Logo variant="color" />
          </Link>

          {/* Desktop Frosted Glass Capsule Nav */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-full shadow-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-md shadow-brand-blue/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher & Gradient CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={switchLocaleHref()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-brand-blue border border-slate-200/90 rounded-full bg-white/80 backdrop-blur-sm hover:border-brand-blue/40 shadow-2xs transition-all"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-blue" />
              <span>{tNav.languageToggle}</span>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-full shadow-md shadow-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/40 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>{tNav.cta.replace(" ↗", "")}</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRtl ? "rotate-[-90deg] group-hover:-translate-x-0.5" : ""
                }`}
              />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href={switchLocaleHref()}
              className="px-2.5 py-1 text-xs font-bold text-slate-900 border border-slate-200 rounded-full bg-white shadow-2xs"
            >
              {tNav.languageToggle}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 border border-slate-200 rounded-xl bg-white shadow-2xs focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-2xl text-white flex flex-col justify-between p-8 transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="pt-24 flex flex-col gap-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-cyan border-b border-slate-800 pb-3">
            Menu Navigation
          </div>
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-bold tracking-tight transition-colors ${
                    active ? "text-brand-cyan" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col gap-4">
          <Link
            href={`/${locale}/contact`}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-full font-bold text-sm shadow-lg shadow-brand-blue/30"
          >
            <span>{tNav.cta}</span>
          </Link>
          <div className="text-xs text-slate-400 text-center">
            Gulf M Reference Company • Jeddah, Saudi Arabia
          </div>
        </div>
      </div>
    </>
  );
};
