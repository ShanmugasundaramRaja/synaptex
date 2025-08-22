// Whyloader.jsx
import React from "react";
import styles from "./Whyloader.module.css"; // ✅ import as styles

const Whyloader = () => {
  return (
    <div className={styles.center}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={styles.wave}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
};

export default Whyloader;
