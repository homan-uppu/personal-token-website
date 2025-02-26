import Navbar from "@/components/Navbar";
import TOC from "./TOC";
import styles from "./Content.module.css";
import { Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer/Footer";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface PostPageProps {
  title: string;
  children: React.ReactNode;
  caption?: string;
  pageID?: string;
  labels?: string[];
}

export const PostPage = ({
  title,
  children,
  caption,
  pageID,
  labels,
}: PostPageProps) => {
  return (
    <div className={styles.container}>
      <Navbar pageID={pageID} />
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title}`}>{title}</h1>
        </div>
        {caption && <div className={styles.caption}>{caption}</div>}
        {labels && (
          <div className={styles.tocContainer}>
            <TOC labels={labels} />
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};
