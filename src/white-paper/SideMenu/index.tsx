"use client";
import { useState, useEffect } from "react";
import styles from "./SideMenu.module.css";

type SideMenuProps = {
  sections: string[][];
};

export default function SideMenu({ sections }: SideMenuProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero");
      const contentElement = document.getElementById("content");
      if (heroElement && contentElement) {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition >= heroElement.offsetHeight + 48); // accounting for the margins around heroElement
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.sideMenu} ${isSticky ? styles.isSticky : ""}`}
      style={{ height: "100%", width: "300px", borderRight: "1px solid #eee" }}
    >
      <div className={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.section}>
            {section.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={styles.h3}
                style={{ padding: "8px 16px" }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
