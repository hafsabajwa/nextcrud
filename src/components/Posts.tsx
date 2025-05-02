"use client";

import { useGetPostsQuery } from "@/store/apiSlice";
import React from "react";

export const Post: React.FC = () => {
  const { data, isError, isLoading } = useGetPostsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts.</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data &&
          data.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
