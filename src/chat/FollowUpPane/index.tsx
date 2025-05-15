import React from "react";
import styles from "./FollowUpPane.module.css";

interface FollowUpProps {
  label: React.ReactNode;
  onClick?: () => void;
}

const FollowUp: React.FC<FollowUpProps> = ({ label, onClick }) => {
  return (
    <div className={styles.followUp} onClick={onClick}>
      {label}
    </div>
  );
};

interface FollowUpPaneProps {
  followUps: string[];
  onClick: (label: string) => void;
}

const FollowUpPane: React.FC<FollowUpPaneProps> = ({ followUps, onClick }) => {
  if (!followUps || followUps.length === 0) return null;

  return (
    <div className={styles.followUpPaneContainer}>
      {followUps.map((label, idx) => (
        <FollowUp key={idx} label={label} onClick={() => onClick(label)} />
      ))}
    </div>
  );
};

export default FollowUpPane;
