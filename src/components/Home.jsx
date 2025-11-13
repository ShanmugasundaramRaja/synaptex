import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Home() {
  const [videoSrc, setVideoSrc] = useState(
    "https://synaptex.pages.dev/srcassets/Home.mp4"
  );
  const videoRef = useRef(null);

  // Update video source based on viewport aspect ratio
  useEffect(() => {
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://synaptex.pages.dev/srcassets/Homeportraitcompressed.mp4"
          : "https://synaptex.pages.dev/srcassets/Homecompressed.mp4"
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

    video.playbackRate = 0.8;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked:", err);
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
          style={{ paddingLeft: 0, paddingRight: 0 }}
          className="responsive-video"
        />
      </Row>
    </Container>
  );
}
