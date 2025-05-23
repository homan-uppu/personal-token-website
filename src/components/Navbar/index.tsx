"use client";

import Link from "next/link";
import Logo from "../../landing/Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import fileStyles from "./Navbar.module.css";
import { useScreenWidth } from "@/landing/Layout";

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
  width?: number;
}

const Navbar = ({
  pageID,
  alwaysShowScrolled = false,
  width = 800,
}: NavbarProps) => {
  const scrollY = useScrollPosition();
  const screenWidth = useScreenWidth();

  const links = [
    { href: "/docs", label: "docs" },
    { href: "https://unfck.education", label: "why" },
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
      backdropFilter: alwaysShowScrolled || scrollY > 10 ? "blur(4px)" : "",
      borderRadius: "24px",
      width:
        screenWidth >= 800 ? `calc(${width}px - 6rem)` : "calc(100% - 3rem)",
      margin: "0 auto",
    },
    links: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
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
        width:
          screenWidth >= 800 ? `calc(${width}px - 6rem)` : "calc(100% - 3rem)",
        border:
          alwaysShowScrolled || scrollY > 10
            ? "1px solid rgba(0, 0, 0, 0.05)"
            : "1px solid rgba(0, 0, 0, 0)",
        background:
          alwaysShowScrolled || scrollY > 10
            ? "rgba(255, 255, 255, 0.35)"
            : "transparent",
        padding:
          alwaysShowScrolled || scrollY > 10
            ? screenWidth >= 800
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
        {links.map((link) => {
          // Check if the link is external (starts with http or https)
          const isExternal = /^https?:\/\//.test(link.href);
          if (isExternal) {
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={fileStyles.link}
                style={{
                  ...(pageID === link.href.substring(1) && styles.activeLink),
                }}
              >
                {link.label}
              </a>
            );
          } else {
            return (
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
            );
          }
        })}
        <div
          className={fileStyles.ctaButton}
          onClick={() => {
            const waitlistDiv = document.getElementById("waitlist");
            if (waitlistDiv) {
              waitlistDiv.scrollIntoView({ behavior: "smooth" });
              // Try to focus the input inside the waitlistDiv (EmailCapture)
              setTimeout(() => {
                const input = waitlistDiv.querySelector('input[type="email"]');
                if (input) {
                  (input as HTMLInputElement).focus();
                }
              }, 400); // Delay to allow scrollIntoView to finish
            }
          }}
        >
          join
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
