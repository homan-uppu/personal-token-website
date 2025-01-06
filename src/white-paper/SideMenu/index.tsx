"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./SideMenu.module.css";
import { getIdFromHeader } from "@/util";
import { Header, SubHeader } from "./Header";
import Toggle from "./Toggle";

type SideMenuProps = {
  sections: string[][];
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};
export default function SideMenu({
  sections,
  isVisible,
  setIsVisible,
}: SideMenuProps) {
  const [isSticky, setIsSticky] = useState<boolean | null>(null);
  const [activeId, setActiveId] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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

    update();

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateSticky, updateActiveHeader]);

  if (isSticky === null) return null;

  const shouldShowContent = isVisible || isHovered;

  const springAnimTransition = {
    type: "spring",
    stiffness: 200, // Higher stiffness = more rigid
    damping: 20, // Controls bounce/oscillation
    mass: 0.5, // Lower mass = faster movement
  };

  return (
    <AnimatePresence>
      <motion.nav
        className={`${styles.sideMenu} ${isSticky ? styles.isSticky : ""} ${
          !shouldShowContent ? styles.collapsed : ""
        } ${!isVisible ? styles.hoverable : ""}`}
        animate={{}}
        transition={springAnimTransition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!shouldShowContent && (
          <div
            className={styles.toggleContainer}
            style={{ position: "absolute", left: "48px", top: "48px" }}
          >
            <Toggle onClick={() => setIsVisible(!isVisible)} />
          </div>
        )}
        <motion.div
          className={styles.sectionsContainer}
          style={{
            boxShadow:
              !isVisible && isHovered
                ? "0px 4px 24px rgba(0, 0, 0, 0.1)"
                : "none",
          }}
          animate={{
            background: shouldShowContent ? "#fbfbfb" : "transparent",
            x: shouldShowContent ? 0 : -300,
          }}
          transition={springAnimTransition}
        >
          <div className={styles.toggleContainer}>
            <Toggle onClick={() => setIsVisible(!isVisible)} />
          </div>
          {shouldShowContent &&
            sections.map((section, sectionIndex) => (
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
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
