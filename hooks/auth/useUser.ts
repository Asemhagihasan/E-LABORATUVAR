import { getCurrentUser } from "@/services/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const queryClient = useQueryClient();

  const { isPending: isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0,
  });

  return {
    isAuthonticated: !!user,
    isLoadingUser,
    user,
    metaData: user?.user_metadata,
    clearUser: () => queryClient.removeQueries({ queryKey: ["user"] }),
  };
};
