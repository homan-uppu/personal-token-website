import HeroCaption from "@/writing/hero.mdx";
import GreatsGrid from "./Greats";
import Navbar from "./Navbar";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <GreatsGrid />
      </div>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <HeroCaption />
        </div>
      </div>
    </div>
  );
};

export default Landing;
