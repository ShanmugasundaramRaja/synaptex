import React, { useEffect, useLayoutEffect, useRef } from "react";

/**
 * IMPORTANT (required for FOUC fix):
 * In your global CSS (e.g. src/index.css or App.css), add:
 *
 * .products-shell { visibility: hidden; }
 * .products-shell.is-ready { visibility: visible; }
 */

function loadStylesheetOnce(href, dataKey) {
  let link = document.querySelector(`link[data-key="${dataKey}"]`);
  if (link) return link;

  link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.key = dataKey;
  document.head.appendChild(link);
  return link;
}

function loadScript(src, { type = "text/javascript" } = {}) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.type = type;
    s.async = false; // preserve order
    s.defer = false;
    s.dataset.src = src;

    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = reject;

    document.body.appendChild(s);
  });
}

export default function Product() {
  const shellRef = useRef(null);
  useLayoutEffect(() => {
    document.body.classList.add("products-page");
    return () => document.body.classList.remove("products-page");
  }, []);

  // CSS + FOUC guard (single source of truth)
  useLayoutEffect(() => {
    document.documentElement.className = "js";
    document.body.classList.add("loading");
    document.title = "Products";

    // start hidden (FOUC guard)
    shellRef.current?.classList.remove("is-ready");

    // viewport safety for SPA
    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement("meta");
      m.name = "viewport";
      m.content = "width=device-width, initial-scale=1";
      document.head.appendChild(m);
    }

    const typekitKey = "products-css:https://use.typekit.net/ccs0evy.css";
    const baseKey = "products-css:/css/base.css";

    // Typekit can load in parallel (doesn't block reveal)
    loadStylesheetOnce("https://use.typekit.net/ccs0evy.css", typekitKey);

    // Base CSS controls reveal
    const baseLink = loadStylesheetOnce("/css/base.css", baseKey);

    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      shellRef.current?.classList.add("is-ready");
    };

    // If already applied (cached), reveal immediately
    if (baseLink.sheet) {
      reveal();
    } else {
      baseLink.addEventListener("load", reveal, { once: true });
      baseLink.addEventListener("error", reveal, { once: true }); // fail open
    }

    return () => {
      cancelled = true;
      document.body.classList.remove("loading");

      // Route-only: remove CSS so it can't affect other pages
      document.querySelector(`link[data-key="${baseKey}"]`)?.remove();
      document.querySelector(`link[data-key="${typekitKey}"]`)?.remove();

      // Also hide shell again (in case of fast remount)
      shellRef.current?.classList.remove("is-ready");
    };
  }, []);

  // Load JS in the exact order from your HTML
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await loadScript("/js/gsap.min.js");
      await loadScript("/js/ScrollTrigger.min.js");
      await loadScript("/js/ScrollSmoother.min.js");
      await loadScript("/js/ScrollToPlugin.min.js");
      await loadScript("/js/SplitText.min.js");
      await loadScript("/js/imagesloaded.pkgd.min.js");
      await loadScript("/js/index.js", { type: "module" });

      if (cancelled) return;
    };

    run().catch((e) => console.error("Product page scripts failed:", e));

    return () => {
      cancelled = true;

      // Optional: if your /js/index.js can expose cleanup, call it:
      // window.__PRODUCT_CLEANUP__?.();
    };
  }, []);

  return (
    <>
      <div ref={shellRef} className="products-shell">
        <header className="frame">
          <img
            src="https://synaptex.pages.dev/Home%20(3240%20x%201080%20px).png"
            alt="logo"
            className="logo frame__title"
          />
          <nav className="frame__links">
            <a className="line" href="/">
              HOME
            </a>
            <a className="line" href="/contact">
              CONTACT
            </a>
          </nav>
        </header>

        <main id="smooth-content">
          <div className="scene-wrapper">
            {/* Carousel 1 */}
            <div className="scene">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-1">
                  <span>Knitwear — Men</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img1.jpg",
                  "https://synaptex.pages.dev/assets/img2.jpg",
                  "https://synaptex.pages.dev/assets/img3.jpg",
                  "https://synaptex.pages.dev/assets/img4.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c1-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 2 */}
            <div className="scene">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-2">
                  <span>Knitwear — accesories</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img13.jpg",
                  "https://synaptex.pages.dev/assets/img14.jpg",
                  "https://synaptex.pages.dev/assets/img15.jpg",
                  "https://synaptex.pages.dev/assets/img16.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c2-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 3 */}
            <div className="scene">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-3">
                  <span>miscellaneous - bags</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img27.jpg",
                  "https://synaptex.pages.dev/assets/img27.jpg",
                  "https://synaptex.pages.dev/assets/img27.jpg",
                  "https://synaptex.pages.dev/assets/img27.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c3-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 4 */}
            <div className="scene">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-4">
                  <span>Infantwear, Youthwear</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img37.jpg",
                  "https://synaptex.pages.dev/assets/img38.jpg",
                  "https://synaptex.pages.dev/assets/img39.jpg",
                  "https://synaptex.pages.dev/assets/img40.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c4-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 5 (6 cells) */}
            <div className="scene" data-radius="650">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-5">
                  <span>Home &amp; Living</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img49.jpg",
                  "https://synaptex.pages.dev/assets/img50.jpg",
                  "https://synaptex.pages.dev/assets/img51.jpg",
                  "https://synaptex.pages.dev/assets/img52.jpg",
                  "https://synaptex.pages.dev/assets/img53.jpg",
                  "https://synaptex.pages.dev/assets/img54.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c5-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 6 */}
            <div className="scene">
              <h2 className="scene__title" data-speed="0.7">
                <a href="#preview-6">
                  <span>Bed &amp; curtains</span>
                </a>
              </h2>
              <div className="carousel">
                {[
                  "https://synaptex.pages.dev/assets/img61.jpg",
                  "https://synaptex.pages.dev/assets/img62.jpg",
                  "https://synaptex.pages.dev/assets/img63.jpg",
                  "https://synaptex.pages.dev/assets/img64.jpg",
                ].map((img, idx) => (
                  <div className="carousel__cell" key={`c6-${idx}`}>
                    <div className="card" style={{ "--img": `url(${img})` }}>
                      <div className="card__face card__face--front"></div>
                      <div className="card__face card__face--back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <div className="preview-wrapper">
          {/* Preview 1 */}
          <div className="preview" id="preview-1">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>Knitwear — Men</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img1.jpg",
                  "V neck sweater",
                  "caption1",
                ],
                [
                  "https://synaptex.pages.dev/assets/img2.jpg",
                  "crew neck pullover",
                  "caption2",
                ],
                [
                  "https://synaptex.pages.dev/assets/img3.jpg",
                  "henley sweater",
                  "caption3",
                ],
                [
                  "https://synaptex.pages.dev/assets/img4.jpg",
                  "thermals",
                  "caption4",
                ],
                [
                  "https://synaptex.pages.dev/assets/img5.jpg",
                  "pyjama sets",
                  "caption5",
                ],
                [
                  "https://synaptex.pages.dev/assets/img6.jpg",
                  "cardigans",
                  "caption6",
                ],
                [
                  "https://synaptex.pages.dev/assets/img7.jpg",
                  "hoodies",
                  "caption7",
                ],
                [
                  "https://synaptex.pages.dev/assets/img8.jpg",
                  "full sleeve t-shirt",
                  "caption8",
                ],
                [
                  "https://synaptex.pages.dev/assets/img9.jpg",
                  "polo sweater.",
                  "caption9",
                ],
                [
                  "https://synaptex.pages.dev/assets/img10.jpg",
                  "high neck sweater",
                  "caption10",
                ],
                [
                  "https://synaptex.pages.dev/assets/img11.jpg",
                  "thermals",
                  "caption61",
                ],
                [
                  "https://synaptex.pages.dev/assets/img12.jpg",
                  "shawl cardigan",
                  "caption62",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Preview 2 */}
          <div className="preview" id="preview-2">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>Knitwear — accesories</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img13.jpg",
                  "jumpsuits",
                  "caption11",
                ],
                [
                  "https://synaptex.pages.dev/assets/img14.jpg",
                  "beach suits",
                  "caption12",
                ],
                [
                  "https://synaptex.pages.dev/assets/img15.jpg",
                  "beach shorts",
                  "caption13",
                ],
                [
                  "https://synaptex.pages.dev/assets/img16.jpg",
                  "printed scarf",
                  "caption14",
                ],
                [
                  "https://synaptex.pages.dev/assets/img17.jpg",
                  "lounge shorts",
                  "caption15",
                ],
                [
                  "https://synaptex.pages.dev/assets/img18.jpg",
                  "linen scarf",
                  "caption16",
                ],
                [
                  "https://synaptex.pages.dev/assets/img19.jpg",
                  "surf shorts",
                  "caption17",
                ],
                [
                  "https://synaptex.pages.dev/assets/img22.jpg",
                  "soft toy",
                  "caption18",
                ],
                [
                  "https://synaptex.pages.dev/assets/img21.jpg",
                  "jacquard scarf",
                  "caption19",
                ],
                [
                  "https://synaptex.pages.dev/assets/img20.jpg",
                  "beach tops",
                  "caption20",
                ],
                [
                  "https://synaptex.pages.dev/assets/img23.jpg",
                  "lounge shorts",
                  "caption63",
                ],
                [
                  "https://synaptex.pages.dev/assets/img24.jpg",
                  "wool scarf",
                  "caption64",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Preview 3 */}
          <div className="preview" id="preview-3">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>miscellaneous - bags</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img25.jpg",
                  "chair pads",
                  "caption21",
                ],
                [
                  "https://synaptex.pages.dev/assets/img26.jpg",
                  "soft toys",
                  "caption22",
                ],
                [
                  "https://synaptex.pages.dev/assets/img27.jpg",
                  "tote bags",
                  "caption23",
                ],
                [
                  "https://synaptex.pages.dev/assets/img28.jpg",
                  "cotton toys",
                  "caption24",
                ],
                [
                  "https://synaptex.pages.dev/assets/img29.jpg",
                  "plushes",
                  "caption25",
                ],
                [
                  "https://synaptex.pages.dev/assets/img30.jpg",
                  "utility bags",
                  "caption26",
                ],
                [
                  "https://synaptex.pages.dev/assets/img31.jpg",
                  "kimonos",
                  "caption27",
                ],
                [
                  "https://synaptex.pages.dev/assets/img32.jpg",
                  "shopping bags",
                  "caption28",
                ],
                [
                  "https://synaptex.pages.dev/assets/img33.jpg",
                  "pouches",
                  "caption29",
                ],
                [
                  "https://synaptex.pages.dev/assets/img34.jpg",
                  "shoulder bags",
                  "caption30",
                ],
                [
                  "https://synaptex.pages.dev/assets/img35.jpg",
                  "bathrobes",
                  "caption65",
                ],
                [
                  "https://synaptex.pages.dev/assets/img36.jpg",
                  "lunch bags",
                  "caption66",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Preview 4 */}
          <div className="preview" id="preview-4">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>Infantwear, Youthwear</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img37.jpg",
                  "infant onesie",
                  "caption31",
                ],
                [
                  "https://synaptex.pages.dev/assets/img38.jpg",
                  "infant tops",
                  "caption32",
                ],
                [
                  "https://synaptex.pages.dev/assets/img39.jpg",
                  "boys shorts",
                  "caption33",
                ],
                [
                  "https://synaptex.pages.dev/assets/img40.jpg",
                  "boys t-shirts",
                  "caption34",
                ],
                [
                  "https://synaptex.pages.dev/assets/img41.jpg",
                  "boys hoodies",
                  "caption35",
                ],
                [
                  "https://synaptex.pages.dev/assets/img42.jpg",
                  "girls shorts",
                  "caption36",
                ],
                [
                  "https://synaptex.pages.dev/assets/img43.jpg",
                  "boys polo sweater",
                  "caption37",
                ],
                [
                  "https://synaptex.pages.dev/assets/img44.jpg",
                  "boys polo t-shirt",
                  "caption38",
                ],
                [
                  "https://synaptex.pages.dev/assets/img45.jpg",
                  "boys surf shorts",
                  "caption39",
                ],
                [
                  "https://synaptex.pages.dev/assets/img46.jpg",
                  "girls sweater",
                  "caption40",
                ],
                [
                  "https://synaptex.pages.dev/assets/img47.jpg",
                  "boys loungepants",
                  "caption67",
                ],
                [
                  "https://synaptex.pages.dev/assets/img48.jpg",
                  "boys thermals",
                  "caption68",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Preview 5 */}
          <div className="preview" id="preview-5">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>home &amp; living</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img49.jpg",
                  "cushions",
                  "caption41",
                ],
                [
                  "https://synaptex.pages.dev/assets/img50.jpg",
                  "throws",
                  "caption42",
                ],
                [
                  "https://synaptex.pages.dev/assets/img51.jpg",
                  "mitts",
                  "caption43",
                ],
                [
                  "https://synaptex.pages.dev/assets/img52.jpg",
                  "table runners",
                  "caption44",
                ],
                [
                  "https://synaptex.pages.dev/assets/img53.jpg",
                  "Kitchen towels",
                  "caption45",
                ],
                [
                  "https://synaptex.pages.dev/assets/img54.jpg",
                  "bath runners",
                  "caption46",
                ],
                [
                  "https://synaptex.pages.dev/assets/img55.jpg",
                  "bath towels",
                  "caption47",
                ],
                [
                  "https://synaptex.pages.dev/assets/img56.jpg",
                  "aprons",
                  "caption48",
                ],
                [
                  "https://synaptex.pages.dev/assets/img57.jpg",
                  "bath mats",
                  "caption49",
                ],
                [
                  "https://synaptex.pages.dev/assets/img58.jpg",
                  "anti-slip bath mats",
                  "caption50",
                ],
                [
                  "https://synaptex.pages.dev/assets/img59.jpg",
                  "polyester throws",
                  "caption69",
                ],
                [
                  "https://synaptex.pages.dev/assets/img60.jpg",
                  "hand towels",
                  "caption70",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Preview 6 */}
          <div className="preview" id="preview-6">
            <header className="preview__header">
              <h2 className="preview__title">
                <span>Bed &amp; curtains</span>
              </h2>
              <button className="preview__close">Close ×</button>
            </header>

            <div className="grid">
              {[
                [
                  "https://synaptex.pages.dev/assets/img61.jpg",
                  "Curtains",
                  "caption51",
                ],
                [
                  "https://synaptex.pages.dev/assets/img62.jpg",
                  "pillows",
                  "caption52",
                ],
                [
                  "https://synaptex.pages.dev/assets/img63.jpg",
                  "bedsheets",
                  "caption53",
                ],
                [
                  "https://synaptex.pages.dev/assets/img64.jpg",
                  "duvets",
                  "caption54",
                ],
                [
                  "https://synaptex.pages.dev/assets/img65.jpg",
                  "blankets",
                  "caption55",
                ],
                [
                  "https://synaptex.pages.dev/assets/img66.jpg",
                  "drapes",
                  "caption56",
                ],
                [
                  "https://synaptex.pages.dev/assets/img67.jpg",
                  "bed side runners",
                  "caption57",
                ],
                [
                  "https://synaptex.pages.dev/assets/img68.jpg",
                  "bed side mats",
                  "caption58",
                ],
                [
                  "https://synaptex.pages.dev/assets/img69.jpg",
                  "summer curtains",
                  "caption59",
                ],
                [
                  "https://synaptex.pages.dev/assets/img70.jpg",
                  "fitted sheets",
                  "caption60",
                ],
                [
                  "https://synaptex.pages.dev/assets/img71.jpg",
                  "pillow covers",
                  "caption71",
                ],
                [
                  "https://synaptex.pages.dev/assets/img72.jpg",
                  "mattress protectors",
                  "caption72",
                ],
              ].map(([img, label, cap]) => (
                <figure
                  aria-labelledby={cap}
                  className="grid__item"
                  role="img"
                  key={cap}
                >
                  <div
                    className="grid__item-image"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <figcaption className="grid__item-caption" id={cap}>
                    <h3>{label}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
