import { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Home() {
  const [videoSrc, setVideoSrc] = useState("/newsassets/img/Home.mp4");

  useEffect(() => {
    const updateVideoSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      setVideoSrc(
        isPortraitRatio
          ? "/newsassets/img/Homeportrait.mp4"
          : "/newsassets/img/Home.mp4"
      );
    };

    updateVideoSrc(); // Initial check

    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <video
            preload="none"
            src={videoSrc} // adjust the path as needed
            autoPlay
            muted
            loop
            playsInline
            className="responsive-video "
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
        </Row>
      </Container>
    </>
  );
}
