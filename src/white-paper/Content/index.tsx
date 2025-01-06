"use client";

import { ReactNode, useState } from "react";
import styles from "./Content.module.css";
import SideMenu from "../SideMenu";
import { motion } from "framer-motion";
import Toggle from "../SideMenu/Toggle";

interface ContentProps {
  children: ReactNode;
}
export default function Content({ children }: ContentProps) {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.sideMenuContainer}>
        <SideMenu
          isVisible={isSideMenuVisible}
          setIsVisible={setIsSideMenuVisible}
          sections={[
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
            ["III. Demo"],
            [
              "IV. Design",
              "Admission",
              "Sufficient decentralization",
              "Network token",
              "Tackling fraud",
              "Syncing off chain assets",
              "Promoting competition",
              "Governance",
            ],
            ["V. Implementation", "Overview", "Legal", "Technical"],
            ["VI. Notes", "Vision", "Q&A", "Discuss", "Authors", "Contribute"],
          ]}
        />
      </div>
      <motion.div
        id="content"
        className={styles.content}
        animate={{
          margin: `0 auto 0 calc(${
            isSideMenuVisible ? "300px" : "0px"
          } + (100vw - ${isSideMenuVisible ? "300px" : "0px"} - 600px) / 2)`,
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
