import { PostPage } from "@/post/PostPage";
import Annotation from "@/white-paper/Annotation";
import Why from "@/writing/contribute.mdx";

export default function HowPage() {
  return (
    <PostPage title="Contribute" pageID="contribute">
      <Why components={{ Annotation }} />
    </PostPage>
  );
}
