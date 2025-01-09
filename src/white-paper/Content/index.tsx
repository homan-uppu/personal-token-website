"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./Content.module.css";
import SideMenu from "../SideMenu";
import { motion } from "framer-motion";
import SideMenuMobile from "../SideMenu/SideMenuMobile";

interface ContentProps {
  children: ReactNode;
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

export default function Content({ children }: ContentProps) {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(true);
  const isMobile = useIsMobile();

  const sections = [
    ["I. Intro"],
    [
      "II. How it works",
      "The Network",
      "A personal token",
      "Shares",
      "Valuation",
      "Raise capital",
      "Manage relationships",
      "Invest",
      "Sell",
      "Discover",
      "Other details",
    ],
    [
      "III. System",
      "Admission",
      "Sufficient decentralization",
      "Network token",
      "Tackling fraud",
      "Syncing off chain assets",
      "Promoting competition",
      "Governance",
    ],
    ["IV. Implementation", "Overview", "Legal", "Technical"],
    ["V. Notes", "Vision", "Q&A", "Discuss", "Authors", "Contribute"],
  ];

  const contentMargin = isMobile
    ? "0 auto"
    : `0 auto 0 calc(${isSideMenuVisible ? "300px" : "0px"} + (100vw - ${
        isSideMenuVisible ? "300px" : "0px"
      } - 600px) / 2)`;

  return (
    <div className={styles.container}>
      <div className={styles.sideMenuContainer}>
        {isMobile ? (
          <SideMenuMobile sections={sections} />
        ) : (
          <SideMenu
            isVisible={isSideMenuVisible}
            setIsVisible={setIsSideMenuVisible}
            sections={sections}
          />
        )}
      </div>
      <motion.div
        id="content"
        className={styles.content}
        style={{ margin: contentMargin }}
        animate={{
          margin: contentMargin,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.5,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
