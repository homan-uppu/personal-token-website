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
      <div id="content" className={styles.content}>
        {children}
      </div>
    </div>
  );
}
