import { deleteDoctorById } from "@/services/guides";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDeleteDoctor = () => {
  const { mutate: deleteDoctor, isPending } = useMutation({
    mutationFn: (id: string) => deleteDoctorById(id),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Doctor deleted successfully!",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
    },
  });

  return { deleteDoctor, isPending };
};
