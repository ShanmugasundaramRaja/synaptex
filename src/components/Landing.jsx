import { Container, Row } from "react-bootstrap";
import What from "./What";
import Nav from "./Nav";
import Footer from "./Footer";
import Certificates from "./Certificates";
import Slider from "./Slider";
import Address from "./Address";
import Orbit from "./Orbit";

export default function Landing({
  onScrollToSection1,
  onScrollToSection2,
  onScrollToSection3,
  onScrollToSection4,
  section1Ref,

  section3Ref,
}) {
  return (
    <>
      <Container className="landing" fluid>
        <Nav
          onScrollToSection1={onScrollToSection1}
          onScrollToSection2={onScrollToSection2}
          onScrollToSection3={onScrollToSection3}
          onScrollToSection4={onScrollToSection4}
        />
        <Row>
          <img
            src="https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Home.png"
            alt=""
            className="hero-section"
            loading="lazy"
          />
          <img
            src="https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Home%20(1).png"
            className="rotate-layer"
            alt="Rotating Graphic"
            loading="lazy"
          />
        </Row>
      </Container>
      <Container className="landing" fluid>
        <Row>
          <What section1Ref={section1Ref} />
        </Row>

        <Row>
          <Address />
        </Row>
        <Row>
          <Slider />
        </Row>
        <Row>
          <Certificates section3Ref={section3Ref} />
        </Row>
        <Row>
          <Orbit />
        </Row>

        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}
