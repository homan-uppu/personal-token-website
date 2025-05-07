"use client";

import React from "react";

export const Grain: React.FC = () => {
  return (
    <div style={grainStyles}>
      <div style={grainOverlayStyles}></div>
    </div>
  );
};

const grainStyles = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none" as const,
  zIndex: 1,
  overflow: "hidden" as const,
};

const grainOverlayStyles = {
  position: "absolute" as const,
  top: "-50%",
  left: "-50%",
  width: "200%",
  height: "200%",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='9.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  opacity: 0.1, // Increased opacity from 0.05 to 0.15 to make it darker
  mixBlendMode: "multiply" as const,
};
