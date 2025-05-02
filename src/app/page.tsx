import { CreatePostForm } from "@/components/CreatePostForm";
import { Post } from "@/components/Posts";


export default function Home() {
  return (
    <>
      <CreatePostForm />
      <Post />
    </>
  );
}
