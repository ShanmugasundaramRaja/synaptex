// Certificates.jsx
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AssetContext } from "./AssetContext";

export default function Certificates({ section3Ref }) {
  const [imageSrc, setImageSrc] = useState(
    "https://synaptex.pages.dev/certland.jpg"
  );
  const { registerAsset, assetLoaded } = useContext(AssetContext);

  useEffect(() => {
    registerAsset();
  }, [registerAsset]);

  useEffect(() => {
    const updateImageSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortrait = height > 1.3 * width;

      setImageSrc(
        isPortrait
          ? "https://synaptex.pages.dev/certport.jpg"
          : "https://synaptex.pages.dev/certland.jpg"
      );
    };

    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
    return () => window.removeEventListener("resize", updateImageSrc);
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <img
            src={imageSrc}
            alt="Certificates"
            className="img-fluid w-100"
            style={{ display: "block" }}
            ref={section3Ref}
            onLoad={assetLoaded}
          />
        </Col>
      </Row>
    </Container>
  );
}
