import Navbar from "@/landing/Navbar";

import styles from "./Content.module.css";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface PostPageProps {
  title: string;
  children: React.ReactNode;
  caption?: string;
  pageID?: string;
}

export const PostPage = ({
  title,
  children,
  caption,
  pageID,
}: PostPageProps) => {
  return (
    <div className={styles.container}>
      <Navbar pageID={pageID} />
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title}`}>{title}</h1>
        </div>
        {caption && <div className={styles.caption}>{caption}</div>}
        {children}
      </div>
    </div>
  );
};
