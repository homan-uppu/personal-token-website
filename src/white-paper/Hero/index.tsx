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

export default function Hero({ title, date, version }: HeroProps) {
  return (
    <div id="hero" className={styles.container + " " + geistMono.className}>
      <div className={styles.bgContainer}>
        <div
          //   style={{
          //     width: "calc(130vw)",
          //     height: "calc(130vh)",
          //     margin: "calc(-20vh)",
          //     marginTop: "calc(-25vh)",
          //     marginLeft: "calc(-20vw)",
          //   }}
          className={styles.background}
        >
          <Spline scene="https://prod.spline.design/HgaCD40PmTA8axWT/scene.splinecode" />
        </div>
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
