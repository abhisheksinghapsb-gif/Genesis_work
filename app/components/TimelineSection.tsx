"use client";

import { useEffect, useRef, type RefObject } from "react";

const stages = [
  {
    step: "01",
    title: "Registration",
    sub: "Unstop & IndieConnect",
    asset: "/landing-pages/timeline/stages/stage-registration.svg",
    backAsset: "/landing-pages/timeline/stages/stage-registration-back.svg",
    side: "left",
    linkUrl: "https://unstop.com/",
  },
  {
    step: "02",
    title: "Round 1 — Online",
    sub: "Online Tournament",
    asset: "/landing-pages/timeline/stages/stage-round1.svg",
    backAsset: "/landing-pages/timeline/stages/stage-round1-back.svg",
    side: "right",
    linkUrl: "",
  },
  {
    step: "03",
    title: "Round 2 — Offline",
    sub: "Offline Showdown",
    asset: "/landing-pages/timeline/stages/stage-round2.svg",
    backAsset: "/landing-pages/timeline/stages/stage-round2-back.svg",
    side: "left",
    linkUrl: "",
  },
  {
    step: "04",
    title: "Results",
    sub: "Grand Champions",
    asset: "/landing-pages/timeline/stages/stage-result.svg",
    backAsset: "/landing-pages/timeline/stages/stage-result-back.svg",
    side: "right",
    linkUrl: "",
  },
] as const;

type TimelineSectionProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function TimelineSection({ scrollContainerRef }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const journey = journeyRef.current;
    const track = trackRef.current;
    const scroller = scrollContainerRef.current;

    if (!section || !journey || !track || !scroller) return;

    const markers = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-marker"),
    );
    const stageElements = Array.from(
      journey.querySelectorAll<HTMLElement>(".genesis-timeline-stage"),
    );

    if (markers.length !== stages.length || stageElements.length !== stages.length) return;

    track.dataset.runtime = "golden-journey-v1";

    let markerCenters: number[] = [];
    let firstMarkerY = 0;
    let lastMarkerY = 0;
    let frame = 0;

    const updateProgress = () => {
      if (markerCenters.length !== markers.length || lastMarkerY <= firstMarkerY) return;

      const activationY = scroller.scrollTop + scroller.clientHeight * 0.58;
      const progress = clamp(
        (activationY - firstMarkerY) / (lastMarkerY - firstMarkerY),
        0,
        1,
      );
      const percent = `${(progress * 100).toFixed(3)}%`;

      track.style.setProperty("--timeline-progress", percent);
      track.style.setProperty("--timeline-light-opacity", "1");
      track.dataset.progress = progress.toFixed(4);

      const thresholds = markerCenters.map((center) =>
        clamp((center - firstMarkerY) / (lastMarkerY - firstMarkerY), 0, 1),
      );
      const currentStage = thresholds.reduce((current, threshold, index) => {
        const trigger = index === stages.length - 1 ? 0.82 : threshold;
        return progress >= trigger ? index : current;
      }, 0);

      markers.forEach((marker, index) => {
        const isLast = index === stages.length - 1;
        const reached = isLast
          ? progress >= 0.80
          : progress >= thresholds[index] - 0.002;
        const opened = isLast
          ? progress >= 0.82
          : progress >= thresholds[index] + 0.002;

        marker.classList.toggle("is-reached", reached);
        marker.classList.toggle("is-current", index === currentStage);
        stageElements[index].classList.toggle("is-flipped", opened);
      });
    };

    const measureGeometry = () => {
      const journeyRect = journey.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      markerCenters = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return scroller.scrollTop + rect.top + rect.height / 2 - scrollerRect.top;
      });
      firstMarkerY = markerCenters[0];
      lastMarkerY = markerCenters[markerCenters.length - 1];

      const firstRect = markers[0].getBoundingClientRect();
      const trackTop = firstRect.top + firstRect.height / 2 - journeyRect.top;

      track.style.top = `${trackTop}px`;
      track.style.bottom = "auto";
      track.style.height = `${Math.max(1, lastMarkerY - firstMarkerY)}px`;
      updateProgress();
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    const handleResize = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measureGeometry();
      });
    };

    scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(journey);

    measureGeometry();

    return () => {
      scroller.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollContainerRef]);

  return (
    <section ref={sectionRef} id="timeline" className="genesis-timeline relative w-full overflow-hidden bg-[#030015] text-white pt-24 sm:pt-32 md:pt-40" aria-label="Genesis Event Timeline Roadmap">
      <div className="absolute inset-0 pointer-events-none">
        <img loading="lazy" decoding="async" src="/landing-pages/shared/backgrounds/cosmic-background.webp" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-[#030015]/40" />
      </div>

      {/* Atmospheric Top Gradient Transition to blend smoothly from the About section */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-b from-[#030015] via-[#030015]/90 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <header className="relative z-10 flex justify-center px-4 pt-24 sm:pt-32 md:pt-40">
        <div className="relative flex items-center justify-center">
          <img loading="lazy" decoding="async" src="/landing-pages/timeline/backgrounds/heading-banner.svg" alt="Tournament Timeline" className="h-12 w-auto sm:h-14 md:h-16" />
          <img loading="lazy" decoding="async" src="/landing-pages/timeline/ui/heading-text.svg" alt="TIMELINE" className="absolute h-6 w-auto sm:h-7 md:h-8" />
        </div>
      </header>

      <div ref={journeyRef} className="genesis-timeline-journey relative z-10 mx-auto mt-8 w-full max-w-6xl px-4 pb-12 sm:px-8 sm:pb-24 md:pb-32">
        <div ref={trackRef} className="genesis-timeline-track" data-runtime="golden-journey-v1" aria-hidden="true">
          <div className="genesis-timeline-progress-fill" />
          <div className="genesis-timeline-traveling-light" />
        </div>
        <div className="genesis-timeline-stages">
          {stages.map((stage) => {
            const cardInner = (
              <div className="genesis-timeline-card-inner">
                {/* Back side of card: SVG with exact user design and text */}
                <div className="genesis-timeline-card-back">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={stage.backAsset}
                    alt={`${stage.title} — Details`}
                    draggable={false}
                    className="h-full w-full object-contain pointer-events-none select-none"
                  />
                </div>
                {/* Front side of card: SVG with artwork */}
                <div className="genesis-timeline-card-front">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={stage.asset}
                    alt={`${stage.title} — ${stage.sub}`}
                    draggable={false}
                    className="h-full w-full object-contain pointer-events-none select-none"
                  />
                </div>
              </div>
            );

            return (
              <article
                key={stage.step}
                className={`genesis-timeline-stage genesis-timeline-stage-${stage.side} genesis-timeline-stage-${stage.step}`}
                data-step={stage.step}
              >
                <div className={`genesis-timeline-card genesis-timeline-card-${stage.step}`}>
                  {stage.linkUrl ? (
                    <a
                      href={stage.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
                      title={`${stage.title} — ${stage.sub}`}
                    >
                      {cardInner}
                    </a>
                  ) : (
                    cardInner
                  )}
                </div>
                <div className="genesis-timeline-marker">
                  <img loading="lazy" decoding="async"
                    className="genesis-timeline-marker-art"
                    src={`/landing-pages/timeline/markers/genesis-milestone-${stage.step}.svg`}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
