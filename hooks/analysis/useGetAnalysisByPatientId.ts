import { getAnalysisByPatientId } from "@/services/analysis";
import { useQuery } from "@tanstack/react-query";

export const useGetAnalysisByPatientId = (patientId: string) => {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["analysis", patientId],
    queryFn: () => getAnalysisByPatientId(patientId),
  });
  return { analysis, isLoading };
};
