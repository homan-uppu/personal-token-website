import { ReactNode, useEffect, useState } from "react";
import styles from "./Content.module.css";
import SideMenu from "../SideMenu";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sideMenuContainer}>
        <SideMenu
          sections={[
            ["I. INTRO", "What", "Why", "How", "Goals"],
            [
              "II. How it works",
              "Shares",
              "Raise money",
              "Valuation",
              "Manage relationships",
            ],
            [
              "III. Implementation",
              "Architecture",
              "Security",
              "Scalability",
              "Future work",
            ],
          ]}
        />
      </div>
      <div id="content" className={styles.content}>
        {children}
      </div>
    </div>
  );
}
