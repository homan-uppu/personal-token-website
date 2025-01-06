import { getIdFromHeader } from "@/util";
import styles from "./Header.module.css";
import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

type HeaderProps = {
  text: string;
  isActive: boolean;
};

export const Header = ({ text, isActive }: HeaderProps) => {
  const id = getIdFromHeader(text);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.line} />
      <div
        className={`${styles.BaseHeader} ${styles.header} ${
          isActive ? styles.activeH2 : ""
        } ${geistMono.className}`}
        onClick={() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span>{text}</span>
      </div>
      <div className={styles.line} />
    </div>
  );
};

export const SubHeader = ({ text, isActive }: HeaderProps) => {
  const id = getIdFromHeader(text);

  return (
    <div
      className={`${styles.BaseHeader} ${styles.subheader} ${
        isActive ? styles.activeH3 : ""
      }`}
      onClick={() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <span>{text}</span>
      {isActive && <div className={styles.activeIndicator} />}
    </div>
  );
};
