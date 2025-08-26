import React, { useRef, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "../WhatWeDo.css";

export default function What({ section1Ref }) {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/WhatWeDo.mp4"
  );
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.8;

    // Force autoplay programmatically
    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked", err);
      }
    };
    tryPlay();

    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/Home%20(5).mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/WhatWeDo.mp4"
      );
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  return (
    <Container ref={section1Ref} fluid>
      <Row>
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto" // encourage buffering for autoplay
          autoPlay
          muted
          loop
          playsInline
          className="responsive-video"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        />
      </Row>
    </Container>
  );
}
