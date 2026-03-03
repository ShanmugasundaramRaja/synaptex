import { useState, useEffect, useRef, useMemo } from "react";
import { Row } from "react-bootstrap";
import "../WhatWeDo.css";

import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from "react-icons/pi";
import { RiRadioButtonFill } from "react-icons/ri";

export default function Segment1({ section2Ref }) {
  const slides = useMemo(
    () => [
      { id: "one", src: "https://synaptex.pages.dev/Home%20(3).mp4" },
      { id: "two", src: "https://synaptex.pages.dev/Home%20(4).mp4" },
      { id: "three", src: "https://synaptex.pages.dev/srcassets/whyus3.mp4" },
      { id: "four", src: "https://synaptex.pages.dev/srcassets/whyus4.mp4" },
    ],
    [],
  );

  // Loader (keep yours, but we’ll count “ready to play” events)
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("segment1Loaded");
  });
  const loadedAssets = useRef(0);

  const handleAssetLoad = () => {
    loadedAssets.current += 1;
    if (loadedAssets.current >= 5) {
      setLoading(false);
      sessionStorage.setItem("segment1Loaded", "true");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("segment1Loaded", "true");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Default selected slide
  const [selected, setSelected] = useState(() =>
    window.innerWidth < 1024 ? "one" : "two",
  );

  const setSlide = (pos) => {
    setSelected(pos);
    const input = document.getElementById(pos);
    if (input) input.checked = true;
  };

  useEffect(() => {
    const handleResize = () => {
      setSlide(window.innerWidth < 1024 ? "one" : "two");
    };
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Swipe detection (unchanged)
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => (startX = e.touches[0].clientX);
    const handleTouchMove = (e) => (endX = e.touches[0].clientX);
    const handleTouchEnd = () => {
      if (!startX || !endX) return;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        const ids = slides.map((s) => s.id);
        const idx = ids.indexOf(selected);
        if (diff > 0 && idx < ids.length - 1) setSlide(ids[idx + 1]);
        else if (diff < 0 && idx > 0) setSlide(ids[idx - 1]);
      }
      startX = 0;
      endX = 0;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selected, slides]);

  // Keep refs to kick off playback
  const videoRefs = useRef({});

  // Ensure autoplay + playbackRate for all (but stage the load priority)
  useEffect(() => {
    const ids = slides.map((s) => s.id);

    // Play the selected one immediately
    const primary = videoRefs.current[selected];
    if (primary) {
      primary.playbackRate = 0.8;
      primary.play().catch(() => {});
    }

    // Nudge the other three to start right after first paint,
    // so the primary gets first dibs on bandwidth/TTFB.
    const rest = ids.filter((id) => id !== selected);
    const t = requestAnimationFrame(() => {
      rest.forEach((id) => {
        const v = videoRefs.current[id];
        if (!v) return;
        v.playbackRate = 0.8;
        v.play().catch(() => {});
      });
    });

    return () => cancelAnimationFrame(t);
  }, [selected, slides]);

  if (loading) return <Whyloader />;

  const seoText = `
We operate both globally and locally, with embedded networks and on-ground partnerships across India and Europe. This presence gives us mobility, speed, and direct access—supporting end-to-end execution from sourcing and development to compliance, quality, and delivery. We offer premium textile products without premium costs by combining trusted supplier relationships, efficient coordination, and competitive pricing to deliver consistent value.
  `.trim();

  return (
    <>
      <Row ref={section2Ref}>
        {/* hidden radios */}
        {slides.map((s) => (
          <input
            key={s.id}
            type="radio"
            name="position"
            id={s.id}
            defaultChecked={selected === s.id}
          />
        ))}

        {/* title image */}
        <img
          src="https://synaptex.pages.dev/srcassets/WhyUs.png"
          className="WhyUs"
          alt="Why Synaptex"
          decoding="async"
          fetchpriority="high"
          onLoad={handleAssetLoad}
        />

        {/* carousel videos */}
        <main id="carousel" ref={carouselRef}>
          {slides.map((s, i) => {
            const isPrimary = s.id === selected;

            return (
              <div
                className={`item item${i + 1}`}
                key={s.id}
                onClick={() => setSlide(s.id)}
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[s.id] = el;
                  }}
                  src={s.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="cardVideo"
                  // Priority strategy: one aggressive, others light
                  preload={isPrimary ? "auto" : "metadata"}
                  fetchpriority={isPrimary ? "high" : "low"}
                  onCanPlayThrough={handleAssetLoad}
                />
              </div>
            );
          })}
        </main>

        {/* Invisible, indexable SEO text */}
        <section className="visually-hidden">
          <h2>Global and local textile sourcing</h2>
          <p>{seoText}</p>
        </section>
      </Row>

      {/* page controls */}
      <div className="pages">
        {slides.map((s, i) => (
          <label
            key={s.id}
            htmlFor={s.id}
            onClick={() => setSlide(s.id)}
            style={{ fontSize: "3rem", color: "beige" }}
          >
            {selected === s.id ? (
              <RiRadioButtonFill />
            ) : (
              [
                PiNumberCircleOneFill,
                PiNumberCircleTwoFill,
                PiNumberCircleThreeFill,
                PiNumberCircleFourFill,
              ][i]()
            )}
          </label>
        ))}
      </div>
    </>
  );
}
