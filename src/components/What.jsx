import React, { useRef, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "../WhatWeDo.css";

export default function What({ section1Ref }) {
  // Avoid an initial "wrong" fetch by starting null and picking immediately
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  // SEO text (invisible but indexable)
  const seoText = `
Synaptex delivers end-to-end textile sourcing and supply chain support, offering structured, reliable, and transparent services for global buyers and manufacturers.

- Buyer–Seller Matchmaking: strategic identification and onboarding of verified partners across home textiles, apparel, performance wear, and infant categories.
- Buyer Profiling & Requirement Analysis: product specifications, target pricing, quality benchmarks, compliance standards, volumes, and delivery timelines.
- Product Development Coordination: woven and knit development support, materials, trims, and construction guidance.
- Sample Development Management: sampling, revisions, approvals, and cost optimization.
- Commercial Terms Negotiation: pricing, MOQs, payment terms, lead times, and contract clarity.
- Production Timeline Management: order tracking, milestone monitoring, and issue resolution.
- Compliance & Quality Control: factory compliance, audits, quality standards, and pre-shipment checks.
- Freight & Logistics Recommendations: routing, transit timelines, and cost efficiency.*
- Cargo Insurance Guidance: shipment risk mitigation.*
- Shipping Documentation Support: export documentation, invoices, packing lists, and regulatory paperwork.*
- Post-Sales Support & Feedback Management: after-delivery coordination, issue resolution, and continuous supplier improvement.

From fiber to finished product, Synaptex simplifies global textile sourcing through precision, accountability, and long-term partnership building.
*Services offered as advisory support.
  `.trim();

  useEffect(() => {
    const pickSrc = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isPortraitRatio = height > 1.3 * width;

      return isPortraitRatio
        ? "https://synaptex.pages.dev/Home%20(5).mp4"
        : "https://synaptex.pages.dev/srcassets/WhatWeDo.mp4";
    };

    const updateVideoSrc = () => {
      const next = pickSrc();
      setVideoSrc((prev) => (prev === next ? prev : next));
    };

    updateVideoSrc(); // choose once ASAP (prevents wasted fetch)
    window.addEventListener("resize", updateVideoSrc, { passive: true });
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    video.playbackRate = 0.8;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    };

    tryPlay();
  }, [videoSrc]);

  return (
    <Container ref={section1Ref} fluid>
      <Row>
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            preload="metadata" // faster-start + avoids over-fetching on slow networks vs "auto"
            autoPlay
            muted
            loop
            playsInline
            fetchpriority="high"
            className="responsive-video"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
        )}

        {/* Invisible, indexable SEO text */}
        <section className="visually-hidden">
          <h2>What we do</h2>
          <p>{seoText}</p>
        </section>
      </Row>
    </Container>
  );
}
