"use client";

import styles from "./IconButton.module.css";

type IconButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      {children}
    </button>
  );
}
