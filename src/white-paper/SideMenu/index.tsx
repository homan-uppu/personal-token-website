"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import styles from "./SideMenu.module.css";
import { getIdFromHeader } from "@/util";
import { Header, SubHeader } from "./Header";

type SideMenuProps = {
  sections: string[][];
};

export default function SideMenu({ sections }: SideMenuProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Get all header IDs from sections
  const getAllHeaderIds = useCallback(() => {
    return sections.flatMap((section) =>
      section.map((headerText) => getIdFromHeader(headerText))
    );
  }, [sections]);

  // Find the header closest to top of viewport
  const findActiveHeader = useCallback(() => {
    const headerIds = getAllHeaderIds();
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    let closestHeader = null;
    let closestDistance = Infinity;

    headerIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(elementPosition - scrollPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestHeader = id;
        }
      }
    });

    return closestHeader;
  }, [getAllHeaderIds]);

  // Update active header
  const updateActiveHeader = useCallback(() => {
    const newActiveId = findActiveHeader();
    if (newActiveId && newActiveId !== activeId) {
      setActiveId(newActiveId);
    }
  }, [findActiveHeader, activeId]);

  // Update sticky state
  const updateSticky = useCallback(() => {
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      setIsSticky(window.scrollY >= heroElement.offsetHeight + 48);
    }
  }, []);

  // Handle scroll with debouncing
  useEffect(() => {
    const update = () => {
      updateSticky();
      updateActiveHeader();
    };

    const handleScroll = debounce(() => {
      update();
    }, 10); // 10ms debounce

    // Execute once on mount
    update();

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.sideMenu} ${isSticky ? styles.isSticky : ""}`}>
      <div className={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.section}>
            <Header
              text={section[0]}
              isActive={activeId === getIdFromHeader(section[0])}
            />
            {section.slice(1).map((item, itemIndex) => (
              <SubHeader
                key={itemIndex}
                text={item}
                isActive={activeId === getIdFromHeader(item)}
              />
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
