import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Certificates({ section3Ref }) {
  const portrait =
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/certport.png";
  const landscape =
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/certland.png";

  // Invisible, indexable SEO text (keep it accurate to what you actually support/display)
  const seoText = `
Textile certifications, standards, and audits supported across our sourcing and supply chain network may include:

- OEKO-TEX® STANDARD 100 (tested for harmful substances)
- OEKO-TEX® STeP (sustainable textile production)
- GOTS (Global Organic Textile Standard)
- OCS (Organic Content Standard)
- GRS (Global Recycled Standard)
- RCS (Recycled Claim Standard)
- Better Cotton / BCI (Better Cotton Initiative)
- amfori BSCI (social compliance)
- amfori BEPI (environmental performance)
- Sedex / SMETA audits (ethical trade and responsible sourcing)
- WRAP (ethical manufacturing for apparel)
- SA8000 (social accountability)
- ISO 9001 (quality management)
- ISO 14001 (environmental management)
- ISO 45001 (occupational health & safety)
- REACH compliance (EU chemical requirements)
- ZDHC (chemical management / wastewater guidelines)
- FSC® certification (for paper-based packaging where applicable)

Compliance and certification availability depends on product category, mill/factory, and buyer requirements; documentation and audit reports are typically provided upon request.
  `.trim();

  return (
    <Container fluid ref={section3Ref}>
      <Row>
        <Col>
          {/* Fastest fetch pattern: browser chooses correct image source without JS + avoids wasted requests */}
          <picture>
            <source srcSet={portrait} media="(max-aspect-ratio: 10/13)" />
            <img
              src={landscape}
              alt="Textile certifications and compliance: OEKO-TEX, GOTS, GRS, BCI/Better Cotton, amfori BSCI, Sedex/SMETA and related standards."
              className="img-fluid w-100"
              style={{ display: "block" }}
              decoding="async"
              // If this section is above the fold, keep high priority; otherwise swap to loading="lazy"
              loading="lazy"
              width="1600"
              height="900"
            />
          </picture>

          {/* Invisible, indexable SEO text */}
          <section className="visually-hidden">
            <h2>Textile certifications and audits</h2>
            <p>{seoText}</p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
