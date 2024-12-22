import { getAnalysisByPatientId } from "@/services/analysis";
import { useQuery } from "@tanstack/react-query";

export const useGetAnalysisByPatientId = (
  patientId: string,
  refetch?: boolean
) => {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["analysis", patientId, refetch],
    queryFn: () => getAnalysisByPatientId(patientId),
  });
  return { analysis, isLoading };
};
