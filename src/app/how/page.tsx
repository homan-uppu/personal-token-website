import { PostPage } from "@/post/PostPage";
import Annotation from "@/white-paper/Annotation";
import How from "@/writing/how.mdx";

export default function HowPage() {
  return (
    <PostPage title="How it works" pageID="how">
      <How components={{ Annotation }} />
    </PostPage>
  );
}
