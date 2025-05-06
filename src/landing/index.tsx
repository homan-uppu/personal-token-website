import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import React from "react";
import { LoadingPage } from "./LoadingPage";
import { Grain } from "./Backgrounds/Grain/Grain";
import Image from "next/image";
import LandingMDX from "@/writing/landing.mdx";
import { PostPage } from "@/post/PostPage";

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={wrapperStyle}>{children}</div>
);

const Landing = () => {
  return (
    <div className={styles.container}>
      <LoadingPage />
      <Grain />

      <div className={styles.content}>
        <div className={styles.main}>
          <PostPage title="invest in people" caption="(actually)">
            <LandingMDX
              components={{
                PersonalTokenComp: () => (
                  <Wrapper>
                    <PersonalTokenComp token={dummyPersonalToken} />
                  </Wrapper>
                ),
                Image: (props: any) => (
                  <Wrapper>
                    <Image {...props} />
                  </Wrapper>
                ),
              }}
            />
          </PostPage>
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
