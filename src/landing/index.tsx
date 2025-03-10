import HeroCaption from "@/writing/hero.mdx";
import LandingText from "@/writing/landing.mdx";
import Navbar from "../components/Navbar";
import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import {
  Block,
  Body,
  GreenSpan,
  LandingImage,
  Primary,
  Row,
  SubHeader,
} from "./Layout";
import titleBgStyles from "../post/TitleBg.module.css";
import { DottedGrid } from "./Backgrounds/DottedGrid/DottedGrid";
import { Lines } from "./Backgrounds/Lines/Lines";
import MotionBg from "./Backgrounds/MotionBg/MotionBg";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <Row>
            <Block width="100%" height="500px" centered>
              <SubHeader isPrimary>
                A <GreenSpan>PersonalToken</GreenSpan> represents an
                individual's potential.
              </SubHeader>
              <SubHeader>
                Sell shares to raise $. Back talent earlier.
              </SubHeader>
              <Lines direction={false} width={800} height={500} />
              <Lines direction={true} width={800} height={500} />
            </Block>
          </Row>
          <Row>
            <Block width="100%" height="200px" background="white">
              <PersonalTokenComp token={dummyPersonalToken} />
            </Block>
          </Row>
          <Row>
            <Block borderRight>
              <SubHeader>
                <Primary>Grounded in real value.</Primary>
              </SubHeader>
              <Body>
                A PersonalToken's value is grounded in its owner's equities in
                companies and other personal tokens.
              </Body>
              <Lines direction={false} />
            </Block>
            <Block noPadding centered background="white" lighting>
              <LandingImage src="/images/grounded.png" alt="." />
            </Block>
          </Row>
          <Row>
            <Block noPadding centered background="white" borderRight lighting>
              <LandingImage src="/images/equity-pie.png" alt="." />
            </Block>
            <Block>
              <SubHeader>
                <Primary>Raise $</Primary>
              </SubHeader>
              <Body>
                By giving up equity in your future outcomes through shares of
                your token.
              </Body>
              <Lines direction={true} />
            </Block>
          </Row>
          <Row>
            <Block borderRight>
              <SubHeader>
                <Primary>Learn without debt.</Primary>
              </SubHeader>
              <Body>
                Finance learning and ambitious experiments without taking on
                debt. Share risk with investors.
              </Body>
              <Lines direction={false} />
            </Block>
            <Block>
              <SubHeader>
                <Primary>Back talent early.</Primary>
              </SubHeader>
              <Body>
                Invest in talent before they start companies & in those who may
                never start one, but still go on to do great work.
              </Body>
              <Lines direction={true} />
            </Block>
          </Row>
          <Row>
            <Block width="100%" centered background="white">
              <SubHeader>
                <Primary>Join the waitlist.</Primary>
              </SubHeader>
            </Block>
          </Row>
          <Row>
            <Block width="100%" centered>
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
