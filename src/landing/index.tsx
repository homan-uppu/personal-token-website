import HeroCaption from "@/writing/hero.mdx";
import GreatsGrid from "./Greats";
import Navbar from "./Navbar";
import styles from "./Landing.module.css";
import Link from "next/link";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <GreatsGrid />
      </div>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <HeroCaption
            components={{
              a: ({ href, children }) => <Link href={href}>{children}</Link>,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
