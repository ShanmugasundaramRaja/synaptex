import styles from "./Newsloader.module.css";

export default function NewsLoader() {
  return (
    <main className={styles.main}>
      <div className={styles.pl}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.pl__dot}></div>
        ))}
      </div>
    </main>
  );
}
