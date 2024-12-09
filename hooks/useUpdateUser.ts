import { updateCurrentUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (formData: any) => updateCurrentUser(formData),
    onSuccess: () => {
      console.log("User updated successfully A");
    },
    onError(err) {
      console.error("Error => ", err);
    },
  });
  return { updateUser, isPending };
};
