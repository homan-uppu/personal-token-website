import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import React from "react";
import Image from "next/image";
import LandingMDX from "@/writing/landing.mdx";
import { PostPage } from "@/post/PostPage";
import EmailCapture from "@/components/EmailCapture/EmailCapture";
import Accordion from "@/white-paper/Accordion";
import Chat from "@/chat";

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={wrapperStyle}>{children}</div>
);

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "48px",
  marginBottom: "64px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100px",
};

export default Landing;
