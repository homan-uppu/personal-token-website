import React from "react";
import styles from "./Pill.module.css";

interface PillProps {
  isExpanded: boolean;
  text: string;
  onClick?: () => void;
}

const PillComp: React.FC<PillProps> = ({ isExpanded, text, onClick }) => {
  return (
    <div
      className={
        isExpanded
          ? `${styles.pillBubble} ${styles.expanded}`
          : styles.pillBubble
      }
      onClick={onClick}
    >
      <span>{text}</span>
    </div>
  );
};

export default PillComp;
