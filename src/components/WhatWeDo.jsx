import { useState, useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import "../WhatWeDo.css";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from "react-icons/pi";
import { RiRadioButtonFill } from "react-icons/ri";
import Whyloader from "./Whyloader";

export default function Segment1() {
  const navigate = useNavigate();
  const handlehome = () => navigate("/");

  // --- Loader State ---
  const totalAssets = 5; // 1 image + 4 videos
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleAssetLoad = () => setAssetsLoaded((prev) => prev + 1);

  // First-time-only loader using sessionStorage
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("whyLoaderShown");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  // Hide loader when all assets are loaded
  useEffect(() => {
    if (assetsLoaded >= totalAssets) {
      setLoading(false);
      sessionStorage.setItem("whyLoaderShown", "true");
    }
  }, [assetsLoaded]);

  // Safety timeout in case some videos never fire events
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("whyLoaderShown", "true");
    }, 5000); // 5 seconds max
    return () => clearTimeout(timer);
  }, []);

  // --- Carousel state ---
  const [selected, setSelected] = useState(() =>
    window.innerWidth < 1024 ? "one" : "two"
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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Swipe detection
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (!startX || !endX) return;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        const slides = ["one", "two", "three", "four"];
        const idx = slides.indexOf(selected);
        if (diff > 0 && idx < slides.length - 1) setSlide(slides[idx + 1]);
        else if (diff < 0 && idx > 0) setSlide(slides[idx - 1]);
      }
      startX = 0;
      endX = 0;
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selected]);

  if (loading) return <Whyloader />;

  return (
    <>
      <Row>
        {/* hidden radios */}
        <input
          type="radio"
          name="position"
          id="one"
          defaultChecked={selected === "one"}
        />
        <input
          type="radio"
          name="position"
          id="two"
          defaultChecked={selected === "two"}
        />
        <input
          type="radio"
          name="position"
          id="three"
          defaultChecked={selected === "three"}
        />
        <input
          type="radio"
          name="position"
          id="four"
          defaultChecked={selected === "four"}
        />

        {/* title image */}
        <img
          src="https://synaptex.pages.dev/srcassets/WhyUs.png"
          className="WhyUs"
          alt="title"
          onLoad={handleAssetLoad}
        />

        {/* carousel videos */}
        <main id="carousel" ref={carouselRef}>
          {[
            "https://synaptex.pages.dev/Home%20(3).mp4",
            "https://synaptex.pages.dev/Home%20(4).mp4",
            "https://synaptex.pages.dev/srcassets/whyus3.mp4",
            "https://synaptex.pages.dev/srcassets/whyus4.mp4",
          ].map((src, i) => (
            <div
              className={`item item${i + 1}`}
              key={i}
              onClick={() => setSlide(["one", "two", "three", "four"][i])}
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="cardVideo"
                preload="auto"
                onLoadedMetadata={handleAssetLoad}
              />
            </div>
          ))}
        </main>
      </Row>

      {/* page controls */}
      <div className="pages">
        {["one", "two", "three", "four"].map((id, i) => (
          <label
            key={i}
            htmlFor={id}
            onClick={() => setSlide(id)}
            style={{ fontSize: "3rem", color: "beige" }}
          >
            {selected === id ? (
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

        <button className="whyhome" onClick={handlehome}>
          <GoHomeFill size={50} /> HOME
        </button>
      </div>
    </>
  );
}
