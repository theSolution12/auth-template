import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/services/auth.services";

export const useLogout = () => {
  return useMutation({
    mutationFn: signOut,
  });
};