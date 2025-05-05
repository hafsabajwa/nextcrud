"use client";

import { useState } from "react";
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../store/apiSlice";

export const Posts: React.FC = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [updatePost, setUpdatePost] = useState({ id: "", title: "", body: "" });
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [operation, setOperation] = useState<
    "create" | "update" | "delete" | "view"
  >("view");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorLoadingPosts,
    refetch,
  } = useGetPostsQuery(undefined);
  const [createPost, { isLoading: isCreating, isError: isErrorCreating }] =
    useCreatePostMutation();
  const [
    updatePostMutation,
    { isLoading: isUpdating, isError: isErrorUpdating },
  ] = useUpdatePostMutation();
  const [
    deletePostMutation,
    { isLoading: isDeleting, isError: isErrorDeleting },
  ] = useDeletePostMutation();

  const handleCreatePost = async () => {
    try {
      const created = await createPost(newPost).unwrap();
      setNewPost({ title: "", body: "" });
      setOperation("view");
      setFeedbackMessage(
        `Post titled "${created.title}" created successfully.`
      );
      refetch();
    } catch {
      setFeedbackMessage("Error creating post.");
    }
  };

  const handleUpdatePost = async () => {
    try {
      const updated = await updatePostMutation(updatePost).unwrap();
      setUpdatePost({ id: "", title: "", body: "" });
      setOperation("view");
      setFeedbackMessage(
        `Post titled "${updated.title}" updated successfully.`
      );
      refetch();
    } catch {
      setFeedbackMessage("Error updating post.");
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePostMutation(postIdToDelete).unwrap();
      setPostIdToDelete("");
      setOperation("view");
      setFeedbackMessage(
        `Post with ID "${postIdToDelete}" deleted successfully.`
      );
      refetch();
    } catch {
      setFeedbackMessage("Error deleting post.");
    }
  };

  const handleOperationChange = (op: "create" | "update" | "delete") => {
    setOperation(op);
    setFeedbackMessage("");
  };

  return (
    <div>
      <h2>CRUD Operations</h2>
      <div>
        <button onClick={() => handleOperationChange("create")}>
          Create Post
        </button>
        <button onClick={() => handleOperationChange("update")}>
          Update Post
        </button>
        <button onClick={() => handleOperationChange("delete")}>
          Delete Post
        </button>
      </div>

      {feedbackMessage && <p>{feedbackMessage}</p>}

      {operation === "view" && (
        <div>
          <h3>View Posts</h3>
          {isLoadingPosts ? (
            <p>Loading posts...</p>
          ) : isErrorLoadingPosts ? (
            <p>Error loading posts.</p>
          ) : (
            <ul>
              {posts?.map((post: any) => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {operation === "create" && (
        <div>
          <h3>Create Post</h3>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            placeholder="Body"
          />
          <button onClick={handleCreatePost} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Post"}
          </button>
          {isErrorCreating && <p>Error creating post.</p>}
        </div>
      )}

      {operation === "update" && (
        <div>
          <h3>Update Post</h3>
          <input
            type="text"
            value={updatePost.id}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, id: e.target.value })
            }
            placeholder="Post ID"
          />
          <input
            type="text"
            value={updatePost.title}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            value={updatePost.body}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, body: e.target.value })
            }
            placeholder="Body"
          />
          <button onClick={handleUpdatePost} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Post"}
          </button>
          {isErrorUpdating && <p>Error updating post.</p>}
        </div>
      )}

      {operation === "delete" && (
        <div>
          <h3>Delete Post</h3>
          <input
            type="text"
            value={postIdToDelete}
            onChange={(e) => setPostIdToDelete(e.target.value)}
            placeholder="Post ID to delete"
          />
          <button onClick={handleDeletePost} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Post"}
          </button>
          {isErrorDeleting && <p>Error deleting post.</p>}
        </div>
      )}
    </div>
  );
};
