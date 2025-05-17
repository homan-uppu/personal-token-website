import styles from "./Landing.module.css";
import React from "react";
import Chat from "@/chat";
import Navbar from "@/components/Navbar";

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={wrapperStyle}>{children}</div>
);

const Landing = () => {
  return (
    <div className={styles.container}>
      <Navbar currentPage="landing" />
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
