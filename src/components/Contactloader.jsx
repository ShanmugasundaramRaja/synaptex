import React from "react";
import styles from "./Contactloader.module.css"; // Make sure to import your CSS separately

const Contactloader = () => {
  const circles = Array.from({ length: 64 }); // 64 circles like your HTML

  return (
    <div className={styles.loading}>
      {circles.map((_, index) => (
        <div key={index} className={styles.circle}></div>
      ))}
    </div>
  );
};

export default Contactloader;
