import Navbar from "@/components/Navbar";
import TOC from "./TOC";
import styles from "./Content.module.css";
import titleBgStyles from "./TitleBg.module.css";
import { Geist_Mono, Lora } from "next/font/google";
import Footer from "@/components/Footer/Footer";

const geistMono = Geist_Mono({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

interface PostPageProps {
  title: string;
  children: React.ReactNode;
  caption?: string;
  pageID?: string;
  labels?: string[];
  noFooter?: boolean;
}

export const PostPage = ({
  title,
  children,
  caption,
  pageID,
  labels,
  noFooter,
}: PostPageProps) => {
  return (
    <div className={styles.container}>
      <Navbar pageID={pageID} width={688} />
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${lora.className}`}>{title}</h1>
          {caption && <div className={styles.caption}>{caption}</div>}
        </div>

        {labels && (
          <div className={styles.tocContainer}>
            <TOC labels={labels} />
          </div>
        )}
        {children}
      </div>

      {!noFooter && <Footer marginTop={"2rem"} marginBottom={"2rem"} />}

      <div style={verticalBarLeftStyle}></div>
      <div style={verticalBarRightStyle}></div>
    </div>
  );
};

// Styles for vertical bars
const verticalBarLeftStyle = {
  position: "fixed" as const,
  top: 0,
  left: "calc((100vw - 588px) / 2 - 48px)",
  width: "1px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.025)",
  zIndex: 1,
};

const verticalBarRightStyle = {
  position: "fixed" as const,
  top: 0,
  left: "calc((100vw - 588px) / 2 + 588px + 48px)",
  width: "1px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.025)",
  zIndex: 1,
};
