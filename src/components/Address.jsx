import React, { useRef, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import video from "../assets/Address.mp4";
import videoPortrait from "../assets/Address Portrait.mp4";

export default function Address() {
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

  // Use these buttons in a different place* <button className="button-88 button-buyers">BUYERS</button> <button className="button-88 button-sellers">SELLERS</button>

  return (
    <>
      <Container fluid>
        <Row>
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
