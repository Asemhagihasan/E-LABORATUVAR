import { login } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInProps } from "@/types";
import { router } from "expo-router";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInProps) =>
      login({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (err) => {
      console.error("Error => ", err);
    },
  });
  return { signIn, isPending };
};
