import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Address() {
  const [imageSrc, setImageSrc] = useState(
    "https://synaptex.pages.dev/addressland.jpg"
  );

  // Update image source based on viewport aspect ratio
  useEffect(() => {
    const updateImageSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortrait = height > 1.3 * width;

      setImageSrc(
        isPortrait
          ? "https://synaptex.pages.dev/addressportrait.jpg"
          : "https://synaptex.pages.dev/addressland.jpg"
      );
    };

    updateImageSrc(); // Initial check
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
        />
      </Row>
    </Container>
  );
}
