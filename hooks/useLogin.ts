import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { SignInProps } from "@/types";
import { router } from "expo-router";
export const useLogin = () => {
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInProps) =>
      login({ email, password }),
    onSuccess: () => {
      console.log("Success");
      router.push("/");
    },
    onError: (err) => {
      console.error("Error => ", err);
    },
  });
  return { signIn, isPending };
};
