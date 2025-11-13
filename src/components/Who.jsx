import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Who() {
  const [imageSrc, setImageSrc] = useState(
    "https://synaptex.pages.dev/wholand.jpg"
  );

  // Update image source based on viewport aspect ratio
  useEffect(() => {
    const updateImageSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortrait = height > 1.3 * width;

      setImageSrc(
        isPortrait
          ? "https://synaptex.pages.dev/whopor.jpg"
          : "https://synaptex.pages.dev/wholand.jpg"
      );
    };

    updateImageSrc(); // Initial check
    window.addEventListener("resize", updateImageSrc);
    return () => window.removeEventListener("resize", updateImageSrc);
  }, []);

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <img
            src={imageSrc}
            alt="Who Row 1"
            className="img-fluid w-100"
            style={{ display: "block" }}
          />
        </Col>
      </Row>
    </Container>
  );
}
