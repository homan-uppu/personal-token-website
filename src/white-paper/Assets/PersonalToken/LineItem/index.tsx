import { TokenType } from "../models";
import styles from "./LineItem.module.css";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });
import { formatNumber } from "@/util";

interface ProfileSectionProps {
  profilePic: string; // Can be image URL or hex color
  name: string;
  type: TokenType;
}

export function ProfileSection({
  profilePic,
  name,
  type,
}: ProfileSectionProps) {
  const isHexColor = profilePic.startsWith("#");

  return (
    <div className={styles.profileSection}>
      {isHexColor ? (
        <div
          className={styles.profilePic}
          style={{
            background: `linear-gradient(45deg, ${profilePic}, ${profilePic}dd, ${profilePic}aa)`,
          }}
        />
      ) : (
        <img src={profilePic} alt={name} className={styles.profilePic} />
      )}
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
  isMinimal?: boolean;
}

export function LineItem({
  profilePic,
  name,
  type,
  equity,
  value,
  isValueSpecial,
  isSelectable,
  isMinimal,
}: LineItemProps) {
  return (
    <div
      className={`${styles.container} ${isSelectable ? styles.selectable : ""}`}
    >
      <ProfileSection profilePic={profilePic} name={name} type={type} />

      {!isMinimal && (
        <>
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
        </>
      )}
    </div>
  );
}
