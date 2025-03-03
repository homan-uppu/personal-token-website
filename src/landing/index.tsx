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
          <HeroCaption />
          <div className={styles.visual}>
            <PersonalTokenComp token={dummyPersonalToken} />
          </div>
          <LandingText />
          {/* <div className={styles.footerContainer}>
            <Footer />
          </div> */}
        </div>
      </div>
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

export default Landing;
