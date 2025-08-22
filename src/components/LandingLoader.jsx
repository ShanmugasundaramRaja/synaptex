import React from "react";
import styles from "./LandingLoader.module.css";

const LandingLoader = () => {
  const groups = Array.from({ length: 6 });
  const sectors = Array.from({ length: 6 });

  return (
    <div className={styles.landingLoaderWrapper}>
      <div
        className={styles.hexagon}
        role="img"
        aria-label="Animated hexagonal ripples"
      >
        {groups.map((_, groupIndex) => (
          <div key={groupIndex} className={styles.hexagon__group}>
            {sectors.map((_, sectorIndex) => (
              <div key={sectorIndex} className={styles.hexagon__sector}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingLoader;
