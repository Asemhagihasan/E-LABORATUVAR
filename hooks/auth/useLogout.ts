import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/auth";
import { router } from "expo-router";
export const useLogout = () => {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      console.log("Success");
      router.replace("../../(auth)/sign-in");
    },
  });

  return { logout, isPending };
};
