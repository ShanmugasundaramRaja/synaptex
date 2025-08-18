import React, { useState, useEffect } from "react";

export default function News() {
  useEffect(() => {
    window.location.href = "/News.html";
  }, []);

  return null; // or a loading spinner if you want
}
