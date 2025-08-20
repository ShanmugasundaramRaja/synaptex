import { useEffect } from "react";

export default function News() {
  useEffect(() => {
    window.location.href = "/whatsnext.html";
  }, []);

  return null; // or a loading spinner if you want
}
