"use client";

import { useScreenWidth } from "./Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const LoadingPage = () => {
  const screenWidth = useScreenWidth();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (screenWidth > 0) {
      //   // Instead of immediately hiding, we'll set a timeout to allow the animation to complete
      //   setTimeout(() => {
      //     setVisible(false);
      //   }, 2000); // 2 seconds total for the animation
      setVisible(false);
    }
  }, [screenWidth]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={loadingContainerStyle}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" },
          }}
        >
          {/* <svg width="50" height="50" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--logo-green)"
              strokeWidth="4"
              strokeDasharray="251.2"
              strokeDashoffset="251.2"
              strokeLinecap="round"
              animate={{
                strokeDashoffset: [251.2, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </svg> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const loadingContainerStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FDFDFD",
  zIndex: 1000,
};
