import styles from "./LineItem.module.css";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

export enum LineItemType {
  PersonalToken = "PersonalToken",
  Company = "Company",
}

export interface LineItemProps {
  profilePic: string;
  name: string;
  type: LineItemType;
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
      <div className={styles.profileSection}>
        <img src={profilePic} alt={name} className={styles.profilePic} />
        <div className={styles.nameRow}>
          <div className={styles.name}>{name}</div>
          <div className={styles.type}>
            {type == "PersonalToken" ? "PT" : "INC"}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div
        className={`${styles.valueSection} ${
          isValueSpecial ? styles.special : ""
        } ${geistMono.className}`}
      >
        {equity && <span>{equity}</span>}
        {equity && value && <span className={styles.separator} />}
        {value && <span>{value}</span>}
      </div>
    </div>
  );
}
