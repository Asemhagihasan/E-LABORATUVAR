import { updateCurrentUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useUpdateProfile = () => {
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (formData: any) => updateCurrentUser(formData),
    onSuccess: () => {
      console.log("User updated successfully A");
      Toast.show({
        type: "success", // or 'error', 'info'
        text1: "Success!",
        text2: "User updated successfully",
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
