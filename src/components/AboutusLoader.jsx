import React from "react";
import styles from "./AboutusLoader.module.css";

export default function AboutUsLoader() {
  return (
    <div className={styles.Aboutusloader}>
      <div className={styles.Aboutuscontainer}>
        {[1, 2, 3, 4].map((gridIndex) => (
          <div key={gridIndex} className={styles["grid-big"]}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={styles[`cell-${gridIndex}`]}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
