import { useEffect } from "react";

export default function StarScroll() {
  useEffect(() => {
    window.location.href = "/starscroll.html";
  }, []);

  return null; // or a loading spinner if you want
}
