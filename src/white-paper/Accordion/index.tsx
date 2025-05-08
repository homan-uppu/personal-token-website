"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

import { useRef } from "react";

const Accordion = ({ children, title }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    // Only scroll when expanding (from collapsed to expanded)
    if (!isExpanded) {
      setIsExpanded(true);

      // INSERT_YOUR_CODE
      // // Store the current scroll position before expanding, so we can reference it if needed
      // const currentScrollY = window.scrollY;

      // setTimeout(() => {
      //   if (containerRef.current) {
      //     const titleEl = containerRef.current.querySelector(
      //       "[data-accordion-title]"
      //     );
      //     if (titleEl) {
      //       const titleRect = (titleEl as HTMLElement).getBoundingClientRect();
      //       const scrollTo = window.scrollY + titleRect.top - 90;
      //       window.scrollTo({
      //         top: scrollTo,
      //         behavior: "instant",
      //       });
      //     }
      //   }
      // }, 0);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <div style={accordionStyles.container} ref={containerRef}>
      <div
        onClick={handleToggle}
        style={accordionStyles.titleContainer}
        data-accordion-title
      >
        <span style={accordionStyles.titleText}>{title}</span>
        <span style={accordionStyles.chevronIcon}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {isExpanded && (
        <div key="content" style={accordionStyles.innerContent}>
          {children}
        </div>
      )}
    </div>
  );
};

// --- Styles ---

const accordionStyles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
    padding: 24,
    gap: "1rem",
    background: "var(--layer2-bg-color)",
    borderRadius: 24,
    marginBottom: 24,
    overflowAnchor: "none" as const,
  },
  titleContainer: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none" as const,
    WebkitTapHighlightColor: "transparent",
    fontWeight: 410,
    overflowAnchor: "none" as const,
  },
  titleText: {
    color: "var(--text-color-primary)",
  },
  chevronIcon: {
    color: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
  },
  innerContent: {
    color: "rgba(0, 0, 0, 0.55)",
    overflowAnchor: "none" as const,
    willChange: "height, opacity",
  },
};

const accordionContentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    marginTop: 8,
    transition: {
      height: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
      marginTop: { duration: 0.18 },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: {
      height: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.12, ease: [0.4, 0, 0.2, 1] },
      marginTop: { duration: 0.12 },
    },
  },
};

const accordionContentTransition = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1],
};

export default Accordion;
