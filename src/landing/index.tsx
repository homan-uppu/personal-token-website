import HeroCaption from "@/writing/hero.mdx";
import LandingText from "@/writing/landing.mdx";
import Navbar from "../components/Navbar";
import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import { Block, GreenSpan, Primary, Row, SubHeader } from "./Layout";
import titleBgStyles from "../post/TitleBg.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <Row>
            {/* <div
              style={{ background: "rgba(0, 0, 0 ,0.015" }}
              className={titleBgStyles.titleBg}
            /> */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // backgroundImage: "url(/images/mountain.png)",
                background: "rgba(0, 0, 0, 0.025)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7,
                zIndex: -1,
                // filter: "invert(1) grayscale(1)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle at center, transparent 50%, rgba(255, 255, 255, 0.5) 100%)",
                  zIndex: 1,
                }}
              ></div>
            </div>
            <Block width="100%" height="500px">
              <SubHeader isPrimary>
                A <GreenSpan>PersonalToken</GreenSpan> represents an
                individual's potential.
              </SubHeader>
              <SubHeader>Sell shares, raise $. Back talent earlier.</SubHeader>
            </Block>
          </Row>
          <Row>
            <Block width="100%" height="200px">
              <PersonalTokenComp token={dummyPersonalToken} />
            </Block>
          </Row>
          <Row>
            <Block borderRight>
              <SubHeader>
                <Primary>Grounded</Primary> in ownership of{" "}
                <Primary>companies</Primary> & other{" "}
                <GreenSpan>PersonalToken</GreenSpan>s.
              </SubHeader>
            </Block>
            <Block>poop</Block>
          </Row>
          <Row>
            <Block borderRight>
              <SubHeader>
                <Primary>Raise $</Primary> in exhange for equity in future
                wealth.
              </SubHeader>
            </Block>
            <Block>poop.</Block>
          </Row>
          <Row>
            <Block borderRight>
              <SubHeader>
                Finance <Primary>learning</Primary> without taking on debt.
              </SubHeader>
            </Block>
            <Block>
              <SubHeader>
                Back talent early: <Primary>before</Primary> they start
                companies.
              </SubHeader>
            </Block>
          </Row>
          <Row>
            <Block width="100%">
              <SubHeader>Join the waitlist.</SubHeader>
            </Block>
          </Row>
          <Row>
            <Block width="100%">
              <SubHeader>
                A <Primary>primitive</Primary> designed for the age of
                creativity
              </SubHeader>
              <SubHeader>
                to <Primary>democratize</Primary> opportunity.
              </SubHeader>
            </Block>
          </Row>
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
  left: "calc((100vw - 800px) / 2)",
  width: "1px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.035)",
  zIndex: 1,
};

const verticalBarRightStyle = {
  position: "fixed" as const,
  top: 0,
  left: "calc((100vw - 800px) / 2 + 800px)",
  width: "1px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.035)",
  zIndex: 1,
};

export default Landing;
