"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FAQCategory, FAQ_DATA } from "../data/faqData";
import FAQAccordionItem from "./FAQAccordionItem";
import { sounds } from "./sound";

const CATEGORIES: FAQCategory[] = ["general", "technical", "prizes", "logistics"];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Switch category with sleek 160ms opacity transition & accordion reset
  const handleCategoryChange = useCallback(
    (category: FAQCategory) => {
      if (category === activeCategory) return;
      sounds.playClick();
      setExpandedQuestionId(null);
      setIsTransitioning(true);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setActiveCategory(category);
        setIsTransitioning(false);
      }, 160);
    },
    [activeCategory]
  );

  // Single-open accordion toggle
  const handleToggleQuestion = useCallback((id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  }, []);

  const currentCategoryData = FAQ_DATA[activeCategory];

  return (
    <section
      id="faq"
      className="relative z-10 flex min-h-0 w-full shrink-0 select-none flex-col items-center justify-start overflow-x-hidden overflow-y-visible bg-[#030015] px-3 pt-6 pb-20 text-white sm:px-6 sm:pt-8 sm:pb-28 md:min-h-screen md:justify-start md:pt-8 md:pb-16 lg:min-h-screen lg:justify-start lg:px-8 lg:pt-10 lg:pb-20"
      aria-label="Frequently Asked Questions"
    >
      {/* ── 1. COSMIC BRAWL STARS PATTERN BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <picture>
          <img loading="lazy" decoding="async"
            src="/landing-pages/faq/backgrounds/bg-cosmic-faq.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
          />
        </picture>
        {/* Subtle radial vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,0,21,0.6)_100%)]"
          aria-hidden="true"
        />
        {/* Subtle Edge Transitions: Visual continuity with Sponsors above */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#030015] to-transparent pointer-events-none" />
      </div>

      {/* Responsive FAQ arcade assembly: title, categories, and question panel */}
      <div className="faq-layout-shell relative z-10 mt-4 grid w-full max-w-[1320px] grid-cols-1 items-start gap-5 sm:mt-6 sm:gap-6 lg:mt-0 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-7 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
        {/* ── 2. TOP: ORANGE FAQ HEADING BANNER ── */}
        <div className="relative flex w-full shrink-0 flex-col items-center lg:col-span-2">
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <div className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[430px] h-[48px] sm:h-[58px] md:h-[68px] lg:h-[76px] pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
            <img loading="lazy" decoding="async"
              src="/landing-pages/faq/ui/faq-banner.svg"
              alt="FAQs"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>

        {/* ── 3. CENTER: MAIN BLUE ARCADE INFORMATION PANEL ── */}
        <div className="faq-category-sidebar relative order-2 flex w-full shrink-0 justify-center lg:order-none lg:col-start-1 lg:row-start-2">
          <nav
            aria-label="FAQ Categories"
            className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-1 lg:gap-4"
          >
            {CATEGORIES.map((catKey) => {
              const cat = FAQ_DATA[catKey];
              const isActive = activeCategory === catKey;

              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`faq-category-${cat.id}`}
                  aria-pressed={isActive}
                  aria-controls="faq-category-panel"
                  data-active={isActive}
                  onClick={() => handleCategoryChange(cat.id)}
                  onMouseEnter={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.matchMedia("(hover: hover)").matches
                    ) {
                      sounds.playHover();
                    }
                  }}
                  className="faq-category-button group flex min-h-12 w-full items-center justify-center px-3 py-3 sm:min-h-14 lg:min-h-16"
                >
                  <span className="faq-category-label">{cat.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="faq-content-panel relative order-3 flex w-full min-w-0 shrink-0 flex-col items-center mt-3 sm:mt-0 lg:mt-0 lg:order-none lg:col-start-2 lg:row-start-2">
          <div
            id="faq-category-panel"
            role="region"
            aria-labelledby={`faq-category-${activeCategory}`}
            className="w-full rounded-2xl sm:rounded-3xl border-4 border-[#000c28] shadow-[0_16px_40px_rgba(0,8,28,0.9),0_0_50px_rgba(16,93,229,0.35)] overflow-hidden flex flex-col transition-all duration-300"
            style={{
              backgroundColor: "#105DE5",
              boxShadow:
                "inset 0 -2px 0 rgba(0,0,0,0.25), inset 0 2px 0 #063A97, 0 8px 0 #248EF6, 0 20px 45px rgba(0,0,0,0.85)",
            }}
          >
            {/* Panel Header Bar (Lighter Blue #248EF6 with inner arcade shadow) */}
            <div
              className="relative w-full h-[50px] sm:h-[60px] md:h-[68px] lg:h-[74px] flex items-center justify-center px-4 sm:px-6 border-b-4 border-[#000c28] shrink-0"
              style={{
                backgroundColor: "#248EF6",
                boxShadow: "inset 0 -3.4px 0 #055CB3",
              }}
            >
              {/* Centered Category Title Artwork */}
              <div
                className={`h-[22px] sm:h-[26px] md:h-[32px] lg:h-[36px] flex items-center justify-center transition-all duration-200 ${
                  isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <img loading="lazy" decoding="async"
                  src={currentCategoryData.headerSvg}
                  alt={currentCategoryData.label}
                  className="h-full w-auto max-w-[190px] sm:max-w-[240px] md:max-w-[270px] object-contain pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>

            {/* Panel Body: Question Rows Container (Figma 45px left/right inset: 871px row in 961px panel) */}
            <div
              className={`faq-panel-body flex h-auto flex-col gap-3 transition-opacity duration-180 sm:gap-4 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentCategoryData.questions.map((q, idx) => (
                <FAQAccordionItem
                  key={q.id}
                  item={q}
                  isOpen={expandedQuestionId === q.id}
                  onToggle={() => handleToggleQuestion(q.id)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
