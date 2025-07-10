import { useMutation } from "@tanstack/react-query";
import { signInWithMagicLink } from "@/services/auth.services";

export const useMagicLink = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      signInWithMagicLink(email),
  });
};