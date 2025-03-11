"use client";

import { useScreenWidth } from "./Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const LoadingPage = () => {
  const screenWidth = useScreenWidth();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (screenWidth > 0) {
      // Instead of immediately hiding, we'll set a timeout to allow the animation to complete
      setTimeout(() => {
        setVisible(false);
      }, 200); // 2 seconds total for the animation
      //   setVisible(false);
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
        ></motion.div>
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
