"use client";

import { useGetPostsQuery } from "@/store/apiSlice";

export const Posts = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts.</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts?.map((post: any) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
