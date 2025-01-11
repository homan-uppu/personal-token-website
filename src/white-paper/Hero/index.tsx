import Logo from "@/landing/Logo";
import styles from "./Hero.module.css";
import Spline from "@splinetool/react-spline/next";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

interface HeroProps {
  title: string;
  date: string;
  version: string;
}

export default function Hero({ title, date, version }: HeroProps) {
  return (
    <div id="hero" className={styles.container}>
      <div className={styles.bgContainer}>
        <div className={styles.background}>
          <Spline scene="https://prod.spline.design/HgaCD40PmTA8axWT/scene.splinecode" />
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.titleLogo}>
          <Logo size={42} fontWeight={360} noCircle />
        </h1>
        <h1 className={styles.title + " " + geistMono.className}>{title}</h1>
        <div className={styles.dateRow + " " + geistMono.className}>
          <span className={styles.date}>{date}</span>
          <span className={styles.version}>{version}</span>
        </div>
      </div>
    </div>
  );
}
