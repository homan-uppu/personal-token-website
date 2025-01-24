import WhitePaper from "@/writing/white-paper.mdx";
import styles from "./page.module.css";
import { mdxComponents } from "../../../mdx-components";
import Content from "@/white-paper/Content";
import Hero from "@/white-paper/Hero";
import { readFileSync } from "fs";
import { join } from "path";

import {
  PersonalTokenComp,
  Card,
  CapitalGainsAnimation,
  NetworkTokenScene,
  SyncScene,
} from "@/white-paper/Assets";
import { parseMdxSections } from "@/util";
import Annotation from "@/white-paper/Annotation";

// In a server component or page
const getMarkdownContent = () => {
  const filePath = join(process.cwd(), "src/writing/white-paper.mdx");
  const fileContent = readFileSync(filePath, "utf-8");
  return fileContent;
};

export default function Page() {
  const sections = parseMdxSections(getMarkdownContent());

  return (
    <div className={styles.container}>
      <Hero title={"white paper"} date={"Jan 2025"} version={"v0.1"} />
      <Content sections={sections}>
        <WhitePaper
          components={{
            ...mdxComponents,
            PersonalTokenComp,
            Card,
            CapitalGainsAnimation,
            NetworkTokenScene,
            SyncScene,
            Annotation,
          }}
        />
      </Content>
    </div>
  );
}
