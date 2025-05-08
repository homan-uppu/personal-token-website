"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Responsive rowWrapper style
  const rowWrapperStyle = {
    ...emailCaptureStyles.rowWrapper,
    ...(screenWidth < 700
      ? emailCaptureStyles.rowWrapperCol
      : emailCaptureStyles.rowWrapperRow),
  };

  // Responsive label style
  const labelStyle = {
    ...emailCaptureStyles.label,
    ...(screenWidth < 700 ? emailCaptureStyles.labelCol : {}),
  };

  return (
    <div style={emailCaptureStyles.container} id="waitlist">
      <div style={rowWrapperStyle}>
        <label style={labelStyle} htmlFor="email-capture-input">
          early access:
        </label>
        <div style={emailCaptureStyles.inputWrapper}>
          {/* Input is always rendered, but disabled and unfocusable in success state */}
          <input
            id="email-capture-input"
            ref={inputRef}
            type="email"
            placeholder="enter your email."
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              ...emailCaptureStyles.input,
              ...(shake ? emailCaptureStyles.inputShake : {}),
              cursor: state === "success" ? "default" : "text",
            }}
            autoComplete="email"
            spellCheck={false}
            disabled={state === "success"}
            tabIndex={state === "success" ? -1 : 0}
            readOnly={state === "success"}
          />
          {/* Arrow or checkmark in the same spot */}
          <div style={emailCaptureStyles.iconSlot}>
            <AnimatePresence mode="wait" initial={false}>
              {state === "input" && showArrow && (
                <motion.button
                  key="arrow"
                  type="button"
                  onClick={handleSubmit}
                  style={emailCaptureStyles.arrowButton}
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
                  style={emailCaptureStyles.checkmarkButton}
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
      style={arrowIconStyles.wrapper}
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
  <span style={arrowIconStyles.wrapper}>
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

// --- Styles ---

const borderRadius = 16;
const border = "1px solid rgba(0, 0, 0, 0.03)";

const emailCaptureStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: border,
    minHeight: "54px",
    width: "100%",
    background: "var(--layer2-bg-color)", // dark background for emphasis
    borderRadius: borderRadius,
    boxSizing: "border-box" as const,
    padding: "24px",
    marginTop: "96px",
    marginBottom: "96px",
  } as React.CSSProperties,

  // Default row (desktop)
  rowWrapper: {
    display: "flex",
    width: "100%",
    gap: 8,
    padding: "0 0",
  } as React.CSSProperties,

  // Row direction for desktop
  rowWrapperRow: {
    flexDirection: "row" as const,
    alignItems: "center",
  } as React.CSSProperties,

  // Column direction for mobile
  rowWrapperCol: {
    flexDirection: "column" as const,
    alignItems: "stretch",
    gap: 8,
  } as React.CSSProperties,

  label: {
    color: "black", // white text for label
    fontWeight: 500,
    fontSize: 16,
    marginRight: 0,
    minWidth: 110,
    letterSpacing: -0.2,
    textAlign: "left" as const,
    userSelect: "none" as const,
    flexShrink: 0,
    marginBottom: 0,
  } as React.CSSProperties,

  // Extra label style for mobile (column)
  labelCol: {
    marginBottom: 6,
    minWidth: 0,
    textAlign: "left" as const,
  } as React.CSSProperties,

  inputWrapper: {
    position: "relative" as const,
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    borderRadius: borderRadius,
    minHeight: 48,
    transition: "box-shadow 0.18s",
    flexGrow: 1,
  } as React.CSSProperties,

  input: {
    width: "100%",
    fontSize: 16,
    border,
    borderRadius: borderRadius / 1.5,
    outline: "none",
    padding: "14px 48px 14px 20px",
    background: "#FAFAFA", // lighter shade of dark than container
    color: "#000", // flip color of text to white
    fontWeight: 500,
    transition: "border 0.18s, box-shadow 0.18s",
    boxSizing: "border-box" as const,
    zIndex: 1,
  } as React.CSSProperties,

  inputShake: {
    animation: "shake 0.4s cubic-bezier(.36,.07,.19,.97) both",
  } as React.CSSProperties,

  // This slot is always present, for arrow/checkmark, absolutely positioned
  iconSlot: {
    position: "absolute" as const,
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    height: 36,
    width: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    pointerEvents: "none", // let button handle pointer events, but not the slot
  } as React.CSSProperties,

  arrowButton: {
    background: "none",
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
    transition: "opacity 0.18s, background 0.18s",
    pointerEvents: "auto", // allow pointer events for the button
  } as React.CSSProperties,

  checkmarkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
    pointerEvents: "none", // checkmark is not interactive
  } as React.CSSProperties,
};

// Arrow icon wrapper for hover state
const arrowIconStyles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
    borderRadius: "50%",
    transition: "background 0.18s",
  } as React.CSSProperties,
};

// --- Keyframes for shake animation (inject into document head) ---
if (
  typeof window !== "undefined" &&
  !document.getElementById("email-capture-shake-keyframes")
) {
  const style = document.createElement("style");
  style.id = "email-capture-shake-keyframes";
  style.innerHTML = `
    @keyframes shake {
      10%, 90% { transform: translateX(-1px); }
      20%, 80% { transform: translateX(2px); }
      30%, 50%, 70% { transform: translateX(-4px); }
      40%, 60% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
}

export default EmailCapture;
