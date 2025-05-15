import React from "react";
import { Sender } from "@/util/chat";
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
  const bubbleClass =
    sender === Sender.Homan ? styles.bubbleHoman : styles.bubble;

  if (isLoading) {
    return (
      <div className={styles.bubbleWrapper}>
        <div className={bubbleClass}>
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bubbleWrapper}>
      <div className={bubbleClass}>
        <div>{children}</div>
      </div>
      {showFooter && (
        <div className={styles.footerContainer}>
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
