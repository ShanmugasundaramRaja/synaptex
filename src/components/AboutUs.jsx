import React, { useEffect, useLayoutEffect } from "react";

function ensureLink(href, rel, attrs = {}) {
  const key = `${rel}:${href}`;
  let el = document.querySelector(`link[data-key="${key}"]`);
  if (el) return el;

  el = document.createElement("link");
  el.rel = rel;
  el.href = href;
  el.dataset.key = key;

  Object.entries(attrs).forEach(([k, v]) => {
    if (v == null) return;
    el.setAttribute(k, v);
  });

  document.head.appendChild(el);
  return el;
}

function ensureStyle(id, cssText) {
  let el = document.getElementById(id);
  if (el) return el;

  el = document.createElement("style");
  el.id = id;
  el.textContent = cssText;
  document.head.appendChild(el);
  return el;
}

function loadScript(src, { integrity, crossOrigin } = {}) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-dyn-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = false; // preserve order
    s.defer = false;
    s.dataset.dynSrc = src;

    if (integrity) s.integrity = integrity;
    if (crossOrigin != null) s.crossOrigin = crossOrigin;

    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = reject;

    document.body.appendChild(s);
  });
}

const PAGE_CSS = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

:root {
  --font1: "Poppins";
  --fontSizeMenu: 1vw;
  --fontSizeH1: 10vw;
  --fontSizeP: 1.48vw;
  --maxWidth: 1100px;
}

body {
  margin: 0;
  background: linear-gradient(90deg, #375d53, black);
  font-family: var(--font1);
  overflow-x: hidden;
  height: 600vh;
  color: beige;
}

.logo { height: 40px; width: auto; }

.flex,
.flex__col { display: flex; justify-content: center; align-items: center; }

.flex__col { flex-direction: column; }

ul { margin: 0; padding: 0; list-style: none; }

main.flex__col { width: 100%; justify-content: flex-start; }

.menu {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 50%;
  width: calc(100% - 80px);
  justify-content: space-between;
  margin: 40px 0;
  transform: translateX(-50%);
}

.menu a { font-size: 0.8rem; color: beige; text-decoration: none; }

.menu ul { gap: 0 60px; }
.menu ul li { display: flex; }

.clip { width: 100%; height: 150vh; }

.clip__inner { position: relative; width: 100%; height: 100vh; }

.clip__inner h1 {
  align-items: flex-end;
  font-size: var(--fontSizeH1);
  text-align: center;
  max-width: var(--maxWidth);
  margin: 5vw 0;
}

.clip__cols {
  width: 70vw;
  height: 45vh;
  gap: 40px;
  align-items: flex-start;
  max-width: var(--maxWidth);
}

.clip__cols a { color: black; }

.clip__scroll {
  z-index: 3;
  width: 100vw;
  height: 100vh;
  padding-top: 100vh;
}

#clip1__scroll { padding-top: 0; }

.clip__scroll h2 {
  color: black;
  font-size: var(--fontSizeH1);
  margin: 0 0 6vw 0;
}

.clip__scroll .clip__cols { height: auto; }

.clip__scroll p,
.clip__scroll a { color: black; }

#svg__rec,
#svg__rec2,
#svg__rec3,
#svg__rec4 { display: none; }

.starSvg {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  margin: 0;
  width: 200px;
  height: auto;
  aspect-ratio: 1/1;
  transform: translate(-50%, -50%);
}

#svg1 { clip-path: url(#svg__path); }
#svg2 { clip-path: url(#svg__path2); }
#svg3 { clip-path: url(#svg__path3); }
#svg4 { clip-path: url(#svg__path4); }

.starSvg img,
.starSvg video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

@media (orientation: portrait) {
  .starSvg img,
  .starSvg video {
    width: auto;
    height: 100vh;
  }
}

@media (min-width: 750px) {
  p {
    font-size: 1.3rem;
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 20px;
    padding: 10px;
  }
  .menu a { font-size: 1rem; }
}

@media (min-width: 1450px) {
  .logo { height: 40px; width: auto; }

  :root {
    --fontSizeMenu: 16px;
    --fontSizeH1: 140px;
    --fontSizeP: 22px;
  }

  .clip__cols { height: 35vh; }
}

@media (max-width: 600px) {
  :root {
    --fontSizeMenu: 11px;
    --fontSizeP: 11px;
  }

  .logo { height: 30px; width: auto; }

  .menu { width: 90vw; margin: 4vw 0; }

  .menu ul { gap: 0 2vw; }

  .clip__inner h1 { justify-content: flex-start; margin: 60px 0; }

  .clip__cols {
    gap: 10px;
    flex-direction: column;
    justify-content: flex-start;
  }

  .clip__cols p {
    width: 100%;
    font-weight: 500;
    font-size: 1rem;
    line-height: 27px;
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 20px;
    padding: 10px;
  }

  p { font-size: 0.7rem; }

  .last {
    font-size: 0.8rem!important;
    line-height: 21px!important;
    font-weight: 500;
  }
}

.firsthead { padding-bottom: 10vh; }

.home { transition: all 0.4s ease-in; letter-spacing: 1px; }

.home:hover {
  letter-spacing: 3px;
  border: 2px solid beige;
  border-radius: 28px;
  padding: 10px;
}

/* Loader */
.Aboutusloader {
  overflow: hidden;
  background: #111;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.Aboutuscontainer {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  width: 60%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  align-content: center;
  -webkit-align-content: center;
}

.grid-big {
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  align-content: center;
  -webkit-align-content: center;
  width: 70px;
  height: 70px;
}

/* Grid #1 */
.cell-1 {
  width: 10px;
  height: 10px;
  background: #003d2e;
  border-radius: 50%;
  margin: 2px;
  animation: quick-glow 1.25s 0.3s infinite linear;
  -webkit-animation: quick-glow 1.25s 0.3s infinite linear;
}

.cell-1:nth-child(7),
.cell-1:nth-child(8),
.cell-1:nth-child(9),
.cell-1:nth-child(12),
.cell-1:nth-child(14),
.cell-1:nth-child(17),
.cell-1:nth-child(18),
.cell-1:nth-child(19) {
  animation: quick-glow 1.25s 0.15s infinite linear;
  -webkit-animation: quick-glow 1.25s 0.15s infinite linear;
}

.cell-1:nth-child(13) {
  animation: quick-glow 1.25s infinite linear;
  -webkit-animation: quick-glow 1.25s infinite linear;
}

/* Grid #2 */
.cell-2 {
  width: 10px;
  height: 10px;
  background: #003d2e;
  border-radius: 50%;
  margin: 2px;
}

.cell-2:nth-child(1) { animation: quick-glow 2.5s 0s infinite linear; -webkit-animation: quick-glow 2.5s 0s infinite linear; }
.cell-2:nth-child(2) { animation: quick-glow 2.5s 0.1s infinite linear; -webkit-animation: quick-glow 2.5s 0.1s infinite linear; }
.cell-2:nth-child(3) { animation: quick-glow 2.5s 0.2s infinite linear; -webkit-animation: quick-glow 2.5s 0.2s infinite linear; }
.cell-2:nth-child(4) { animation: quick-glow 2.5s 0.3s infinite linear; -webkit-animation: quick-glow 2.5s 0.3s infinite linear; }
.cell-2:nth-child(5) { animation: quick-glow 2.5s 0.4s infinite linear; -webkit-animation: quick-glow 2.5s 0.4s infinite linear; }
.cell-2:nth-child(10) { animation: quick-glow 2.5s 0.5s infinite linear; -webkit-animation: quick-glow 2.5s 0.5s infinite linear; }
.cell-2:nth-child(15) { animation: quick-glow 2.5s 0.6s infinite linear; -webkit-animation: quick-glow 2.5s 0.6s infinite linear; }
.cell-2:nth-child(20) { animation: quick-glow 2.5s 0.7s infinite linear; -webkit-animation: quick-glow 2.5s 0.7s infinite linear; }
.cell-2:nth-child(25) { animation: quick-glow 2.5s 0.8s infinite linear; -webkit-animation: quick-glow 2.5s 0.8s infinite linear; }
.cell-2:nth-child(24) { animation: quick-glow 2.5s 0.9s infinite linear; -webkit-animation: quick-glow 2.5s 0.9s infinite linear; }
.cell-2:nth-child(23) { animation: quick-glow 2.5s 1s infinite linear; -webkit-animation: quick-glow 2.5s 1s infinite linear; }
.cell-2:nth-child(22) { animation: quick-glow 2.5s 1.1s infinite linear; -webkit-animation: quick-glow 2.5s 1.1s infinite linear; }
.cell-2:nth-child(21) { animation: quick-glow 2.5s 1.2s infinite linear; -webkit-animation: quick-glow 2.5s 1.2s infinite linear; }
.cell-2:nth-child(16) { animation: quick-glow 2.5s 1.3s infinite linear; -webkit-animation: quick-glow 2.5s 1.3s infinite linear; }
.cell-2:nth-child(11) { animation: quick-glow 2.5s 1.4s infinite linear; -webkit-animation: quick-glow 2.5s 1.4s infinite linear; }
.cell-2:nth-child(6) { animation: quick-glow 2.5s 1.5s infinite linear; -webkit-animation: quick-glow 2.5s 1.5s infinite linear; }
.cell-2:nth-child(7) { animation: quick-glow 2.5s 1.6s infinite linear; -webkit-animation: quick-glow 2.5s 1.6s infinite linear; }
.cell-2:nth-child(8) { animation: quick-glow 2.5s 1.7s infinite linear; -webkit-animation: quick-glow 2.5s 1.7s infinite linear; }
.cell-2:nth-child(9) { animation: quick-glow 2.5s 1.8s infinite linear; -webkit-animation: quick-glow 2.5s 1.8s infinite linear; }
.cell-2:nth-child(14) { animation: quick-glow 2.5s 1.9s infinite linear; -webkit-animation: quick-glow 2.5s 1.9s infinite linear; }
.cell-2:nth-child(19) { animation: quick-glow 2.5s 2s infinite linear; -webkit-animation: quick-glow 2.5s 2s infinite linear; }
.cell-2:nth-child(18) { animation: quick-glow 2.5s 2.1s infinite linear; -webkit-animation: quick-glow 2.5s 2.1s infinite linear; }
.cell-2:nth-child(17) { animation: quick-glow 2.5s 2.2s infinite linear; -webkit-animation: quick-glow 2.5s 2.2s infinite linear; }
.cell-2:nth-child(12) { animation: quick-glow 2.5s 2.3s infinite linear; -webkit-animation: quick-glow 2.5s 2.3s infinite linear; }
.cell-2:nth-child(13) { animation: quick-glow 2.5s 2.4s infinite linear; -webkit-animation: quick-glow 2.5s 2.4s infinite linear; }

/* Grid #3 */
.cell-3 {
  width: 10px;
  height: 10px;
  background: #003d2e;
  border-radius: 50%;
  margin: 2px;
}

.cell-3:nth-child(2n+1) {
  animation: glow 1.2s infinite linear;
  -webkit-animation: glow 1.2s infinite linear;
}

.cell-3:nth-child(2n) {
  animation: glow 1.2s 0.6s infinite linear;
  -webkit-animation: glow 1.2s 0.6s infinite linear;
}

/* Grid #4 */
.grid-big:nth-child(4) {
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}

.cell-4 {
  width: 10px;
  height: 10px;
  background: #003d2e;
  border-radius: 50%;
  margin: 2px;
}

.cell-4:nth-child(1),
.cell-4:nth-child(2),
.cell-4:nth-child(3),
.cell-4:nth-child(4),
.cell-4:nth-child(5),
.cell-4:nth-child(6),
.cell-4:nth-child(7),
.cell-4:nth-child(8),
.cell-4:nth-child(9),
.cell-4:nth-child(10),
.cell-4:nth-child(11),
.cell-4:nth-child(12),
.cell-4:nth-child(13),
.cell-4:nth-child(14),
.cell-4:nth-child(15),
.cell-4:nth-child(16),
.cell-4:nth-child(17),
.cell-4:nth-child(18),
.cell-4:nth-child(19),
.cell-4:nth-child(20),
.cell-4:nth-child(21),
.cell-4:nth-child(22),
.cell-4:nth-child(23),
.cell-4:nth-child(24),
.cell-4:nth-child(25) {
  animation: quick-glow 1s 0.5s infinite linear;
  -webkit-animation: quick-glow 1s 0.5s infinite linear;
}

.cell-4:nth-child(6) { animation: quick-glow 1s 0s infinite linear; -webkit-animation: quick-glow 1s 0s infinite linear; }
.cell-4:nth-child(7) { animation: quick-glow 1s 0.1s infinite linear; -webkit-animation: quick-glow 1s 0.1s infinite linear; }
.cell-4:nth-child(8) { animation: quick-glow 1s 0.2s infinite linear; -webkit-animation: quick-glow 1s 0.2s infinite linear; }
.cell-4:nth-child(9) { animation: quick-glow 1s 0.3s infinite linear; -webkit-animation: quick-glow 1s 0.3s infinite linear; }
.cell-4:nth-child(10) { animation: quick-glow 1s 0.4s infinite linear; -webkit-animation: quick-glow 1s 0.4s infinite linear; }
.cell-4:nth-child(16),
.cell-4:nth-child(17),
.cell-4:nth-child(18),
.cell-4:nth-child(19),
.cell-4:nth-child(20) {
  animation: quick-glow 1s 0s infinite linear;
  -webkit-animation: quick-glow 1s 0s infinite linear;
}

/* Keyframes */
@keyframes quick-glow {
  15% {
    z-index: 99;
    background: #29ff95;
    box-shadow: 0 0 10px 2px #29ff95;
  }
}

@keyframes glow {
  50% {
    z-index: 99;
    background: #29ff95;
    box-shadow: 0 0 10px 2px #29ff95;
  }
}

@-webkit-keyframes quick-glow {
  15% {
    z-index: 99;
    background: #29ff95;
    box-shadow: 0 0 10px 2px #29ff95;
  }
}

@-webkit-keyframes glow {
  50% {
    z-index: 99;
    background: #29ff95;
    box-shadow: 0 0 10px 2px #29ff95;
  }
}
`;

export default function AboutUs() {
  // ✅ Inject CSS + critical links BEFORE first paint (fixes most FOUC)
  useLayoutEffect(() => {
    ensureLink(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      "stylesheet",
    );

    ensureLink(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css",
      "stylesheet",
      {
        integrity:
          "sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr",
        crossorigin: "anonymous",
      },
    );

    ensureLink(
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
      "stylesheet",
    );

    ensureStyle("aboutus-inline-css", PAGE_CSS);
  }, []);

  // ✅ Scripts + GSAP after mount
  useEffect(() => {
    document.title = "Synaptex - About us";

    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement("meta");
      m.name = "viewport";
      m.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(m);
    }

    let cancelled = false;

    const run = async () => {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js",
        {
          integrity:
            "sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q",
          crossOrigin: "anonymous",
        },
      );
      await loadScript("https://code.jquery.com/jquery-3.7.0.min.js");
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
      );
      await loadScript(
        "https://assets.codepen.io/16327/MorphSVGPlugin3.min.js",
      );

      if (cancelled) return;

      function createAboutusLoader() {
        const loaderContent = document.getElementById("loaderContent");
        if (!loaderContent) return;
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
      }

      function showAboutusLoader() {
        const loaderContainer = document.getElementById("loaderContainer");
        if (!loaderContainer) return;
        loaderContainer.style.display = "flex";
      }

      function hideAboutusLoader() {
        const loaderContainer = document.getElementById("loaderContainer");
        if (!loaderContainer) return;
        loaderContainer.style.display = "none";
      }

      function initializeAboutusRedirect() {
        const loaderShown = sessionStorage.getItem("aboutusLoaderShown");
        if (!loaderShown) {
          createAboutusLoader();
          showAboutusLoader();
          setTimeout(() => {
            sessionStorage.setItem("aboutusLoaderShown", "true");
            hideAboutusLoader();
            window.location.href = "/aboutus";
          }, 4000);
        }
      }

      const { gsap } = window;
      const { ScrollTrigger } = window;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

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
      }

      initializeAboutusRedirect();
    };

    run().catch((e) => console.error("AboutUs init failed:", e));

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
                alt="logo"
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
                infant apparel. By occasionally importing curated textile
                products, we gain the flexibility to meet dynamic market
                demands, navigate supply chain complexities, and streamline
                delivery timelines.
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
