// Address.jsx
import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AssetContext } from "./AssetContext";

export default function Address() {
  const [imageSrc, setImageSrc] = useState(
    "https://synaptex.pages.dev/Newdressland.jpg"
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
          ? "https://synaptex.pages.dev/Newdressport.jpg"
          : "https://synaptex.pages.dev/Newdressland.jpg"
      );
    };

    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
    return () => window.removeEventListener("resize", updateImageSrc);
  }, []);

  return (
    <Container fluid>
      <Row>
        <img
          src={imageSrc}
          alt="Address"
          style={{
            width: "100%",
            height: "auto",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          onLoad={assetLoaded}
        />
      </Row>
    </Container>
  );
}
