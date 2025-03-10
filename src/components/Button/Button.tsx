"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  onClick,
  className = "",
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      style={style}
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default Button;
