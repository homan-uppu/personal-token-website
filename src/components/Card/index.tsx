"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./GlassCard.module.css";
export default function GlassCard({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setMousePosition({ x, y });
  };

  return (
    <div className={styles.container}>
      <motion.div
        onMouseMove={handleMouseMove}
        className={styles.card}
        style={{
          transform: `perspective(1000px) rotateX(${
            mousePosition.y * 15
          }deg) rotateY(${mousePosition.x * 15}deg)`,
        }}
      >
        {children}
        {/* Inner lighting effect */}
        <motion.div
          className={styles.lighting}
          style={{
            background: `radial-gradient(circle at ${
              mousePosition.x * 100 + 50
            }% ${
              mousePosition.y * 100 + 50
            }%, rgba(255,255,255,0.5), transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}
