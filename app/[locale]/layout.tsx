import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { MobileStickyActionBar } from "@/components/navigation/MobileStickyActionBar";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { CONTENT, type Locale } from "@/data/content";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = params.locale === "ar" ? "ar" : "en";
  const meta = CONTENT.meta[locale];

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://gulfreference.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      siteName: "Gulf M Reference",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${jakartaSans.variable} ${cairo.variable} scroll-smooth`}
    >
      <body
        className={`bg-brand-offwhite text-brand-dark min-h-screen flex flex-col justify-between ${
          isRtl ? "font-arabic" : "font-sans"
        }`}
      >
        <SmoothScrollProvider>
          <PageTransition>
            <Header locale={locale} />
            <main className="flex-grow">{children}</main>
            <Footer locale={locale} />
            <MobileStickyActionBar locale={locale} />
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
