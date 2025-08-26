import React, { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Who() {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/WhoCompressed.mp4"
  );
  const videoRef = useRef(null);

  // Update video source based on viewport aspect ratio
  useEffect(() => {
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/WhoPortraitCompressed.mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/WhoCompressed.mp4"
      );
    };

    updateVideoSrc(); // Initial check
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  // Ensure autoplay, muted, and playbackRate
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.7; // Slow down

    const tryPlay = async () => {
      try {
        video.load();
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked, ensure muted & playsInline", err);
      }
    };

    tryPlay();
  }, [videoSrc]);

  return (
    <Container fluid>
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
        />
      </Row>
    </Container>
  );
}
