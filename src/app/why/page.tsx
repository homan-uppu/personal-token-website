import { PostPage } from "@/post/PostPage";
import Annotation from "@/white-paper/Annotation";
import Why from "@/writing/why.mdx";

export default function HowPage() {
  return (
    <PostPage title="Why" pageID="why">
      <Why components={{ Annotation }} />
    </PostPage>
  );
}
