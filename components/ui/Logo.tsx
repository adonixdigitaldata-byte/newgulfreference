import React from "react";

interface LogoProps {
  variant?: "color" | "white" | "dark";
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  iconClassName?: string;
}

/**
 * Gulf M Reference Brand Vector Mark
 * Matches official brand identity: DNA wave helix with Health Matters lockup
 */
export const LogoIcon: React.FC<{
  className?: string;
  color?: string;
  accentColor?: string;
}> = ({
  className = "w-10 h-6",
  color = "currentColor",
  accentColor = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left wave strand curving over the top */}
      <path
        d="M 24 68 C 38 32, 70 20, 94 20 C 114 20, 134 32, 146 54"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Center DNA loop & intertwining strands */}
      <path
        d="M 94 100 C 70 100, 48 88, 38 68"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Center oval bottom & top connection */}
      <path
        d="M 88 56 C 88 32, 102 20, 120 20 C 138 20, 152 32, 152 56 C 152 80, 138 100, 120 100 C 102 100, 88 80, 88 56 Z"
        stroke={color}
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Right wave strand curving down and out */}
      <path
        d="M 148 64 C 160 88, 182 100, 204 100 C 220 100, 232 90, 236 82"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Cross link extension */}
      <path
        d="M 146 54 L 170 28"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* DNA 3 Base Rungs inside Center Loop */}
      <line
        x1="108"
        y1="40"
        x2="108"
        y2="72"
        stroke={accentColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="120"
        y1="34"
        x2="120"
        y2="78"
        stroke={accentColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="132"
        y1="40"
        x2="132"
        y2="72"
        stroke={accentColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "color",
  showText = true,
  showTagline = true,
  className = "",
  iconClassName = "h-8 sm:h-9 w-auto",
}) => {
  const isWhite = variant === "white";
  const primaryColor = isWhite ? "#FFFFFF" : "#0A65D9";
  const secondaryColor = isWhite ? "rgba(255,255,255,0.9)" : "#0284C7";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Helix Wave Mark */}
      <LogoIcon
        className={iconClassName}
        color={primaryColor}
        accentColor={secondaryColor}
      />

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase leading-none text-base sm:text-lg ${
              isWhite ? "text-white" : "text-[#0A65D9]"
            }`}
            style={{ fontFamily: "inherit" }}
          >
            GULF M REFERENCE
          </span>
          {showTagline && (
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] sm:tracking-[0.34em] uppercase mt-1 leading-none ${
                isWhite ? "text-white/80" : "text-[#0A65D9]"
              }`}
            >
              HEALTH MATTERS
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
