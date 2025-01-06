import { getIdFromHeader } from "@/util";
import styles from "./Header.module.css";
import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

type BaseHeaderProps = {
  text: string;
  isActive: boolean;
  className: string;
  activeClassName: string;
  additionalClassName?: string;
};

const BaseHeader = ({
  text,
  isActive,
  className,
  activeClassName,
  additionalClassName,
}: BaseHeaderProps) => {
  const id = getIdFromHeader(text);

  return (
    <div
      className={`${className} ${isActive ? activeClassName : ""} ${
        additionalClassName || ""
      }`}
      onClick={() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {text}
    </div>
  );
};

export const Header = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => {
  return (
    <BaseHeader
      text={text}
      isActive={isActive}
      className={styles.header}
      activeClassName={styles.activeH2}
      additionalClassName={geistMono.className}
    />
  );
};

export const SubHeader = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => {
  return (
    <BaseHeader
      text={text}
      isActive={isActive}
      className={styles.subheader}
      activeClassName={styles.activeH3}
    />
  );
};
