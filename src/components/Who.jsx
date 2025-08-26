import React, { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Who() {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/Who.mp4"
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Slow down
    }

    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/WhoPortrait.mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/Who.mp4"
      );
    };

    updateVideoSrc(); // Initial check
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <video
          preload="none"
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onClick={handleVideoClick}
          className="responsive-video"
          style={{ paddingLeft: 0, paddingRight: 0, cursor: "pointer" }}
        />
      </Row>
    </Container>
  );
}
