import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Who() {
  const portrait =
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/SYNAPTEX%20(3)(1).png";
  const landscape =
    "https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/SYNAPTEX%20(1)(1).png";

  const heading = "Who we are";

  const copy = `
  Synaptex connects textile makers with global markets, ensuring exceptional textiles are never lost in the noise of international trade.
  Headquartered in Germany and active across Europe, we combine regional expertise with strategic sourcing to meet evolving market demands.
  We fill a gap: handcrafted textiles often lack global visibility, while buyers seek reliable partners.
  Synaptex acts as a seamless bridge, linking craftsmanship with commerce, local excellence with global demand.
  From home textiles to fashion basics, performance wear, and infant apparel, we simplify sourcing without compromising quality, integrity, or accountability.
  Beyond matchmaking, we occasionally import select textiles, giving us flexibility to manage supply chains, adjust to market shifts, and meet client expectations efficiently.
  Whether you are a buyer seeking consistency or a supplier seeking the right markets, Synaptex unites both sides with precision and trust, delivering end-to-end solutions from fiber to finished product.
  `.trim();

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <picture>
            <source srcSet={portrait} media="(max-aspect-ratio: 10/13)" />
            <img
              src={landscape}
              alt="Who we are — Synaptex connects textile makers with global markets."
              className="img-fluid w-100"
              style={{ display: "block" }}
              decoding="async"
              fetchpriority="high"
              width="1600"
              height="900"
            />
          </picture>

          {/* SEO content: real text, but still visually minimal */}
          <section className="visually-hidden">
            <h2>{heading}</h2>
            <p>{copy}</p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
