import { Container, Row } from "react-bootstrap";
import What from "./What";
import Nav from "./Nav";
import Footer from "./Footer";
import Certificates from "./Certificates";
import Slider from "./Slider";
import Address from "./Address";
import { Helmet } from "@dr.pogodin/react-helmet";
import Home from "./Home";
import { useState, useEffect } from "react";
import LandingLoader from "./LandingLoader";
import Who from "./Who";
import Segment1 from "./WhatWeDo";

export default function Landing({
  onScrollToSection1,
  onScrollToSection2,
  onScrollToSection3,
  onScrollToSection4,
  section1Ref,
  section2Ref,
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
      <Helmet>
        <title>Synaptex | Textile Sourcing Solutions</title>

        <link rel="canonical" href="https://synaptexglobal.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://synaptexglobal.com/" />
        <meta
          property="og:title"
          content="Synaptex | Textile Sourcing Solutions"
        />
        <meta
          property="og:description"
          content="Synaptex connects global brands with trusted textile manufacturers. Sustainable fabric sourcing, quality control, and supply chain management."
        />
        <meta
          name="description"
          content="Synaptex connects global brands with trusted textile manufacturers in India and Europe. Sustainable fabric sourcing, quality control, and supply chain management."
        />
        <meta
          property="og:image"
          content="https://synaptexglobal.com/og-image.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Synaptex",
              url: "https://synaptexglobal.com",
              logo: "https://synaptexglobal.com/og-image.jpg",
              description:
                "Synaptex connects textile makers with global markets. Headquartered in Germany and active across Europe, we combine regional expertise with strategic sourcing to meet evolving market demands.",
              email: "info@synaptexglobal.com",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Heidelberg",
                  postalCode: "69123",
                  addressCountry: "DE",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Tiruchengode",
                  postalCode: "637211",
                  addressCountry: "IN",
                },
              ],
              sameAs: [
                "https://www.instagram.com/synaptex_global?igsh=M2RjZmwzdWFzbWEx&utm_source=qr",
                "https://www.linkedin.com/company/108337837/admin/page-posts/published/",
              ],
              areaServed: "Worldwide",
              knowsAbout: [
                "Textile Sourcing",
                "Supply Chain Management",
                "Sustainable Textiles",
                "Apparel Manufacturing",
                "Home Textiles",
              ],
            }),
          }}
        />
      </Helmet>
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
          <Who />
        </Row>
        <Row>
          <What section1Ref={section1Ref} />
        </Row>
        <Row>
          <Segment1 section2Ref={section2Ref} />
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
          <Footer />
        </Row>
      </Container>
    </>
  );
}
