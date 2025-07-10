// src/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/auth/use-login";
import { useSignup } from "@/hooks/auth/use-signup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  mode: "login" | "signup";
};

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutateAsync: login, isPending: loggingIn } = useLogin();
  const { mutateAsync: signup, isPending: signingUp } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const result = await login({ email, password });

        if (!result.user) {
          toast.error("Login failed, Cap’n!");
          return;
        }

        toast.success("Logged in, Cap’n!");
        router.push("/dashboard");
      } else {
        const result = await signup({ email, password });

        if (!result.user) {
          toast.error("Signup failed!");
          return;
        }

        toast.success("Signup successful! Check yer inbox!");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "There was a storm at sea.");
    }
  };


  const loading = mode === "login" ? loggingIn : signingUp;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md max-w-sm w-full"
    >
      <h2 className="text-xl font-bold text-center capitalize">
        {mode === "login" ? "Welcome back!" : "Join the crew!"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 rounded-lg bg-black text-white font-semibold hover:bg-zinc-800 transition"
      >
        {loading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};
