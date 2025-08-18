import { Container, Row } from "react-bootstrap";
import myVideo from "../assets/Home (1).png";
import text from "../assets/Home.png";
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
          <img src={text} alt="" className="hero-section" />
          <img src={myVideo} className="rotate-layer" alt="Rotating Graphic" />
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
