import { creatNewDoctor } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useAddDoctor = () => {
  const {
    mutate: createDoctorRecord,
    isPending,
    error,
  } = useMutation({
    mutationFn: (formData: any) => creatNewDoctor(formData),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Doctor has been added successfully!",
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
  return { createDoctorRecord, isPending, error };
};
