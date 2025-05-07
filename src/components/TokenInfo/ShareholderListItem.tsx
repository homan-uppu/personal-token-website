"use client";

import { ListItem } from "./ListItem";

interface ShareholderListItemProps {
  profilePicSrc: string;
  name: string;
  username: string;
  equityPercentage: number;
}

export const ShareholderListItem = ({
  profilePicSrc,
  name,
  username,
  equityPercentage,
}: ShareholderListItemProps) => {
  return (
    <ListItem
      picSrc={profilePicSrc}
      labelMain={name}
      rightLabel={`${equityPercentage}%`}
      labelSecondary="PT"
    />
  );
};
