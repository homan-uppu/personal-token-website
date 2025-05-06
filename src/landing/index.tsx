import styles from "./Landing.module.css";
import { PersonalTokenComp } from "@/components/PersonalToken";
import { dummyPersonalToken } from "@/util/models";
import React from "react";
import { LoadingPage } from "./LoadingPage";
import { Grain } from "./Backgrounds/Grain/Grain";
import Image from "next/image";
import LandingMDX from "@/writing/landing.mdx";
import { PostPage } from "@/post/PostPage";

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
                  <PersonalTokenComp token={dummyPersonalToken} />
                ),
                Image,
              }}
            />
          </PostPage>
        </div>
      </div>
    </div>
  );
};

export default Landing;
