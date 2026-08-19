"use client";

import React from "react";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;
  categoryLabel?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  categoryLabel,
  aspectRatio = "aspect-[4/3]",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-editorial bg-brand-warmbg/70 border border-brand-border/80 group ${aspectRatio} ${className}`}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setHasError(true)}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : null}

      {/* Fallback architectural placeholder when static file is loading or during asset staging */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-warmbg via-brand-offwhite to-brand-warmbg select-none">
          <div className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center mb-3 bg-white/80 shadow-sm">
            <svg
              className="w-5 h-5 text-brand-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-blue mb-1">
            Gulf M Reference
          </p>
          <p className="text-xs text-brand-dark font-medium max-w-[240px] leading-snug">
            {alt}
          </p>
          {categoryLabel && (
            <span className="mt-3 text-[10px] text-brand-muted border border-brand-border/60 bg-white/60 px-2 py-0.5 rounded-full">
              {categoryLabel}
            </span>
          )}
        </div>
      )}

      {/* Editorial fine overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent pointer-events-none opacity-40 transition-opacity group-hover:opacity-20" />
    </div>
  );
};
