import { TokenType } from "../models";
import styles from "./LineItem.module.css";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });
import { formatNumber } from "@/util";

interface ProfileSectionProps {
  profilePic: string;
  name: string;
  type: TokenType;
}

export function ProfileSection({
  profilePic,
  name,
  type,
}: ProfileSectionProps) {
  return (
    <div className={styles.profileSection}>
      <img src={profilePic} alt={name} className={styles.profilePic} />
      <div className={styles.nameRow}>
        <div className={styles.name}>{name}</div>
        <div className={styles.type + " " + geistMono.className}>
          {type == "PersonalToken" ? "PT" : "INC"}
        </div>
      </div>
    </div>
  );
}

export interface LineItemProps {
  profilePic: string;
  name: string;
  type: TokenType;
  equity?: string;
  value?: string;
  isValueSpecial?: boolean;
  isSelectable?: boolean;
}

export function LineItem({
  profilePic,
  name,
  type,
  equity,
  value,
  isValueSpecial,
  isSelectable,
}: LineItemProps) {
  return (
    <div
      className={`${styles.container} ${isSelectable ? styles.selectable : ""}`}
    >
      <ProfileSection profilePic={profilePic} name={name} type={type} />

      <div className={styles.divider} />

      <div
        className={`${styles.valueSection} ${
          isValueSpecial ? styles.special : ""
        } ${geistMono.className}`}
      >
        {equity && <span>{equity}</span>}
        {equity && value && <span className={styles.separator} />}
        {value && <span>{"$" + formatNumber(Number(value))}</span>}
      </div>
    </div>
  );
}
