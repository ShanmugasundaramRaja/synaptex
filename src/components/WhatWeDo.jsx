import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import "../WhatWeDo.css";
import video1 from "../assets/6.mp4";
import video2 from "../assets/8.mp4";
import video3 from "../assets/10.mp4";
import video4 from "../assets/12.mp4";
import WhyUs from "../assets/WhyUs.png";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from "react-icons/pi";
import { RiRadioButtonFill } from "react-icons/ri";

export default function Segment1({ section2Ref }) {
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

        <img src={WhyUs} className="WhyUs" alt="title" />

        <main id="carousel">
          <div className="item">
            <video
              src={video1} // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
            />
          </div>
          <div className="item item2">
            <video
              src={video2} // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
            />
          </div>
          <div className="item item3">
            <video
              src={video3} // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
            />
          </div>
          <div className="item item4">
            <video
              src={video4} // adjust the path as needed
              autoPlay
              muted
              loop
              playsInline
              className="cardVideo"
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
