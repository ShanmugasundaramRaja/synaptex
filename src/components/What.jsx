import React, { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function What({ section1Ref }) {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/WhatWeDo.mp4"
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
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/WhatWeDoPortrait.mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/WhatWeDo.mp4"
      );
    };

    updateVideoSrc(); // Initial check

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  // Use these buttons in a different place* <button className="button-88 button-buyers">BUYERS</button> <button className="button-88 button-sellers">SELLERS</button>

  return (
    <>
      <Container ref={section1Ref} fluid>
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
          />
        </Row>
      </Container>
    </>
  );
}
