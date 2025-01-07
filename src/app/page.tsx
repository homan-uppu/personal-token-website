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
          className={geistMono.className}
          style={{
            display: "block",
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.2s ease",
            textTransform: "uppercase",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "1.25rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
        >
          read white paper
        </Link>
      </div>
    </main>
  );
}
