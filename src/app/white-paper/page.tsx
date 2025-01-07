import WhitePaper from "@/writing/white-paper.mdx";
import SideMenu from "@/white-paper/SideMenu";
import styles from "./page.module.css";
import { mdxComponents } from "../../../mdx-components";
import Content from "@/white-paper/Content";
import Hero from "@/white-paper/Hero";

export default function Page() {
  return (
    <div className={styles.container}>
      <Hero
        title={"Personal token white paper"}
        date={"Jan 2025"}
        version={"v0.1"}
      />
      <Content>
        <WhitePaper components={mdxComponents} />
      </Content>
    </div>
  );
}
