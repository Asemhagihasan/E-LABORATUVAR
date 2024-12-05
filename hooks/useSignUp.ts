import { SignUpProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "@/services/auth";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (formDate: SignUpProps) => signUpApi(formDate),
    onSuccess: () => {
      router.push("/");
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  return { signUp, isPending };
};
