"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EmailCapture.module.css";

// Custom hook to get screen width
function useScreenWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

// Email validation regex (simple, but effective for most cases)
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const EmailCapture: React.FC = () => {
  const [state, setState] = useState<"input" | "success">("input");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenWidth = useScreenWidth();

  // Remove shake after animation
  useEffect(() => {
    if (shake) {
      const timeout = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [shake]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setTouched(true);
  };

  const handleSubmit = async () => {
    if (isValidEmail(email)) {
      setState("success");
      // Fire and forget: send to backend, but don't wait for result
      fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).catch(() => {
        // Ignore errors, user always sees checkmark
      });
    } else {
      setShake(true);
      setTouched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Show arrow only if valid email
  const showArrow = isValidEmail(email);

  // --- Animation spring config for fast, springy transition ---
  const springTransition = {
    type: "spring",
    stiffness: 600,
    damping: 28,
    mass: 0.7,
  };

  // Responsive classes for rowWrapper and label
  const rowWrapperClass = [
    styles.rowWrapper,
    screenWidth < 700 ? styles.rowWrapperCol : styles.rowWrapperRow,
  ].join(" ");

  const labelClass = [
    styles.label,
    screenWidth < 700 ? styles.labelCol : "",
  ].join(" ");

  return (
    <div className={styles.container} id="waitlist">
      <div className={rowWrapperClass}>
        <label className={labelClass} htmlFor="email-capture-input">
          early access:
        </label>
        <div className={styles.inputWrapper}>
          {/* Input is always rendered, but disabled and unfocusable in success state */}
          <input
            id="email-capture-input"
            ref={inputRef}
            type="email"
            placeholder="enter your email."
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={[styles.input, shake ? styles.inputShake : ""].join(" ")}
            style={{
              cursor: state === "success" ? "default" : "text",
            }}
            autoComplete="email"
            spellCheck={false}
            disabled={state === "success"}
            tabIndex={state === "success" ? -1 : 0}
            readOnly={state === "success"}
          />
          {/* Arrow or checkmark in the same spot */}
          <div className={styles.iconSlot}>
            <AnimatePresence mode="wait" initial={false}>
              {state === "input" && showArrow && (
                <motion.button
                  key="arrow"
                  type="button"
                  onClick={handleSubmit}
                  className={styles.arrowButton}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={springTransition}
                  tabIndex={0}
                  aria-label="Submit email"
                >
                  <ArrowIcon />
                </motion.button>
              )}
              {state === "success" && (
                <motion.span
                  key="checkmark"
                  initial={{ opacity: 0, scale: 0.8, x: 16 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 16 }}
                  transition={springTransition}
                  className={styles.checkmarkButton}
                  aria-label="Success"
                >
                  <CheckmarkIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowIcon: React.FC = () => {
  const [hover, setHover] = useState(false);
  return (
    <span
      className={styles.arrowIconWrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          display: "block",
          transition: "fill 0.18s",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6738 8.43445H0V6.69664H12.6738L7.20582 1.22863L8.43445 0L16 7.56555L8.43445 15.1311L7.20582 13.9025L12.6738 8.43445Z"
          fill={hover ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)"}
          style={{
            transition: "fill 0.18s",
          }}
        />
      </svg>
    </span>
  );
};

const CheckmarkIcon: React.FC = () => (
  <span className={styles.arrowIconWrapper}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
      }}
    >
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill="#04ab46"
      />
    </svg>
  </span>
);

export default EmailCapture;
