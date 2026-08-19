"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Branded Fast Transition Curtain */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-brand-offwhite flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          isTransitioning
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <Logo variant="color" iconClassName="h-10 w-auto" />
        <div className="w-32 h-[2px] bg-brand-blue/20 mt-5 overflow-hidden rounded-full">
          <div className="w-full h-full bg-[#0B60D8] animate-pulse" />
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </>
  );
};
