import React, { useEffect } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import "../AboutUs.css";

export default function AboutUs() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (cancelled) return;

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const MorphSVGPlugin = window.MorphSVGPlugin;

      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);
      if (MorphSVGPlugin) gsap.registerPlugin(MorphSVGPlugin);

      // Loader logic
      const loaderShown = sessionStorage.getItem("aboutusLoaderShown");
      if (!loaderShown) {
        const loaderContent = document.getElementById("loaderContent");
        const loaderContainer = document.getElementById("loaderContainer");

        if (loaderContent && loaderContainer) {
          loaderContent.innerHTML = "";
          for (let gridIndex = 1; gridIndex <= 4; gridIndex++) {
            const gridDiv = document.createElement("div");
            gridDiv.className = "grid-big";
            for (let i = 0; i < 25; i++) {
              const cellDiv = document.createElement("div");
              cellDiv.className = `cell-${gridIndex}`;
              gridDiv.appendChild(cellDiv);
            }
            loaderContent.appendChild(gridDiv);
          }
          loaderContainer.style.display = "flex";
          setTimeout(() => {
            sessionStorage.setItem("aboutusLoaderShown", "true");
            loaderContainer.style.display = "none";
          }, 4000);
        }
      }

      // GSAP Animations
      const svg1TL = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip1 .clip__inner",
          scrub: 2,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });
      svg1TL.fromTo("#svg1 video, #svg1 img", { y: "30%" }, { y: 0 }, 0);
      svg1TL.to(
        "#svg__star",
        { morphSVG: { shape: "#svg__rec", origin: "50% 50%" }, ease: "none" },
        0,
      );
      svg1TL.fromTo(
        "#svg1",
        { width: () => (window.innerWidth < 600 ? 200 : 200) },
        {
          width: () =>
            window.innerWidth < window.innerHeight ? "100vh" : "100vw",
          ease: "none",
        },
        0,
      );

      gsap.set("#svg2", { y: "100vh" });
      gsap.to("#svg2", {
        y: 0,
        x: 0,
        scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: () => window.innerHeight * 2 + " bottom",
          end: () => window.innerHeight * 3 + " bottom",
        },
        ease: "none",
      });

      const svg2TL = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          scrub: 2,
          start: () => window.innerHeight * 3 + " bottom",
          end: () => window.innerHeight * 4 + " bottom",
          invalidateOnRefresh: true,
        },
      });
      svg2TL.fromTo("#svg2 video, #svg2 img", { y: "30%" }, { y: 0 }, 0);
      svg2TL.to(
        "#svg__star2",
        { morphSVG: { shape: "#svg__rec2", origin: "50% 50%" } },
        0,
      );
      svg2TL.fromTo(
        "#svg2",
        { width: () => (window.innerWidth < 800 ? 200 : 300) },
        {
          width: () =>
            window.innerWidth < window.innerHeight ? "100vh" : "100vw",
          ease: "none",
        },
        0,
      );

      gsap.set("#svg3", { y: "100vh" });
      gsap.to("#svg3", {
        y: 0,
        x: 0,
        scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: () => window.innerHeight * 4 + " bottom",
          end: () => window.innerHeight * 5 + " bottom",
          invalidateOnRefresh: true,
        },
        ease: "none",
      });

      const svg3TL = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          scrub: 2,
          start: () => window.innerHeight * 5 + " bottom",
          end: () => window.innerHeight * 6 + " bottom",
          invalidateOnRefresh: true,
        },
      });
      svg3TL.fromTo("#svg3 video, #svg3 img", { y: "30%" }, { y: 0 }, 0);
      svg3TL.to(
        "#svg__star3",
        { morphSVG: { shape: "#svg__rec3", origin: "50% 50%" } },
        0,
      );
      svg3TL.fromTo(
        "#svg3",
        { width: () => (window.innerWidth < 800 ? 200 : 300) },
        {
          width: () =>
            window.innerWidth < window.innerHeight ? "100vh" : "100vw",
          ease: "none",
        },
        0,
      );
    };

    run().catch(console.error);

    return () => {
      cancelled = true;
      try {
        if (window.ScrollTrigger?.getAll) {
          window.ScrollTrigger.getAll().forEach((t) => t.kill());
        }
      } catch {}
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Synaptex Textile Sourcing</title>
        <meta
          name="description"
          content="Learn about Synaptex — our mission, team, and commitment to ethical and sustainable textile sourcing across global supply chains."
        />
        <link rel="canonical" href="https://synaptexglobal.com/aboutus" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://synaptexglobal.com/aboutus" />
        <meta
          property="og:title"
          content="About Us | Synaptex Textile Sourcing"
        />
        <meta
          property="og:description"
          content="Learn about Synaptex — our mission, team, and commitment to ethical and sustainable textile sourcing across global supply chains."
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
              "@type": "AboutPage",
              name: "About Synaptex",
              url: "https://synaptexglobal.com/aboutus",
              description:
                "Connecting textile makers with global markets through precision, accountability, and long-term partnership building.",
              publisher: {
                "@type": "Organization",
                name: "Synaptex",
                url: "https://synaptexglobal.com",
              },
            }),
          }}
        />
      </Helmet>

      <div
        id="loaderContainer"
        className="Aboutusloader"
        style={{ display: "none" }}
      >
        <div className="Aboutuscontainer" id="loaderContent"></div>
      </div>

      <div className="app">
        <main className="flex__col">
          <nav className="menu flex">
            <a href="/" className="menu__left">
              <img
                src="https://synaptex.pages.dev/Home%20(3240%20x%201080%20px).png"
                alt="Synaptex logo"
                className="logo"
              />
            </a>
            <ul className="menu__right flex">
              <li>
                <a className="home" href="/">
                  HOME
                </a>
              </li>
            </ul>
          </nav>

          <section className="clip" id="clip1">
            <div className="clip__inner flex__col">
              <h1 className="flex firsthead">Introduction</h1>
              <div className="clip__cols flex"></div>
            </div>
          </section>

          <section className="clip__scroll flex__col" id="clip1__scroll">
            <h2>Dream</h2>
            <div className="clip__cols flex">
              <p>
                Our vision is to bring exceptional, handcrafted textiles to the
                world stage while supporting buyers with reliable, innovative,
                and seamless sourcing solutions.
              </p>
              <p>
                We aim to connect excellence at the source with demand at scale,
                fostering lasting partnerships built on trust, integrity, and
                expertise.
              </p>
            </div>
          </section>

          <section className="clip__scroll flex__col" id="clip2__scroll">
            <h2>Organization</h2>
            <div className="clip__cols flex">
              <p>
                Led by Shanmugasundaram Raja, who brings decades of experience
                in grey fabric manufacturing, Synaptex is headquartered in
                Germany and operates across Europe.
              </p>
              <p>
                Our mission is to be the intelligent bridge connecting local
                textile craftsmanship with global demand, creating seamless
                partnerships between buyers and suppliers.
              </p>
            </div>
          </section>

          <section className="clip__scroll flex__col" id="clip3__scroll">
            <h2>Framework</h2>
            <div className="clip__cols flex">
              <p>
                Synaptex operates on the principles of precision, purpose,
                trust, and flexibility. We streamline sourcing, delivery, and
                supplier management while connecting craftsmanship with commerce
                in meaningful ways.
              </p>
              <p>
                By leveraging regional knowledge in Europe and India, we
                maximize efficiency and market access, ensuring that excellence
                at the source meets demand at scale.
              </p>
            </div>
          </section>

          <section className="clip__scroll flex__col" id="clip4__scroll">
            <h2>Functions</h2>
            <div className="clip__cols flex">
              <p className="last">
                Acting as a seamless extension of both buyer and supplier teams,
                we ensure consistency, authenticity, and quality from fiber to
                finished product, covering woven and knit textiles under a
                unified solution.
              </p>
              <p className="last">
                Synaptex specializes in intelligent sourcing, matching skilled
                manufacturers with discerning international buyers. As a
                full-spectrum textile solutions partner, we cover everything
                from home textiles to fashion basics, performance wear, and
                infant apparel.
              </p>
            </div>
          </section>

          <figure className="starSvg" id="svg1">
            <svg height="0" width="0">
              <defs>
                <clipPath id="svg__path" clipPathUnits="objectBoundingBox">
                  <path id="svg__rec" data-name="rec" d="M0,0H1V1H0Z" />
                  <path
                    id="svg__star"
                    data-name="star"
                    d="M 0.20 0.05 L 0.55 0.05 C 0.78 0.05 0.95 0.25 0.95 0.50 C 0.95 0.75 0.78 0.95 0.55 0.95 L 0.20 0.95 Z"
                  />
                </clipPath>
              </defs>
            </svg>
            <video
              loop
              playsInline
              autoPlay
              muted
              poster="https://synaptex.pages.dev/11.jpg"
            >
              <source
                src="https://synaptex.pages.dev/img(1).mp4"
                type="video/mp4"
              />
            </video>
          </figure>

          <figure className="starSvg" id="svg2">
            <svg height="0" width="0">
              <defs>
                <clipPath id="svg__path2" clipPathUnits="objectBoundingBox">
                  <path id="svg__rec2" data-name="rec2" d="M0,0H1V1H0Z" />
                  <path
                    id="svg__star2"
                    data-name="star2"
                    d="M 0.20 0.50 A 0.375 0.45 0 1 1 0.95 0.50 A 0.375 0.45 0 1 1 0.20 0.50 Z"
                  />
                </clipPath>
              </defs>
            </svg>
            <video
              loop
              playsInline
              autoPlay
              muted
              poster="https://synaptex.pages.dev/2.jpg"
            >
              <source
                src="https://synaptex.pages.dev/video2.mp4"
                type="video/mp4"
              />
            </video>
          </figure>

          <figure className="starSvg" id="svg3">
            <svg height="0" width="0">
              <defs>
                <clipPath id="svg__path3" clipPathUnits="objectBoundingBox">
                  <path id="svg__rec3" data-name="rec3" d="M0,0H1V1H0Z" />
                  <path
                    id="svg__star3"
                    data-name="star3"
                    d="M 0.20 0.05 L 0.95 0.05 L 0.95 0.20 L 0.45 0.20 L 0.45 0.45 L 0.80 0.45 L 0.80 0.60 L 0.45 0.60 L 0.45 0.95 L 0.20 0.95 Z"
                  />
                </clipPath>
              </defs>
            </svg>
            <video
              loop
              playsInline
              autoPlay
              muted
              poster="https://synaptex.pages.dev/3.jpg"
            >
              <source
                src="https://synaptex.pages.dev/video3.mp4"
                type="video/mp4"
              />
            </video>
          </figure>
        </main>
      </div>
    </>
  );
}
