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
  const [loading, setLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("whyLoaderShown");
    return hasLoaded ? false : true;
  });

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("whyLoaderShown", "true");
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  // current selected slide
  const [selected, setSelected] = useState(() => {
    return window.innerWidth < 1024 ? "one" : "two";
  });

  const navigate = useNavigate();
  const handlehome = () => navigate("/");

  // ✅ helper to sync React + radio input
  const setSlide = (pos) => {
    setSelected(pos);
    const input = document.getElementById(pos);
    if (input) input.checked = true;
  };

  // ✅ resize listener to reset default slide
  useEffect(() => {
    const handleResize = () => {
      setSlide(window.innerWidth < 1024 ? "one" : "two");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ swipe detection
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

      // threshold to avoid tiny movements
      if (Math.abs(diff) > 50) {
        const slides = ["one", "two", "three", "four"];
        const idx = slides.indexOf(selected);

        if (diff > 0 && idx < slides.length - 1) {
          // swipe left → next
          setSlide(slides[idx + 1]);
        } else if (diff < 0 && idx > 0) {
          // swipe right → prev
          setSlide(slides[idx - 1]);
        }
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

  if (loading) {
    return <Whyloader />;
  }

  return (
    <>
      <Row>
        {/* hidden radios that CSS carousel listens to */}
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

        <img
          src="https://synaptex.pages.dev/srcassets/WhyUs.png"
          className="WhyUs"
          alt="title"
          loading="lazy"
        />

        {/* carousel */}
        <main id="carousel" ref={carouselRef}>
          <div className="item" onClick={() => setSlide("one")}>
            <video
              src="https://synaptex.pages.dev/Home%20(3).mp4"
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item2" onClick={() => setSlide("two")}>
            <video
              src="https://synaptex.pages.dev/Home%20(4).mp4"
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item3" onClick={() => setSlide("three")}>
            <video
              src="https://synaptex.pages.dev/srcassets/whyus3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item4" onClick={() => setSlide("four")}>
            <video
              src="https://synaptex.pages.dev/srcassets/whyus4.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
        </main>
      </Row>

      {/* page controls */}
      <div className="pages">
        <label
          htmlFor="one"
          onClick={() => setSlide("one")}
          style={{ fontSize: "3rem", color: "beige" }}
        >
          {selected === "one" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleOneFill />
          )}
        </label>

        <label
          htmlFor="two"
          onClick={() => setSlide("two")}
          style={{ fontSize: "3rem", color: "beige" }}
        >
          {selected === "two" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleTwoFill />
          )}
        </label>

        <label
          htmlFor="three"
          onClick={() => setSlide("three")}
          style={{ fontSize: "3rem", color: "beige" }}
        >
          {selected === "three" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleThreeFill />
          )}
        </label>

        <label
          htmlFor="four"
          onClick={() => setSlide("four")}
          style={{ fontSize: "3rem", color: "beige" }}
        >
          {selected === "four" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleFourFill />
          )}
        </label>

        <button className="whyhome" onClick={handlehome}>
          <GoHomeFill size={50} /> HOME
        </button>
      </div>
    </>
  );
}
