import { getPreviousResults } from "@/services/analysis";
import { useQuery } from "@tanstack/react-query";

export const useGetPreviousResults = (patientId: string) => {
  const { data: previousresults, isPending: isPreviousResultsLoading } =
    useQuery({
      queryKey: ["previousresults", patientId],
      queryFn: () => getPreviousResults(patientId),
    });
  return { previousresults, isPreviousResultsLoading };
};
