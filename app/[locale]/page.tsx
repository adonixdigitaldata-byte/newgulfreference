import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CoreOffering } from "@/components/sections/CoreOffering";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { WhoWeSupport } from "@/components/sections/WhoWeSupport";
import { HomeCta } from "@/components/sections/HomeCta";
import type { Locale } from "@/data/content";

export default function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale === "ar" ? "ar" : "en";

  return (
    <>
      <HeroSection locale={locale} />
      <StatsStrip locale={locale} />
      <CoreOffering locale={locale} />
      <WhyUsSection locale={locale} />
      <HowWeWork locale={locale} />
      <WhoWeSupport locale={locale} />
      <HomeCta locale={locale} />
    </>
  );
}
