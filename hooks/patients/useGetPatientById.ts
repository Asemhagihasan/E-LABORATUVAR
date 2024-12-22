import { fetchPatientById } from "@/services/patients";
import { useQuery } from "@tanstack/react-query";

export const useGetPatientById = (id: string) => {
  const { data: patient, isPending: isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatientById(id),
  });

  return { patient, isLoading };
};
