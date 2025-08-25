import { useState, useEffect } from "react";
import NewsLoader from "./Newsloader";

export default function AboutusRedirect() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if loader was already shown in this session
    const loaderShown = sessionStorage.getItem("newsLoaderShown");

    if (!loaderShown) {
      setLoading(true);
      // Set timer for 4 seconds
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("newsLoaderShown", "true");
        window.location.replace = "/whatsnext.html";
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Directly redirect if loader was already shown
      window.location.replace = "/whatsnext.html";
    }
  }, []);

  return loading ? <NewsLoader /> : null;
}
