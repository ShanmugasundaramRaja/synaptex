import React, { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Address() {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Address.mp4"
  );
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down to 50%
    }
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 2 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Address%20Portrait.mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Address.mp4"
      );
    };

    updateVideoSrc(); // Initial check

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  // Use these buttons in a different place* <button className="button-88 button-buyers">BUYERS</button> <button className="button-88 button-sellers">SELLERS</button>

  return (
    <>
      <Container fluid>
        <Row>
          <video
            preload="none"
            ref={videoRef}
            src={videoSrc} // adjust the path as needed
            autoPlay
            muted
            loop
            playsInline
            className="responsive-video "
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
        </Row>
      </Container>
    </>
  );
}
