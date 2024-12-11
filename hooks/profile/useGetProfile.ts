import { getCurrentUserProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (userId: string) => {
  const { data: profile, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getCurrentUserProfile(userId!),
  });

  return { profile, isPending };
};
