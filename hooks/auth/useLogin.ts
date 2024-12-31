import { login } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInProps } from "@/types";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInProps) =>
      login({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Welcome back! You've logged in successfully.",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
      router.push("/");
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid email or password. Please try again!",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
  });
  return { signIn, isPending };
};
