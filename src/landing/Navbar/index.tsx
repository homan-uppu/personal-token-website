"use client";

import Link from "next/link";
import Logo from "../Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const Navbar = () => {
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
    { href: "/why", label: "why" },
    { href: "/how", label: "how" },
    { href: "/faq", label: "faq" },
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
      background: "rgba(255, 255, 255, 0.65)",
      backdropFilter: "blur(5px)",
      borderRadius: "24px",
      width: 500,
    },
    links: {
      display: "flex",
      gap: "24px",
    },
    link: {
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "16px",
      textDecoration: "none",
      transition: "color 0.2s",
      cursor: "pointer",
      fontWeight: 420,
      "&:hover": {
        color: "black",
      },
    },
  };

  if (screenWidth < 0) return;

  return (
    <motion.nav
      style={styles.nav}
      initial={{
        border: "1px solid rgba(0, 0, 0, 0)",
      }}
      animate={{
        width: screenWidth > 600 ? "500px" : "calc(100% - 3rem)",
        border:
          scrollY > 10
            ? "1px solid rgba(0, 0, 0, 0.05)"
            : "1px solid rgba(0, 0, 0, 0)",
        padding: scrollY > 10 ? (screenWidth > 600 ? "1.5rem" : "1rem") : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <Logo />
      <div style={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={styles.link}>
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
