"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./SideMenu.module.css";
import { getIdFromHeader } from "@/util";
import { Header, SubHeader } from "./Header";
import Toggle from "./Toggle";
import { TableOfContents } from "./TableOfContents";

type SideMenuProps = {
  sections: string[][];
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export function useSticky() {
  const [isSticky, setIsSticky] = useState<boolean | null>(null);

  const updateSticky = useCallback(() => {
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      setIsSticky(window.scrollY >= heroElement.offsetHeight + 48);
    }
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      updateSticky();
    }, 10);

    updateSticky();

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isSticky;
}

export function useActiveHeader(sections: string[][]) {
  const [activeId, setActiveId] = useState("");

  const getAllHeaderIds = useCallback(() => {
    return sections.flatMap((section) =>
      section.map((headerText) => getIdFromHeader(headerText))
    );
  }, [sections]);

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

  const updateActiveHeader = useCallback(() => {
    const newActiveId = findActiveHeader();
    if (newActiveId && newActiveId !== activeId) {
      setActiveId(newActiveId);
    }
  }, [findActiveHeader, activeId]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      updateActiveHeader();
    }, 10);

    updateActiveHeader();

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveHeader]);

  return activeId;
}

export const springAnimTransition = {
  type: "spring",
  stiffness: 200, // Higher stiffness = more rigid
  damping: 20, // Controls bounce/oscillation
  mass: 0.5, // Lower mass = faster movement
};

export default function SideMenu({
  sections,
  isVisible,
  setIsVisible,
}: SideMenuProps) {
  const isSticky = useSticky();
  const activeId = useActiveHeader(sections);
  const [isHovered, setIsHovered] = useState(false);

  if (isSticky === null) return null;

  const shouldShowContent = isVisible || isHovered;

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
            style={{ position: "absolute", left: "24px", top: "24px" }}
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
          {shouldShowContent && (
            <TableOfContents sections={sections} activeId={activeId} />
          )}
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
