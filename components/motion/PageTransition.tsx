"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark">
            Gulf M Reference
          </span>
        </div>
        <div className="w-24 h-[1.5px] bg-brand-blue/30 mt-4 overflow-hidden rounded-full">
          <div className="w-full h-full bg-brand-blue animate-pulse" />
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </>
  );
};
