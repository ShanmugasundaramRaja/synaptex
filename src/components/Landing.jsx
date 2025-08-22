import { Container, Row } from "react-bootstrap";
import What from "./What";
import Nav from "./Nav";
import Footer from "./Footer";
import Certificates from "./Certificates";
import Slider from "./Slider";
import Address from "./Address";
import Orbit from "./Orbit";
import Home from "./Home";
import { useState, useEffect } from "react";
import LandingLoader from "./LandingLoader";

export default function Landing({
  onScrollToSection1,
  onScrollToSection2,
  onScrollToSection3,
  onScrollToSection4,
  section1Ref,
  section3Ref,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("landingLoaderShown");

    if (!loaderShown) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("landingLoaderShown", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <LandingLoader />;
  }

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
          <Home />
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
