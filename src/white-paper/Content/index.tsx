"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styles from "./Content.module.css";
import SideMenu from "../SideMenu";
import { motion } from "framer-motion";
import SideMenuMobile from "../SideMenu/SideMenuMobile";

interface ContentProps {
  sections: string[][];
  children: ReactNode;
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  // useLayoutEffect runs after DOM mutations but before browser paint
  useLayoutEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Check immediately
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Return false during SSR, actual value after mounting
  return isMobile;
};

export default function Content({ children, sections }: ContentProps) {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const isMobile = useIsMobile();

  const contentMargin =
    isMobile === null || isMobile
      ? "0 auto"
      : `0 auto 0 calc(${isSideMenuVisible ? "300px" : "0px"} + (100vw - ${
          isSideMenuVisible ? "300px" : "0px"
        } - 600px) / 2)`;

  return (
    <div className={styles.container}>
      {isMobile !== null && (
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
      )}
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
