import { useMutation } from "@tanstack/react-query";
import { addAnalysis as addAnalysisApi } from "@/services/analysis";
export const useAddAnalysis = () => {
  const { mutate: addAnalysis, isPending } = useMutation({
    mutationFn: (analyses: any) => addAnalysisApi(analyses),
    onSuccess: () => {
      console.log("Analysis added successfully");
    },
    onError: (err) => {
      console.error("Error adding analysis:", err.message);
    },
  });

  return { addAnalysis, isPending };
};
