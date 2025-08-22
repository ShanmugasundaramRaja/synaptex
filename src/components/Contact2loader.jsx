import React from "react";
import styles from "./Contact2loader.module.css";

const Contact2loader = () => {
  const items = Array.from({ length: 128 });

  return (
    <div className={styles.contact2loadercontainer}>
      <div className={styles.spinner}>
        {items.map((_, index) => (
          <i
            key={index}
            style={{
              transform: `rotate(${(360 / 128) * index}deg) translateY(-80px)`,
              animationDelay: `${(1.5 / 128) * index}s`,
            }}
          >
            <b></b>
          </i>
        ))}
      </div>
    </div>
  );
};

export default Contact2loader;
