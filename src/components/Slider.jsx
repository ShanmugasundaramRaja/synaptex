import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Slider() {
  const [videoSrc, setVideoSrc] = useState(
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/Synaptexsliderhorizontal.mp4"
  );
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down to 50%
    }
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/SliderPortrait.mp4"
          : "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/Synaptexsliderhorizontal.mp4"
      );
    };

    updateVideoSrc(); // Initial check

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked on iOS, muted is required");
      });
    }
  }, [videoSrc]);
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
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
        </Row>
      </Container>
    </>
  );
}
