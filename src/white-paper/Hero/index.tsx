import styles from "./Hero.module.css";
import Spline from "@splinetool/react-spline/next";

import { Geist_Mono, Source_Serif_4 } from "next/font/google";
const sourceSerif = Source_Serif_4({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

interface HeroProps {
  title: string;
  date: string;
  version: string;
}

interface SplineBackgroundProps {
  className?: string;
}

function SplineBackground({ className }: SplineBackgroundProps) {
  return (
    <div className={className}>
      <Spline scene="https://prod.spline.design/HgaCD40PmTA8axWT/scene.splinecode" />
    </div>
  );
}
export default function Hero({ title, date, version }: HeroProps) {
  return (
    <div id="hero" className={styles.container + " " + geistMono.className}>
      <div className={styles.bgContainer}>
        <SplineBackground className={styles.background} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.dateRow}>
          <span className={styles.date}>{date}</span>
          <span className={styles.version}>{version}</span>
        </div>
      </div>
    </div>
  );
}
