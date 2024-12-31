import { updateCurrentUser } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (formData: any) => updateCurrentUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "user"] });
      Toast.show({
        type: "success", // or 'error', 'info'
        text1: "Success!",
        text2: "User updated successfully",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
    onError(err) {
      console.error("Error => ", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
      });
    },
  });
  return { updateProfile, isPending };
};
