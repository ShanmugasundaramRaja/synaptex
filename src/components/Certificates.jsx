import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import video from "../assets/Certificates.mp4";
import videoPortrait from "../assets/CertificatesPortrait.mp4";

export default function Certificates({ section3Ref }) {
  const [videoSrc, setVideoSrc] = useState(video);
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down to 50%
    }
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 2 * width;

      setVideoSrc(isPortraitRatio ? videoPortrait : video);
    };

    updateVideoSrc(); // Initial check

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);
  return (
    <>
      <Container fluid>
        <Row ref={section3Ref}>
          <video
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
