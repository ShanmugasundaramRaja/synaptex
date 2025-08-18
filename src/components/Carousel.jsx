import { useEffect } from "react";

export default function Carousel() {
  useEffect(() => {
    window.location.href = "/Carousel.html";
  }, []);

  return null; // Optionally return a loader here
}
