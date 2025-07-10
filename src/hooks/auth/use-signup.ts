import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "@/services/auth.services";

export const useSignup = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUpWithEmail(email, password),
  });
};