import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Home() {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const pickSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      return isPortraitRatio
        ? "https://synaptex.pages.dev/srcassets/Homeportraitcompressed.mp4"
        : "https://synaptex.pages.dev/srcassets/Homecompressed.mp4";
    };

    const updateVideoSrc = () => {
      const next = pickSrc();
      setVideoSrc((prev) => (prev === next ? prev : next));
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc, { passive: true });
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

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
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            preload="metadata" // better for slow networks than "auto"
            autoPlay
            muted
            loop
            playsInline
            style={{ paddingLeft: 0, paddingRight: 0 }}
            className="responsive-video"
          />
        )}
      </Row>
    </Container>
  );
}
