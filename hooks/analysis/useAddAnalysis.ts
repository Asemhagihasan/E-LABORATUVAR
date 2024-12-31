import { useMutation } from "@tanstack/react-query";
import { addAnalysis as addAnalysisApi } from "@/services/analysis";
import Toast from "react-native-toast-message";
export const useAddAnalysis = () => {
  const { mutate: addAnalysis, isPending } = useMutation({
    mutationFn: (analyses: any) => addAnalysisApi(analyses),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Analysis added successfully",
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

  return { addAnalysis, isPending };
};
