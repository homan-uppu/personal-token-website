import { FC } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  caption?: string;
}

export const Card: FC<CardProps> = ({ children, caption }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
};
