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
import { Lines } from "./Backgrounds/Lines/Lines";
import Footer from "@/components/Footer/Footer";
import React from "react";
import { WaitlistBlock } from "./WaitlistBlock";
import { LoadingPage } from "./LoadingPage";
import { Grain } from "./Backgrounds/Grain/Grain";
import { CONSTANTS } from "@/util";
import Image from "next/image";
import { Suspense } from "react";

const Landing = () => {
  return (
    <div className={styles.container}>
      <LoadingPage />
      <Grain />

      <Suspense fallback={<div></div>}>
        <div
          style={{
            position: "absolute",
            top: "-5rem",
            left: 0,
            width: "100%",
            height: "calc(703px + 5rem)",
            overflow: "hidden",
            zIndex: -1,
          }}
        >
          <Image
            src="/images/landing.png"
            alt="Landing"
            width={2000}
            height={1000}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.2, // Significantly reduced opacity to lighten the background
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "40%", // Increased gradient height
              background:
                "linear-gradient(to bottom, rgba(253, 253, 253, 0), rgba(253, 253, 253, 1))",
              pointerEvents: "none",
            }}
          ></div>
        </div>
      </Suspense>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.main}>
          <FullScreenDivider />
          <Row>
            <Block width="100%" height="500px" centered centerLight>
              <SubHeader isPrimary>
                A <GreenSpan>PersonalToken</GreenSpan> represents an
                individual's potential.
              </SubHeader>
              <SubHeader>
                Sell shares. Raise capital. Back talent earlier.
              </SubHeader>
            </Block>
          </Row>
          <FullScreenDivider />
          <Row>
            <Block width="100%" height="200px">
              <PersonalTokenComp token={dummyPersonalToken} />
            </Block>
          </Row>
          <FullScreenDivider />
          <Row>
            <Block background={CONSTANTS.blockGradientBg} borderBottomMobile>
              <SubHeader>
                <Primary>Grounded in real value.</Primary>
              </SubHeader>
              <Body>
                A PersonalToken's value is grounded in its owner's equities in
                companies and other personal tokens.
              </Body>
            </Block>
            <Block noPadding centered lighting alignItemsMobile="center">
              <LandingImage src="/images/grounded.png" alt="." />
            </Block>
          </Row>
          <FullScreenDivider />
          <Row reverseInMobile>
            <Block noPadding centered lighting alignItemsMobile="center">
              <LandingImage src="/images/equity-pie.png" alt="." />
            </Block>
            <Block background={CONSTANTS.blockGradientBg} borderBottomMobile>
              <SubHeader>
                <Primary>Raise $</Primary>
              </SubHeader>
              <Body>
                By giving up equity in your future outcomes through shares of
                your token.
              </Body>
            </Block>
          </Row>
          <FullScreenDivider />
          <Row>
            <Block background={CONSTANTS.blockGradientBg} borderBottomMobile>
              <SubHeader>
                <Primary>Learn without debt.</Primary>
              </SubHeader>
              <Body>
                Finance learning and ambitious experiments without taking on
                debt. Share risk with investors.
              </Body>
            </Block>
            <Block background={CONSTANTS.blockGradientBg}>
              <SubHeader>
                <Primary>Back talent early.</Primary>
              </SubHeader>
              <Body>
                Invest in talent before they start companies & in those who may
                never start one, but still go on to do great work.
              </Body>
            </Block>
          </Row>
          <FullScreenDivider />
          <Row>
            <WaitlistBlock />
          </Row>
          <FullScreenDivider />
          <Row>
            <Block width="100%" centered alignItemsMobile="start">
              <SubHeader>
                A <Primary>primitive</Primary> designed for the age of
                creativity
              </SubHeader>
              <SubHeader>
                to <Primary>democratize</Primary> opportunity.
              </SubHeader>
            </Block>
          </Row>
          <FullScreenDivider />

          <Footer border="none" />
        </div>
      </div>

      <div style={verticalBarLeftStyle}></div>
      <div style={verticalBarRightStyle}></div>
      <div style={verticalBarCenterStyle}></div>
    </div>
  );
};

// FullScreenDivider component for creating a full-width horizontal divider
export const FullScreenDivider = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.035)",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    ></div>
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

const verticalBarCenterStyle = {
  position: "fixed" as const,
  top: 0,
  left: "50%",
  width: "1px",
  height: "100vh",
  // backgroundColor: "rgba(0, 0, 0, 0.025)",
  zIndex: 0,
  borderLeft: "1px dashed rgba(0, 0, 0, 0.035)",
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
