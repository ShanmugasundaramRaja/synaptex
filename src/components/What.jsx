// What.jsx
import React, { useRef, useEffect, useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import "../WhatWeDo.css";
import { AssetContext } from "./AssetContext";

export default function What({ section1Ref }) {
  const [videoSrc, setVideoSrc] = useState(
    "https://synaptex.pages.dev/srcassets/WhatWeDo.mp4"
  );
  const videoRef = useRef(null);
  const { registerAsset, assetLoaded } = useContext(AssetContext);

  useEffect(() => {
    registerAsset();
  }, [registerAsset]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.8;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    };

    tryPlay();

    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://synaptex.pages.dev/Home%20(5).mp4"
          : "https://synaptex.pages.dev/srcassets/WhatWeDo.mp4"
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
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          className="responsive-video"
          style={{ paddingLeft: 0, paddingRight: 0 }}
          onCanPlayThrough={assetLoaded}
        />
      </Row>
    </Container>
  );
}
