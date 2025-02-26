import HeroCaption from "@/writing/hero.mdx";
import LandingText from "@/writing/landing.mdx";
import Navbar from "../components/Navbar";
import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import Footer from "@/components/Footer/Footer";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <div className={styles.visual}>
            <PersonalTokenComp token={dummyPersonalToken} />
          </div>
          <HeroCaption />
          <LandingText />
        </div>
      </div>
      <div className={styles.footerContainer}>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
};

export default Landing;
