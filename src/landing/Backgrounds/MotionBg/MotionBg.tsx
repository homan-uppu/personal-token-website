"use client";

import React, { useEffect, useRef } from "react";

const MotionBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation function to create subtle noise effect
    const generateNoise = () => {
      // Get canvas dimensions
      const { width, height } = canvas;

      // Create image data
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Create a static frame counter to reduce motion
      if (!window.noiseFrameCounter) {
        window.noiseFrameCounter = 0;
      }

      // Only update every 10 frames for less motion
      window.noiseFrameCounter++;
      if (window.noiseFrameCounter % 10 === 0) {
        // Fill with extremely subtle noise
        for (let i = 0; i < data.length; i += 4) {
          // Much higher values for whiter appearance
          const value = 245 + Math.random() * 10; // Very high base value (245-255)
          const alpha = Math.random() * 0.008; // Extremely low opacity

          data[i] = value; // R - nearly white
          data[i + 1] = value; // G - nearly white
          data[i + 2] = value; // B - nearly white
          data[i + 3] = alpha; // A - barely visible
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(generateNoise);
    };

    generateNoise();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas}></canvas>;
};

const styles = {
  canvas: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1,
    pointerEvents: "none" as const,
    background: "white",
  },
};

export default MotionBg;
