"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import HeroCaption from "@/writing/hero.mdx";

import { Geist_Mono } from "next/font/google";
import Link from "next/link";
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <main className={styles.main}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        loop
        muted
        playsInline
        autoPlay
      >
        <source src="/fire.mp4" type="video/mp4" />
      </video>
      <div className={styles.container}>
        <HeroCaption />
        <Link
          href="/white-paper"
          className={styles.cta + " " + geistMono.className}
        >
          read white paper
        </Link>
      </div>
    </main>
  );
}
