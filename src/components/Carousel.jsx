import { useEffect } from "react";

export default function Carousel() {
  useEffect(() => {
    window.location.replace("/products.html"); // replaces current history entry
  }, []);

  return null; // you could render a loader/spinner here if needed
}
