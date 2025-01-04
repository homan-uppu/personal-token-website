import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  date: string;
  version: string;
}

export default function Hero({ title, date, version }: HeroProps) {
  return (
    <div id="hero" className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.dateRow}>
        <span className={styles.date}>{date}</span>
        <span className={styles.version}>{version}</span>
      </div>
    </div>
  );
}
