// src/components/MagicLinkButton.tsx
"use client";

import { useState } from "react";
import { useMagicLink } from "@/hooks/auth/use-magic-link";
import { toast } from "react-hot-toast";

export const MagicLinkButton = () => {
  const [email, setEmail] = useState("");
  const { mutateAsync, isPending } = useMagicLink();

  const handleMagicLink = async () => {
    if (!email) return toast.error("Enter yer email first, Cap’n!");

    try {
      await mutateAsync({email});
      toast.success("Magic link sent! Check yer inbox, ye salty dog!");
    } catch (err: any) {
      toast.error(err.message || "That spell fizzled...");
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="email"
        placeholder="Email for magic login"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
      />
      <button
        onClick={handleMagicLink}
        disabled={isPending}
        className="w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {isPending ? "Sending Magic..." : "Send Magic Link"}
      </button>
    </div>
  );
};
