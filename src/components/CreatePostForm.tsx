"use client";

import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "@/store/apiSlice";

type FormValues = {
  title: string;
  body: string;
};

export const CreatePostForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [createPost, { isLoading, isError, isSuccess }] = useCreatePostMutation();

  const onSubmit = async (data: FormValues) => {
    await createPost(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} />
      </div>
      <div>
        <label>Body</label>
        <textarea {...register("body", { required: true })} />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Create Post"}
      </button>
      {isSuccess && <p>Post created successfully!</p>}
      {isError && <p>Error creating post.</p>}
    </form>
  );
};
