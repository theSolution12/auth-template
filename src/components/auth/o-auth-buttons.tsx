// src/components/OAuthButtons.tsx
"use client";

import { useOAuth } from "@/hooks/auth/use-oauth";
import { toast } from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const OAuthButtons = () => {
  const { mutateAsync: signInWithProvider, isPending } = useOAuth();

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      await signInWithProvider({provider});
      toast.success(`Redirecting to ${provider}...`);
    } catch (err: any) {
      toast.error(err.message || "OAuth failed, matey!");
    }
  };

  return (
    <div className="space-y-2 flex">
      <button
        type="button"
        onClick={() => handleOAuth("google")}
        disabled={isPending}
        className="w-full p-2 flex items-center justify-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => handleOAuth("github")}
        disabled={isPending}
        className="w-full p-2 flex items-center justify-center gap-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition"
      >
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
};
