import { getPreviousResults } from "@/services/analysis";
import { useQuery } from "@tanstack/react-query";

export const useGetPreviousResults = (patientId: string, refetch?: boolean) => {
  const { data: previousresults, isPending: isPreviousResultsLoading } =
    useQuery({
      queryKey: ["previousresults", patientId, refetch],
      queryFn: () => getPreviousResults(patientId),
    });
  return { previousresults, isPreviousResultsLoading };
};
