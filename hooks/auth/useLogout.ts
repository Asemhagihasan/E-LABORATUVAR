import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/auth";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.replace("../../(auth)/sign-in");
    },
  });

  return { logout, isPending };
};
