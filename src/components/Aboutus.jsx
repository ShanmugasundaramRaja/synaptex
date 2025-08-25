import { useState, useEffect } from "react";
import AboutusLoader from "./AboutusLoader";

export default function AboutusRedirect() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if loader was already shown in this session
    const loaderShown = sessionStorage.getItem("aboutusLoaderShown");

    if (!loaderShown) {
      setLoading(true);
      // Set timer for 4 seconds
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("aboutusLoaderShown", "true");
        window.location.href = "/aboutus.html";
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Directly redirect if loader was already shown
      window.location.href("/aboutus.html");
    }
  }, []);

  return loading ? <AboutusLoader /> : null;
}
