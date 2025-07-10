import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/services/auth.services";

export const useOAuth = () => {
  return useMutation({
    mutationFn: ({ provider }: { provider: "google" | "github" }) =>
      signInWithOAuth(provider),
  });
};