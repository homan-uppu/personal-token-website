import React from "react";

import styles from "./Caption.module.css";

interface CaptionProps {
  label: React.ReactNode;
}

const Caption: React.FC<CaptionProps> = ({ label }) => (
  <span className={styles.container}>{label}</span>
);

export default Caption;
