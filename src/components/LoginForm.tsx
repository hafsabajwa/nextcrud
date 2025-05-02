"use client";

import { useForm } from "react-hook-form";
import mockData from "./mockData.json";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = mockData.find(
        (user: any) =>
          user.email === data.email && user.password === data.password
      );

      if (user) {
        localStorage.setItem("accessToken", user.token);
        console.log("Login successful:", user.token);
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register("email", { required: "Email is required" })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
