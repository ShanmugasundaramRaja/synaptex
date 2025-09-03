import { useEffect } from "react";

export default function Carousel() {
  useEffect(() => {
    window.location.href = "/products.html"; // ✅ correct
  }, []);

  return null; // optionally render a loader/spinner
}
