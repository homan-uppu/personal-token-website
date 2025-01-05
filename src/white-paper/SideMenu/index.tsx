"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import styles from "./SideMenu.module.css";
import { getIdFromHeader } from "@/util";
import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

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

  // Handle scroll with debouncing
  useEffect(() => {
    const handleScroll = debounce(() => {
      // Update sticky state
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        setIsSticky(window.scrollY >= heroElement.offsetHeight + 48);
      }

      // Update active header
      updateActiveHeader();
    }, 50); // 50ms debounce

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveHeader]);

  const Header = ({ text }: { text: string }) => {
    const id = getIdFromHeader(text);
    const isActive = activeId === id;
    return (
      <div
        className={`${styles.header} ${isActive ? styles.activeH2 : ""} ${
          geistMono.className
        }`}
        onClick={() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {text}
      </div>
    );
  };

  const SubHeader = ({ text }: { text: string }) => {
    const id = getIdFromHeader(text);
    const isActive = activeId === id;

    return (
      <div
        className={`${styles.subheader} ${isActive ? styles.activeH3 : ""}`}
        onClick={() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {text}
      </div>
    );
  };

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

  //   useEffect(() => {
  //     // Create an Intersection Observer to track header visibility
  //     const callback = (entries: any) => {
  //       // Find the first element that is more than 50% visible
  //       const visible = entries.filter(
  //         (entry: any) => entry.isIntersecting && entry.intersectionRatio >= 0.5
  //       );

  //       if (visible.length > 0) {
  //         setActiveId(visible[0].target.id);
  //       }
  //     };

  //     const observer = new IntersectionObserver(callback, {
  //       root: null, // viewport
  //       rootMargin: "-20% 0px -35% 0px", // Adjust these values to change when headers become "active"
  //       threshold: [0.5], // Fire when element is 50% visible
  //     });

  //     // Observe all headers
  //     document
  //       .querySelectorAll("h2, h3")
  //       .forEach((section) => observer.observe(section));

  //     return () => observer.disconnect();
  //   }, []);

  return (
    <nav className={`${styles.sideMenu} ${isSticky ? styles.isSticky : ""}`}>
      <div className={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.section}>
            <Header text={section[0]} />
            {section.slice(1).map((item, itemIndex) => (
              <SubHeader key={itemIndex} text={item} />
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
