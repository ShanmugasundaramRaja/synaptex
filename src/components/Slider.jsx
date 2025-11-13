// Slider.jsx
import { useRef, useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AssetContext } from "./AssetContext";

export default function Slider() {
  const [videoSrc, setVideoSrc] = useState(
    "https://synaptex.pages.dev/Untitled%20design%20(1).mp4"
  );
  const videoRef = useRef(null);
  const { registerAsset, assetLoaded } = useContext(AssetContext);

  useEffect(() => {
    registerAsset();
  }, [registerAsset]);

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

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

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
          onCanPlayThrough={assetLoaded}
        />
      </Row>
    </Container>
  );
}
