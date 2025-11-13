import { Container, Row } from "react-bootstrap";
import What from "./What";
import Nav from "./Nav";
import Footer from "./Footer";
import Certificates from "./Certificates";
import Slider from "./Slider";
import Address from "./Address";
import Orbit from "./Orbit";
import Home from "./Home";
import { useState, useEffect, useContext } from "react";
import LandingLoader from "./LandingLoader";
import Who from "./Who";
import { AssetContext } from "./AssetContext";

export default function Landing({
  onScrollToSection1,
  onScrollToSection2,
  onScrollToSection3,
  onScrollToSection4,
  section1Ref,
  section3Ref,
}) {
  const [loading, setLoading] = useState(true);
  const [homeReady, setHomeReady] = useState(false);
  const { loadedAssets, totalAssets, resetAssets } = useContext(AssetContext);

  useEffect(() => {
    resetAssets();
  }, [resetAssets]);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("landingLoaderShown");

    if (!loaderShown) {
      setLoading(true);
    } else {
      setLoading(false);
      setHomeReady(true);
    }
  }, []);

  useEffect(() => {
    if (totalAssets > 0 && loadedAssets === totalAssets) {
      setLoading(false);
      sessionStorage.setItem("landingLoaderShown", "true");
    }
  }, [loadedAssets, totalAssets]);

  const handleHomeReady = () => {
    setHomeReady(true);
  };

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
          <Home onReady={handleHomeReady} />
        </Row>
      </Container>

      <Container
        className="landing"
        fluid
        style={{ visibility: homeReady ? "visible" : "hidden" }}
      >
        <Row>
          <Who />
        </Row>
        <Row>
          <What section1Ref={section1Ref} />
        </Row>
        <Row>
          <Certificates section3Ref={section3Ref} />
        </Row>
        <Row>
          <Address />
        </Row>
        <Row>
          <Slider />
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
