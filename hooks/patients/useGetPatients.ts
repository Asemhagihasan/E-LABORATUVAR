import { fetchUserIdsAndProfiles } from "@/services/patients";
import { useQuery } from "@tanstack/react-query";

export const useGetPatients = () => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: () => fetchUserIdsAndProfiles(),
  });

  return { patients, isLoading };
};
