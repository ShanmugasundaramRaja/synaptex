import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Address() {
  const portrait = "https://synaptex.pages.dev/Newdressport.jpg";
  const landscape = "https://synaptex.pages.dev/Newdressland.jpg";

  const seoText = `
From home textiles to fashion essentials, Synaptex delivers a unified, intelligent sourcing solution that simplifies global procurement without compromising quality, integrity, transparency, or accountability. Our portfolio spans bed linens, bath textiles, upholstery fabrics, curtains, rugs, and soft furnishings, as well as woven and knit apparel, fashion basics, performance wear, athleisure, workwear, and infant apparel.

At the core of our operations lies intelligent textile sourcing and strategic matchmaking, connecting reliable manufacturers with international buyers seeking consistency, scalability, and ethical production. As part of our full-spectrum sourcing approach, Synaptex also selectively imports curated textile products, enabling greater flexibility across diverse sourcing models.

This hybrid capability allows us to navigate complex supply chains, adapt to shifting market dynamics, balance multiple supplier capabilities, streamline production and delivery timelines, and meet evolving customer expectations across B2B textile sourcing, private label development, and wholesale supply.

Whether you are a buyer seeking dependable textile partners, certified materials, and consistent quality, or a supplier aiming to access the right global markets, Synaptex brings both sides together with precision, purpose, and trust.

From fiber to finished product, Synaptex unites the entire textile ecosystem — woven and knit, natural and synthetic, handcrafted and industrial — under one refined umbrella, delivering end-to-end textile sourcing solutions with seamless sophistication for global trade.
  `.trim();

  return (
    <Container fluid>
      <Row>
        {/* Fastest fetch pattern: browser chooses correct source (no JS resize, no wasted requests) */}
        <picture>
          <source srcSet={portrait} media="(max-aspect-ratio: 10/13)" />
          <img
            src={landscape}
            alt="Synaptex address section"
            decoding="async"
            fetchpriority="high"
            width="1600"
            height="900"
            style={{
              width: "100%",
              height: "auto",
              paddingLeft: 0,
              paddingRight: 0,
              display: "block",
            }}
          />
        </picture>

        {/* Hidden SEO text (indexable HTML) */}
        <section className="visually-hidden">
          <h2>Textile sourcing and supply</h2>
          <p>{seoText}</p>
        </section>
      </Row>
    </Container>
  );
}
