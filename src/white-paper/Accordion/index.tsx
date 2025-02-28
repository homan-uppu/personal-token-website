"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
}

const ChevronDown = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ChevronUp = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const Accordion = ({ children, title }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={styles.container}
      style={{ paddingBottom: isExpanded ? "0.5rem" : "1.5rem" }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.titleContainer}
      >
        <span style={{ color: "var(--text-color-primary)" }}>{title}</span>
        <span style={{ color: "rgba(0, 0, 0, 0.2)" }}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {isExpanded && <div className={styles.innerContent}>{children}</div>}
    </div>
  );
};

export default Accordion;
