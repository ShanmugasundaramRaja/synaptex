import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Slider() {
  const [videoSrc, setVideoSrc] = useState(
    "https://synaptex.pages.dev/Untitled%20design%20(1).mp4"
  );
  const videoRef = useRef(null);

  // Update video src based on viewport ratio
  useEffect(() => {
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://synaptex.pages.dev/SliderPortrait.mp4"
          : "https://synaptex.pages.dev/Untitled%20design%20(1).mp4"
      );
    };

    updateVideoSrc(); // Initial check
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  // Ensure autoplay, muted, and playback rate
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
          preload="auto" // preload to improve autoplay success
          autoPlay
          muted
          loop
          playsInline
          style={{ paddingLeft: 0, paddingRight: 0 }}
        />
      </Row>
    </Container>
  );
}
