import React, { useEffect, useState } from "react";
import { Sender } from "@/util/chat";
import { motion } from "framer-motion";
import styles from "./Bubble.module.css";
interface BubbleFooter {
  label: string;
  link?: string;
}

interface BubbleProps {
  children?: React.ReactNode;
  footer: BubbleFooter;
  sender: Sender;
  isLoading?: boolean;
  showFooter?: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
  children,
  footer,
  sender,
  isLoading = false,
  showFooter = false,
}) => {
  // Choose bubble style based on sender
  const bubbleStyle =
    sender === Sender.Homan ? bubbleHomanStyle : bubbleUserStyle;

  if (isLoading) {
    return (
      <div style={bubbleWrapperLoadingStyle}>
        <div style={bubbleStyle}>
          <div style={spinnerContainerStyle}>
            <TypingIndicator />
          </div>
        </div>
        <div style={footerContainerStyle}>
          <TypingFooterLabel />
        </div>
      </div>
    );
  }

  return (
    <div style={bubbleWrapperStyle}>
      <div style={bubbleStyle}>
        <div>{children}</div>
      </div>
      {showFooter && (
        <div style={footerContainerStyle}>
          {footer.link ? (
            <a
              href={footer.link}
              className={styles.footerLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footer.label}
            </a>
          ) : (
            <span className={styles.footerLabel}>{footer.label}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Bubble;

// Typing indicator with three animated dots using framer-motion
const TypingIndicator: React.FC = () => {
  const dotTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    duration: 1.2,
  };

  return (
    <div style={typingIndicatorContainerStyle}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={typingDotStyle}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            y: [0, -6, 0],
          }}
          transition={{
            ...dotTransition,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Animated footer label for loading state
const TypingFooterLabel: React.FC = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.footerLabel} style={footerLabelStyle}>
      homan is typing{"".padEnd(dotCount, ".")}
    </span>
  );
};

// =====================
// Inline Styles
// =====================

const bubbleWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: 480,
};

const bubbleWrapperLoadingStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "auto",
  minWidth: 160,
  maxWidth: 480,
};

const bubbleUserStyle: React.CSSProperties = {
  background: "#00b7ff",
  color: "white",
  border: "1px solid rgba(0, 0, 0, 0.03)",
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  width: "100%",
};

const bubbleHomanStyle: React.CSSProperties = {
  background: "#fafafa",
  border: "none",
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const spinnerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 32,
  width: "100%",
};

const typingIndicatorContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  height: 24,
};

const typingDotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "#bdbdbd",
  display: "inline-block",
};

const footerContainerStyle: React.CSSProperties = {
  marginTop: 4,
};

const footerLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#909093",
  textDecoration: "none",
  fontWeight: 400,
  marginLeft: 16,
  cursor: "pointer",
};
