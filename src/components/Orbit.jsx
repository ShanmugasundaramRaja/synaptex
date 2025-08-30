import React from "react";
import "../Orbit.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Orbit() {
  const navigate = useNavigate();
  const handlejoinus = () => {
    navigate("/joinus");
  };
  const handlenext = () => {
    navigate("/whatsnext");
  };
  return (
    <Container fluid className="orbitfluid">
      <img
        src="https://synaptex.pages.dev/srcassets/Whatsnext.png"
        className="Whatsnext"
        alt="title"
      />
      <div className="orbitcontainer">
        <div className="orbitcircle">
          <div className="orbit orbit-top">
            <button className="orbitbtn" onClick={handlenext}>
              NEXT CHAPTER
            </button>
          </div>
          <div className="orbit orbit-bottom">
            <button className="orbitbtn" onClick={handlejoinus}>
              JOIN US
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
