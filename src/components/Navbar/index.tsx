"use client";

import Link from "next/link";
import Logo from "../../landing/Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import fileStyles from "./Navbar.module.css";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

interface NavbarProps {
  pageID?: string;
  alwaysShowScrolled?: boolean;
}

const Navbar = ({ pageID, alwaysShowScrolled = false }: NavbarProps) => {
  const scrollY = useScrollPosition();
  const [screenWidth, setScreenWidth] = useState(-1);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial value
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    { href: "/how", label: "how" },
    { href: "/why", label: "why" },
  ];

  const styles = {
    nav: {
      position: "fixed" as const,
      top: "1.5rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 20,
      display: screenWidth < 0 ? "none" : "flex",

      justifyContent: "space-between",
      alignItems: "center",
      backdropFilter: "blur(5px)",
      borderRadius: "24px",
      width: screenWidth < 600 ? "calc(100% - 3rem)" : 588,
    },
    links: {
      display: "flex",
      gap: "24px",
    },
    activeLink: {
      color: "rgba(0, 0, 0, 0.9)",
      fontWeight: 500,
    },
  };

  if (screenWidth < 0) return;
  return (
    <motion.nav
      style={styles.nav}
      initial={{
        border: "1px solid rgba(0, 0, 0, 0)",
        opacity: 0,
      }}
      animate={{
        width: screenWidth > 600 ? "588px" : "calc(100% - 3rem)",
        border:
          alwaysShowScrolled || scrollY > 10
            ? "1px solid rgba(0, 0, 0, 0.05)"
            : "1px solid rgba(0, 0, 0, 0)",
        background:
          alwaysShowScrolled || scrollY > 10
            ? "rgba(255, 255, 255, 0.65)"
            : "transparent",
        padding:
          alwaysShowScrolled || scrollY > 10
            ? screenWidth > 600
              ? "0.5rem 1rem"
              : "0.5rem 1rem"
            : 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        opacity: { duration: 0.3 },
      }}
    >
      <Link href="/" className={fileStyles.logoContainer}>
        <Logo />
      </Link>
      <div style={styles.links}>
        {links.map((link) => (
          <Link
            key={link.href}
            className={fileStyles.link}
            href={link.href}
            style={{
              ...(pageID === link.href.substring(1) && styles.activeLink),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
