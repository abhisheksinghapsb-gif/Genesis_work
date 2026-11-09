"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { sounds } from "./sound";

export type DividerVariant =
  | "hero-about"
  | "about-timeline"
  | "timeline-prizepool"
  | "prizepool-memories"
  | "memories-sponsors"
  | "sponsors-faq"
  | "faq-contact";

interface BrawlSectionDividerProps {
  variant: DividerVariant;
  className?: string;
}

export default function BrawlSectionDivider({
  variant,
  className = "my-6 sm:my-8 md:my-10 lg:my-12",
}: BrawlSectionDividerProps) {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleBadgeInteraction = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);

    switch (variant) {
      case "hero-about":
      case "about-timeline":
        sounds.playClick();
        break;
      case "timeline-prizepool":
        sounds.playGem();
        break;
      case "prizepool-memories":
        sounds.playPop();
        break;
      case "memories-sponsors":
        sounds.playCoin();
        break;
      case "sponsors-faq":
        sounds.playHover();
        break;
      case "faq-contact":
        sounds.playLaser();
        break;
    }
  }, [variant]);

  // Visual Theme Configurations per Variant
  const config = {
    "hero-about": {
      topBorder: "from-transparent via-cyan-400 via-purple-500 to-transparent",
      bottomBorder: "from-transparent via-cyan-400 via-purple-500 to-transparent",
      laserColor: "from-transparent via-cyan-400/40 via-purple-400/40 to-transparent",
      topGlow: "rgba(6, 182, 212, 0.6)",
      bottomGlow: "rgba(168, 85, 247, 0.6)",
      badgeBorder: "border-[#00F0FF] shadow-[0_0_14px_rgba(0,240,255,0.85)]",
      badgeBg: "bg-[#05021a]",
    },
    "about-timeline": {
      topBorder: "from-transparent via-amber-300 via-yellow-400 to-transparent",
      bottomBorder: "from-transparent via-amber-300 via-yellow-400 to-transparent",
      laserColor: "from-transparent via-amber-300/40 via-yellow-400/70 to-transparent",
      topGlow: "rgba(250, 204, 21, 0.75)",
      bottomGlow: "rgba(250, 204, 21, 0.75)",
      badgeBorder: "border-[#FACC15] shadow-[0_0_16px_rgba(250,204,21,0.9)]",
      badgeBg: "bg-[#0a071d]",
    },
    "timeline-prizepool": {
      topBorder: "from-transparent via-amber-300 via-purple-400 to-transparent",
      bottomBorder: "from-transparent via-amber-300 via-purple-400 to-transparent",
      laserColor: "from-transparent via-amber-300/40 via-yellow-300/60 to-transparent",
      topGlow: "rgba(250, 204, 21, 0.6)",
      bottomGlow: "rgba(168, 85, 247, 0.6)",
      badgeBorder: "border-[#FACC15] shadow-[0_0_16px_rgba(250,204,21,0.85)]",
      badgeBg: "bg-[#0f0426]",
    },
    "prizepool-memories": {
      topBorder: "from-transparent via-sky-400 via-indigo-400 to-transparent",
      bottomBorder: "from-transparent via-sky-400 via-indigo-400 to-transparent",
      laserColor: "from-transparent via-sky-400/40 via-indigo-400/50 to-transparent",
      topGlow: "rgba(56, 189, 248, 0.6)",
      bottomGlow: "rgba(99, 102, 241, 0.6)",
      badgeBorder: "border-[#38BDF8] shadow-[0_0_14px_rgba(56,189,248,0.85)]",
      badgeBg: "bg-[#06081e]",
    },
    "memories-sponsors": {
      topBorder: "from-cyan-400 via-purple-500 via-amber-300 to-emerald-400",
      bottomBorder: "from-cyan-400 via-purple-500 via-amber-300 to-emerald-400",
      laserColor: "from-cyan-400/40 via-purple-400/40 via-amber-300/40 to-emerald-400/40",
      topGlow: "rgba(0, 240, 255, 0.65)",
      bottomGlow: "rgba(168, 85, 247, 0.65)",
      badgeBorder: "border-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.9)]",
      badgeBg: "bg-[#04091a]",
    },
    "sponsors-faq": {
      topBorder: "from-transparent via-fuchsia-400 via-purple-400 to-transparent",
      bottomBorder: "from-transparent via-fuchsia-400 via-purple-400 to-transparent",
      laserColor: "from-transparent via-fuchsia-400/40 via-purple-400/60 to-transparent",
      topGlow: "rgba(217, 70, 239, 0.75)",
      bottomGlow: "rgba(168, 85, 247, 0.75)",
      badgeBorder: "border-[#C084FC] shadow-[0_0_16px_rgba(192,132,252,0.95)]",
      badgeBg: "bg-[#0c031d]",
    },
    "faq-contact": {
      topBorder: "from-transparent via-cyan-400 via-yellow-400 to-transparent",
      bottomBorder: "from-transparent via-cyan-400 via-yellow-400 to-transparent",
      laserColor: "from-transparent via-cyan-400/50 via-yellow-400/50 to-transparent",
      topGlow: "rgba(6, 182, 212, 0.75)",
      bottomGlow: "rgba(250, 204, 21, 0.6)",
      badgeBorder: "border-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.9)]",
      badgeBg: "bg-[#03091e]",
    },
  }[variant];

  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`brawl-section-divider relative z-25 w-full flex-shrink-0 select-none overflow-visible ${className}`}
    >
      {/* ── Main Divider Bar Container ── */}
      <div className="relative w-full h-[54px] sm:h-[62px] md:h-[70px] bg-gradient-to-b from-[#02000c] via-[#090422] to-[#02000c] flex items-center justify-center">
        {/* Top & Bottom Atmospheric Seam Blending (eliminates harsh edges into adjacent sections) */}
        <div className="absolute -top-3 inset-x-0 h-3 bg-gradient-to-b from-transparent to-[#02000c] pointer-events-none" />
        <div className="absolute -bottom-3 inset-x-0 h-3 bg-gradient-to-t from-transparent to-[#02000c] pointer-events-none" />

        {/* ── Top Glowing Border Line ── */}
        <div
          className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${config.topBorder}`}
          style={{
            boxShadow: `0 0 10px 1px ${config.topGlow}`,
          }}
        />

        {/* ── Bottom Glowing Border Line ── */}
        <div
          className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${config.bottomBorder}`}
          style={{
            boxShadow: `0 0 10px 1px ${config.bottomGlow}`,
          }}
        />

        {/* ── Central Laser Line Across the Bar ── */}
        <div
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r ${config.laserColor}`}
        />

        {/* ── Left Side HUD Accents ── */}
        <div className="absolute left-4 sm:left-10 md:left-20 lg:left-28 flex items-center pointer-events-none">
          {renderLeftAccents(variant)}
        </div>

        {/* ── Right Side HUD Accents ── */}
        <div className="absolute right-4 sm:right-10 md:right-20 lg:right-28 flex items-center pointer-events-none">
          {renderRightAccents(variant)}
        </div>

        {/* ── Central Elevated Mascot / Symbol Badge ── */}
        <div
          onClick={handleBadgeInteraction}
          onMouseEnter={sounds.playHover}
          className={`relative z-20 flex items-center justify-center cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-112 active:scale-95 ${
            isBouncing ? "scale-120" : ""
          }`}
          title="Brawl Stars Arena Divider — Click for sound!"
        >
          {renderCenterBadge(variant, config.badgeBorder, config.badgeBg)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Left Side Accents per Variant
// ─────────────────────────────────────────────────────────────────────────
function renderLeftAccents(variant: DividerVariant) {
  switch (variant) {
    case "about-timeline":
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Golden rounded square with black dot */}
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-gradient-to-br from-[#FFF388] via-[#FACC15] to-[#B45309] border border-black/80 shadow-[0_0_6px_#facc15] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
          {/* Three graduated inward-pointing chevrons > > > */}
          <div className="flex items-center gap-1 text-[#FACC15] font-black">
            <span className="opacity-35 text-[10px] sm:text-xs">❯</span>
            <span className="opacity-70 text-[11px] sm:text-sm">❯</span>
            <span className="opacity-100 text-xs sm:text-base drop-shadow-[0_0_6px_#facc15]">❯</span>
          </div>
        </div>
      );

    case "hero-about":
      return (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400 shadow-[0_0_6px_#00f0ff] opacity-50" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        </div>
      );

    case "timeline-prizepool":
      return (
        <div className="flex items-center gap-2">
          <div className="text-amber-400 text-xs sm:text-sm drop-shadow-[0_0_6px_#facc15]">✦</div>
          <div className="flex items-center gap-1 text-amber-300 font-bold text-xs sm:text-sm">
            <span className="opacity-60">❯</span>
            <span className="opacity-100">❯</span>
          </div>
        </div>
      );

    case "prizepool-memories":
      return (
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="text-xs sm:text-sm drop-shadow-[0_0_6px_#38bdf8]">✦</span>
          <span className="w-4 sm:w-6 h-[1.5px] bg-cyan-400/70" />
          <span className="text-[10px] sm:text-xs opacity-75">✦</span>
        </div>
      );

    case "memories-sponsors":
      return (
        /* Triple diagonal hazard speed stripes /// */
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400/60 shadow-[0_0_6px_#00f0ff]" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400/80 shadow-[0_0_8px_#00f0ff]" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-300 shadow-[0_0_10px_#00f0ff]" />
        </div>
      );

    case "sponsors-faq":
      return (
        /* 3 rounded slanted pills with glowing magenta dots */
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-400/40 bg-fuchsia-950/40 flex items-center justify-center opacity-40">
            <div className="w-1 h-1 rounded-full bg-fuchsia-300" />
          </div>
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-400/60 bg-fuchsia-950/60 flex items-center justify-center opacity-70">
            <div className="w-1 h-1 rounded-full bg-fuchsia-300 shadow-[0_0_4px_#e879f9]" />
          </div>
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-300 bg-fuchsia-900/80 flex items-center justify-center shadow-[0_0_8px_rgba(217,70,239,0.8)]">
            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-100 shadow-[0_0_6px_#f5d0fe]" />
          </div>
        </div>
      );

    case "faq-contact":
      return (
        /* 3 slanted speed blocks in cyan, amber, cyan */
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-2 sm:w-2.5 h-2.5 sm:h-3 -skew-x-[25deg] bg-cyan-400/80 shadow-[0_0_6px_#00f0ff]" />
          <span className="inline-block w-2.5 sm:w-3 h-3 sm:h-3.5 -skew-x-[25deg] bg-amber-400 shadow-[0_0_8px_#facc15]" />
          <span className="inline-block w-3 sm:w-3.5 h-3.5 sm:h-4.5 -skew-x-[25deg] bg-cyan-300 shadow-[0_0_10px_#00f0ff]" />
        </div>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Right Side Accents per Variant (Symmetrical / Mirrored)
// ─────────────────────────────────────────────────────────────────────────
function renderRightAccents(variant: DividerVariant) {
  switch (variant) {
    case "about-timeline":
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Three graduated inward-pointing chevrons < < < */}
          <div className="flex items-center gap-1 text-[#FACC15] font-black">
            <span className="opacity-100 text-xs sm:text-base drop-shadow-[0_0_6px_#facc15]">❮</span>
            <span className="opacity-70 text-[11px] sm:text-sm">❮</span>
            <span className="opacity-35 text-[10px] sm:text-xs">❮</span>
          </div>
          {/* Golden rounded square with black dot */}
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-gradient-to-br from-[#FFF388] via-[#FACC15] to-[#B45309] border border-black/80 shadow-[0_0_6px_#facc15] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
        </div>
      );

    case "hero-about":
      return (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400 shadow-[0_0_6px_#00f0ff] opacity-50" />
        </div>
      );

    case "timeline-prizepool":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-300 font-bold text-xs sm:text-sm">
            <span className="opacity-100">❮</span>
            <span className="opacity-60">❮</span>
          </div>
          <div className="text-amber-400 text-xs sm:text-sm drop-shadow-[0_0_6px_#facc15]">✦</div>
        </div>
      );

    case "prizepool-memories":
      return (
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="text-[10px] sm:text-xs opacity-75">✦</span>
          <span className="w-4 sm:w-6 h-[1.5px] bg-cyan-400/70" />
          <span className="text-xs sm:text-sm drop-shadow-[0_0_6px_#38bdf8]">✦</span>
        </div>
      );

    case "memories-sponsors":
      return (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-300 shadow-[0_0_10px_#00f0ff]" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400/80 shadow-[0_0_8px_#00f0ff]" />
          <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 -skew-x-[25deg] bg-cyan-400/60 shadow-[0_0_6px_#00f0ff]" />
        </div>
      );

    case "sponsors-faq":
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-300 bg-fuchsia-900/80 flex items-center justify-center shadow-[0_0_8px_rgba(217,70,239,0.8)]">
            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-100 shadow-[0_0_6px_#f5d0fe]" />
          </div>
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-400/60 bg-fuchsia-950/60 flex items-center justify-center opacity-70">
            <div className="w-1 h-1 rounded-full bg-fuchsia-300 shadow-[0_0_4px_#e879f9]" />
          </div>
          <div className="w-4 sm:w-5 h-2.5 sm:h-3 -skew-x-[20deg] rounded-[3px] border border-fuchsia-400/40 bg-fuchsia-950/40 flex items-center justify-center opacity-40">
            <div className="w-1 h-1 rounded-full bg-fuchsia-300" />
          </div>
        </div>
      );

    case "faq-contact":
      return (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="inline-block w-3 sm:w-3.5 h-3.5 sm:h-4.5 -skew-x-[25deg] bg-cyan-300 shadow-[0_0_10px_#00f0ff]" />
          <span className="inline-block w-2.5 sm:w-3 h-3 sm:h-3.5 -skew-x-[25deg] bg-amber-400 shadow-[0_0_8px_#facc15]" />
          <span className="inline-block w-2 sm:w-2.5 h-2.5 sm:h-3 -skew-x-[25deg] bg-cyan-400/80 shadow-[0_0_6px_#00f0ff]" />
        </div>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Central Emblem Badge per Variant
// ─────────────────────────────────────────────────────────────────────────
function renderCenterBadge(
  variant: DividerVariant,
  badgeBorder: string,
  badgeBg: string
) {
  // Hexagon Badge for FAQ
  if (variant === "sponsors-faq") {
    return (
      <div className="relative w-12 h-13 sm:w-14 sm:h-15 flex items-center justify-center drop-shadow-[0_0_16px_rgba(217,70,239,0.9)]">
        <svg
          viewBox="0 0 56 64"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon Outer Glowing Frame */}
          <polygon
            points="28,2 54,17 54,47 28,62 2,47 2,17"
            fill="#090218"
            stroke="#D946EF"
            strokeWidth="2.8"
          />
          {/* Inner 3D Faceted Hexagon Block */}
          <polygon
            points="28,11 46,21 46,43 28,53 10,43 10,21"
            fill="url(#faq-hex-grad)"
            stroke="#A855F7"
            strokeWidth="1.2"
          />
          {/* Top highlight facet */}
          <polygon
            points="28,11 46,21 28,32 10,21"
            fill="#E879F9"
            opacity="0.4"
          />
          {/* Right side facet */}
          <polygon
            points="28,32 46,21 46,43 28,53"
            fill="#7E22CE"
            opacity="0.5"
          />
          {/* Left side facet */}
          <polygon
            points="28,32 10,21 10,43 28,53"
            fill="#581C87"
            opacity="0.6"
          />

          {/* White Question Mark ? */}
          <text
            x="28"
            y="39"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="var(--font-lilita), var(--font-brawl), Impact, sans-serif"
            fontSize="21"
            fontWeight="900"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.85))"
          >
            ?
          </text>

          <defs>
            <linearGradient id="faq-hex-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Circular Badges for all other variants
  return (
    <div
      className={`relative w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border-[2.5px] ${badgeBorder} ${badgeBg} flex items-center justify-center overflow-hidden shadow-2xl`}
    >
      {/* Subtle radial inner sheen */}
      <div className="absolute inset-0 bg-radial-[circle_at_35%_25%,rgba(255,255,255,0.15)_0%,transparent_70%] pointer-events-none" />

      {/* 1. Star Skull (Timeline & Hero-About) */}
      {(variant === "about-timeline" || variant === "hero-about") && (
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center">
          <Image
            src="/landing-pages/about/ui/genesis-emblem.svg"
            alt="Genesis Brawl Star Skull"
            width={40}
            height={40}
            className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}

      {/* 2. Brawl Stars Purple Gem (Prize Pool) */}
      {variant === "timeline-prizepool" && (
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center">
          <Image
            src="/landing-pages/prize-pool/ui/gem-purple.svg"
            alt="Brawl Stars Gem"
            width={38}
            height={38}
            className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(168,85,247,0.8)]"
          />
        </div>
      )}

      {/* 3. Celestial Star (Memories) */}
      {variant === "prizepool-memories" && (
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-cyan-200">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            {/* 5-Point Golden Brawl Star */}
            <path
              d="M20 4L24.5 13.5L35 15L27.5 22.5L29.5 33L20 28L10.5 33L12.5 22.5L5 15L15.5 13.5L20 4Z"
              fill="url(#star-gold-grad)"
              stroke="#000000"
              strokeWidth="1.8"
            />
            {/* Sparkles */}
            <circle cx="28" cy="9" r="1.5" fill="#FFFFFF" />
            <circle cx="11" cy="27" r="1.2" fill="#FFFFFF" />
            <defs>
              <linearGradient id="star-gold-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF388" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* 4. Crown King Sprout Mascot (Sponsors) */}
      {variant === "memories-sponsors" && (
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center">
          <Image
            src="/sponsors/crown_brawler.png"
            alt="King Sprout Mascot"
            width={40}
            height={40}
            className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}

      {/* 5. Venue Radar / Reticle Map Pin (Contact) */}
      {variant === "faq-contact" && (
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
            {/* Outer dashed radar circle */}
            <circle
              cx="18"
              cy="18"
              r="14"
              stroke="#00F0FF"
              strokeWidth="1.6"
              strokeDasharray="4 2.5"
              opacity="0.85"
            />
            {/* Crosshair ticks */}
            <line x1="18" y1="1" x2="18" y2="6" stroke="#00F0FF" strokeWidth="1.8" />
            <line x1="18" y1="30" x2="18" y2="35" stroke="#00F0FF" strokeWidth="1.8" />
            <line x1="1" y1="18" x2="6" y2="18" stroke="#00F0FF" strokeWidth="1.8" />
            <line x1="30" y1="18" x2="35" y2="18" stroke="#00F0FF" strokeWidth="1.8" />
            {/* Inner gold ring */}
            <circle cx="18" cy="18" r="8.5" stroke="#FACC15" strokeWidth="1.4" opacity="0.9" />
            {/* Golden Map Pin */}
            <path
              d="M18 10C15.8 10 14 11.8 14 14C14 17 18 22 18 22C18 22 22 17 22 14C22 11.8 20.2 10 18 10ZM18 15.5C17.2 15.5 16.5 14.8 16.5 14C16.5 13.2 17.2 12.5 18 12.5C18.8 12.5 19.5 13.2 19.5 14C19.5 14.8 18.8 15.5 18 15.5Z"
              fill="#FACC15"
              stroke="#000000"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
