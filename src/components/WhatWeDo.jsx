import { useState, useEffect } from "react";
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
    // Check if the loader has already been shown in this session
    const hasLoaded = sessionStorage.getItem("whyLoaderShown");
    return hasLoaded ? false : true;
  });

  useEffect(() => {
    if (!loading) return; // Loader already shown, skip

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("whyLoaderShown", "true"); // Save loader shown state
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);
  const [selected, setSelected] = useState(() => {
    // Use window.matchMedia to determine initial value
    return window.innerWidth < 1024 ? "one" : "two";
  });
  const navigate = useNavigate();
  const handlehome = () => {
    navigate("/");
  };
  useEffect(() => {
    const handleResize = () => {
      setSelected(window.innerWidth < 1024 ? "one" : "two");
    };

    window.addEventListener("resize", handleResize);

    // Optional: Run once on mount to sync state if screen size changed before effect ran
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <Whyloader />;
  }

  return (
    <>
      <Row>
        <input
          type="radio"
          name="position"
          id="one"
          checked={selected === "one"}
        />

        <input
          type="radio"
          name="position"
          id="two"
          checked={selected === "two"}
        />
        <input
          type="radio"
          name="position"
          id="three"
          checked={selected === "three"}
        />
        <input
          type="radio"
          name="position"
          id="four"
          checked={selected === "four"}
        />

        <img
          src="https://synaptex.pages.dev/srcassets/WhyUs.png"
          className="WhyUs"
          alt="title"
          loading="lazy"
        />

        <main id="carousel">
          <div className="item">
            <video
              src="https://synaptex.pages.dev/Home%20(3).mp4" // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item2">
            <video
              src="https://synaptex.pages.dev/Home%20(4).mp4" // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item3">
            <video
              src="https://synaptex.pages.dev/srcassets/whyus3.mp4" // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
              preload="auto"
            />
          </div>
          <div className="item item4">
            <video
              src="https://synaptex.pages.dev/srcassets/whyus4.mp4" // adjust the path as needed
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
      <div className="pages">
        <label
          htmlFor="one"
          onClick={() => setSelected("one")}
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
          style={{ fontSize: "3rem", color: "beige" }}
          onClick={() => setSelected("two")}
        >
          {selected === "two" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleTwoFill />
          )}
        </label>
        <label
          htmlFor="three"
          style={{ fontSize: "3rem", color: "beige" }}
          onClick={() => setSelected("three")}
        >
          {selected === "three" ? (
            <RiRadioButtonFill />
          ) : (
            <PiNumberCircleThreeFill />
          )}
        </label>
        <label
          htmlFor="four"
          style={{ fontSize: "3rem", color: "beige" }}
          onClick={() => setSelected("four")}
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
