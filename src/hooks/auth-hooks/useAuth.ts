import { LoginPayload } from "@/lib/types/auth-types";
import { login } from "@/server/auth/login";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      console.log("Login successfully:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
