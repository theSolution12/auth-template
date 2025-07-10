import { useMutation } from "@tanstack/react-query";
import { signInWithEmail } from "@/services/auth.services";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await signInWithEmail(email, password);
    }
  });
};