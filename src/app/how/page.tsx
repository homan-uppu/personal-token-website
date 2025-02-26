import { PostPage } from "@/post/PostPage";
import Annotation from "@/white-paper/Annotation";
import How from "@/writing/how.mdx";
import { readFileSync } from "fs";
import { join } from "path";
import { mdxComponents } from "../../../mdx-components";
import Accordion from "@/white-paper/Accordion";
import { NetworkTokenScene } from "@/white-paper/Assets";

// In a server component or page
const getMarkdownContent = () => {
  const filePath = join(process.cwd(), "src/writing/how.mdx");
  const fileContent = readFileSync(filePath, "utf-8");
  return fileContent;
};

const parseMdx = (content: string): string[] => {
  const lines = content.split("\n");
  const labels: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("### ")) {
      labels.push(trimmedLine.substring(4));
    }
  }

  return labels;
};

export default function HowPage() {
  const sections = parseMdx(getMarkdownContent());

  return (
    <PostPage title="How it works" pageID="how" labels={sections}>
      <How
        components={{
          ...mdxComponents,
          Annotation,
          Accordion,
          NetworkTokenScene,
        }}
      />
    </PostPage>
  );
}
