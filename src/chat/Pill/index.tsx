import React from "react";
import styles from "./Pill.module.css";
import Caption from "@/components/Caption";

interface PillProps {
  isExpanded: boolean;
  text: string;
  onClick?: () => void;
  caption?: string;
}

const PillComp: React.FC<PillProps> = ({
  isExpanded,
  text,
  onClick,
  caption,
}) => {
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
      {caption && (
        <div className={styles.pillCaption}>
          <Caption label={caption} />
        </div>
      )}
    </div>
  );
};

export default PillComp;
